package davydov.chat.app.message.service.model;

import lombok.Builder;
import lombok.Data;

import javax.persistence.*;

@Data
@Builder
@Entity
@Table(name = "chats")
public class ChatRoom {
    @Id
    @GeneratedValue
    private String id;
    private String chatId;
    private String senderId;
    private String recipientId;
}
