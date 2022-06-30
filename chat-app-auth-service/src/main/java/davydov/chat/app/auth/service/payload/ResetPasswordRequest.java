package davydov.chat.app.auth.service.payload;

import lombok.Data;

@Data
public class ResetPasswordRequest {
    private String username;
    private String password;
}
