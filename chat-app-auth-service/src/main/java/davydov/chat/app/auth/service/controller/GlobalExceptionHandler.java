package davydov.chat.app.auth.service.controller;

import davydov.chat.app.auth.service.exception.UserAlreadyExistsException;
import davydov.chat.app.auth.service.model.AuthError;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<AuthError> handleUserAlreadyExistsException(UserAlreadyExistsException ex) {
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(AuthError.builder().code(HttpStatus.BAD_REQUEST.value()).message(ex.getMessage()).build());
    }
}
