package davydov.chat.app.message.service.contoller;

import davydov.chat.app.message.service.model.Message;
import davydov.chat.app.message.service.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "${client.location.url}")
@RequestMapping("messages")
public class MessageController {

    private final MessageService messageService;

    @GetMapping("/{senderId}/{recipientId}/{limit}")
    public ResponseEntity<?> getMessages(@PathVariable String senderId, @PathVariable String recipientId, @PathVariable Long limit) {
        return ResponseEntity.ok(messageService.getMessages(senderId, recipientId, limit));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Message> getMessage(@PathVariable String id) {
        return ResponseEntity.ok(messageService.getMessage(id));
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    public void deleteMessage(@PathVariable String id) {
        messageService.deleteMessage(id);
    }

    @GetMapping("/count/{senderId}/{recipientId}")
    public ResponseEntity<Long> countReceivedMessages(@PathVariable String senderId, @PathVariable String recipientId) {
        return ResponseEntity.ok(messageService.countReceivedMessages(senderId, recipientId));
    }
}
