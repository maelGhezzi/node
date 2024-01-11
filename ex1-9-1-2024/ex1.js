import fetch from "node-fetch";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const fs = require("fs");
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

const json = JSON.parse(fs.readFileSync("config.json"));
const token = json.token;

const salvaDati = (dict, key) => {
  fetch("https://ws.progettimolinari.it/cache/set", {
    method: "Post",
    headers: {
      "content-type": "application/json",
      key: token
    },
    body: JSON.stringify({
      key: key,
      value: JSON.stringify(dict),
    }),
  })
    .then((element) => element.json())
    .then((element) => console.log(element))
    .catch((error) => console.error(error));
};

const recuperaDati = (chiave) => {
  return new Promise((resolve, reject) => {
    fetch("https://ws.progettimolinari.it/cache/get", {
      method: "Post",
      headers: {
        "content-type": "application/json",
        key: token,
      },
      body: JSON.stringify({ key: chiave }),
    })
      .then((element) => {
        resolve(element.json());
      })
      .catch((error) => reject(error));
  });
};

//alvaDati("prova", "test");

let key="";
let value="";

readline.question("Inserire chiave: ", (chiave) => {
  readline.question("Inserire valore: ", (valore) => {
    readline.close();
    salvaDati(valore, chiave);
  });
});

/*recuperaDati("prova").then((json)=>{
  console.log(json);
})*/