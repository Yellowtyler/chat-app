package davydov.chat.app.auth.service.service.impl;

import davydov.chat.app.auth.service.exception.UserAlreadyExistsException;
import davydov.chat.app.auth.service.model.LoginRequest;
import davydov.chat.app.auth.service.model.SignupRequest;
import davydov.chat.app.auth.service.model.User;
import davydov.chat.app.auth.service.repository.UserRepository;
import davydov.chat.app.auth.service.service.TokenProvider;
import davydov.chat.app.auth.service.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final TokenProvider tokenProvider;
    private final AuthenticationManager authenticationManager;

    @Override
    public void registerUser(SignupRequest signupRequest) {
       if (userRepository.findByUsername(signupRequest.getUsername()).isPresent()) {
           throw new UserAlreadyExistsException("user '" + signupRequest.getUsername() + "' already exists");
       }
        var user = new User(
                signupRequest.getUsername(),
                signupRequest.getPassword(),
                signupRequest.getEmail()
        );
        userRepository.save(user);
    }

    @Override
    public String authenticateUser(LoginRequest loginRequest) {
        var user = userRepository.findByUsername(loginRequest.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException(String.format("User with %s username not found", loginRequest.getUsername())));
        var authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));
        return tokenProvider.generateToken(authentication);
    }

}
