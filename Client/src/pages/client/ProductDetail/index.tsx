import { useEffect, useState } from "react";
import Footer from "../../../compoment/footer";
import Header from "../../../compoment/header";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { getAllProduct } from "../../../redux/Reducer/ProductSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import IProduct from "../../../interface/product";

import { FacebookShareButton, FacebookIcon } from 'react-share';




const productDetail = () => {
    console.log("Vào trang detail r");
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [user, setUser] = useState()
 
    const userStore = JSON.parse(localStorage.getItem("user")!)




    const products = useAppSelector((state) => state.Product.products);


  
    const categories = useAppSelector((state) => state.Category.categories);
    console.log(categories);
    useEffect(() => {
        dispatch(getAllProduct())

        const userStore = JSON.parse(localStorage.getItem("user")!)
        if (userStore) {
            setUser(userStore)
        }
    }, []);
    useEffect(() => {
        dispatch(getAllProduct())
        const userStore = JSON.parse(localStorage.getItem("user")!)
        if (userStore) {
            setUser(userStore)
        }
    }, [dispatch]);

    const { id } = useParams();
    console.log("id parám",id);

    const product = products?.find((product: IProduct) => product._id === id);
  

    
    console.log("productsdetail",product);
    
   

 

 

    const cateProduct = products?.filter((newProduct: IProduct) => newProduct.categoryId?._id === product?.categoryId?._id);
    return <>
        <div className="wrapper">
            <Header />
            <div id="content-page" className="content-page">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="iq-card iq-card-block iq-card-stretch iq-card-height">
                                <div className="iq-card-header d-flex justify-content-between align-items-center">
                                    <h4 className="card-title mb-0 ">Thông tin</h4>
                                </div>
                                <div className="iq-card-body pb-0">
                                    <div className="description-contens align-items-top row">
                                        <div className="col-md-2">
                                            <div className="iq-card-transparent iq-card-block iq-card-stretch iq-card-height">
                                                <div className="iq-card-body p-0">
                                                    <div className="row align-items-center">
                                                        <div className="col-12">
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
                                                        </div>
                                                    
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="iq-card-transparent iq-card-block iq-card-stretch iq-card-height">
                                                <div className="iq-card-body p-0">
                                                    <h3 className="mb-3 " style={{fontWeight:"bold", fontSize:"1.5rem"}}>{product?.name}</h3>
                                                   
                                                    <div className="mb-3 d-block">
                                                        <span className="font-size-20 text-warning">
                                                            <i className="fa fa-star mr-1"></i>
                                                            <i className="fa fa-star mr-1"></i>
                                                            <i className="fa fa-star mr-1"></i>
                                                            <i className="fa fa-star mr-1"></i>
                                                            <i className="fa fa-star"></i>
                                                        </span>
                                                    </div>
                                                    <div className="text-dark mb-4 pb-4 iq-border-bottom d-block">{product?.description}</div>
                                                    <div className="text-primary mb-4">Tác giả: <span className="text-body">{product?.author}</span></div>
                                                
                                                   
                                                    <div className="mb-3">
                                                        <Link to="#" className="text-body text-center"><span className="avatar-30 rounded-circle bg-primary d-inline-block mr-2"><i className="ri-heart-fill" onClick={()=>addToList(favorite)}></i></span><span>Thêm vào danh sách yêu thích</span></Link>
                                                    </div>
                                                    <div className="iq-social d-flex align-items-center">
                                                        <h5 className="mr-2">Chia sẻ:</h5>
                                                        <ul className="list-inline d-flex p-0 mb-0 align-items-center">
                                                            <li>
                                                                <FacebookShareButton
                                                                    url={product?.images}
                                                                    quote={product?.name}
                                                                    hashtag={product?.name}
                                                                > 
                                                                <Link to="#" className="avatar-40 rounded-circle bg-primary mr-2 facebook"><i className="fa fa-facebook" aria-hidden="true"></i></Link>

                                                                </FacebookShareButton> 
                                                            </li>
                                                            <li>
                                                                <Link to="#" className="avatar-40 rounded-circle bg-primary mr-2 twitter"><i className="fa fa-twitter" aria-hidden="true"></i></Link>
                                                            </li>
                                                            <li>
                                                                <Link to="#" className="avatar-40 rounded-circle bg-primary mr-2 youtube"><i className="fa fa-youtube-play" aria-hidden="true"></i></Link>
                                                            </li>
                                                            <li >
                                                                <Link to="#" className="avatar-40 rounded-circle bg-primary pinterest"><i className="fa fa-pinterest-p" aria-hidden="true"></i></Link>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4 bg-light">
                                            <div className="iq-card iq-card-block iq-card-stretch iq-card-bold iq-card-height " style={{border:"1px soild black"}}>
                                                <div className="iq-card-body p-0 pl-2">
                                                    <h3 className="mb-2 mt-2 ml-2 " style={{fontSize:"1.3rem", fontWeight:"400"}}>Danh sách các chương </h3>
                                                    <Link to={`/`} className="btn btn-sm btn-white" style={{color:"blue",font:"100% times, 'times new romans', serif"}}>Chương 1: Nội dung chương 1</Link>
                                                    <br></br>
                                                    <Link to={`/`} className="btn btn-sm btn-white" style={{color:"blue", font:"100% times, 'times new romans', serif"}}>Chương 2: Nội dung chương 2</Link>
                                                    <br></br>

                                                    <Link to={`/`} className="btn btn-sm btn-white" style={{color:"blue",font:"100% times, 'times new romans', serif"}}>Chương 3: Nội dung chương 3</Link>


                                                                
                                                        
                                
                                                                                                         
                                           
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
export default productDetail;