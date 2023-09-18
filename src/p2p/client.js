import DHT from "hyperdht";
import b4a from "b4a";

const serverKey = process.argv[2];
console.log(`Connection to: ${process.argv[2]}`);

const publicKey = b4a.from(serverKey, "hex");

const dht = new DHT();
const conn = dht.connect(publicKey);
conn.once("open", () => console.log(`Got Connection`));
process.stdin.pipe(conn).pipe(process.stdout);
