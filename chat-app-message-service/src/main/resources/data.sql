INSERT
INTO
  chats
  (id, chat_room_id, sender_id, recipient_id)
VALUES
  (1, 'ad873b2b-5001-4600-a0b5-5622c3050649', '1', '2');

INSERT
INTO
  chats
  (id, chat_room_id, sender_id, recipient_id)
VALUES
  (2, 'ad873b2b-5001-4600-a0b5-5622c3050649', '2', '1');

INSERT
INTO
  messages
  (id, sender_id, recipient_id, content, creation_date, message_status, sender_name, recipient_name)
VALUES
  (1, '1', '2', 'Hi!', '2022-05-14 16:39:25.44', 'DELIVERED', 'Alice', 'Bob');


INSERT
INTO
  messages_chat_rooms
  (chat_rooms_id, messages_id)
VALUES
  (1, 1);

INSERT
INTO
  messages_chat_rooms
  (chat_rooms_id, messages_id)
VALUES
  (2, 1);