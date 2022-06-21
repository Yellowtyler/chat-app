package davydov.chat.app.auth.service.payload;

import lombok.Data;

@Data
public class UpdateUserStatusRequest {
    private String id;
    private boolean status;
}
