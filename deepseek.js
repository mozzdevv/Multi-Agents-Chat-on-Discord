const OpenAI = require('openai');
const config = require('./config');

const openai = new OpenAI({
    baseURL: config.DEEPSEEK_BASE_URL,
    apiKey: config.DEEPSEEK_API_KEY
});

async function getAIResponse(systemPrompt, userMessage) {
    try {
        const completion = await openai.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userMessage }
            ],
            model: config.DEEPSEEK_MODEL,
        });

        return completion.choices[0].message.content;
    } catch (error) {
        console.error("DeepSeek API Error:", error);
        return "Sorry, I'm having trouble thinking right now. (API Error)";
    }
}

module.exports = { getAIResponse };
