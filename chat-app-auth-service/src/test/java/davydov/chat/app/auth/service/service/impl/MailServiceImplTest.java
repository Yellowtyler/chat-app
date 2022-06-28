package davydov.chat.app.auth.service.service.impl;

import com.icegreen.greenmail.util.GreenMail;
import com.icegreen.greenmail.util.ServerSetupTest;
import davydov.chat.app.auth.service.model.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import javax.mail.MessagingException;
import java.io.IOException;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
public class MailServiceImplTest {
    private GreenMail testSmtp = new GreenMail(ServerSetupTest.SMTP);

    @Autowired
    private JavaMailSenderImpl javaMailSender;

    @Autowired
    private MailServiceImpl mailService;

    @Value("${mail.username}")
    private String username;

    @Value("${mail.password}")
    private String password;

    @Value("${mail.from}")
    private String from;

    @Value("${client.location.url}")
    private String clientUrl;

    @BeforeEach
    public void setUp() {
        testSmtp = new GreenMail(ServerSetupTest.SMTP);
        testSmtp.setUser(username, password);
        testSmtp.start();
        javaMailSender.setPort(3025);
        javaMailSender.setHost("localhost");
    }

    @Test
    @DisplayName("Send test")
    void testSend() throws MessagingException, IOException {
        var user = new User();
        user.setId(UUID.randomUUID());
        user.setUsername("Alice");
        user.setPassword("123Qwerty!2");
        user.setMail("noname@mail.com");
        mailService.sendSimpleMessage(user);
        var receivedMessage = testSmtp.getReceivedMessages()[0];
        assertEquals(user.getMail(), receivedMessage.getHeader("To")[0]);
        assertEquals(from, receivedMessage.getHeader("From")[0]);
        assertEquals("reset your password", receivedMessage.getHeader("Subject")[0]);
        assertTrue(((String)receivedMessage.getContent()).contains("Go to " + clientUrl));
    }

}
