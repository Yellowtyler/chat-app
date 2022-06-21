package davydov.chat.app.message.service.service;

import davydov.chat.app.message.service.model.Message;

import java.util.List;

public interface MessageService {
    List<Message> getMessages(String senderId, String recipientId, Long limit);

    Message getMessage(String id);

    Message save(Message message);

    Long countReceivedMessages(String senderId, String recipientId);

}
