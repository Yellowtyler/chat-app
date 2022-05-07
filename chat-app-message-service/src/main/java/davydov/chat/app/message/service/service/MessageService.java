package davydov.chat.app.message.service.service;

import davydov.chat.app.message.service.model.Message;

import java.util.Set;

public interface MessageService {
    Set<Message> getAllMessages(String senderId, String recipientId);

    Message getMessage(String id);

    void save(Message message);

    Long countReceivedMessages(String senderId, String recipientId);

}
