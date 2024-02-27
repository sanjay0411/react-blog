import React from 'react';
import articles from './articles-content';
import ArticleList from '../components/ArticleList';


function ArticlesListPage() {
  return (
    <>
    <ArticleList articles={articles}/>
    </>
  );
}

export default ArticlesListPage;