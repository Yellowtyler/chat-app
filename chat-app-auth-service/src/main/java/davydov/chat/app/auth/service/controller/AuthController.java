package davydov.chat.app.auth.service.controller;

import davydov.chat.app.auth.service.model.LoginRequest;
import davydov.chat.app.auth.service.model.SignupRequest;
import davydov.chat.app.auth.service.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class AuthController {

    private final UserService userService;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        return ResponseEntity.ok(userService.authenticateUser(loginRequest));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signUpUser(@RequestBody SignupRequest signupRequest) {
        return ResponseEntity.ok(userService.registerUser(signupRequest));
    }
}
