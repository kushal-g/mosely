import React,{useContext, useEffect} from 'react'
import {Route, Redirect} from "react-router-dom"
import {AuthContext} from '../context/Auth'

export default function PrivateTeacherRoute({component:RouteComponent, ...rest}) {
    const {currentUser, role, loading} = useContext(AuthContext)
    
    return (
        <Route
            {...rest}
            render={
                routeProps=>
                loading?
                <div></div>
                :
                role?.student ?(
                    <RouteComponent {...routeProps} user={currentUser}/>
                ):(
                <Redirect to="/" />
                )
            }
        />  
    )
}
