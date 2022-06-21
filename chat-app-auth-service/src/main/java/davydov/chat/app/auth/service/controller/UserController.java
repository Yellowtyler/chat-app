package davydov.chat.app.auth.service.controller;

import davydov.chat.app.auth.service.payload.UpdateUserStatusRequest;
import davydov.chat.app.auth.service.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("user")
public class UserController {

    private final UserService userService;

    @GetMapping("/status/{id}")
    public ResponseEntity<Boolean> getUserStatus(@PathVariable String id) {
        return ResponseEntity.ok(userService.getUserStatus(id));
    }

    @PostMapping("/status")
    public ResponseEntity<Boolean> updateUserStatus(UpdateUserStatusRequest request) {
        return ResponseEntity.ok(userService.updateUserStatus(request));
    }
}
