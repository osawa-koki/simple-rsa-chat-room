import React from "react";
import Layout from "../components/Layout";

export default function AboutPage() {
  return (
    <Layout>
      <div id="About">
        <h1>simple-rsa-chat-room</h1>
        <p className="mt-3">
          RSA暗号を用いたチャットアプリです。<br />
          メッセージは公開鍵を用いて暗号化されて送信され、秘密鍵を有している受信者のみが復号化できます。
        </p>
      </div>
    </Layout>
  );
};
