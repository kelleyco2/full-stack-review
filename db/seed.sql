create table users (
    id serial primary key,
    name varchar,
    email varchar,
    password varchar
);

create table posts (
    id serial primary key,
    user_id integer references users,
    title varchar,
    content text
);