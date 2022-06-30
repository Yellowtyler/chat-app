package davydov.chat.app.auth.service.service;

import davydov.chat.app.auth.service.model.User;

public interface MailService {
    void sendSimpleMessage(User to);
}
