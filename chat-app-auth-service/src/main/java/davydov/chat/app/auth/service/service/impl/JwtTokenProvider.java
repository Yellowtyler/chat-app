package davydov.chat.app.auth.service.service.impl;

import davydov.chat.app.auth.service.model.User;
import davydov.chat.app.auth.service.property.JwtProperty;
import davydov.chat.app.auth.service.service.TokenProvider;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Component
public class JwtTokenProvider implements TokenProvider {

    private final JwtProperty jwtProperty;

    @Override
    public String generateToken(Authentication authentication, UUID id) {
        var now = System.currentTimeMillis();
        return Jwts.builder()
                .setSubject(id.toString())
                .claim("authorities", authentication
                        .getAuthorities()
                        .stream()
                        .map(GrantedAuthority::getAuthority)
                        .collect(Collectors.toList())
                )
                .claim("name", authentication.getName())
                .setIssuedAt(new Date(now))
                .setExpiration(new Date(now + jwtProperty.getExpiration() * 1000L))
                .signWith(Keys.hmacShaKeyFor(jwtProperty.getSecret().getBytes()), SignatureAlgorithm.HS256)
                .compact();
    }

    @Override
    public String generateToken(User user) {
        var now = System.currentTimeMillis();
        return Jwts.builder()
                .setSubject(user.getId().toString())
                .claim("name", user.getUsername())
                .setIssuedAt(new Date(now))
                .setExpiration(new Date(now + jwtProperty.getExpiration() * 1000L))
                .signWith(Keys.hmacShaKeyFor(jwtProperty.getSecret().getBytes()), SignatureAlgorithm.HS256)
                .compact();
    }

    @Override
    public boolean isExpired(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(jwtProperty.getSecret().getBytes())
                    .setAllowedClockSkewSeconds(jwtProperty.getExpiration())
                    .build()
                    .parse(token)
                    .getBody();
        } catch (ExpiredJwtException e) {
            log.error("isExpired() - {}", e.getMessage());
            return true;
        }
        return false;
    }

}
