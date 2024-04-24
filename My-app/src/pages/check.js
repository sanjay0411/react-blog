import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';
import AddCommentForm from '../components/AddCommentForm';
import CommentsLists from '../components/CommentsLists';
import useUser from '../hook/useUser';
import articles from './articles-content';

function ArticlePage() {
  const [articleInfo, setArticleInfo] = useState({ like: 0, comments: [], canLike: true }); // Modification: Added `canLike` state
  const { articleId } = useParams();
  const { user, isLoading } = useUser();

  useEffect(() => {
    const loadArticleInfo = async () => {
      const token = user && (await user.getIdToken());
      const headers = token ? { authtoken: token } : {};
      const response = await axios.get(`/api/articles/${articleId}`, { headers });
      const newArticleInfo = await response.json
      setArticleInfo(newArticleInfo);
    };

    loadArticleInfo();

  }, [articleId, user]);

  const handleUnlike = async () => {
    const token = user && (await user.getIdToken());
    const headers = token ? { authtoken: token } : {};
    await axios.delete(`/api/articles/${articleId}/likes`, { headers });
    setArticleInfo(prevInfo => ({ ...prevInfo, like: prevInfo.like - 1, canLike: true })); // Modification: Reset `canLike` to true
  };

  const handleLike = async () => {
    const token = user && (await user.getIdToken());
    const headers = token ? { authtoken: token } : {};
    await axios.put(`/api/articles/${articleId}/likes`, null, { headers });
    setArticleInfo(prevInfo => ({ ...prevInfo, like: prevInfo.like + 1, canLike: false })); // Modification: Set `canLike` to false
  };

  const article = articles.find(article => article.name === articleId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (article) {
    return (
      <>
        <h1>{article.title}</h1>
        <div className="upvote-section">
          {user ? (
            articleInfo.canLike ? (
              <button onClick={handleLike}>Like</button>
            ) : (
              <button onClick={handleUnlike}>Unlike</button>
            )
          ) : (
            <button onClick={handleLike}>Login to Like</button>
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
            onArticleUpdated={updatedArticle => setArticleInfo(updatedArticle)}
          />
        ) : (
          <button>Login to comment</button>
        )}
        <CommentsLists comments={articleInfo.comments} />
      </>
    );
  } else {
    return <NotFoundPage />;
  }
}

export default ArticlePage;
