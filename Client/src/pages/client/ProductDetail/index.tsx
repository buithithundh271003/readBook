import { useEffect, useState } from "react";
import Footer from "../../../compoment/footer";
import Header from "../../../compoment/header";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { getAllProduct } from "../../../redux/Reducer/ProductSlice";
import { getAllChapter} from "../../../redux/Reducer/Chapter";

import { Link, useParams } from "react-router-dom";
import IProduct from "../../../interface/product";
import IChapter from "../../../interface/chapter";
import "./index.scss";
import { FacebookShareButton } from 'react-share';

const productDetail = () => {
    const dispatch = useAppDispatch();
   
    const [user, setUser] = useState()

    const products = useAppSelector((state) => state.Product.products);
    const chapter= useAppSelector((state)=>state.Chapter.chapters);
    console.log("chapter", chapter);
    console.log("chapter-pro", products);

    const categories = useAppSelector((state) => state.Category.categories);

    console.log(categories);


    
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
        // setIsLoading(true);
        dispatch(getAllProduct())
        dispatch(getAllChapter())

        const userStore = JSON.parse(localStorage.getItem("user")!)
        if (userStore) {
            setUser(userStore)
        }
    }, [dispatch]);

    const { id } = useParams();
    console.log("id parám",id);

    const product = products?.find((product: IProduct) => product._id === id);
    const getChapterProduct= chapter?.filter((chap: IChapter) => chap.productId?._id === id);

    
    console.log("getchapterPro",getChapterProduct);
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
                                    <h4 className="card-title mb-0">Thông tin</h4>
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
                                                    <h3 className="mb-3">{product?.name}</h3>
                                                   
                                                    <div className="mb-3 d-block">
                                                        <span className="font-size-20 text-warning">
                                                            <i className="fa fa-star mr-1"></i>
                                                            <i className="fa fa-star mr-1"></i>
                                                            <i className="fa fa-star mr-1"></i>
                                                            <i className="fa fa-star mr-1"></i>
                                                            <i className="fa fa-star"></i>
                                                        </span>
                                                    </div>
                                                    <pre className="text-dark mb-4 pb-4 iq-border-bottom d-block">{product?.description}</pre>
                                                    <div className="text-primary mb-4">Tác giả: <span className="text-body">{product?.author}</span></div>
                                                
                                                   
                                                    <div className="mb-3">
                                                        <Link to="#" className="text-body text-center"><span className="avatar-30 rounded-circle bg-primary d-inline-block mr-2"><i className="ri-heart-fill"></i></span><span>Thêm vào danh sách yêu thích</span></Link>
                                                    </div>
                                                    <div className="iq-social d-flex align-items-center">
                                                        <h5 className="mr-2">Chia sẻ:</h5>
                                                        <ul className="list-inline d-flex p-0 mb-0 align-items-center">
                                                            <li>
                                                                <FacebookShareButton
                                                                    url={'https://www.example.com'}
                                                                    quote={'pro'}
                                                                    hashtag="#truyện hay"
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
                                                <div className="iq-card-body p-0">
                                                    <h3 className="mb-3 ">Danh sách các chương </h3>
                                                     {getChapterProduct?.map(item=>{
                                                        return <>
                                                            {user?
                                                                 <div className="view-book">
                                                                 <Link to={`/viewBook/${item._id}`} className="btn btn-sm btn-white">{item.name}: {item.title}</Link>
                                                                 </div>
                                                                 :
                                                                 <div className="view-book">
                                                                 <Link to={`/signin`} className="btn btn-sm btn-white">{item.name}: {item.title}</Link>
                                                                 </div>

                                                            }
                                                            
                                                        </>
                                                     })}
                                                   
                                        
                                           
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