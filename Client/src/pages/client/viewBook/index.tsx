import { useEffect, useState } from "react";
import Footer from "../../../compoment/footer";
import React from 'react';
import "./index.scss";

import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { getAllProduct } from "../../../redux/Reducer/ProductSlice";
import { getAllChapter } from "../../../redux/Reducer/Chapter";


import { Link, useNavigate, useParams } from "react-router-dom";
import IProduct from "../../../interface/product";
import IChapter from "../../../interface/chapter";


import Item from "antd/es/list/Item";
 


const viewBook = () => {
   
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [user, setUser] = useState()

    const products = useAppSelector((state) => state.Product.products);
    const chapter= useAppSelector((state)=>state.Chapter.chapters);

    console.log("hhh",products);

    
    // const categories = useAppSelector((state) => state.Category.categories);

    const [quantity, setQuantity] = useState(1)
    useEffect(() => {
        // setIsLoading(true);
        dispatch(getAllProduct())
        dispatch(getAllChapter())

        const userStore = JSON.parse(localStorage.getItem("user")!)
        if (userStore) {
            setUser(userStore)
        }
    }, []);
    useEffect(() => {
        dispatch(getAllProduct())
        dispatch(getAllChapter())

        const userStore = JSON.parse(localStorage.getItem("user")!)
        if (userStore) {
            setUser(userStore)
        }
    }, [dispatch]);
  

    const { id } = useParams();
    console.log("viewBookid",id);
   
    const getChapterProduct= chapter?.find((chap: IChapter) => chap._id === id);
    console.log("kk",getChapterProduct);
    const product = products?.find((product: IProduct) => product._id === getChapterProduct?.productId?._id);
    console.log("productis",product);





 
    const getChapterOther= chapter?.filter((chap: IChapter) =>( chap?.productId?._id !== id && chap.productId?._id===product?._id) );
    

    const cateProduct = products?.filter((newProduct: IProduct) => newProduct.categoryId?._id === product?.categoryId?._id);
    

    return <>
    <div className="contain">

                <div id="wrap" className="d-flex " >
                    <div id="content"  className="overflow-scroll bg-light" style={{maxWidth:"100vw", maxHeight:"100vh"}}>
        
                        <code className="overflow-auto text-center">
                            {getChapterProduct?.content}
                        </code>
                    </div>
                    <div className="chapter-view pr-4">
                        <h3 className="mb-3 ">Danh sách các chương </h3>
                       
                            {chapter?.map(item=>{
                                 {
                                    var checkactive= false;
                                    if(item._id===id){
                                        checkactive=true;
                                    }


                                }
                                      
                            return <>
                                                    
                                        <div className="view-book ">
                                        <Link to={`/viewBook/${item._id}`} className={ checkactive? "btn btn-sm btn-warning mb-1" :"btn btn-sm btn-danger mb-1"} >{item.name}: {item.title}</Link>
                                        </div>
                     
                                                            
                            </>
                            })}
                                                   
                                               
                                           
                        </div>
                </div>
    </div>

    </>
}
export default viewBook;