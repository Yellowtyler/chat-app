INSERT
INTO
  chats
  (id, chat_id, sender_id, recipient_id, sender_name, recipient_name)
VALUES
  ('ad873b2b-5001-4600-a0b5-5622c3050649', 'ad873b2b-5001-4600-a0b5-5622c3050649', '1', '2', 'Alice', 'Bob');

INSERT
INTO
  chats
  (id, chat_id, sender_id, recipient_id, sender_name, recipient_name)
VALUES
  ('ad873b2b-5001-4600-a0b5-5622c3050650', 'ad873b2b-5001-4600-a0b5-5622c3050649', '2', '1', 'Bob', 'Alice');

INSERT
INTO
  messages
  (id, sender_id, recipient_id, content, creation_date, message_status)
VALUES
  ('ad873b2b-5001-4600-a0b5-5622c3050649', '1', '2', 'Hi!', '2022-05-14 16:39:25.44', 'DELIVERED');


INSERT
INTO
  messages_chats
  (chats_id, messages_id)
VALUES
  ('ad873b2b-5001-4600-a0b5-5622c3050649', 'ad873b2b-5001-4600-a0b5-5622c3050649');

INSERT
INTO
  messages_chats
  (chats_id, messages_id)
VALUES
  ('ad873b2b-5001-4600-a0b5-5622c3050650', 'ad873b2b-5001-4600-a0b5-5622c3050649');