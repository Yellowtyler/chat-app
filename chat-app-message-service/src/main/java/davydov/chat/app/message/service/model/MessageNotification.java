package davydov.chat.app.message.service.model;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class MessageNotification {
    private String id;
    private String senderId;
    private String senderName;
}
