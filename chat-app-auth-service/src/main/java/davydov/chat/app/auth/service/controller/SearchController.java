package davydov.chat.app.auth.service.controller;

import davydov.chat.app.auth.service.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class SearchController {

    private final UserService userService;

    @GetMapping("/search/{username}")
    public ResponseEntity<List<?>> searchForUsers(@PathVariable String username) {
        return ResponseEntity.ok(userService.searchForUsers(username));
    }

}
