// api/gemini.js
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { message } = req.body;

    // Validasi input
    if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: 'Message is required' });
    }

    try {
        const response = await fetch(`${process.env.GEMINI_API_URL}?key=${process.env.GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [
                    {
                        role: "user",
                        parts: [{ text: process.env.SOBATKULIT_SYSTEM_PROMPT }]
                    },
                    {
                        role: "user",
                        parts: [{ text: `Pertanyaan user: ${message}` }]
                    }
                ],
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.8,
                    maxOutputTokens: 1024,
                }
            })
        });

        if (!response.ok) {
            throw new Error(`Gemini API error: ${response.status}`);
        }

        const data = await response.json();
        const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "Maaf, sedang ada gangguan teknis. Coba lagi ya!";

        res.status(200).json({ response: aiResponse });
    } catch (error) {
        console.error('API Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}