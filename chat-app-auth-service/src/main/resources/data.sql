insert into roles values (1, 'ROLE_USER');

INSERT
INTO
  users
  (id, username, password, mail, creation_date, is_active)
VALUES
  (1, 'Alice', '$2a$10$MlIqZrPx8gEsAHe8ydawies4sZU4X3KmLWcc0BNtjng5.27XRUX9K', 'alice@mail.com', NOW(), TRUE);

INSERT
INTO
  users
  (id, username, password, mail, creation_date, is_active)
VALUES
  (2, 'Bob', '$2a$10$/SLHDNCXpw6yqyzKfsGd4eqkwXHDz8jx/wURsRX9yHkWWQUglcMTy', 'bob@mail.com', NOW(), TRUE);

INSERT
INTO
  users_roles
  (role_id, user_id)
VALUES
  (1, 1);

INSERT
INTO
  users_roles
  (role_id, user_id)
VALUES
  (1, 2);