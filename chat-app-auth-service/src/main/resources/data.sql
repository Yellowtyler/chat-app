insert into roles values (1, 'ROLE_USER');

INSERT
INTO
  users
  (id, username, password, mail, creation_date, is_active)
VALUES
  ('22edbda3-65ba-45a4-858d-695a6c126c02', 'Alice', '$2a$10$MlIqZrPx8gEsAHe8ydawies4sZU4X3KmLWcc0BNtjng5.27XRUX9K', 'alice@mail.com', NOW(), TRUE);

INSERT
INTO
  users
  (id, username, password, mail, creation_date, is_active)
VALUES
  ('f64f29f3-e57d-45e4-857e-f53437eb79d4', 'Bob', '$2a$10$/SLHDNCXpw6yqyzKfsGd4eqkwXHDz8jx/wURsRX9yHkWWQUglcMTy', 'bob@mail.com', NOW(), TRUE);

INSERT
INTO
  users_roles
  (role_id, user_id)
VALUES
  (1, '22edbda3-65ba-45a4-858d-695a6c126c02');

INSERT
INTO
  users_roles
  (role_id, user_id)
VALUES
  (1, 'f64f29f3-e57d-45e4-857e-f53437eb79d4');