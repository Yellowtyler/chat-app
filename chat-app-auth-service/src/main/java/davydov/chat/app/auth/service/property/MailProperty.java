package davydov.chat.app.auth.service.property;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Data
@ConfigurationProperties("mail")
@Component
public class MailProperty {
    private String host;
    private int port;
    private String username;
    private String password;
    private String from;
    private String protocol = "smtp";
    private boolean auth;
    private boolean tls;
    private boolean debug;
}
