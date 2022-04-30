package davydov.chat.app.message.service.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@Builder
@Entity
@Table(name = "chats")
public class ChatRoom {

    @Id
    @GeneratedValue
    private Long id;

    @Column(name = "chat_room_id")
    private String chatRoomId;

    @Column(name = "sender_id")
    private String senderId;

    @Column(name = "recipient_id")
    private String recipientId;

    // TODO: figure out about cascade. There might be issue with read/write from db
    @ManyToMany
    private List<Message> messages;

    public ChatRoom() {
    }
}

