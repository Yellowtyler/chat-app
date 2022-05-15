package davydov.chat.app.auth.service.service;

import davydov.chat.app.auth.service.payload.LoginRequest;
import davydov.chat.app.auth.service.payload.LoginResponse;
import davydov.chat.app.auth.service.payload.SignupRequest;
import davydov.chat.app.auth.service.payload.UserDTO;

import java.util.List;

public interface UserService {
    void registerUser(SignupRequest request);
    LoginResponse authenticateUser(LoginRequest loginRequest);
    List<UserDTO> searchForUsers(String username);
}
