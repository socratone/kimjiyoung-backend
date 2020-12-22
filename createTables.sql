CREATE DATABASE kimjiyoung;
USE kimjiyoung;

CREATE TABLE user ( 
    id int NOT NULL AUTO_INCREMENT, 
    email varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    name varchar(255) NOT NULL,
	account varchar(255),
    UNIQUE (id),
    UNIQUE (email),
    PRIMARY KEY (id)
);

CREATE TABLE item (
	id int NOT NULL AUTO_INCREMENT, 
    title varchar(255) NOT NULL,
    description varchar(5100),
    price int,
    category_id int NOT NULL,
    main_image varchar(255) NOT NULL,
    sub_images varchar(510),
    smart_store varchar(2550),
    item_order int NOT NULL,
    created_at DATETIME NOT NULL, 
    UNIQUE (id),
    PRIMARY KEY (id)
);

CREATE TABLE category (
	id int NOT NULL, 
    name varchar(255) NOT NULL,
    UNIQUE (id),
    UNIQUE (name),
    PRIMARY KEY (id)
);

CREATE TABLE profile (
	id int NOT NULL AUTO_INCREMENT,
    sort varchar(255) NOT NULL,
    image varchar(255) NOT NULL,
    word varchar(510),
    UNIQUE (id),
    UNIQUE (image),
    PRIMARY KEY (id)
);

-- 테이블에 먼저 들어가야 할 값들

INSERT INTO category (id, name) VALUES (1, 'statue');
INSERT INTO category (id, name) VALUES (2, 'cross');
INSERT INTO category (id, name) VALUES (3, 'tools');

INSERT INTO profile (sort, image) VALUES ('main', 'first-item.png');
INSERT INTO profile (sort, image) VALUES ('main', 'second-item.png');
INSERT INTO profile (sort, image) VALUES ('main', 'third-item.png');