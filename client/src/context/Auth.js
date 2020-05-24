import React,{useState,useEffect} from 'react'
import app from '../utils/base'

export const AuthContext = React.createContext();

export const AuthProvider = ({children}) => {

    const [currentUser,setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [role, setRole] = useState({})
    
    useEffect(()=>{
        app.auth().onAuthStateChanged(user=>{
            user.getIdTokenResult()
            .then(token=>{
                setCurrentUser(user)
                setRole(token.claims.role)
                setLoading(false)
            })
        })
        
    },[])
    return (
        <AuthContext.Provider value={{currentUser,loading,role}}>
            {children}
        </AuthContext.Provider>
    )
}