package davydov.chat.app.message.service.contoller;

import davydov.chat.app.message.service.model.Message;
import davydov.chat.app.message.service.model.MessageNotification;
import davydov.chat.app.message.service.model.MessageStatus;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.messaging.converter.MappingJackson2MessageConverter;
import org.springframework.messaging.converter.StringMessageConverter;
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
import java.util.Date;
import java.util.List;
import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.BlockingQueue;

import static java.util.concurrent.TimeUnit.SECONDS;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class ChatControllerTest {

    @LocalServerPort
    private Integer port;
    private WebSocketStompClient webSocketStompClient;

    @BeforeEach
    public void setup() {
        this.webSocketStompClient = new WebSocketStompClient(new SockJsClient(
                List.of(new WebSocketTransport(new StandardWebSocketClient()))));
    }

    @Test
    public void verifyMessageIsReceived() throws Exception {

        BlockingQueue<String> blockingQueue = new ArrayBlockingQueue(1);

        webSocketStompClient.setMessageConverter(new MappingJackson2MessageConverter());

        StompSession session = webSocketStompClient
                .connect(String.format("ws://localhost:%d/ws", port), new StompSessionHandlerAdapter() {})
                .get();

        session.subscribe("/queue/messages", new StompFrameHandler() {


            @Override
            public Type getPayloadType(StompHeaders headers) {

                return String.class;
            }

            @Override
            public void handleFrame(StompHeaders headers, Object payload) {
                System.out.println("Received message: " + payload);
                blockingQueue.add((String) payload);
            }
        });

        var message = Message.builder()
                .messageStatus(MessageStatus.DELIVERED)
                .chatId("1")
                .content("hi")
                .recipientId("1")
                .senderId("2")
                .creationDate(LocalDateTime.now())
                .build();

        session.send("/app/chat", message);

        assertEquals("Hello, Mike!", blockingQueue.poll());
    }
}