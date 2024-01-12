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
const urlAccess = json.urlAccess;

const accedi = (username, password) => {
  return new Promise((resolve, reject) => {
    fetch(urlAccess, {
      method: "Post",
      headers: {
        "content-type": "application/json",
        key: token,
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((element) => {
        resolve(element.json());
      })
      .catch((error) => reject(error));
  });
};

readline.question("Inserire userName: ", (user) => {
  readline.question("Inserire password: ", (password) => {
    readline.close();
    accedi(user, password).then((data) => {
      if(data.result){
        console.log("Credenziali corrette");
      }else{
        console.log("Credenziali non corrette");
      }
    });
  });
});