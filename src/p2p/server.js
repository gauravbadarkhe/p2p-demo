import DHT from "hyperdht";
import goodbye from "graceful-goodbye";
import b4a from "b4a";

const dht = new DHT();

const keyPair = DHT.keyPair();

const server = dht.createServer((conn) => {
  console.log("New Connection!");
  process.stdin.pipe(conn).pipe(process.stdout);
});

server.listen(keyPair).then(() => {
  console.log(`Listening on: ${b4a.toString(keyPair.publicKey, "hex")}`);
});

goodbye(() => server.close());
