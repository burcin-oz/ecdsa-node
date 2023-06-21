const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "027dbbce79aefa32c6dff905521d83029de51ee3c9e187ce9cf2f6d268adf73386": 100, // dan
  // fd9db4a1c23db761aca6d9eb8fa7e9ef690bd0ec1b1d6c20838d40da3e32799f
  "03745be684da0bce3551da8909739d2318b214cd3db73ddb624a0ecedf03fcaf74": 50, // al
  // 3c0009e5439737199755de974ac5356254c109fef096f49a7a20c841032ed521
  "0303b50d1e7bbf4cc50addeaa403ebae01ef7d7429054371708113c36bbda46741": 75, // ben
  // df50fbde0417bfca24eff3526533d6752b28e3f132009444a59a310e11a76040
};

app.get("/balance/:address", (req, res) => {
  //TODO: get a signature from the client-side application 
  // recover the public address from the signature
  

  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
