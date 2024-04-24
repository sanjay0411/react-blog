import React,{useState} from 'react'
import {Link,useNavigate} from 'react-router-dom';
import {getAuth,createUserWithEmailAndPassword} from 'firebase/auth';

function SignupPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const registration=async()=>{
    try{
      if(password !== confirmPassword){
        setError('Password and confirm password do not match');
        return;
      }
      await createUserWithEmailAndPassword(getAuth(),email,password);
      navigate('/articles');
    }catch(error){
      setError(error);
    }
  }

  return (
    <div>
      <h1>Signup Form</h1>
      {error && <p className="error">{error}</p>}
      <input
        placeholder='Enter your  First Name'
        value={firstName}
        onChange={(e)=>setFirstName(e.target.value)}
      />
      <input
        placeholder='Enter your  Last Name'
        value={lastName}
        onChange={(e)=>setLastName(e.target.value)}
      />
      <input
        placeholder='Enter your  Email'
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
      />
      <input
        placeholder='Enter your  Password'
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
      />
      <input
        placeholder='Enter Password Again'
        value={confirmPassword}
        onChange={(e)=>setConfirmPassword(e.target.value)}
      />
      <input
        placeholder='Enter your  Phone Number'
        value={phoneNumber}
        onChange={(e)=>setPhoneNumber(e.target.value)}
      />
      <button onClick={registration}>Register</button>
      <Link to="/login">Already have an account?Login here</Link>
    </div>
  )
}

export default SignupPage;