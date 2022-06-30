package davydov.chat.app.message.service.contoller;

import davydov.chat.app.message.service.model.Chat;
import davydov.chat.app.message.service.model.Message;
import davydov.chat.app.message.service.model.MessageStatus;
import davydov.chat.app.message.service.service.ChatService;
import davydov.chat.app.message.service.service.MessageService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.messaging.converter.MappingJackson2MessageConverter;
import org.springframework.messaging.simp.stomp.StompFrameHandler;
import org.springframework.messaging.simp.stomp.StompHeaders;
import org.springframework.messaging.simp.stomp.StompSession;
import org.springframework.messaging.simp.stomp.StompSessionHandlerAdapter;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;
import org.springframework.web.socket.client.standard.StandardWebSocketClient;
import org.springframework.web.socket.messaging.WebSocketStompClient;
import org.springframework.web.socket.sockjs.client.SockJsClient;
import org.springframework.web.socket.sockjs.client.WebSocketTransport;

import java.lang.reflect.Type;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;

import static java.util.concurrent.TimeUnit.SECONDS;
import static org.mockito.ArgumentMatchers.any;


//TODO: redo test
//@ActiveProfiles("test")
@TestPropertySource(properties = {
        "spring.datasource.initializationMode=never",
        "spring.jpa.defer-datasource-initialization=false",
})
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class ChatControllerTest {

    @LocalServerPort
    private Integer port;
    private WebSocketStompClient webSocketStompClient;
    private CompletableFuture<Message> completableFuture;

    @MockBean
    private MessageService messageService;

    @MockBean
    private ChatService chatService;

    @BeforeEach
    public void setup() {
        completableFuture = new CompletableFuture<>();
        this.webSocketStompClient = new WebSocketStompClient(new SockJsClient(
                List.of(new WebSocketTransport(new StandardWebSocketClient()))));
    }

    @Test
    public void verifyMessageIsReceived() throws Exception {
        UUID id = UUID.randomUUID();
        webSocketStompClient.setMessageConverter(new MappingJackson2MessageConverter());
        StompSession session = webSocketStompClient
                .connect(String.format("ws://localhost:%d/ws", port), new StompSessionHandlerAdapter() {})
                .get(1, SECONDS);

        session.subscribe("/user/" + "22edbda3-65ba-45a4-858d-695a6c126c02" + "/queue/messages", new StompFrameHandler() {

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
                .content("hi")
                .recipientId("22edbda3-65ba-45a4-858d-695a6c126c02")
                .senderId("f64f29f3-e57d-45e4-857e-f53437eb79d4")
                .creationDate(LocalDateTime.now())
                .build();

        Mockito.when(chatService.getChats(any(), any())).thenReturn(List.of(new Chat(), new Chat()));

        session.send("/app/chat", message);

        var actual = completableFuture.get();
        Assertions.assertNotNull(actual);
    }
}