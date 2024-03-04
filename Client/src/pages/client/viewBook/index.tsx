import { useEffect, useState } from "react";
import Footer from "../../../compoment/footer";
import Header from "../../../compoment/header";
import React from 'react';

import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { getAllProduct } from "../../../redux/Reducer/ProductSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import IProduct from "../../../interface/product";
import { message } from "antd";
import { Affix, Button } from 'antd';

import Item from "antd/es/list/Item";
 


const viewBook = () => {
   
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [user, setUser] = useState()

    const products = useAppSelector((state) => state.Product.products);
    console.log("hhh",products);
    
    // const categories = useAppSelector((state) => state.Category.categories);

    const [quantity, setQuantity] = useState(1)
    useEffect(() => {
        // setIsLoading(true);
        dispatch(getAllProduct())
        const userStore = JSON.parse(localStorage.getItem("user")!)
        if (userStore) {
            setUser(userStore)
        }
    }, []);
    useEffect(() => {
        // setIsLoading(true);
        dispatch(getAllProduct())
        const userStore = JSON.parse(localStorage.getItem("user")!)
        if (userStore) {
            setUser(userStore)
        }
    }, [dispatch]);
  

    const { id } = useParams();
    console.log("viewBookid",id);
    const product = products?.find((product: IProduct) => product._id === id);
    console.log("productis",product);




 

 

    const cateProduct = products?.filter((newProduct: IProduct) => newProduct.categoryId?._id === product?.categoryId?._id);
    return <>
    
        <div className="wrapper">
            <div id="content-page" className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="iq-card iq-card-block iq-card-stretch iq-card-height">
                                <div className="iq-card-header d-flex justify-content-between align-items-center">
                                    <h4 className="card-title mb-0">{product?.name}</h4>
                                </div>
                                <div className="iq-card-body pb-0">
                                    <div className="description-contens align-items-top row">
                                        <div className="col-md-3">
                                            <div className="iq-card-transparent iq-card-block iq-card-stretch iq-card-height">
                                                <div className="iq-card-body p-0">
                                                    <div className="row align-items-center">
                                                       
                                                        <div className="col-sm-12">
                                                            <ul id="description-slider" className="list-inline p-0 m-0  d-flex align-items-center">
                                                                <ul id="description-slider-nav" className="list-inline p-0 m-0  d-flex align-items-center">
                                                                    {product?.images.map((image) => {
                                                                        return <>
                                                                            <li>
                                                                                <Link to="#">
                                                                                    <img src={image} className="img-fluid rounded w-100" alt="" />
                                                                                </Link>
                                                                            </li>

                                                                        </>
                                                                    })}
                                                                </ul>
                                                            </ul>
                                                        </div>
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-8">
                                            <div className="iq-card-transparent iq-card-block iq-card-stretch iq-card-height">
                                                <div className="iq-card-body p-0">
                                                    <div className="row align-items-center">
                                                    <span className="text-dark mb-4 pb-4 iq-border-bottom overflow-scroll" 
                                                    style={{
                                                       maxHeight:"80vh",
                                                       
                                                        
                                                       
                                                    }}
                                                    >{product?.content}</span>

                                                       
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div className="iq-card iq-card-block iq-card-stretch iq-card-height">
                                <div className="iq-card-header d-flex justify-content-between align-items-center position-relative">
                                    <div className="iq-header-title">
                                        <h4 className="card-title mb-0 d-flex ">{product?.name}</h4>
                                    </div>
                                   
                                </div>
                                <div className="iq-card-body single-similar-contens">
                                
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div className="iq-card iq-card-block iq-card-stretch iq-card-height">
                                <div className="iq-card-header d-flex justify-content-between align-items-center position-relative">
                                    <div className="iq-header-title">
                                        <h4 className="card-title mb-0">Sản phẩm tương tự</h4>
                                    </div>
                                    <div className="iq-card-header-toolbar d-flex align-items-center">
                                        <Link to={`/products`} className="btn btn-sm btn-primary view-more">Xem thêm</Link>
                                    </div>
                                </div>
                                <div className="iq-card-body single-similar-contens">
                                    <ul id="single-similar-slider" className="list-inline p-0 mb-0 row">
                                        {cateProduct?.map(item => {
                                            return <>
                                                <li className="col-md-3">
                                                    <div className="row align-items-center">
                                                        <div className="col-5">
                                                            <div className="position-relative image-overlap-shadow">
                                                                <Link to={`/products/${item._id}`}><img className="img-fluid rounded w-100" src={item.images} alt="" /></Link>
                                                                <div className="view-book">
                                                                    <Link to={`/products/${item._id}`} className="btn btn-sm btn-white">Xem thêm</Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-7 pl-0">
                                                            <h6 className="mb-2">{item.name}</h6>
                                                            <p className="text-body">Tác giả : {item.author}</p>
                                                            <Link to={`/products/${item._id}`} className="text-dark" >Đọc ngay<i className="ri-arrow-right-s-line"></i></Link>
                                                        </div>
                                                    </div>
                                                </li>

                                            </>
                                        })}
                                       
                                    </ul>
                                </div>
                            </div>
                        </div>
                   
                       
                    </div>
                </div>
            </div>

        </div >
        <Footer />
    </>
}
export default viewBook;