
/**
 * Checks if the MSM agent should be activated based on its keyword rules.
 * @param {string} content The message content.
 * @returns {boolean} True if the agent should respond, false otherwise.
 */
function shouldActivateMSM(content) {
    const lowercaseContent = content.toLowerCase();

    // Keywords from MSM's activation rule
    const keywords = [
        "marketing", "brand", "branding", "position", "positioning", "messaging",
        "campaign", "launch plan", "go-to-market", "gtm", "audience", "target", "customer",
        "growth", "acquisition", "conversion", "social media", "content", "copy", "ad", "ads",
        "advertising", "outreach", "influencer", "pr", "seo", "viral", "engagement", "funnel",
        "awareness", "desire", "consideration", "promotion", "channel", "channels", "creative",
        "visual identity", "tagline", "slogan", "value prop", "tone of voice"
    ];

    // Explicit delegation phrases
    if (lowercaseContent.includes("calling msm") ||
        lowercaseContent.includes("msm input needed") ||
        lowercaseContent.includes("msm please advise")) {
        return true;
    }

    // Check for marketing keywords
    for (const keyword of keywords) {
        if (lowercaseContent.includes(keyword)) {
            return true;
        }
    }

    return false;
}

module.exports = { shouldActivateMSM };
