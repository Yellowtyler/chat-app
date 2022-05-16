package davydov.chat.app.message.service.service.impl;

import davydov.chat.app.message.service.dto.CreateChatRequest;
import davydov.chat.app.message.service.dto.ChatResponse;
import davydov.chat.app.message.service.model.Chat;
import davydov.chat.app.message.service.model.Message;
import davydov.chat.app.message.service.repository.ChatRepository;
import davydov.chat.app.message.service.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChatServiceImpl implements ChatService {

    private final ChatRepository repository;

    @Override
    public List<Chat> getChats(String senderId, String recipientId) {
        var chatRoom = repository.findBySenderIdAndRecipientId(senderId, recipientId);
        var otherChatRoom = repository.findBySenderIdAndRecipientId(recipientId, senderId);
        return List.of(chatRoom.get(), otherChatRoom.get());
    }

    @Override
    public List<ChatResponse> getAllChats(String id) {
        return repository.findBySenderId(id).stream().map(this::mapToDto).sorted(Comparator.comparing(ChatResponse::getLastMessageDate).reversed()).collect(Collectors.toList());
    }

    @Override
    public ChatResponse createChat(CreateChatRequest request) {
        Chat chat;
        try {
            chat = getChats(request.getSenderId(), request.getRecipientId()).get(0);
        } catch (NoSuchElementException e) {
            chat = createChats(request).get(0);
        }
        return ChatResponse.builder()
                .chatId(chat.getChatId())
                .recipientId(chat.getRecipientId())
                .recipientName(request.getRecipientName())
                .build();
    }

    private List<Chat> createChats(CreateChatRequest request) {
        var newChatId = UUID.randomUUID().toString();
        var senderRecipient = Chat.builder()
                .senderId(request.getSenderId())
                .recipientId(request.getRecipientId())
                .senderName(request.getSenderName())
                .recipientName(request.getRecipientName())
                .chatId(newChatId)
                .build();

        var recipientSender = Chat.builder()
                .senderId(request.getRecipientId())
                .recipientId(request.getSenderId())
                .senderName(request.getRecipientName())
                .recipientName(request.getSenderName())
                .chatId(newChatId)
                .build();

        repository.save(senderRecipient);
        repository.save(recipientSender);
        return List.of(senderRecipient, recipientSender);
    }

    private ChatResponse mapToDto(Chat chat) {
        if (chat.getMessages().size()-1 == -1) {
            return null;
        }

        var lastMessage = chat.getMessages().stream().max(Comparator.comparing(Message::getCreationDate)).get();

        return ChatResponse.builder()
                .chatId(chat.getChatId())
                .recipientId(chat.getRecipientId())
                .recipientName(chat.getRecipientName())
                .lastMessage(lastMessage.getContent())
                .lastMessageDate(lastMessage.getCreationDate())
                .lastMessageUser(lastMessage.getSenderId().equals(chat.getSenderId()) ? chat.getSenderName() : chat.getRecipientName())
                .build();
    }
}
