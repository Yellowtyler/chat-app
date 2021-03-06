package davydov.chat.app.message.service.contoller;

import davydov.chat.app.message.service.dto.ChatResponse;
import davydov.chat.app.message.service.dto.CreateChatRequest;
import davydov.chat.app.message.service.model.Message;
import davydov.chat.app.message.service.model.MessageNotification;
import davydov.chat.app.message.service.service.ChatService;
import davydov.chat.app.message.service.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;

@CrossOrigin(origins = "${client.location.url}")
@RequiredArgsConstructor
@Controller
public class ChatController {

    private final SimpMessagingTemplate messagingTemplate;
    private final ChatService chatService;
    private final MessageService messageService;

    @MessageMapping("/chat")
    public void processMessage(@Payload Message message) {
        var chats = chatService.getChats(message.getSenderId(), message.getRecipientId());

        message.setChats(new HashSet<>(chats));

        messageService.save(message);

        messagingTemplate.convertAndSendToUser(
            message.getRecipientId(),
            "/queue/messages",
            MessageNotification.builder()
                .id(message.getId())
                .senderId(message.getSenderId())
                .build()
        );
    }

    @GetMapping("/chats/{id}")
    public ResponseEntity<List<ChatResponse>> getAllChats(@PathVariable String id) {
        return ResponseEntity.ok(chatService.getAllChats(id));
    }

    @PostMapping("/chats")
    public ResponseEntity<ChatResponse> createChat(@RequestBody CreateChatRequest request) {
        return ResponseEntity.ok(chatService.createChat(request));
    }
}
