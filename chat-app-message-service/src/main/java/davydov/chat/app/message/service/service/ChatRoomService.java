package davydov.chat.app.message.service.service;

import java.util.Optional;

public interface ChatRoomService {
    Optional<String> getChatId(String senderId, String recipientId);
}
