package davydov.chat.app.message.service.dto;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class ChatDTO {
    private String chatId;
    private String recipientName;
    private String recipientId;
    private String lastMessage;
}
