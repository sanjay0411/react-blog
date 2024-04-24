import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";
import AddCommentForm from "../components/AddCommentForm";
import CommentsLists from "../components/CommentsLists";
import useUser from "../hook/useUser";
import articles from "./articles-content";

function ArticlePage() {
  const [articleInfo, setArticleInfo] = useState({
    like: 0,
    comments: [],
    canLike: false,
  });
  const { liked } = articleInfo;
  const { articleId } = useParams();
  const { user, isLoading } = useUser();
  conat [liked,setLiked] =useState(true);

  useEffect(() => {
    const loadArticleInfo = async () => {
      const token = user && (await user.getIdToken());
      const headers = token ? { authtoken: token } : {};
      const response = await axios.get(`/api/articles/${articleId}`, {
        headers,
      });
      const newArticleInfo = response.data;
      setArticleInfo(newArticleInfo);
    };
    if (isLoading) {
      loadArticleInfo();
    }
  }, [isLoading, user]);

  const article = articles.find((article) => article.name === articleId);

  const toggleLikes = async () => {
    const token = user && (await user.getIdToken());
    const headers = token ? { authtoken: token } : {};
    const response = await axios.put(`/api/articles/${articleId}/likes`, null, {
      headers,
    });
    const updatedArticle = response.data;
    setArticleInfo(updatedArticle);
    setLiked(!liked);
  };

  if (article) {
    return (
      <>
        <h1>{article.title}</h1>
        <div className="upvote-section">
          {user ? (
            <button onClick={toggleLikes}>
              {liked ? "like" : "Dislike"}
            </button>
          ) : (
            <Link to="/login">
              <button onClick={toggleLikes}>Login to Like</button>
            </Link>
          )}
        </div>
        <p>
          {article.title} has {articleInfo.like} likes!...
        </p>
        {article.content.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
        {user ? (
          <AddCommentForm
            articleName={articleId}
            onArticleUpdated={(updatedArticle) =>
              setArticleInfo(updatedArticle)
            }
          />
        ) : (
          <Link to="/login">
            <button>Login to comment</button>
          </Link>
        )}
        <CommentsLists comments={articleInfo.comments}></CommentsLists>
      </>
    );
  } else {
    return (
      <>
        <NotFoundPage />
      </>
    );
  }
}

export default ArticlePage;
