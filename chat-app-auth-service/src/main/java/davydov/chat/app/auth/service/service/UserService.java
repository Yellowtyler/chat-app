package davydov.chat.app.auth.service.service;

import davydov.chat.app.auth.service.model.LoginRequest;
import davydov.chat.app.auth.service.model.SignupRequest;

public interface UserService {
    void registerUser(SignupRequest request);
    String authenticateUser(LoginRequest loginRequest);
}
