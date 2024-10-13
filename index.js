import express from "express";
import bodyParser from "body-parser";
import axios from "axios";


const config = {
    headers: { Authorization: `Your Api Key` }
  };
const app = express();
const port = 3000;
const API_ROUTE = 'https://api.brawlstars.com/v1';

app.use(express.static('public/'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req,res) => {
    res.render('index.ejs');
});

app.post('/', async (req,res) => {
    try{
        const playerInfo = await axios.get(`https://api.brawlstars.com/v1/players/%23${req.body.UserPlayerTag}`, config);
        const playerBattleLog = await axios.get(`https://api.brawlstars.com/v1/players/%23${req.body.UserPlayerTag}/battlelog`,config)
        res.render('index.ejs',{playerInfo: playerInfo.data, playerBattles: playerBattleLog.data});
    } catch(error){
        const message = "Could not find a player with that tag.";
        console.log(error)
        res.render('index.ejs',{error: message})
    };
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});