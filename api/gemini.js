// api/gemini.js - Version SEDERHANA dulu
module.exports = async (req, res) => {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Only allow POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        console.log('API Route accessed');

        // Parse JSON body
        let body = {};
        try {
            body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
        } catch (parseError) {
            return res.status(400).json({ error: 'Invalid JSON' });
        }

        const { message } = body;

        // Basic validation
        if (!message || typeof message !== 'string') {
            return res.status(400).json({ error: 'Message is required' });
        }

        console.log('Received message:', message);

        // SIMPLE RESPONSE DULU - tanpa fetch ke Gemini
        res.status(200).json({
            success: true,
            response: `✅ API BERHASIL! Pesan diterima: "${message}"`,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Server Error:', error);
        res.status(500).json({
            error: 'Internal Server Error',
            details: error.message
        });
    }
};