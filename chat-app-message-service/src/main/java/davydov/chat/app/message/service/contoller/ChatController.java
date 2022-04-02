package davydov.chat.app.message.service.contoller;

import davydov.chat.app.message.service.model.Message;
import davydov.chat.app.message.service.model.MessageNotification;
import davydov.chat.app.message.service.service.ChatRoomService;
import davydov.chat.app.message.service.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RequiredArgsConstructor
@Controller
public class ChatController {

    private final SimpMessagingTemplate messagingTemplate;
    private final ChatRoomService chatRoomService;
    private final MessageService messageService;

    @MessageMapping("/chat")
    public void processMessage(@Payload Message message) {
        var chatId = chatRoomService.getChatId(message.getSenderId(), message.getRecipientId()).get();

        message.setChatId(chatId);

        messageService.save(message);

        messagingTemplate.convertAndSendToUser(
                message.getRecipientId(),
                "/queue/messages",
                MessageNotification.builder()
                        .id(message.getId())
                        .senderId(message.getSenderId())
                        .senderName(message.getSenderName()).build()
        );
    }

    @GetMapping("/messages/{senderId}/{recipientId}")
    public ResponseEntity<?> getAllMessages(@PathVariable String senderId, @PathVariable String recipientId) {
        return ResponseEntity.ok(messageService.getAllMessages(senderId, recipientId));

    }

    @GetMapping("/messages/{id}")
    public ResponseEntity<Message> getMessage(@PathVariable String id) {
        return ResponseEntity.ok(messageService.getMessage(id));
    }

    @GetMapping("/messages/{senderId}/{recipientId}/count")
    public ResponseEntity<Long> countReceivedMessages(@PathVariable String senderId, @PathVariable String recipientId) {
        return ResponseEntity.ok(messageService.countReceivedMessages(senderId, recipientId));
    }
}
