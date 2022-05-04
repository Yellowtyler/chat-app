package davydov.chat.app.auth.service.payload;

import lombok.Data;

@Data
public class SignupRequest {
    private String username;
    private String password;
    private String mail;
}
