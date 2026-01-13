# Discord DeepSeek Agents 🤖🚀

A collaborative multi-agent system for Discord, powered by the **DeepSeek API**. This project features two specialized agents—**PPM (Principal Project Manager)** and **MSM (Marketing Strategist)**—designed to work together and with you in a shared Discord environment.

## ✨ Features

- **DeepSeek Integration**: Uses the latest DeepSeek reasoning models for high-intelligence responses.
- **Collaborative Workflows**: Agents are aware of each other and can delegate tasks.
- **Specialized Personas**: 
  - **PPM (Principal Project Manager)**: Your central authority for execution, structure, and accountability.
  - **MSM (Marketing Strategist)**: Your creative engine for growth, branding, and go-to-market strategies.
- **Selective Activation**: MSM only speaks when relevant marketing topics arise or when explicitly summoned, keeping your channel clean.
- **Real-time Interaction**: Supports Discord's native "Typing..." indicators and direct replies.

## 🛠️ Setup

### 1. Prerequisites
- Node.js (v18+)
- A Discord Bot Token (or two for separate identities)
- A DeepSeek API Key

### 2. Configuration
Clone the repository and create a `.env` file based on the template:

```bash
cp .env.example .env
```

Fill in your keys:
- `DEEPSEEK_API_KEY`: Your key from DeepSeek.
- `PPM_DISCORD_TOKEN`: Token for the Project Manager bot.
- `MSM_DISCORD_TOKEN`: Token for the Marketing agent bot.

### 3. Installation
```bash
npm install
```

### 4. Running the Bots
You can run them manually or via PM2 for production.

**Manual:**
```bash
node bot.js ppm
node bot.js msm
```

**Via PM2:**
```bash
pm2 start ecosystem.config.js
```

## 📜 License
This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.
