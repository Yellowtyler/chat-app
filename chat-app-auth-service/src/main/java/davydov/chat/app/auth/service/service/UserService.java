package davydov.chat.app.auth.service.service;

import davydov.chat.app.auth.service.payload.LoginRequest;
import davydov.chat.app.auth.service.payload.SignupRequest;

public interface UserService {
    void registerUser(SignupRequest request);
    String authenticateUser(LoginRequest loginRequest);
}
