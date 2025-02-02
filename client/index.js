const axios = require("axios");
const niceList = require("../utils/niceList.json");
const MerkleTree = require("../utils/MerkleTree");

const serverUrl = "http://localhost:1225";

const merkleTree = new MerkleTree(niceList);
console.log(merkleTree.getRoot());

async function main() {
  if (process.argv.length < 3) {
    console.error(
      "please enter the name \nExample : node client/index 'Doreen Smith'"
    );
    return;
  }
  // Get the name form command line 
  const name = process.argv[2];

  // find name index in nice list 
  const index = niceList.findIndex((elem, index) => elem === name);

  // get proof tree of name 
  const proof = merkleTree.getProof(index);
  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    // add request params 
    name,
    proof
  });

  console.log({ gift });
}

main();
