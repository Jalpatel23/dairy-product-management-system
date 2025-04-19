import React from "react"
import AdminMenu from "../../components/imp//AdminMenu"
import Layout from "./../../components/imp/layout"

const Users=()=> {
    return (
        <Layout>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>All Users</h1>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Users
