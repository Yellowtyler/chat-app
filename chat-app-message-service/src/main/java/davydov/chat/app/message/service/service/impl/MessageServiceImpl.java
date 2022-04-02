package davydov.chat.app.message.service.service.impl;

import davydov.chat.app.message.service.model.Message;
import davydov.chat.app.message.service.model.MessageStatus;
import davydov.chat.app.message.service.repository.MessageRepository;
import davydov.chat.app.message.service.service.ChatRoomService;
import davydov.chat.app.message.service.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

import static davydov.chat.app.message.service.model.MessageStatus.DELIVERED;
import static davydov.chat.app.message.service.model.MessageStatus.RECEIVED;

@RequiredArgsConstructor
@Service
public class MessageServiceImpl implements MessageService {

    private final MessageRepository messageRepository;
    private final ChatRoomService chatRoomService;

    @Override
    public List<Message> getAllMessages(String senderId, String recipientId) {
        var chatId = chatRoomService.getChatId(senderId, recipientId).get();
        var listOfMessages = messageRepository.findByChatId(chatId);
        if (listOfMessages.size() > 0) {
            updateStatus(senderId, recipientId, DELIVERED);
        }
        return listOfMessages;
    }

    @Override
    public Message getMessage(String id) {
        return messageRepository.findById(Long.valueOf(id))
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