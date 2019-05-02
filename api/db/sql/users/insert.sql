INSERT INTO
	users
	(email, username, password, uuid)
VALUES
	(${email}, ${username}, ${password}, gen_random_uuid())
RETURNING
	id, uuid, username;