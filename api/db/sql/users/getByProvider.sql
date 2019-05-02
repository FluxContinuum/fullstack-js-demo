SELECT users.id, username, email, password FROM users
INNER JOIN user_identities ON users.id = user_identities.user_id
WHERE provider_id = ${providerId} AND provider = ${provider};