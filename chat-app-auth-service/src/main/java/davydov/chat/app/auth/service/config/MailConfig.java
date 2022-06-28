package davydov.chat.app.auth.service.config;

import davydov.chat.app.auth.service.property.MailProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import java.util.Properties;

@Configuration
public class MailConfig {
    @Bean
    public JavaMailSender javaMailSender(MailProperty mailProperty) {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost(mailProperty.getHost());
        mailSender.setPort(mailProperty.getPort());
        mailSender.setUsername(mailProperty.getUsername());
        mailSender.setPassword(mailProperty.getPassword());

        Properties props = mailSender.getJavaMailProperties();
        props.put("mail.transport.protocol", mailProperty.getProtocol());
        props.put("mail.smtp.auth", mailProperty.isAuth());
        props.put("mail.smtp.starttls.enable", mailProperty.isTls());
        props.put("mail.debug", mailProperty.isDebug());

        return mailSender;
    }
}
