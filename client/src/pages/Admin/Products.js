import React, {useState, useEffect} from "react"
import AdminMenu from "../../components/imp/AdminMenu"
import Layout from "./../../components/imp/layout"
import axios from "axios"
import toast from "react-hot-toast"
import { Link } from "react-router-dom"
const Products=()=>{
    const [products, setProducts] = useState([])


    //getall products
    const getAllProducts = async()=>{
        try{
        const {data} = await axios.get("/api/v1/product/get-product")
            setProducts(data.products)
        } 
        catch(error){
        console.log(error)
        toast.error("Something Wrong in all products")
        }
    }

    //lifecycle method
    useEffect(() => {
        getAllProducts()
    }, [])      
    return (
        <Layout>
            <div className="row">
                <div className="col-md-3">
                    <AdminMenu />
                </div>

                <div className="col-md-9 ">
                    <h1 className="text-center">All Products List</h1>

                    <div className="row">
                        {/*bootstrapcard*/}
                        {
                            products?.map((p)=>(                  
                                <Link   to={`/dashboard/admin/product/${p.slug}`} className="col-md-2 m-2 product-link">
                                    <div className="card m-2" style={{width: "100%"}}>
                                        <img
                                            src={`/api/v1/product/product-photo/${p._id}`}
                                            className="card-img-top"
                                            alt={p.name}
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title">{p.name}</h5>
                                            <p className="card-text">{p.description}</p>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        }
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Products
