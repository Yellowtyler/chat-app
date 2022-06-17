package davydov.chat.app.message.service.service.impl;

import davydov.chat.app.message.service.model.Message;
import davydov.chat.app.message.service.model.MessageStatus;
import davydov.chat.app.message.service.repository.ChatRepository;
import davydov.chat.app.message.service.repository.MessageRepository;
import davydov.chat.app.message.service.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.UUID;
import java.util.stream.Collectors;

import static davydov.chat.app.message.service.model.MessageStatus.DELIVERED;
import static davydov.chat.app.message.service.model.MessageStatus.RECEIVED;

@RequiredArgsConstructor
@Service
public class MessageServiceImpl implements MessageService {

    private final MessageRepository messageRepository;
    private final ChatRepository chatRepository;

    @Override
    public List<Message> getAllMessages(String senderId, String recipientId) {
        var chatRoom = chatRepository.findBySenderIdAndRecipientId(senderId, recipientId).get();
        if (chatRoom.getMessages().size() > 0) {
            var receivedMessages = chatRoom.getMessages()
                .stream()
                .filter(m -> m.getMessageStatus().equals(RECEIVED) && Objects.equals(m.getRecipientId(), senderId))
                .collect(Collectors.toUnmodifiableList());
            if (receivedMessages.size() != 0) {
                updateStatus(recipientId, senderId, DELIVERED);
            }
        }
        return chatRoom.getMessages()
                .stream()
                .sorted(Comparator.comparing(Message::getCreationDate))
                .collect(Collectors.toUnmodifiableList());
    }

    @Override
    public Message getMessage(String id) {
        return messageRepository.findById(UUID.fromString(id))
                .map(message -> {
                   message.setMessageStatus(MessageStatus.DELIVERED);
                   return messageRepository.save(message);
                })
                .orElseThrow(RuntimeException::new);
    }

    @Override
    public void save(Message message) {
        message.setMessageStatus(RECEIVED);
        messageRepository.save(message);
    }

    @Override
    public Long countReceivedMessages(String senderId, String recipientId) {
        return messageRepository.countBySenderIdAndRecipientIdAndMessageStatus(senderId, recipientId, RECEIVED);
    }

    private void updateStatus(String senderId, String recipientId, MessageStatus status) {
        messageRepository.updateStatus(status, senderId, recipientId);
    }



}
