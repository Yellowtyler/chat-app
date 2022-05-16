package davydov.chat.app.message.service.model;

import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Builder
@Data
public class MessageNotification {
    private UUID id;
    private String senderId;
    private String senderName;
}
