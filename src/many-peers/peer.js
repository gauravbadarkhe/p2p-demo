import Hyperswarm from "hyperswarm";
import goodbye from "graceful-goodbye";
import crypto from "hypercore-crypto";
import b4a from "b4a";

const swarm = new Hyperswarm();
goodbye(() => swarm.destroy());

const conns = [];

swarm.on("connection", (conn) => {
  const name = b4a.toString(conn.remotePublicKey, "hex");
  console.log(`New Peer COnnected  :${name}`);
  conns.push(conn);
  conn.once("close", () => conns.splice(conns.indexOf(conn), 1));
  conn.on("data", (data) => console.log(`${name}: ${data}`));
});

process.stdin.on("data", (d) => {
  for (const conn of conns) {
    conn.write(d);
  }
});

const topic = process.argv[2]
  ? b4a.from(process.argv[2], "hex")
  : crypto.randomBytes(32);
const discovery = swarm.join(topic, { client: true, server: true });
discovery.flushed().then(() => {
  console.log(`Joined Topic ${b4a.toString(topic, "hex")}`);
});
