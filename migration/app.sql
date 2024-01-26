CREATE TABLE users (
	user_id INT NOT NULL PRIMARY KEY,
	user_avatar BYTEA,
	username VARCHAR(225) NOT NULL,
	description VARCHAR(225) NOT NULL,
	email VARCHAR(225) NOT NULL,
	passwords VARCHAR(225) NOT NULL
);

CREATE TABLE posts (
    post_id INT NOT NULL PRIMARY KEY,
	user_id INT NOT NULL,
	created_date DATE NOT NULL,
	like_count INT NOT NULL,
	comment_count INT NOT NULL,
	repost_count INT NOT NULL,
	repost_id INT,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE post_like (
	like_id INT PRIMARY KEY,
	user_id INT,
	post_id INT,
	FOREIGN KEY (user_id) REFERENCES users(user_id),
	FOREIGN KEY (post_id) REFERENCES posts(post_id)
);

CREATE TABLE post_comment (
	comment_id INT PRIMARY KEY,
	comment_content VARCHAR(225),
	user_id INT,
	post_id INT,
	FOREIGN KEY (user_id) REFERENCES users(user_id),
	FOREIGN KEY (post_id) REFERENCES posts(post_id)
);