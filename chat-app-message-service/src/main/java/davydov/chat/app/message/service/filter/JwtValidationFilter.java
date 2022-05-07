package davydov.chat.app.message.service.filter;

import davydov.chat.app.message.service.property.JwtProperty;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.Objects;


// TODO: find way to mock filter in test
@Profile("!test")
@Component
@Slf4j
public class JwtValidationFilter extends OncePerRequestFilter {

    private JwtProperty jwtProperty;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
//        var authHeader = request.getHeader("Authorization");
//        if (Objects.nonNull(authHeader)) {
//            if (!this.isValid(authHeader)) {
//                log.error("doFilterInternal() - jwt token is expired!");
//                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "jwt token is expired!");
//            }
//        } else {
//            log.error("doFilterInternal() - jwt token is expired!");
//            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "jwt token is expired!");
//        }
        filterChain.doFilter(request, response);
    }

    private boolean isValid(String authHeader) {
        return ((Claims) Jwts.parserBuilder()
                .setSigningKey(jwtProperty.getSecret().getBytes())
                .build()
                .parse(authHeader)
                .getBody())
                .getExpiration()
                .before(new Date());
    }

}
