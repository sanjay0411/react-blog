import {useEffect,useState} from 'react';
import {getAuth,onAuthStateChanged } from "firebase/auth";

const useUser =() => {
    const [user,setUser] = useState(null);
    const [isLoading,setIsloading] = useState(true);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
            setUser(user);
            setIsloading(isLoading);
        });
        return unsubscribe;
    }, []);
    return {user,isLoading};
};

export default useUser;