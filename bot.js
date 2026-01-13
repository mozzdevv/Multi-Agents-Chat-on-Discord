const { Client, GatewayIntentBits, Events } = require('discord.js');
const config = require('./config');
const { getAIResponse } = require('./deepseek');

// Get the agent key from command line args (e.g., "node bot.js ppm")
const agentKey = process.argv[2];

if (!agentKey || !config.AGENTS[agentKey]) {
    console.error("Please specify a valid agent key: 'ppm' or 'msm'");
    console.error("Usage: node bot.js <agent>");
    process.exit(1);
}

const agentConfig = config.AGENTS[agentKey];
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.once(Events.ClientReady, c => {
    console.log(`Ready! Logged in as ${c.user.tag} (${agentConfig.name})`);
});

const { shouldActivateMSM } = require('./triggers');

client.on(Events.MessageCreate, async message => {
    // Ignore messages from bots (prevent loops)
    if (message.author.bot) return;

    // Determine if we should reply
    let shouldReply = false;

    // PPM always replies (unless it's another bot, which is already caught)
    if (agentKey === 'ppm') {
        shouldReply = true;
    }
    // MSM only replies if mentioned or triggered
    else if (agentKey === 'msm') {
        if (message.mentions.has(client.user) || shouldActivateMSM(message.content)) {
            shouldReply = true;
        }
    }

    if (shouldReply) {
        try {
            // Send typing indicator
            await message.channel.sendTyping();

            // Clean the message content (remove current bot's mention if present)
            // We keep other mentions so the bot knows who else was tagged
            let cleanContent = message.content.replace(new RegExp(`<@!?${client.user.id}>`, 'g'), '').trim();
            if (!cleanContent) cleanContent = "Hello"; // Fallback for empty messages (just a ping)

            console.log(`[${agentConfig.name}] Handling: "${cleanContent}" from ${message.author.tag}`);

            // Get AI Response
            const aiReply = await getAIResponse(agentConfig.systemPrompt, cleanContent);

            // Reply to the user
            await message.reply(aiReply);
            console.log(`[${agentConfig.name}] Replied.`);

        } catch (error) {
            console.error(`[${agentConfig.name}] Error handling message:`, error);
        }
    }
});

// Login
if (!agentConfig.token || agentConfig.token.startsWith('REPLACE_WITH')) {
    console.error(`[${agentConfig.name}] ERROR: Missing Discord Bot Token in config.js!`);
    process.exit(1);
}

client.login(agentConfig.token);
