import React,{useContext} from 'react'
import {Route, Redirect} from "react-router-dom"
import {AuthContext} from '../context/Auth'

export default function PrivateRoute({component:RouteComponent, ...rest}) {
    const {currentUser} = useContext(AuthContext)
    
    return (
        <Route
            {...rest}
            render={
                routeProps=>
                !!currentUser ?(
                    <RouteComponent {...routeProps}/>
                ):(
                <Redirect to="/" />
                )
            }
        />  
    )
}
