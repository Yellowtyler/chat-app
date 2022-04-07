package davydov.chat.app.auth.service.property;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Data
@ConfigurationProperties(prefix = "jwt")
@Component
public class JwtProperty {
    private String header;
    private String uri;
    private String prefix;
    private int expiration;
    private String secret;
}
