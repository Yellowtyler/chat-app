package davydov.chat.app.auth.service.service.impl;

import davydov.chat.app.auth.service.property.JwtProperty;
import davydov.chat.app.auth.service.service.TokenProvider;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Component
public class JwtTokenProvider implements TokenProvider {

    private final JwtProperty jwtProperty;

    @Override
    public String generateToken(Authentication authentication) {
        var now = System.currentTimeMillis();
        return Jwts.builder()
                .setSubject(authentication.getName())
                .claim("authorities", authentication
                        .getAuthorities()
                        .stream()
                        .map(GrantedAuthority::getAuthority)
                        .collect(Collectors.toList())
                )
                .setIssuedAt(new Date(now))
                .setExpiration(new Date(now + jwtProperty.getExpiration() * 1000L))
                .signWith(Keys.hmacShaKeyFor(jwtProperty.getSecret().getBytes()), SignatureAlgorithm.HS512)
                .compact();
    }

    @Override
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(jwtProperty.getSecret().getBytes())
                    .build()
                    .parse(token);
            return true;

        } catch (Exception e) {
            log.error("validateToken() - exception during parsing token", e);
        }
        return false;
    }
}
