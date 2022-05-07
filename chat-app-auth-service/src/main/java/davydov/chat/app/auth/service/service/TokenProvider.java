package davydov.chat.app.auth.service.service;

import org.springframework.security.core.Authentication;

public interface TokenProvider {

    String generateToken(Authentication authentication, Long id);



}
