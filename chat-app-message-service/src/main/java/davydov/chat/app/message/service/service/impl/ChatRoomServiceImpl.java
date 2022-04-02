package davydov.chat.app.message.service.service.impl;

import davydov.chat.app.message.service.model.ChatRoom;
import davydov.chat.app.message.service.repository.ChatRoomRepository;
import davydov.chat.app.message.service.service.ChatRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ChatRoomServiceImpl implements ChatRoomService {

    private final ChatRoomRepository repository;

    @Override
    public Optional<String> getChatId(String senderId, String recipientId) {
        return repository.findBySenderIdAndRecipientId(senderId, recipientId)
                .map(ChatRoom::getChatId)
                .or(() -> {
                    String newChatId = UUID.randomUUID().toString();
                    var senderRecipient = ChatRoom.builder()
                            .senderId(senderId)
                            .recipientId(recipientId)
                            .chatId(newChatId)
                            .build();

                    var recipientSender = ChatRoom.builder()
                            .senderId(recipientId)
                            .recipientId(senderId)
                            .chatId(newChatId)
                            .build();

                    repository.save(senderRecipient);
                    repository.save(recipientSender);
                    return java.util.Optional.ofNullable(newChatId);
                });
    }
}
