package davydov.chat.app.auth.service.service;

import davydov.chat.app.auth.service.model.User;
import davydov.chat.app.auth.service.payload.*;

import java.util.List;

public interface UserService {
    void registerUser(SignupRequest request);
    LoginResponse authenticateUser(LoginRequest loginRequest);
    List<UserDTO> searchForUsers(String username);

    boolean getUserStatus(String id);

    void updateUserStatus(UpdateUserStatusRequest request);

    User findUserByUsername(String id);

    User findUserByMail(String mail);

    void changeUserPassword(ResetPasswordRequest request);
}
