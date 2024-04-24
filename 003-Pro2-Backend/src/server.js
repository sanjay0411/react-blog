import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import "dotenv/config";
import admin from "firebase-admin"
import {db,connectToDb}  from './db.js';

const credentials = JSON.parse(fs.readFileSync("./credentials.json"));

admin.initializeApp({
    credential: admin.credential.cert(credentials),
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express(); 
app.use(express.json());
app.use(express.static(path.join(__dirname,"../build")));

app.use(async(req,res,next)  => {
    const {authtoken} = req.headers;
    if(authtoken){
        try {
            req.user = await admin.auth().verifyIdToken(authtoken);
        } catch (e) {
           return res.sendStatus(400);
        }
    }
    req.user=req.user ||{};
    next();
});

app.get(/^(?!\/api).+/,(req,res) => {
    res.sendFile(path.join(__dirname,"../build/index.html"));
})

app.get('/api/articles/:name',async(req,res)=>{

    const {name}=req.params;
    const {uid}=req.user;

    const article = await db.collection("articles").findOne({name});
    
    if(article){
        const likeIds = article.likeIds || [];
        article.canLike = uid && !likeIds.includes(uid); 
        res.json(article);
    }else{
        res.sendStatus(404);
    }
});

app.use((req, res, next) => {
    if(req.user) {
        next();
    }else{
        res.sendStatus(401);
    }
});

app.put('/api/articles/:name/likes',async(req,res)=>{
    const {name}=req.params;
    const {uid}=req.user;

    const article=await db.collection("articles").findOne({name});

    if (article){
        const likeIds = article.likeIds || [];
        const isLiked = uid && likeIds.includes(uid);

        if (isLiked) {
            await db.collection("articles").updateOne(
                {name},
                {
                    $inc: {like:-1},
                    $pull: {likeIds:uid}
                }
                );
            }else{
                await db.collection("articles").updateOne(
                    {name},
                    {
                        $inc: {like:1},
                        $push: {likeIds:uid}
                    }
                    );
            }
        const updatedArticle=await db.collection("articles").findOne({name});
        res.send(updatedArticle);
    }
    else
    {
        res.sendStatus(401);
    }
});



app.post("/api/articles/:name/comments", async (req,res)=>{
    const {name}=req.params;
    const {comment} = req.body;
    const {email} = req.user;

    await db.collection("articles").updateOne({name},{$push: {comments:{by:email,comment}}}); 

    const article = await db.collection("articles").findOne({name});
    if(article){
        res.json(article);
    }else{
        res.sendStatus("Not Found!")
    }
});

const PORT=process.env.PORT ||8000;

connectToDb(()=>{
    console.log("successfully connected to database");
    app.listen(PORT,()=>{
        console.log("listening on 8000 http://localhost:8000");
    });
});