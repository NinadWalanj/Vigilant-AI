const OpenAI = require("openai");
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function analyzePayload(payload) {
  const prompt = `
You are an API security analyst. Analyze the following HTTP request payload and determine if it is malicious, suspicious, or safe. Look for possible attack types like SQL injection, XSS, command injection, privilege escalation, or business logic abuse.

Payload:
${JSON.stringify(payload)}

Respond with:
Classification: Safe/Suspicious/Malicious
Reason: <one line explanation>
`;

  const response = await openai.chat.completions.create({
    model: "gpt-4.1-nano-2025-04-14",
    messages: [
      { role: "system", content: "You are a cybersecurity expert." },
      { role: "user", content: prompt },
    ],
  });

  return response.choices[0].message.content;
}

module.exports = {
  analyzePayload,
};
