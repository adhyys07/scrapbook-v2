const serverUrl = process.env.SERVER_URL ?? "http://localhost:3000";

async function main() {
  const res = await fetch(`${serverUrl}/`);
  console.log(await res.json());
}

main();
