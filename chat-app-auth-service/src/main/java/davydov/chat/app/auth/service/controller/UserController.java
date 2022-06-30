package davydov.chat.app.auth.service.controller;

import davydov.chat.app.auth.service.payload.UpdateUserStatusRequest;
import davydov.chat.app.auth.service.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
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

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PostMapping("/status")
    public void updateUserStatus(@RequestBody UpdateUserStatusRequest request) {
        userService.updateUserStatus(request);
    }
}
