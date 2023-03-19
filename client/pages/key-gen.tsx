import React, { useContext, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import Layout from "../components/Layout";
import setting from "../setting";
import { DataContext } from "../src/DataContext";
import getPrivateKey from "../util/fn.getPrivateKey";
import getPublicKey from "../util/fn.getPublicKey";
import isPrime from "../util/fn.isPrime";
import { prime1 as p1, prime2 as p2 } from "./_app";

export default function KeyGenPage() {

  const { sharedData, setSharedData } = useContext(DataContext);

  const [prime1, setPrime1] = useState(p1);
  const [prime2, setPrime2] = useState(p2);
  const [show, setShow] = useState(false);
  const [isSet, setIsSet] = useState(false);


  const GenerateKey = () => {
    setShow(true);
  };

  return (
    <Layout>
      <div id='KeyGen'>
        <Form className="d-flex">
          <Form.Group className="w-50">
            <Form.Label>素数1</Form.Label>
            <Form.Control type="number" placeholder="Enter prime1" value={prime1} onInput={(e) => {setShow(false); setPrime1(parseInt(e.currentTarget.value));}} />
          </Form.Group>
          <Form.Group className="w-50">
            <Form.Label>素数2</Form.Label>
            <Form.Control type="number" placeholder="Enter prime2" value={prime2} onInput={(e) => {setShow(false); setPrime2(parseInt(e.currentTarget.value));}} />
          </Form.Group>
        </Form>
        {
          isPrime(prime1) === false ? (
            <Alert variant="danger" className="mt-3">
              素数1({prime1})が素数ではありません。
            </Alert>
          ) : isPrime(prime2) === false ? (
            <Alert variant="danger" className="mt-3">
              素数2({prime2})が素数ではありません。
            </Alert>
          ) : prime1 < 10 ? (
            <Alert variant="danger" className="mt-3">
              素数1({prime1})が10未満です。
            </Alert>
          ) : prime2 < 10 ? (
            <Alert variant="danger" className="mt-3">
              素数2({prime2})が10未満です。
            </Alert>
          ) : prime1 === prime2 ? (
            <Alert variant="danger" className="mt-3">
              素数1({prime1})と素数2({prime2})が同じです。
            </Alert>
          ) : (
            <Button variant="primary" className="mt-3 d-block m-auto" onClick={GenerateKey}>鍵を生成</Button>
          )
        }
        {
          show && (
            <>
              <hr />
              <Alert variant="info" className="mt-3">
                <Alert.Heading>公開鍵</Alert.Heading>
                <p>
                  n = {getPublicKey(prime1, prime2)[0]}<br />
                  e = {getPublicKey(prime1, prime2)[1]}
                </p>
              </Alert>
              <Alert variant="info" className="mt-3">
                <Alert.Heading>秘密鍵</Alert.Heading>
                <p>
                  n = {getPrivateKey(prime1, prime2, getPublicKey(prime1, prime2))[0]}<br />
                  d = {getPrivateKey(prime1, prime2, getPublicKey(prime1, prime2))[1]}
                </p>
              </Alert>
              <Button variant="warning" className="mt-3 d-block m-auto" onClick={async () => {
                setSharedData({
                  username: sharedData.username,
                  message: sharedData.message,
                  n: getPublicKey(prime1, prime2)[0],
                  e: getPublicKey(prime1, prime2)[1],
                  d: getPrivateKey(prime1, prime2, getPublicKey(prime1, prime2))[1]
                });
                setIsSet(true);
                await new Promise((resolve) => setTimeout(resolve, setting.waitingTime));
                setIsSet(false);
              }}>{ isSet ? 'OK !!!' : '鍵を設定' }</Button>
            </>
          )
        }
      </div>
    </Layout>
  );
};
