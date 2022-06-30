package davydov.chat.app.message.service.contoller;

import davydov.chat.app.message.service.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "${client.location.url}")
@RequiredArgsConstructor
@RestController
@RequestMapping("search")
public class SearchController {

    private final MessageService messageService;

    @GetMapping("/{message}")
    public ResponseEntity<?> searchForMessages(@PathVariable String message) {
        return ResponseEntity.ok(messageService.searchForMessages(message));
    }

}
