package davydov.chat.app.auth.service.service;

import davydov.chat.app.auth.service.model.User;
import org.springframework.security.core.Authentication;

import java.util.UUID;

public interface TokenProvider {
    String generateToken(Authentication authentication, UUID id);
    String generateToken(User user);
    boolean isExpired(String token);
}
