package davydov.chat.app.auth.service.service;

import davydov.chat.app.auth.service.model.LoginRequest;
import davydov.chat.app.auth.service.model.SignupRequest;
import davydov.chat.app.auth.service.model.SignupResponse;

public interface UserService {
    SignupResponse registerUser(SignupRequest request);
    String authenticateUser(LoginRequest loginRequest);
}
