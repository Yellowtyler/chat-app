package davydov.chat.app.message.service.contoller;

import davydov.chat.app.message.service.model.Message;
import davydov.chat.app.message.service.model.MessageStatus;
import davydov.chat.app.message.service.service.MessageService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.messaging.converter.MappingJackson2MessageConverter;
import org.springframework.messaging.simp.stomp.StompFrameHandler;
import org.springframework.messaging.simp.stomp.StompHeaders;
import org.springframework.messaging.simp.stomp.StompSession;
import org.springframework.messaging.simp.stomp.StompSessionHandlerAdapter;
import org.springframework.web.socket.client.standard.StandardWebSocketClient;
import org.springframework.web.socket.messaging.WebSocketStompClient;
import org.springframework.web.socket.sockjs.client.SockJsClient;
import org.springframework.web.socket.sockjs.client.WebSocketTransport;

import java.lang.reflect.Type;
import java.time.LocalDateTime;
import java.util.List;
import java.util.concurrent.CompletableFuture;

import static java.util.concurrent.TimeUnit.SECONDS;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT, properties = "spring.profiles.active=test")
class ChatControllerTest {

    @LocalServerPort
    private Integer port;
    private WebSocketStompClient webSocketStompClient;
    private CompletableFuture<Message> completableFuture;

    @MockBean
    private MessageService messageService;

    @BeforeEach
    public void setup() {
        completableFuture = new CompletableFuture<>();
        this.webSocketStompClient = new WebSocketStompClient(new SockJsClient(
                List.of(new WebSocketTransport(new StandardWebSocketClient()))));
    }

    @Test
    public void verifyMessageIsReceived() throws Exception {
        Long id = 1L;

        webSocketStompClient.setMessageConverter(new MappingJackson2MessageConverter());

        StompSession session = webSocketStompClient
                .connect(String.format("ws://localhost:%d/ws", port), new StompSessionHandlerAdapter() {})
                .get(1, SECONDS);

        session.subscribe("/user/" + id + "/queue/messages", new StompFrameHandler() {

            @Override
            public Type getPayloadType(StompHeaders headers) {

                return Message.class;
            }

            @Override
            public void handleFrame(StompHeaders headers, Object payload) {
                completableFuture.complete((Message ) payload);
            }
        });

        var message = Message.builder()
                .messageStatus(MessageStatus.DELIVERED)
                .id(id)
                .chatId("1")
                .content("hi")
                .recipientId("1")
                .senderId("2")
                .creationDate(LocalDateTime.now())
                .build();

        session.send("/app/chat", message);

        var actual = completableFuture.get();
        Assertions.assertNotNull(actual);
    }
}