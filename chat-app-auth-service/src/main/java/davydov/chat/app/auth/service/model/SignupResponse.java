package davydov.chat.app.auth.service.model;

import lombok.Data;

@Data
public class SignupResponse {
    private Boolean success;
    private String username;

    public SignupResponse(boolean success, String username) {
        this.success = success;
        this.username = username;
    }
}
