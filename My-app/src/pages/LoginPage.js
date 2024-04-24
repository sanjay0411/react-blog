 import {useState} from 'react'
import {Link,useNavigate} from 'react-router-dom';
import {getAuth,signInWithEmailAndPassword} from "firebase/auth"

function LoginPage() {
  
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [error,setError]=useState('');

  const navigate=useNavigate();

  const login = async() => {
    try{
        await signInWithEmailAndPassword(getAuth(),email,password);
        navigate('/articles');
    }catch(error){
        setError(error.message);
    }
};
  return (
    <div>
        <h1>Login Form</h1>
        {error && <p className="error">{error}</p>}
        <input
           placeholder='Enter your  Email'
           value={email}
           onChange={(e)=>setEmail(e.target.value)}
        />
        <input
            placeholder='Enter your password'
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
        />
        <button onClick={login}>Login</button>
        <Link to="/signup">Ready to dive in?Signup here</Link>
    </div>
  )
}

export default LoginPage;