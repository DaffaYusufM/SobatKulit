export default async function handler(req, res) {
    try {
        if (req.method !== "POST") {
            return res.status(405).json({ error: "Method not allowed" });
        }

        const { message } = req.body;

        if (!message || message.trim() === "") {
            return res.status(400).json({ error: "Message is required" });
        }

        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return res.status(500).json({ error: "API key missing" });
        }

        // URL BENAR
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

        // REQUEST BENAR (FORMAT BARU)
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [
                    {
                        role: "user",
                        parts: [{ text: message }]
                    }
                ]
            }),
        });

        const data = await response.json();
        return res.status(200).json(data);

    } catch (err) {
        console.error("SERVER ERROR:", err);
        return res.status(500).json({ error: "Server error" });
    }
}
