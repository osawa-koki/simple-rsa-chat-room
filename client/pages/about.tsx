import React from "react";
import Layout from "../components/Layout";

export default function AboutPage() {
  return (
    <Layout>
      <div id="About">
        <h1>SignalR × Next.js</h1>
        <p className="mt-3">
          サーバサイドはSignalR(C#)を使用してPRCによるWebSocket通信で実装し、<br />
          クライアントサイドはNext.jsによるSSGを使用しています。<br />
          <br />
          Let&apos;s try SignalR × Next.js!
        </p>
      </div>
    </Layout>
  );
};
