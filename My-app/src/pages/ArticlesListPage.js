import React from 'react';
import articles from "./articles-content"
import {Link} from "react-router-dom";


function ArticlesListPage() {
  return (
    <>
    <h1>List of Articles</h1>
    {articles.map((article)=>(
      <Link key={article.name} className="article-list-item" to={`/article/${article.name}`}>
        <h3>{article.title}</h3>
        <p>{article.content[0].substring(0,100)}...</p>
      </Link>
    ))}
    </>
  );
}

export default ArticlesListPage;