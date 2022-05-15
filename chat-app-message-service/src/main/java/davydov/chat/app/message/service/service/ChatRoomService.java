package davydov.chat.app.message.service.service;

import davydov.chat.app.message.service.dto.ChatDTO;
import davydov.chat.app.message.service.model.ChatRoom;

import java.util.List;

public interface ChatRoomService {
    List<ChatRoom> getOrCreateChatRooms(String senderId, String recipientId);
    List<ChatDTO> getChats(String id);
    ChatDTO getOrCreateChat(String senderId, String recipientId);
}
