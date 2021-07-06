const express = require('express');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const morgan = require('morgan');
const cors = require('cors');
const { recoverPersonalSignature } = require('eth-sig-util');
const { bufferToHex } = require('ethereumjs-util');

dotenv.config();

const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

const { PORT, JWT_SECRET_KEY } = process.env;

app.get('/api/token', (req, res) => {
  let nonce = Math.floor(Math.random() * 1000000).toString();
  // in a real life scenario we would random this after each login and fetch it from the db as well
  return res.send(nonce);
});

app.post('/api/auth', async (req, res) => {
  try {
    const {
      signature: { signature, address },
      nonce,
    } = req.body;
    let recoveredAddress = 'the_address_recovered_from_the_signature';
    if (!signature || !address)
      return res.status(400).send({ error: 'Request should have signature and publicAddress' });
    const msg = `Logging in using nonce: ${nonce}`;

    // We now are in possession of msg, address and signature.
    const msgBufferHex = bufferToHex(Buffer.from(msg, 'utf8'));
    recoveredAddress = recoverPersonalSignature({
      data: msgBufferHex,
      sig: signature,
    });

    // The signature verification is successful if the address found with
    // sigUtil.recoverPersonalSignature matches the initial publicAddress
    if (recoveredAddress.toLowerCase() !== address.toLowerCase()) {
      res.status(401).send({
        error: 'Signature verification failed',
      });
      return null;
    }

    let token = jwt.sign({ address }, JWT_SECRET_KEY);
    res.status(200).json(token);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
