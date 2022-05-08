package davydov.chat.app.message.service.filter;

import davydov.chat.app.message.service.property.JwtProperty;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Objects;


// TODO: find way to mock filter in test
@Profile("!test")
@Component
@RequiredArgsConstructor
@Slf4j
public class JwtValidationFilter extends OncePerRequestFilter {

    private final JwtProperty jwtProperty;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        var authHeader = request.getHeader("Authorization");
        if (Objects.nonNull(authHeader)) {
            if (this.isExpired(authHeader)) {
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "jwt token is expired!");
            }
        } else {
            log.error("doFilterInternal() - Authorization header is absent!");
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "jwt token is expired!");
        }
        filterChain.doFilter(request, response);
    }

    private boolean isExpired(String authHeader) {
        try {
           Jwts.parserBuilder()
                .setSigningKey(jwtProperty.getSecret().getBytes())
                .build()
                .parse(authHeader.split(" ")[1])
                .getBody();
        } catch (ExpiredJwtException e) {
            log.error("isExpired() - {}", e.getMessage());
            return true;
        }
        return false;
    }

}
