import Header from "../../../compoment/header.jsx";
import Footer from "../../../compoment/footer.tsx";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hook.ts";
import { useEffect } from "react";
import { getAllProduct } from "../../../redux/Reducer/ProductSlice.ts";
import { getAllChapter } from "../../../redux/Reducer/Chapter.ts";


const homePage = () => {
    const dispatch = useAppDispatch();
    const products = useAppSelector((state) => state.Product.products);
    console.log(products);
  
    
    const categories = useAppSelector((state) => state.Category.categories);

    console.log(categories);

    useEffect(() => {
        // setIsLoading(true);
        dispatch(getAllProduct())
        dispatch(getAllChapter())
    }, [dispatch]);

    useEffect(() => {
        // setIsLoading(true);
        dispatch(getAllProduct())
        dispatch(getAllChapter())

    }, []);
    return <>
        <div className="wrapper">
            <Header />
            <div id="content-page" className="content-page">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="iq-card iq-card-block iq-card-stretch iq-card-height">
                                <div className="iq-card-header d-flex justify-content-between align-items-center position-relative">
                                    <div className="iq-header-title">
                                        <h4 className="card-title mb-0">Gợi ý cho bạn</h4>
                                    </div>
                                    <div className="iq-card-header-toolbar d-flex align-items-center">
                                        <Link to={`/products`} className="btn btn-sm btn-primary view-more">Xem Thêm</Link>
                                    </div>
                                </div>
                                <div className="iq-card-body">
                                    <div className="row">
                                        {products.map((product) => {
                                            return <>
                                                <div className="col-sm-6 col-md-4 col-lg-3">
                                                    <div className="iq-card iq-card-block iq-card-stretch iq-card-height browse-bookcontent">
                                                        <div className="iq-card-body p-0">
                                                            <div className="d-flex align-items-center">
                                                                <div className="col-6 p-0 position-relative image-overlap-shadow">
                                                                    <Link to=""><img className="img-fluid rounded w-100" src={product.images} alt="" /></Link >
                                                                    <div className="view-book">
                                                                        <Link to={`/products/${product._id}`} className="btn btn-sm btn-white">Mua Ngay</Link>
                                                                    </div>
                                                                </div>
                                                                <div className="col-6">
                                                                    <div className="mb-2">
                                                                        <h6 className="mb-1">{product.name}</h6>
                                                                        <p className="font-size-13 line-height mb-1">{product.author}</p>
                                                                        <div className="d-block line-height">
                                                                            <span className="font-size-11 text-warning">
                                                                                <i className="fa fa-star"></i>
                                                                                <i className="fa fa-star"></i>
                                                                                <i className="fa fa-star"></i>
                                                                                <i className="fa fa-star"></i>
                                                                                <i className="fa fa-star"></i>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                
                                                                    
                                                                </div>
                                                            </div >
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
        </div >

    </>
}
export default homePage;