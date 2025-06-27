const express = require('express');
const app = express();
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.get('/test', (req, res) => {
    res.json({
        message: 'Hello from the server!',
        status: 'success'
    });
});


// React App (localhost:3000) → Webpack Dev Server → Express Server (localhost:5000)

// Webpack Development Server (WDS) - это инструмент, 
// который помогает разработчикам вносить изменения во
//  фронтенд веб-приложения и автоматически отображает 
// эти изменения 
// в браузере без необходимости обновления страницы.