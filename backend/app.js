const express = require('express');
const cors = require('cors');
const V1Routes  = require("./routes/v1");
const db = require("./models")

const app = express();

app.use(express.json());
app.use(cors());

// synchronizing database
app.get("/database", async(req, res) => {
    try {
        const force = req.query.force;
        force ? await db.sequelize.sync({force: true}) : await db.sequelize.sync({alter: true})
        res.send(`database synchronized with ${force?"force":"alter"}`);
    } catch (error) {
        res.status(500).send("database synchronized");
        console.error("Synchronizing console.error");
    }
})

app.use('/api/v1', V1Routes);

module.exports = app; 