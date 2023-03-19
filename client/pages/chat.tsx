import React, { useContext, useEffect, useState } from "react";

import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";

import { Button, Alert, Form, Table } from 'react-bootstrap';
import Layout from "../components/Layout";

import { DataContext } from "../src/DataContext";
import setting from "../setting";
import encrypt from "../util/fn.encrypt";
import decrypt from "../util/fn.decrypt";

type Message = {
  user: string;
  message: string;
};

export default function ChatPage() {

  const [connection, setConnection] = useState<HubConnection | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [ready, setReady] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSendMessage = () => {
    setError(null);
    const user = sharedData.username;
    const message = sharedData.message;
    connection!.invoke("SendMessage", user, encrypt([sharedData.public_n, sharedData.public_e], message)).catch((err: Error) => {
      setError(`${err}`);
    });
  };

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl(`${setting.apiPath}/chatHub`)
      .build();
    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          setReady(true);
        })
        .catch((err: Error) => {
          setError(`${err}`);
        });
    }
  }, [connection]);

  useEffect(() => {
    if (connection) {
      connection.on("ReceiveMessage", (user: string, message: string) => {
        const new_messages = [{user, message}, ...messages];
        setMessages(new_messages);
      });
    }
  }, [connection, messages]);

  const { sharedData, setSharedData } = useContext(DataContext);

  return (
    <Layout>
      <div id="Chat">
        <h1>Chat</h1>
        <Table striped bordered hover>
          <thead className="text-center">
            <tr>
              <th colSpan={2}>公開鍵 (送信するメッセージの暗号化用)</th>
              <th colSpan={2}>秘密鍵 (受信したメッセージの復号用)</th>
            </tr>
            <tr>
              <th>n</th>
              <th>e</th>
              <th>n</th>
              <th>d</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><Form.Control type="number" value={sharedData.public_n} onInput={(e) => {setSharedData({
                ...sharedData,
                public_n: parseInt(e.currentTarget.value),
              })}} /></td>
              <td><Form.Control type="number" value={sharedData.public_e} onInput={(e) => {setSharedData({
                ...sharedData,
                public_e: parseInt(e.currentTarget.value),
              })}} /></td>
              <td><Form.Control type="number" value={sharedData.private_n} onInput={(e) => {setSharedData({
                ...sharedData,
                private_n: parseInt(e.currentTarget.value),
              })}} /></td>
              <td><Form.Control type="number" value={sharedData.private_d} onInput={(e) => {setSharedData({
                ...sharedData,
                private_d: parseInt(e.currentTarget.value),
              })}} /></td>
            </tr>
          </tbody>
        </Table>
        <Form>
          <Form.Group className="mt-3">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Enter username" value={sharedData.username} onInput={
              (e: React.FormEvent<HTMLInputElement>) => {
                setSharedData({ ...sharedData, username: e.currentTarget.value });
              }
            } />
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label>Message</Form.Label>
            <Form.Control as="textarea" rows={5} value={sharedData.message} onInput={
              (e: React.FormEvent<HTMLTextAreaElement>) => {
                setSharedData({ ...sharedData, message: e.currentTarget.value });
              }
            } />
          </Form.Group>
          <Button variant="primary" className="mt-3 d-block m-auto" onClick={handleSendMessage} disabled={ready === false}>Send 📨</Button>
        </Form>
        <hr />
        {
          error && (
            <Alert variant="danger">
              {error}
            </Alert>
          )
        }
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>送信者</th>
              <th>メッセージ</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((message, idx) => (
              <tr key={idx}>
                <td>{message.user}</td>
                <td>{decrypt([sharedData.private_n, sharedData.private_d], message.message)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Layout>
  );
};
