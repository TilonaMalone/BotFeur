const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();
require('http').createServer((req, res) => res.end('Bot is alive!')).listen(3000);

// Création d'une nouvelle instance du client Discord
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// Quand le bot est prêt
client.once('clientReady', () => {
    console.log(`Connecté en tant que ${client.user.tag} ! Le bot "feur" est opérationnel.`);
});

// Écoute des messages
client.on('messageCreate', (message) => {
    if (message.author.bot) return;

    // Nettoyage : minuscules + suppression de la ponctuation finale (?!.)
    const cleanMessage = message.content.toLowerCase().trim().replace(/[?.!)]+$/, "");

    // Vérifie si la phrase se termine par "quoi"
    // Le "$" signifie "à la fin de la chaîne"
    if (cleanMessage.endsWith('quoi')) {
        message.reply('feur !');
    }
});

// Connexion au serveur avec le token
// Remplacez 'VOTRE_TOKEN_ICI' par votre véritable token
client.login(process.env.TOKEN);
