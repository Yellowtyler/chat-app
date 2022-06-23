package davydov.chat.app.auth.service.service.impl;

import davydov.chat.app.auth.service.exception.UserAlreadyExistsException;
import davydov.chat.app.auth.service.model.User;
import davydov.chat.app.auth.service.payload.*;
import davydov.chat.app.auth.service.repository.RoleRepository;
import davydov.chat.app.auth.service.repository.UserRepository;
import davydov.chat.app.auth.service.service.TokenProvider;
import davydov.chat.app.auth.service.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final TokenProvider tokenProvider;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void registerUser(SignupRequest signupRequest) {
       if (userRepository.findByUsername(signupRequest.getUsername()).isPresent()) {
           throw new UserAlreadyExistsException("user '" + signupRequest.getUsername() + "' already exists");
       }
        var user = new User(
                signupRequest.getUsername(),
                passwordEncoder.encode(signupRequest.getPassword()),
                signupRequest.getMail(),
                roleRepository.findByName("ROLE_USER")
        );
        userRepository.save(user);
    }

    @Override
    public LoginResponse authenticateUser(LoginRequest loginRequest) {
        var user = userRepository.findByUsername(loginRequest.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException(String.format("User with %s username not found", loginRequest.getUsername())));
        var token = new UsernamePasswordAuthenticationToken(user.getUsername(), loginRequest.getPassword());
        var authentication = authenticationManager.authenticate(token);
        return new LoginResponse(tokenProvider.generateToken(authentication, user.getId()));
    }

    @Override
    public List<UserDTO> searchForUsers(String username) {
        return userRepository.findByUsernameIsLike(username).stream()
                .map(u -> new UserDTO(u.getId(), u.getUsername()))
                .collect(Collectors.toUnmodifiableList());
    }

    @Override
    public boolean getUserStatus(String id) {
        return userRepository.findById(UUID.fromString(id)).get().isActive();
    }

    @Override
    public void updateUserStatus(UpdateUserStatusRequest request) {
        userRepository.setIsActive(UUID.fromString(request.getId()), request.isStatus());
    }

}
