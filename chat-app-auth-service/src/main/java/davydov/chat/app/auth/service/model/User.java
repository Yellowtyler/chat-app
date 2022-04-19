package davydov.chat.app.auth.service.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "users")
public class User {

    @GeneratedValue
    @Id
    private Long id;

    @Column(unique = true)
    private String username;

    private String password;

    private String mail;

    @ManyToMany
    @JoinTable(name = "users_roles",
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id")
    )
    private Collection<Role> roles;

    private LocalDateTime creationDate;

    private boolean isActive;


    public User(User user) {
        this.id = user.id;
        this.username = user.username;
        this.password = user.password;
        this.mail = user.mail;
        this.creationDate = user.creationDate;
        this.isActive = user.isActive;
        this.roles = user.roles;
    }

    public User(String username, String password, String mail, Role role) {
        this.username = username;
        this.password = password;
        this.mail = mail;
        this.creationDate = LocalDateTime.now();
        this.roles = Set.of(role);
        isActive = true;
    }

    public User() {
    }

}
