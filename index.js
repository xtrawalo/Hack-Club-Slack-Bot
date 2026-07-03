require("dotenv").config();

const axios = require("axios");
const { App } = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true
});

app.command("/houad-ping", async ({ command, ack, respond }) => {
  const start = Date.now();
  await ack();
  const latency = Date.now() - start;
  await respond({ text: `Pong!\nLatency: ${latency}ms` });
});

(async () => {
  await app.start();
  console.log("bot is running!");
})();

app.command("/houad-help", async ({ ack, respond }) => {
  await ack();
  await respond({
    text:
`Available Commands:
/houad-help - Opens Menu
/houad-call - Calls the GOAT
/houad-catfact - Tells a Cat Fact`
  });
});

app.command("/houad-catfact", async ({ ack, respond }) => {
  await ack();

  try {
    const response = await axios.get("https://catfact.ninja/fact");
    await respond({ text: `Cat Fact:\n${response.data.fact}` });
  } catch (err) {
    await respond({ text: "Failed to fetch a cat fact." });
  }
});

app.command("/houad-call", async ({ ack, respond }) => {
  await ack();

  try {
    await respond({ text: `Say less. The GOAT's here.` });
  } catch (err) {
    await respond({ text: "Failed to fetch a cat fact." });
  }
});
