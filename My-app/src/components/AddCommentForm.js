import {useState} from "react";
import axios from "axios";

const AddCommentForm=({articleName,onArticleUpdated}) =>{
    const [name,setName]=useState('');
    const [commentText,setCommentText]=useState('');
 
    const addComment = async () =>{
        const response = await axios.post(`/api/articles/${articleName}/comments`, {
            by:name,
            comment:commentText
        });

        const updatedArticle=response.data; 
        onArticleUpdated(updatedArticle);
        setName('');
        setCommentText('');
}; 
    return( 
        <div id="add-comment-form">
            <h3>Add Comment</h3>
            <label>
                    Name:
                    <input 
                    value={name} 
                    onChange={(e)=>setName(e.target.value)}
                    type="text" 
                    />
            </label>
            <label>
                Comment:
                <input  
                value={commentText} 
                row="4"
                cols="50"
                onChange={(e)=>setCommentText(e.target.value)}
                />
            </label> 
        <button onClick={addComment}>Add Comment</button>
        </div>
    );
};

export default AddCommentForm;

