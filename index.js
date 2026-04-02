const { Client, GatewayIntentBits } = require('discord.js');
const http = require('http');

// 1. LE FIX POUR RENDER : Création d'un mini-serveur pour garder le bot en vie
http.createServer((req, res) => {
    res.writeHead(200);
    res.end('Le bot Feur est en ligne !');
}).listen(process.env.PORT || 3000);

// 2. Configuration du bot
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.once('clientReady', (c) => {
    console.log(`✅ Prêt ! Connecté en tant que ${c.user.tag}`);
});

client.on('messageCreate', (message) => {
    if (message.author.bot) return;

    const cleanMessage = message.content.toLowerCase().trim().replace(/[?.!)]+$/, "");

    if (cleanMessage.endsWith('quoi')) {
        message.reply('feur !');
    }
});

// 3. Connexion (Utilise la variable d'environnement de Render)
client.login(process.env.TOKEN);
