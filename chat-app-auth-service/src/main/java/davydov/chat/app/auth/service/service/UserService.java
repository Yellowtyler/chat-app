package davydov.chat.app.auth.service.service;

import davydov.chat.app.auth.service.payload.*;

import java.util.List;

public interface UserService {
    void registerUser(SignupRequest request);
    LoginResponse authenticateUser(LoginRequest loginRequest);
    List<UserDTO> searchForUsers(String username);

    boolean getUserStatus(String id);

    boolean updateUserStatus(UpdateUserStatusRequest request);
}
