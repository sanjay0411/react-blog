import React from "react";
import "./App.css";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import AboutPage from "./pages/AboutPage";
import ArticlePage from "./pages/ArticlePage";
import ArticlesListPage from "./pages/ArticlesListPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import Navbar from "./NavBar";

function App(){
    return(
        <BrowserRouter>
            <div className="App">
                <h1>First React App</h1>
                <Navbar/>
            <div id="page-body">
            <Routes>
                <Route path="/" element={<HomePage/>}></Route>
                <Route path="/articles/" element={<ArticlesListPage/>}></Route>
                <Route path="/article/:articleId" element={<ArticlePage/>}></Route>
                <Route path="/about" element={<AboutPage/>}></Route>
                <Route path="*" element={<NotFoundPage/>}></Route>
            </Routes>
            </div>
            </div>
        </BrowserRouter>
    );
}

export default App;