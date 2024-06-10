CREATE TABLE users (
	user_id SERIAL PRIMARY KEY,
	user_avatar BYTEA,
	username VARCHAR(225) NOT NULL,
	description VARCHAR(225) NOT NULL,
	email VARCHAR(225) NOT NULL,
	passwords VARCHAR(225) NOT NULL,
	created_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE posts (
    post_id SERIAL PRIMARY KEY,
	post_content VARCHAR(225),
	post_image BYTEA,
	like_count INT DEFAULT 0,
	comment_count INT DEFAULT 0,
	repost_count INT DEFAULT 0,
	repost_id INT DEFAULT 0,
	created_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE post_like (
	like_id SERIAL PRIMARY KEY,
	created_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	status BOOLEAN,
	user_id INT,
	post_id INT,
	FOREIGN KEY (user_id) REFERENCES users(user_id),
	FOREIGN KEY (post_id) REFERENCES posts(post_id)
);

CREATE TABLE post_comment (
	comment_id SERIAL PRIMARY KEY,
	comment_content VARCHAR(225),
	created_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	user_id INT,
	post_id INT,
	FOREIGN KEY (user_id) REFERENCES users(user_id),
	FOREIGN KEY (post_id) REFERENCES posts(post_id)
);