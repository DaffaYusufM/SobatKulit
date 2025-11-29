export default async function handler(req, res) {
    try {
        const { message } = req.body;

        const apiKey = process.env.GEMINI_API_KEY;
        const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent" + apiKey;

        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text: message }] }]
            }),
        });

        const data = await response.json();
        res.status(200).json(data);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
}
