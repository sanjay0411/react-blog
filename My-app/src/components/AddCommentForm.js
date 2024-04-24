import {useState} from "react";
import axios from "axios";
import useUser from "../hook/useUser";

const AddCommentForm=({articleName,onArticleUpdated}) =>{
    const [name,setName]=useState('');
    const [commentText,setCommentText]=useState('');
    const {user}=useUser();
  
    const addComment = async () =>{
        const token = user && await user.getIdToken();
        const headers = token? {authtoken: token}:{};
        const response = await axios.post(`/api/articles/${articleName}/comments`, {
            by:name,
            comment:commentText
        },{headers});

        const updatedArticle=response.data; 
        onArticleUpdated(updatedArticle);
        setName('');
        setCommentText('');
}; 
    return( 
        <div id="add-comment-form">
            <h3>Add Comment</h3>
            {/* <label>
                    Name:
                    <input 
                    value={name} 
                    onChange={(e)=>setName(e.target.value)}
                    type="text" 
                    />
            </label> */}
            {/* <label>
                Comment:
                <input  
                value={commentText} 
                row="4"
                cols="50"
                onChange={(e)=>setCommentText(e.target.value)}
                />
            </label>  */}
            {user && <p>Posting as{user.email}</p>}
            <textarea value={commentText} 
            onChange={e=>setCommentText(e.target.value)}
            col="30" rows="10"></textarea>
        <button onClick={addComment}>Add Comment</button>
        </div>
    );
};

export default AddCommentForm;

