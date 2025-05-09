const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

// 분석 서버로 요청을 전달하는 엔드포인트
app.post('/api/chat', async (req, res) => {
    try {
        const { message, serverUrl } = req.body;
        const response = await axios.post(`${serverUrl}/question`, {
            question: message
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        res.json({ response: response.data.result });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to get response from analysis server' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 