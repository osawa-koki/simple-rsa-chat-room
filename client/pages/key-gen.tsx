import React, { useContext, useState } from "react";
import { Alert, Button, Form, Table } from "react-bootstrap";
import Layout from "../components/Layout";
import setting from "../setting";
import { DataContext } from "../src/DataContext";
import { KeySets } from "../src/SharedData";
import getPrivateKey from "../util/fn.getPrivateKey";
import getPublicKey from "../util/fn.getPublicKey";
import isPrime from "../util/fn.isPrime";
import { prime1 as p1, prime2 as p2 } from "./_app";

export default function KeyGenPage() {

  const { sharedData, setSharedData } = useContext(DataContext);

  const [prime1, setPrime1] = useState(p1);
  const [prime2, setPrime2] = useState(p2);

  const GenerateKey = () => {
    const publicKey = getPublicKey(prime1, prime2);
    const privateKey = getPrivateKey(prime1, prime2, publicKey);
    const [public_n, public_e] = publicKey;
    const [private_n, private_d] = privateKey;
    const new_key_sets = [{
      public_n,
      public_e,
      private_n,
      private_d,
    } as KeySets, ...sharedData.key_sets] as KeySets[];
    setSharedData({
      ...sharedData,
      public_n,
      public_e,
      private_n,
      private_d,
      key_sets: new_key_sets,
    });
  };

  return (
    <Layout>
      <div id='KeyGen'>
        <Form className="d-flex">
          <Form.Group className="w-50">
            <Form.Label>素数1</Form.Label>
            <Form.Control type="number" placeholder="Enter prime1" value={prime1} onInput={(e) => {setPrime1(parseInt(e.currentTarget.value))}} />
          </Form.Group>
          <Form.Group className="w-50">
            <Form.Label>素数2</Form.Label>
            <Form.Control type="number" placeholder="Enter prime2" value={prime2} onInput={(e) => {setPrime2(parseInt(e.currentTarget.value))}} />
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
        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th colSpan={2} className="w-50">公開鍵</th>
              <th colSpan={2} className="w-50">秘密鍵</th>
            </tr>
            <tr>
              <th className="w-25">n</th>
              <th className="w-25">e</th>
              <th className="w-25">n</th>
              <th className="w-25">d</th>
            </tr>
          </thead>
          <tbody>
            {
              sharedData.key_sets.map((key_set, i) => {
                return (
                  <tr key={i}>
                    <td>{key_set.public_n}</td>
                    <td>{key_set.public_e}</td>
                    <td>{key_set.private_n}</td>
                    <td>{key_set.private_d}</td>
                  </tr>
                );
              })
            }
          </tbody>
        </Table>
      </div>
    </Layout>
  );
};
