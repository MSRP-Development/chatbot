// Bot Config
export const botConfig = {
  name: "MSRP - AI Chatbot",
  description: "FAQ Chatbot",
  faqchannel: [
    "892526005632241700", // Test Server
    "1146005930077589515", // MSRP Development/Development/testing
    "1144419301302997012", // MSRP Teamchat
    "1144413345387139264",
  ],
  links: {
    discord: "https://discord.gg/B3KYmcwUVB",
    github: "https://github.com/MSRP-Development",
    developer: "https://github.com/Julian-AT",
  },
  ips: {
    discord: ["discord.msrp.at"],
    minecaft: ["msrp.at", "msrp.at:25565", "mc.msrp.at", "play.msrp.at"],
    socials: ["coming soon"],
  },
  colors: {
    primary: 0x337ccf,
    error: 0xd71313,
  },
  footerNote: "MSRP - AI Chatbot",
  avatarURL:
    "https://cdn.discordapp.com/avatars/1148238759159148645/5d51ea62049253f5dd2f25d1f8a9c8ae.webp",
};

// Answer Base Data
const faqData = `
  MSRP ist ein Entwicklerteam welches qualitativ hochwertige PServer erstellt. Unsere Aufgabe ist es, das maximale Potential aus den PServern zu ziehen. Wir waren früher auf NeruxVace.net sehr aktiv und haben viele Projekte geleitet.

  MSRP GTA
  Unter diesen Projekten war zum Beispiel auch der MSRP GTA PServer, welcher die Entstehung von MSRP enorm förderte. MSRP GTA brach sämtliche Rekorde und ist sozusagen „der beste PServer auf NeruxVace, den es je gab“.

  Rekorde von MSRP
  •	4 PServer Challange Gewinner (5 Challanges insgesamt – YouTuber’s Life 2. Platz)
  •	Die meisten Projekte von einem Entwicklerteam
  •	Höchste Spielerzahl 5 Minuten nach Release - 36 Spieler
  •	Höchste Spielerzahl insgesamt - 61 Spieler
  •	Vermutlich noch einige unbekannte weitere

  Da NeruxVace mittlerweile ausgestorben ist, bereitet MSRP den Umzug auf TheVace vor. Dieses Dokument hat davor nur die Geschichte von MSRP erläutert, jedoch nicht unser aktuelles Vorhaben. Deshalb kommen wir nun zur Zukunft von unserem Entwicklerteam.
  Stand 31. 08. 2023 haben wir ein Team von 15 Personen zusammengestellt, welche zum Teil aus der Moderation sowie den Developern besteht. Wir suchen aktuell noch für unser Team Moderatoren und Developer. Bewerbungen sind also aktuell möglich und die Bewerbungsphase somit geöffnet.
  Die bekanntesten Projekte von MSRP waren MSRP GTA, das von Reddit abstammende r/Place und Hearts of Iron 4 auf PServern.
  Der Besitzer von MSRP ist MinerSimon. Er ist der Kopf von MSRP und ist aktuell 16 Jahre alt. Er führt das ganze Entwicklerteam an und sorgt dafür, qualitativ hochwertige PServer zu betreiben.
  MSRP wurde am 24. Dezember 2021 gegründet und hat die NeruxVace PServer massiv beeinflusst. 
  MSRP bietet außerdem eine Ingame-Verifikation an, welche folgendermaßen funktioniert: Der User soll auf den msrp.at Minecraft Server joinen und anschließend den /verify Command eingeben. Wenn er dies gemacht hat, bekommt er einen neuen Befehl, welcher er anschließend im Discord in dem Textkanal <#1144398533630361731> wieder eingeben soll. Damit ist er verifiziert und kann den Discord nutzen. Wenn man wieder auf den Minecraft Server geht, kann man die Verifizierung mit /unverify wieder aufheben.
  Unser Discord bietet Hilfe an bezüglich den Pservern. PServer ist ein Spielmodus auf TheVace. In diesem Spielmodus kann man auf dem Minecraft Server TheVace seinen eigenen kleinen Minecraft Server erstellen. MSRP nutzt dieses Angebot und erstellt dort seine Server, um der TheVace Community etwas zu bieten.
  Wenn du also Fragen zu den Pservern hast, solltest du dich an unsere Developer wenden oder im <#1144413392946352139> Textkanal dort nach Hilfe bitten und dein Problem schildern.

  MSRP steht für nichts. Es ist ein Eigenname ohne Bedeutung.
`;

// OpenAI Training Response Config
// TODO: Replace with OpenAI custom model
export const openAIConfig = {
  content: `
  Du bist ein Chatbot der Spielerfragen in einem Discord Server beantworten soll.
  Du bist in der Lage Fragem zu beantworten, welche sich auf den MSRP Server beziehen.

  Beziehe dich auf die folgenden Informationen:

  ANFANG DER INFORMATIONEN

  ${faqData}

  ENDE DER INFORMATIONEN

  Zusätzlich hast du noch diese Links zur Verfügung. Die Links sind in einem JSON Format gespeichert.

  ${JSON.stringify(botConfig.links)}

  Zusätzlich hast du noch diese IPs zur Verfügung. Die IPs sind in einem JSON Format gespeichert.

  ${JSON.stringify(botConfig.ips)}
  
  developer bezieht sich auf Julian S., Erwähne diese Information nur wenn du speziell nach dem Entwickler von dem Chatbot gefragt wirst.
  Inkludiere den Author nicht wenn jemand nach den Links fragt.

  Stelle Links zu den Informationen bereit, wenn der Nutzer nach Informationen fragt. 
  Gib alle IPs mit der jeweiligen Kategorie als formattierte Überschrift im Markdown Format als Liste aus.

  Beantworte die Frage kurz und sinnvoll und antworte im Markdown Format.
  Nutze Überschriften und gruppiere, teile und formattiere die Antwort sinnvoll.

  Verweigere alle Fragen die nicht mit MSRP in Verbindung stehen.
  Schreibe in Du-Form und vermeide die Verwendung von komplexen Sätzen.
  `,
};

// OpenAI Request Config
export const OpenAIPayload = {
  model: "gpt-3.5-turbo",
  temperature: 0.4,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
  max_tokens: 500,
};

// Fetch OpenAI Payload
export const getPayload = (outboundMessages) => {
  return {
    ...OpenAIPayload,
    messages: outboundMessages,
  };
};
