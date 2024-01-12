const { resolve } = require("path");

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.question("Insert number: ", (n) => {
  console.log("n: " + n);
  fib(n * 1)
    .then((array) => {
      console.log(array);
    })
    .catch(() => {
      console.log("Inserire un numero maggiore di 1");
    });
  readline.close();
});

const fib = (numero) => {
  return new Promise((resolve, reject) => {
    if (numero === 0) {
      reject();
    } else {
      const array = [1, 1];
      const ciclo = (i, n, array) => {
        if (i < n) {
          array[i] = array[i - 2] + array[i - 1];
          setImmediate(() => {
            ciclo(i + 1, n, array);
          });
        } else {
          resolve(array);
        }
      };
      if (numero < 2) {
        resolve(array);
      } else {
        setImmediate(() => {
          ciclo(2, numero, array);
        });
      }
    }
  });
};
