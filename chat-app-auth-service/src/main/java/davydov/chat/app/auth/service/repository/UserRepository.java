package davydov.chat.app.auth.service.repository;

import davydov.chat.app.auth.service.model.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {

    Optional<User> findByUsername(String username);

    @Query("select u from User u where u.username like ?1%")
    List<User> findByUsernameIsLike(String username);
}
