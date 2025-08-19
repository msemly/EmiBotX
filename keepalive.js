const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Bot is running!'));

app.listen(3000, () => console.log('Keepalive server running on port 3000'));
