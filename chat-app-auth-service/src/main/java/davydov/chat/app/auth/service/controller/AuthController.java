package davydov.chat.app.auth.service.controller;

import davydov.chat.app.auth.service.payload.LoginRequest;
import davydov.chat.app.auth.service.payload.SignupRequest;
import davydov.chat.app.auth.service.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("auth")
public class AuthController {

    private final UserService userService;

    @PostMapping("/login")
    public ResponseEntity<String> authenticateUser(@RequestBody LoginRequest loginRequest) {
        return ResponseEntity.ok(userService.authenticateUser(loginRequest));
    }

    @PostMapping("/signup")
    public void signUpUser(@RequestBody SignupRequest signupRequest) {
        userService.registerUser(signupRequest);
    }
}
