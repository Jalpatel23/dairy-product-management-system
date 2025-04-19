import React from "react"
import Layout from "../../components/imp/layout"
import UserMenu from "../../components/imp/UserMenu"
import { useAuth } from "../../context/auth"
const Dashboard=()=>{
    const [auth] = useAuth()
    return(
        <Layout>
            <div className="container-flui m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu/>
                    </div>
                    <div className="col-md-9">
                        <div className="card w-75 p-3">
                            <h2>USERNAME: {auth?.user?.name}</h2>
                            <h2>EMAIL: {auth?.user?.email}</h2>
                            <h2>ADDRESS: {auth?.user?.address}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Dashboard
