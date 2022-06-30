package davydov.chat.app.auth.service.controller;


import davydov.chat.app.auth.service.payload.MailRequest;
import davydov.chat.app.auth.service.payload.ResetPasswordRequest;
import davydov.chat.app.auth.service.payload.ValidateTokenResponse;
import davydov.chat.app.auth.service.service.MailService;
import davydov.chat.app.auth.service.service.TokenProvider;
import davydov.chat.app.auth.service.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("resetPassword")
public class ResetPasswordController {

    private final UserService userService;
    private final MailService mailService;
    private final TokenProvider tokenProvider;

    @ResponseStatus(HttpStatus.ACCEPTED)
    @PostMapping("/sendMail")
    public void sendMailToResetPassword(@RequestBody MailRequest request) {
        String val = request.getValue();
        var user = val.contains("@") ?
                userService.findUserByMail(val) : userService.findUserByUsername(val);
        mailService.sendSimpleMessage(user);
    }

    @GetMapping("/validateToken/{token}")
    public ResponseEntity<ValidateTokenResponse> validateToken(@PathVariable String token) {
        return ResponseEntity.ok(new ValidateTokenResponse(tokenProvider.isExpired(token)));
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PostMapping("/reset")
    public void resetPassword(@RequestBody ResetPasswordRequest request) {
        userService.changeUserPassword(request);
    }

}
