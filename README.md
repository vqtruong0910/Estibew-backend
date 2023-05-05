# Estibew-backend

Example env:
NODE_ENV=development
SERVER_PORT=5000
DATABASE_NAME=Shop_game
DATABASE_PASSWORD=
DATABASE_USER=postgres

Cách cài đặt:  
Tạo file .env như ví dụ trên  
Chạy lệnh sau để migrate database về máy(với điều kiện đã cài NodeJs, npm và postgres 15 trong máy)  
> npm i  
> npx knex migrate:latest  
> npx knex seed:run  
> npm start
