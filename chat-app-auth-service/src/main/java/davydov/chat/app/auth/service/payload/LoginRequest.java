package davydov.chat.app.auth.service.payload;

import lombok.Data;

@Data
public class LoginRequest {
    private String username;
    private String password;
}
