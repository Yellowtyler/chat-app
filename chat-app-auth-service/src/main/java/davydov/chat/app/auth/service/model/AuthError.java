package davydov.chat.app.auth.service.model;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class AuthError {
    private int code;
    private String message;
}
