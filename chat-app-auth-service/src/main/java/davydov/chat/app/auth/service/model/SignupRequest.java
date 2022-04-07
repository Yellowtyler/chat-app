package davydov.chat.app.auth.service.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

@Data
public class SignupRequest {
    private String username;
    @JsonIgnore
    private String password;
    private String email;
}
