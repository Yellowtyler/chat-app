package davydov.chat.app.message.service.service.impl;

import davydov.chat.app.message.service.dto.ChatDTO;
import davydov.chat.app.message.service.model.ChatRoom;
import davydov.chat.app.message.service.model.Message;
import davydov.chat.app.message.service.repository.ChatRoomRepository;
import davydov.chat.app.message.service.service.ChatRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChatRoomServiceImpl implements ChatRoomService {

    private final ChatRoomRepository repository;

    @Override
    public List<ChatRoom> getOrCreateChatRooms(String senderId, String recipientId) {
        var chatRoom = repository.findBySenderIdAndRecipientId(senderId, recipientId);
        if (chatRoom.isEmpty()) {
            String newChatId = UUID.randomUUID().toString();
            var senderRecipient = ChatRoom.builder()
                    .senderId(senderId)
                    .recipientId(recipientId)
                    .chatRoomId(newChatId)
                    .build();

            var recipientSender = ChatRoom.builder()
                    .senderId(recipientId)
                    .recipientId(senderId)
                    .chatRoomId(newChatId)
                    .build();

            repository.save(senderRecipient);
            repository.save(recipientSender);
            return List.of(senderRecipient, recipientSender);
        } else {
            var otherChatRoom = repository.findBySenderIdAndRecipientId(recipientId, senderId);
            return List.of(chatRoom.get(), otherChatRoom.get());
        }
    }

    @Override
    public List<ChatDTO> getChats(String id) {
        return repository.findBySenderId(id).stream().map(this::mapToDto).collect(Collectors.toList());
    }

    private ChatDTO mapToDto(ChatRoom chat) {
        if (chat.getMessages().size()-1 == -1) {
            return null;
        }

        var lastMessage = chat.getMessages().stream().max(Comparator.comparing(Message::getCreationDate)).get();

        return ChatDTO.builder()
                .chatId(String.valueOf(chat.getId()))
                .recipientId(chat.getRecipientId())
                .recipientName(lastMessage.getRecipientName())
                .lastMessage(lastMessage.getContent())
                .lastMessageDate(lastMessage.getCreationDate())
                .lastMessageUser(lastMessage.getSenderName())
                .build();
    }
}
