package davydov.chat.app.message.service.service;

import davydov.chat.app.message.service.dto.CreateChatRequest;
import davydov.chat.app.message.service.dto.ChatResponse;
import davydov.chat.app.message.service.model.Chat;

import java.util.List;

public interface ChatService {
    List<Chat> getChats(String senderId, String recipientId);
    List<ChatResponse> getAllChats(String id);
    ChatResponse createChat(CreateChatRequest request);
}
