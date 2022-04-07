package davydov.chat.app.auth.service.model;

import lombok.Data;

@Data
public class SignupResponse {
    private Boolean success;
    private String message;

    public SignupResponse(boolean success, String message) {
        this.success = success;
        this.message = message;
    }
}
