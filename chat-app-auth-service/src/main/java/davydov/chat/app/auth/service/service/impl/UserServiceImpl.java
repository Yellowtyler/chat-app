package davydov.chat.app.auth.service.service.impl;

import davydov.chat.app.auth.service.exception.UserAlreadyExistsException;
import davydov.chat.app.auth.service.model.User;
import davydov.chat.app.auth.service.payload.LoginRequest;
import davydov.chat.app.auth.service.payload.LoginResponse;
import davydov.chat.app.auth.service.payload.SignupRequest;
import davydov.chat.app.auth.service.repository.RoleRepository;
import davydov.chat.app.auth.service.repository.UserRepository;
import davydov.chat.app.auth.service.service.TokenProvider;
import davydov.chat.app.auth.service.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserDetailsService userDetailsService;
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
        var user = userDetailsService.loadUserByUsername(loginRequest.getUsername());
        var token = new UsernamePasswordAuthenticationToken(user.getUsername(), loginRequest.getPassword(), user.getAuthorities());
        var authentication = authenticationManager.authenticate(token);
        return new LoginResponse(tokenProvider.generateToken(authentication));
    }

}
