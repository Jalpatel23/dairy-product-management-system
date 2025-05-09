import { useState, useEffect } from "react"
import { useAuth } from "../../context/auth"
import { Outlet } from "react-router-dom"
import axios from "axios"
import Spinner from "../spinner"

export default function AdminRoute(){
    const [ok, setOk] = useState(false)
    const [auth, setAuth] = useAuth()

    useEffect(()=>{
        const authCheck = async()=>{
            const res = await axios.get("/api/v1/auth/admin-auth")
            if (res.data.ok)
                setOk(true)
            else
                setOk(false)
        }
        if(auth?.token) 
            authCheck()
    },[auth?.token])

    return ok ? <Outlet /> : <Spinner path="/"/>
//jyare user /dashboard/admin lakhe che ae admin ne access nai kari sakto and home page par aai jai chee
//par error ave che home page par aavta pehla
}
