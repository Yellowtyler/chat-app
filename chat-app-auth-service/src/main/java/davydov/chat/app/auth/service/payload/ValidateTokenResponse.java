package davydov.chat.app.auth.service.payload;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class ValidateTokenResponse {
    private boolean flag;
}
