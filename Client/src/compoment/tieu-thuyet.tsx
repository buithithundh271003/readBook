
import { useEffect, useState } from "react";
import Footer from "./footer";
import Header from "./header";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { getAllProduct } from "../redux/Reducer/ProductSlice";
import { Link } from "react-router-dom";
import { getAllCategory } from "../redux/Reducer/CategorySlice";
import { getAllReview } from "../redux/Reducer/review";
import IProduct from "../interface/product";

const Product_TT = () => {
    const [input, setInput] = useState("");
    const dispatch = useAppDispatch();
    const products = useAppSelector((state) => state.Product.products);
    const pro= products?.filter((chap: IProduct)=>chap?.categoryId?._id === "660a54be5c32b8a5ed58f6fa" );

    const [result, setResult] = useState(pro);
    const [value, setValue] = useState("");
    const categories = useAppSelector((state)=>state.Category.categories);
    const rv = useAppSelector((state) => state.Review.reviews);
    console.log("rrt thu",products);
    console.log(rv);
    useEffect(() => {
        // setIsLoading(true);
        dispatch(getAllProduct())
        dispatch(getAllReview())

    }, [dispatch]);
    useEffect(()=>{
        dispatch(getAllReview())

        dispatch(getAllCategory())
    },[dispatch]);
    useEffect(() => {
        // setIsLoading(true);
        dispatch(getAllProduct())
        dispatch(getAllReview())

    }, []);
    console.log("pro",pro);
    const handleClick = (value: any)=>{
       setInput(value);
       setValue(value);
    
    }
    
    
    const handleDanhMuc = (value: any)=>{
        console.log(value);
        if(value=="Tất cả") {
            setResult(pro);
            return;
        }
        const result = categories.filter(item=>{
            return item.name==value;
        });
        // console.log(result[0]);
        const result1 = pro.filter(item=>{
            console.log(item.categoryId?._id);
            return item.categoryId._id== result[0]._id;
        })
       setResult(result1);
        
    }
    const handleButton = ()=>{
        if(value!=""){
            const result1 = pro.filter(item => {
             return value && item && item.name && item.name.toLowerCase().includes(value.toLowerCase())
            });
            setResult(result1);
        }
        else{
                setResult(pro);
            }
             
    }
    
    
   
    
    return <>
        <div className="wrapper">
            <Header />
            <div id="content-page" className="content-page">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="iq-card-transparent mb-0">
                                <div className="d-block text-center">
                                    <h2 className="mb-3">Search by Book Name</h2>
                                    <div className="w-100 iq-search-filter">
                                        <ul className="list-inline p-0 m-0 row justify-content-center search-menu-options">
                                           
                                          
                                            {/* <li className="search-menu-opt">
                                                <div className="iq-dropdown">
                                                    <div className="form-group mb-0">
                                                    <select onChange={(e)=>handleDanhMuc(e.target.value)}className="form-control form-search-control bg-white border-0" id="exampleFormControlSelect4">
                                                    <option  selected={true} >Tất cả</option>
                                                        {categories?.map(item=>{
                                                            
                                                            return <>
                                                                <option>{item.name}</option>
                                                            </>
                                                        })}
                                                        </select>
                                                       
                                                    </div>
                                                </div>
                                            </li> */}
                                            <li className="search-menu-opt">
                                               
                                                <div className="iq-search-bar search-book d-flex align-items-center">
                                                    <form action="#" className="searchbox iq-search-bar search-book d-flex align-items-center" id="searchbox">
                                                        <input type="text" value={input} onChange={(e)=>handleClick(e.target.value)}className="text search-input" id="search-text" placeholder="search here..." />
                                                        <a className="search-link" href="#"><i className="ri-search-line"></i></a>
                                                         
                                                    </form>
                                                    <button onClick={handleButton}className="btn btn-primary search-data ml-2">Search</button>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="iq-card">
                                <div className="iq-card-body">
                                    <div className="row">
                                        {result?.map(item => {
                                            return <>
                                                <div className="col-sm-6 col-md-4 col-lg-3">
                                                    <div className="iq-card iq-card-block iq-card-stretch iq-card-height search-bookcontent">
                                                        <div className="iq-card-body p-0">
                                                            <div className="d-flex align-items-center">
                                                                <div className="col-6 p-0 position-relative image-overlap-shadow">
                                                                    <Link to={`/products/${item._id}`}><img className="img-fluid rounded w-100" src={item?.images} alt="" /></Link>
                                                                    <div className="view-book">
                                                                        <Link to={`/products/${item._id}`} className="btn btn-sm btn-white">View Book</Link>
                                                                    </div>
                                                                </div>
                                                                <div className="col-6">
                                                                    <div className="mb-2">
                                                                        <h6 className="mb-1">{item.name}</h6>
                                                                        <p className="font-size-13 line-height mb-1">{item.author}</p>
                                                                        <div className="d-block">
                                                                            <span className="font-size-13 text-warning">
                                                                                <i className="fa fa-star"></i>
                                                                                <i className="fa fa-star"></i>
                                                                                <i className="fa fa-star"></i>
                                                                                <i className="fa fa-star"></i>
                                                                                <i className="fa fa-star"></i>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                 
                                                        
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </>
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    </>
}

export default Product_TT