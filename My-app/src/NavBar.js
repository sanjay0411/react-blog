import {Link,useNavigate} from "react-router-dom";
import {getAuth,signOut} from "firebase/auth";
import useUser from "./hook/useUser";


const Navbar=()=>{
    const {user}=useUser();
    const navigate = useNavigate()
    
    return(
         <nav>
            <ul>
               <li><Link to="/">Home</Link></li>
                <li><Link to="/articles">Articles</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/signup">SignUp</Link></li>
            </ul>
            <div className="nav-right">
                {user?
                (<button onClick = {()=>{signOut(getAuth())}}>Logout</button>)
                :(<button onClick = {()=>{navigate('/login')}}>Login</button>)
                }
            </div>
         </nav>
    );
}

export default Navbar;