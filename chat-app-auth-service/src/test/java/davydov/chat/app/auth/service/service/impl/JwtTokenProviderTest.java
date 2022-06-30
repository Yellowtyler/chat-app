package davydov.chat.app.auth.service.service.impl;

import davydov.chat.app.auth.service.model.User;
import davydov.chat.app.auth.service.property.JwtProperty;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertTrue;

public class JwtTokenProviderTest {

    private JwtTokenProvider jwtTokenProvider;

    @BeforeEach
    public void setUp() {
       var jwtProperty = new JwtProperty();
        jwtProperty.setExpiration(1);
        jwtProperty.setHeader("Authorization");
        jwtProperty.setPrefix("Bearer");
        jwtProperty.setUri("/auth/**");
        jwtProperty.setSecret("JwtSuperBigFuckYeahWhatElseToWriteOMGSecretKey");
        jwtTokenProvider = new JwtTokenProvider(jwtProperty);
    }

    @Test
    public void testIsExpired() throws InterruptedException {
        var user = new User();
        user.setId(UUID.randomUUID());
        user.setUsername("Alice");
        user.setPassword("123Qwerty!2");
        var token = jwtTokenProvider.generateToken(user);
        Thread.sleep(2000);
        assertTrue(jwtTokenProvider.isExpired(token));
    }
}
