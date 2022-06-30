INSERT
INTO
  chats
  (id, chat_id, sender_id, recipient_id, sender_name, recipient_name)
VALUES
  ('ad873b2b-5001-4600-a0b5-5622c3050649', 'ad873b2b-5001-4600-a0b5-5622c3050649', '22edbda3-65ba-45a4-858d-695a6c126c02', 'f64f29f3-e57d-45e4-857e-f53437eb79d4', 'Alice', 'Bob');

INSERT
INTO
  chats
  (id, chat_id, sender_id, recipient_id, sender_name, recipient_name)
VALUES
  ('ad873b2b-5001-4600-a0b5-5622c3050650', 'ad873b2b-5001-4600-a0b5-5622c3050649', 'f64f29f3-e57d-45e4-857e-f53437eb79d4', '22edbda3-65ba-45a4-858d-695a6c126c02', 'Bob', 'Alice');

INSERT
INTO
  messages
  (id, sender_id, recipient_id, content, creation_date, message_status)
VALUES
  ('ad873b2b-5001-4600-a0b5-5622c3050649', '22edbda3-65ba-45a4-858d-695a6c126c02', 'f64f29f3-e57d-45e4-857e-f53437eb79d4', 'Hi!', '2022-05-14 16:39:25.44', 'DELIVERED');


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