INSERT INTO
	user_identities
	(user_id, provider_id, provider)
VALUES
	(${userId}, ${providerId}, ${provider})
RETURNING
	id;