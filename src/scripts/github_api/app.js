const { listUsers, getUserDetails, getUserRepos } = require('./controllers.js');

const express = require("express");
const cors = require("cors");

const app = express();
const PORT=5000;

app.use(express.json());
app.use(cors());

app.get('/', (req,res)=>{
    res.send('Welcome to Github NodeJS API app!')
})

app.get('/api/users', async (req, res, next) => {
    try {
        const usersList = await listUsers( req.query.since||0 )
        res.send( usersList )
    } catch(e) {
        return next(e);
    }
})

app.get('/api/users/:username/details', async (req, res, next) => {
    try {
        const userDetails = await getUserDetails(req.params.username||"")
        res.send( userDetails )
    } catch(e) {
        return next(e);
    }
})

app.get('/api/users/:username/repos', async (req, res, next) => {
    try {
        const userRepos = await getUserRepos(req.params.username||"")
        res.send( userRepos )
    } catch(e) {
        return next(e);
    }
})

app.listen(PORT,() => console.log(`Server started on port ${PORT}...`))