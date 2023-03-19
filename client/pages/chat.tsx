import React, { useEffect, useState } from "react";

import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";

import { Button, Alert, Form } from 'react-bootstrap';
import Layout from "../components/Layout";

import { DataContext } from "../src/DataContext";
import setting from "../setting";

export default function ChatPage() {

  const [connection, setConnection] = useState<HubConnection | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [ready, setReady] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSendMessage = () => {
    setError(null);
    const user = sharedData.username;
    const message = sharedData.message;
    connection!.invoke("SendMessage", user, message).catch((err: Error) => {
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
        setMessages([`${user}: ${message}`, ...messages]);
      });
    }
  }, [connection, messages]);

  const { sharedData, setSharedData } = React.useContext(DataContext);

  return (
    <Layout>
      <div id="Chat">
        <h1>Chat</h1>
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
        <ul>
          {messages.map((msg, idx) => (
            <li key={idx}>{msg}</li>
          ))}
        </ul>
      </div>
    </Layout>
  );
};
