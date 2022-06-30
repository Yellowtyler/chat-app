package davydov.chat.app.auth.service.service.impl;

import davydov.chat.app.auth.service.model.User;
import davydov.chat.app.auth.service.service.MailService;
import davydov.chat.app.auth.service.service.TokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MailServiceImpl implements MailService {

    private final JavaMailSender javaMailSender;
    private final TokenProvider tokenProvider;

    @Value("${client.location.url}")
    private String clientUrl;

    @Value("${mail.from}")
    private String fromMail;

    @Override
    public void sendSimpleMessage(User to) {
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setFrom(fromMail);
        simpleMailMessage.setTo(to.getMail());
        simpleMailMessage.setSubject("reset your password");
        var token = tokenProvider.generateToken(to);
        String resetPasswordUrl = clientUrl + "/reset?token=" + token;
        simpleMailMessage.setText("Go to " + resetPasswordUrl + " to reset your password.");
        javaMailSender.send(simpleMailMessage);
    }
}
