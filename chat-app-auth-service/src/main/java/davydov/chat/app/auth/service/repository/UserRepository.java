package davydov.chat.app.auth.service.repository;

import davydov.chat.app.auth.service.model.User;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends CrudRepository<User, UUID> {

    Optional<User> findByUsername(String username);

    @Query("select u from User u where u.username like %?1%")
    List<User> findByUsernameIsLike(String username);

    @Transactional
    @Modifying
    @Query("update User u set u.isActive=:status where id=:id")
    void setIsActive(@Param("id") UUID id, @Param("status") boolean status);

    Optional<User> findByMail(String mail);

    @Transactional
    @Modifying
    @Query("update User u set u.password=?1 where u.username=?2")
    void updatePassword(String password, String username);
}
