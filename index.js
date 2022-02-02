const express = require ('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const Player = require('./models/player') 
const app = express()

dotenv.config()
mongoose.connect(process.env.MONGO_URL).catch((err) => console.log(err))

app.use(express.json())
app.use(express.static('./public'))

app.get('/',(req,res) => {
    res.sendFile('index.html', {root: __dirname})
})

app.post('/', async(req,res) => {
    const newPlayer = new Player(req.body)
    console.log(req.body)
    try {
        await newPlayer.save()
    }
    catch(err) {
        res.status(500).json(err)
    }
})

app.get('/players', async(req,res)=>{
    try{
        const players = await Player.find({}).sort({ score: 1}).limit(10)
        res.send(JSON.stringify(players))
    }
    catch(err){
        res.status(500).json(err)
    }
})

app.listen( process.env.PORT || 8080, () => console.log('server on'))