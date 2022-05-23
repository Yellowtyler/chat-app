package davydov.chat.app.message.service.model;

import lombok.Getter;

public enum MessageStatus {
    DELIVERED("DELIVERED"), RECEIVED("RECEIVED");

    @Getter
    private final String value;

    MessageStatus(String value) {
        this.value = value;
    }
}
