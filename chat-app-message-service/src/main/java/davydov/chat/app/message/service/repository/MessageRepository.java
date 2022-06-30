package davydov.chat.app.message.service.repository;

import davydov.chat.app.message.service.model.Message;
import davydov.chat.app.message.service.model.MessageStatus;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Repository
public interface MessageRepository extends CrudRepository<Message, UUID> {

    @Transactional
    @Modifying
    @Query("update Message m set m.messageStatus=:status where sender_id=:sender_id and recipient_id=:recipient_id")
    void updateStatus(@Param("status") MessageStatus status, @Param("sender_id") String senderId, @Param("recipient_id") String recipientId);

    Long countBySenderIdAndRecipientIdAndMessageStatus(String senderId, String recipientId, MessageStatus messageStatus);

    @Query("select m from Message m where m.content like %?1%")
    List<Message> findLikeValue(String value);
}
