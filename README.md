# simple-rsa-chat-room

🦩🦩🦩 RSA暗号を使用して暗号化されたチャットを行うことができるWEBサイトです。  
送信時には公開鍵を使用して暗号化し、受信時には秘密鍵を使用して復号化します。  

![成果物](./docs/img/fruit.gif)  

## 使用技術

- Docker
- .NET
  - C# (ASP.NET / Minimal API)
- Next.js
  - TypeScript
  - React

## 実行方法

```shell
docker build -t simple-rsa-chat-room .
docker run -it -p 8000:8000 --name simple-rsa-chat-room simple-rsa-chat-room
```
