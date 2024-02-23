import React from "react";
import AboutPage from "./pages/AboutPage";
import ArticlePage from "./pages/ArticlePage";
import ArticlesListPage from "./pages/ArticlesListPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";

function App(){
    return(
        <>
            <AboutPage/>
            <HomePage/>
            <ArticlePage/>
            <ArticlesListPage/>
            <NotFoundPage/>

        </>
    );
}

export default App;