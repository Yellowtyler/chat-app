package davydov.chat.app.message.service.model;

import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor
@Builder
@Entity
@Table(name = "chats")
public class ChatRoom {

    public ChatRoom() {

    }

    @Id
    @GeneratedValue
    private Long id;

    @Column(name = "chat_id")
    private String chatId;

    @Column(name = "sender_id")
    private String senderId;

    @Column(name = "recipient_id")
    private String recipientId;
}
