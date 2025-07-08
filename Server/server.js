import { queryOneDocument,queryManyDocuments,sortQueryDocs } from './Database/API/queryObjects';
import express from 'express';
const app = express();
const PORT = 5000;

const {createDataBase, createCustomCollection, createCollections} = require('./Database/API/createObjects'); 
const {deleteDatabase, deleteCollection, deleteDocument} = require("./Database/API/deleteObject")
const { modifyOneDocument, modifyDocument, replaceDocument } = require("./Database/API/updateObjects")
const {insertOneDocument, insertManyDocuments} = require("./Database/API/insertObject")

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.get('/api/database/create', async (req, res) => {
  try {
    const result = await createDataBase();
    if (result) {
      console.log("Database created successfully");
      res.status(200).json({ message: "Database created successfully" ,status:"Success"});
    } else {
      res.status(500).json({ message: "Database not created successfully" ,status:"Error"});
    }
  } catch (err) {
    console.error("Error creating database:", err);
    res.status(500).send("Error creating database");
    }
});




// React App (localhost:3000) → Webpack Dev Server → Express Server (localhost:5000)

// Webpack Development Server (WDS) - это инструмент, 
// который помогает разработчикам вносить изменения во
//  фронтенд веб-приложения и автоматически отображает 
// эти изменения 
// в браузере без необходимости обновления страницы.