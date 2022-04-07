package davydov.chat.app.auth.service.service.impl;

import davydov.chat.app.auth.service.model.ChatUserDetails;
import davydov.chat.app.auth.service.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserDetailsService implements org.springframework.security.core.userdetails.UserDetailsService {

    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username)
                .map(ChatUserDetails::new)
                .orElseThrow(() -> new UsernameNotFoundException(String.format("User with %s username not found", username)));
    }
}
