import React, { useState } from "react"
import Layout from "../../components/imp/layout"
import toast from 'react-hot-toast'
import axios from "axios"
import { useNavigate, useLocation} from "react-router-dom"
import "../../styles/AuthStyles.css"
import { useAuth } from "../../context/auth"
const Login=()=>{
    const [email, setEmail]=useState("")
    const [password, setPassword]= useState("")
    const navigate=useNavigate()
    const [auth, setAuth] = useAuth()
    const location=useLocation()

    //form function
    const handleSubmit= async (e) =>{
        e.preventDefault()
        try {
            const res = await axios.post(
                '/api/v1/auth/login',
                { email,password}
            )
            if ( res && res.data.success){
                toast.success(res.data && res.data.message)
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token,
                })
                localStorage.setItem("auth", JSON.stringify(res.data))
                navigate(location.state || "/")
            }
            else
                toast.error(res.data.message)
        }
        catch(error) {
            console.log(error)
            toast.error("something went wrong")
        }
    }
    return (
        <Layout>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <h4 className="title">LOGIN</h4>
                    
                    <div className="mb-3">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                            id="exampleInputEmail1"
                            placeholder="Enter Your Email"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Enter Your Password"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <button type="button" className="btn btn-primary" onClick={()=>{navigate('/forgot-password')}}>
                            FORGOT PASSWORD
                        </button>
                    </div>
                    
                    <button type="submit" className="btn btn-primary">
                        Login
                    </button>
                </form>
            </div>
        </Layout>
    )
}

export default Login
