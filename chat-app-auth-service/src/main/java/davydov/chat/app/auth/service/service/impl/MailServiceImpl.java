package davydov.chat.app.auth.service.service.impl;

import davydov.chat.app.auth.service.model.User;
import davydov.chat.app.auth.service.service.MailService;
import davydov.chat.app.auth.service.service.TokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MailServiceImpl implements MailService {

    private final JavaMailSender javaMailSender;
    private final TokenProvider tokenProvider;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    @Value("${client.location.url}")
    private String clientUrl;

    @Override
    public void sendSimpleMessage(User to) {
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setFrom("simple chat app");
        simpleMailMessage.setSubject("reset your password");
        var token = tokenProvider.generateToken(to);
        System.out.println(token);
        String resetPasswordUrl = clientUrl + "/reset?token=" + token;
        simpleMailMessage.setText("Go to " + resetPasswordUrl + " to reset password");
    }
}
