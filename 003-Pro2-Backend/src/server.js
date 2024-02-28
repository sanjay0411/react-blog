import express from 'express';

let articleInfo=[
    {
       name:'split.js',
       likes:0,
       comments:[]
    },
    {
        name:'map.js',
        likes:0,
        comments:[]
    },
    {
        name:'filter.js',
        likes:0,
        comments:[]

    }
]

const findArticle=(name)=>articleInfo.find((article)=>article.name);

const app = express();
app.use(express.json());

app.put('/api/articles/:name/likes',(req,res)=>{
    const {name}=req.params;
    const article=articleInfo.find(article=>article.name===name);
    if (article){
        article.likes +=1;
        res.send(`The article ${article.name} has ${article.likes} likes!`);
    }
    else
    {
        res.send(`Not Found!`);
    }
});

app.post('/api/articles/:name/comment',(req,res)=>{
    const {name}=req.params;
    const {by,comment}=req.body;
    
    const article=findArticle(name);
    if (article){
        article.comments.push({by,comment});
        res.send(article.comments);
    }
    else
    {
        res.send(`Article Doesn't Exist!!`);
    }
});

app.listen(8000,()=>{
    console.log("listening on 8000........");
}); 