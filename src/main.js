import dotenv from "dotenv";
dotenv.config();
import { Client, GatewayIntentBits } from "discord.js";
import { botConfig } from "../config.js";
import { handleMessage } from "./openai-handler.js";
import { EmbedBuilder } from "@discordjs/builders";
import { fileURLToPath } from "url";

// OpenAI Rate Limit handling (in sec)
let cooldownTicks = 0;

const cooldownResolver = () => {
  setTimeout(() => {
    cooldownTicks--;
    if (cooldownTicks > 0) cooldownResolver();
  }, 1000);
};

const cooldownHandler = () => {
  cooldownTicks = 10;
  cooldownResolver();
};

// Client init
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// Simple event handling
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// Message listener
client.on("messageCreate", async (message) => {
  if (!message || message.author.bot) return;
  //message.channel.send(`Cooldown Ticks: ${cooldownTicks}`);
  if (
    botConfig.faqchannel.includes(message.channel.id) &&
    message.content.includes("<@1148238759159148645>")
  ) {
    try {
      if (message.content.trim() == "<@1148238759159148645>") {
        return message.channel.send({
          embeds: [
            new EmbedBuilder()
              .setTitle("Bitte stelle eine Frage.")
              .setDescription(
                `Bitte stelle eine Frage, welche sich auf den MSRP Server bezieht.`
              )
              .setColor(botConfig.colors.primary)
              .setTimestamp()
              .setFooter({
                text: botConfig.footerNote,
                iconURL: botConfig.avatarURL,
              }),
          ],
          ephemeral: true,
        });
      }

      if (cooldownTicks > 0) {
        return message.channel.send({
          embeds: [
            new EmbedBuilder()
              .setTitle("Cooldown aktiv.")
              .setDescription(
                `Bitte warte noch \`${cooldownTicks}s\`, bevor du eine weitere Frage stellst.`
              )
              .setColor(botConfig.colors.primary)
              .setTimestamp()
              .setFooter({
                text: botConfig.footerNote,
                iconURL: botConfig.avatarURL,
              }),
          ],
          ephemeral: true,
        });
      }

      if (message.content.split(" ").length > 256) {
        return message.channel.send({
          embeds: [
            new EmbedBuilder()
              .setTitle("Zu viele Wörter.")
              .setDescription(
                "Überschreitung der maximalen Wortzahl. Maximal 256 Wörter erlaubt."
              )
              .setColor(botConfig.colors.error)
              .setTimestamp()
              .setFooter({
                text: botConfig.footerNote,
                iconURL: botConfig.avatarURL,
              }),
          ],
          ephemeral: true,
        });
      }

      // Emulate typing
      await message.channel.sendTyping();
      const answer = await handleMessage(message);
      cooldownHandler();
      if (!answer) return message.channel.send("Keine Antwort gefunden.");

      return Array.isArray(answer)
        ? answer?.forEach((answerPart) => {
            message.channel.send(answerPart);
          })
        : message.channel.send(answer);
    } catch (error) {
      let errorTraceback = "Unbekannter Fehler.\n\nTraceback:" + error;

      // Try to get error traceback
      try {
        if (
          error != null &&
          typeof error == "object" &&
          !error instanceof Error
        ) {
          errorTraceback =
            "Es ist ein Fehler aufgetreten.\n\nTraceback:\n" +
            JSON.stringify(error, null, "\t");
        } else if (error instanceof Error) {
          const callerFile = fileURLToPath(import.meta.url);

          console.log("ABC");

          const err = error.stack.split("\n")[4];
          errorTraceback = `Es ist ein Fehler aufgetreten:\n\n> File\n"${callerFile}"\n\n> Error Message:\n${
            error.message
          }\n\n> Traceback:\n${error.stack ?? "-/-"}`;
        }
      } finally {
        return message.channel.send({
          embeds: [
            new EmbedBuilder()
              .setTitle("Fehler.")
              .setDescription(
                `
                Es ist ein Fehler aufgetreten. Bitte versuche es später erneut. 
                Sollte der Fehler weiterhin auftreten, wende dich bitte an einen Developer.
      
                \`\`\`${errorTraceback}\`\`\``
              )
              .setColor(botConfig.colors.error)
              .setTimestamp()
              .setFooter({
                text: botConfig.footerNote,
                iconURL: botConfig.avatarURL,
              }),
          ],
          ephemeral: true,
        });
      }
    }
  }
});

// Client login
client.login(process.env.DISCORD_TOKEN);
