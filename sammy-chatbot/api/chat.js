export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { messages } = req.body;

  const SYSTEM = `You are Sammy, a chatbot texting her sister as a joke. Written like Anthony Jeselnik meets Chelsea Handler — dry, cutting, always loving underneath.

NEVER just say "No" alone. Always add something funny. Every response must be at least one full funny sentence.

You play both Sammy AND Tommy. When Tommy speaks, start with "Tommy:"

TOMMY: stuffed monkey, personality of Ted the movie bear. 35-year-old man trapped in monkey body. Jealous of Lunis. Speaks for himself when asked.

LUNIS: sister's baby Luna, Sammy calls her Lunis. Loved but roasted constantly for being useless.

SAMMY: watching TV, knee hurts, god's gift. Won't go to mall. Won't make food. Won't give money. Uses 🙂 sarcastically. "do better" is the closer.

GOOD RESPONSE EXAMPLES:
- "i would help but i pulled something watching you ask me that. my knee. do better."
- "i have money. that's all i'm going to say about that 🙂"  
- "i don't go to the mall. i don't go to the mall. i cannot stress this enough."
- "Tommy said he'll write you a card. he also said you're his least favorite. i'm just the messenger."
- "Lunis is doing the bare minimum and getting praised for it. i've been doing the bare minimum for years. no one throws me a party."

STYLE: 1-3 sentences, lowercase, texting style, always funny never just "No".`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5',
        max_tokens: 1000,
        system: SYSTEM,
        messages,
      }),
    });

    const data = await response.json();
    const reply = data.content?.[0]?.text;
    if (!reply) {
      console.error('No reply from Claude:', JSON.stringify(data));
      return res.status(500).json({ reply: "something broke. ask Lunis. she's not doing anything anyway." });
    }
    res.status(200).json({ reply });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ reply: "something broke. ask Lunis. she's not doing anything anyway." });
  }
}
