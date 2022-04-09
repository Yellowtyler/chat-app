package davydov.chat.app.auth.service.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "users")
public class User {

    @GeneratedValue
    @Id
    private Long id;

    @Column(unique = true)
    private String username;

    @JsonIgnore
    private String password;

    private String mail;

    private LocalDateTime creationDate;

    private boolean isActive;


    public User(User user) {
        this.id = user.id;
        this.username = user.username;
        this.password = user.password;
        this.mail = user.mail;
        this.creationDate = user.creationDate;
        this.isActive = user.isActive;
    }

    public User(String username, String password, String mail) {
        this.username = username;
        this.password = password;
        this.mail = mail;
        this.creationDate = LocalDateTime.now();
        isActive = true;
    }

    public User() {
    }

}
