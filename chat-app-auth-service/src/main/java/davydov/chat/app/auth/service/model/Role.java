package davydov.chat.app.auth.service.model;

import lombok.Getter;

public enum Role {
    USER("USER");

    @Getter
    private final String value;

    Role(String value) {
        this.value = value;
    }
}
