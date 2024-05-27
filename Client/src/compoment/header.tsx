import { useEffect } from "react";
import React from "react";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { getAllCategory } from "../redux/Reducer/CategorySlice";
import { Link, useNavigate } from "react-router-dom";
import { getAllProduct } from "../redux/Reducer/ProductSlice";
import { getAllReadLater } from "../redux/Reducer/readLater";
import img from "../style/images/bg-03.jpg"
import { message } from "antd";
import IProduct from "../interface/product";
import IReadLater from "../interface/readLater";
import { Affix, Button } from 'antd';


const Header = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [input, setInput] = React.useState("");
    const user = JSON.parse(localStorage.getItem("user")!)

    const categories = useAppSelector((state) => state.Category.categories);
    const products = useAppSelector((state) => state.Product.products);
    const [container, setContainer] = React.useState<HTMLDivElement | null>(null);

    const readsLater = useAppSelector((state) => state.ReadLater.readLaters);

    // const Conproduct = con ? products.filter((newProduct: IProduct) => con.includes(newProduct._id)) : [];

    const getLater=user? readsLater?.filter((chap: IReadLater)=>chap.userId === user._id ):[];
   
    

    const logout = () => {
        localStorage.clear();
        message.success("Đăng xuất thành công");
        navigate('/')
    }



    useEffect(() => {

        // setIsLoading(true);
        dispatch(getAllCategory())
        if (user) {
            dispatch(getAllProduct())
        dispatch(getAllReadLater())

        }
    }, [dispatch]);

    useEffect(() => {
        // setIsLoading(true);
        dispatch(getAllCategory())
        if (user) {
            dispatch(getAllProduct())
        dispatch(getAllReadLater())

        }
    }, []);
    const containerStyle: React.CSSProperties = {
        width: '100%',
        height: '300px',
        overflow: 'auto',
        border: '1px solid #40a9ff',
      };
      
      const style: React.CSSProperties = {
        width: '100%',
        height: '',
      };
    return <>
        {/* <div className="iq-sidebar">
            <div className="iq-sidebar-logo d-flex justify-content-between">
                <Link to={`/`} className="header-logo">
                    <img src="src/src/style/images/logo.png" className="img-fluid rounded-normal" alt="" />
                    <div className="logo-title">
                        <span className="text-primary text-uppercase">NHASACHTV</span>
                    </div>
                </Link>
            </div>
            <div id="sidebar-scrollbar">
                <nav className="iq-sidebar-menu">
                    <ul id="iq-sidebar-toggle" className="iq-menu">
                        <li className="active active-menu">
                            <Link to={`/`} className="iq-waves-effect" data-toggle="collapse" aria-expanded="true"><span className="ripple rippleEffect"></span><i className="las la-home iq-arrow-left"></i><span>Trang Chủ</span><i className="ri-arrow-right-s-line iq-arrow-right"></i></Link>
                            <ul id="dashboard" className="iq-submenu collapse show" data-parent="#iq-sidebar-toggle">
                            </ul>
                        </li>
                        <li>
                            <Link to={`/products`} className="iq-waves-effect collapsed" data-toggle="collapse" aria-expanded="false"><i className="lab la-elementor iq-arrow-left"></i><span>Danh mục sản phẩm</span><i className="ri-arrow-right-s-line iq-arrow-right"></i></Link>
                            <ul id="ui-elements" className="iq-submenu collapse" data-parent="#iq-sidebar-toggle">
                                {categories.map(item => {
                                    return <>
                                        <li className="elements">
                                            <Link to={`/products`} className="iq-waves-effect collapsed" data-toggle="collapse" aria-expanded="false"><i className="ri-play-circle-line"></i><span>{item.name}</span><i className="ri-arrow-right-s-line iq-arrow-right"></i></Link>
                                        </li>

                                    </>
                                })}
                            </ul>
                        </li>

                    </ul>
                </nav>
            </div>
        </div> */}
        <div className="bg-gray-800 iq-top-navbar">
            <div className="iq-navbar-custom">
                <nav className="navbar navbar-expand-lg navbar-light p-0">
                    <div className="iq-menu-bt d-flex align-items-center">
                        <div className="wrapper-menu">
                        </div>
                        <div className="iq-navbar-logo d-flex justify-content-between" style={{alignItems:"center"}}>
                            <a href="index.html" className="header-logo">
                                <img src= {img} className="img-fluid rounded-normal" style={{width:"30px", height:"25px"}} alt="" />
                                <div className="logo-title">
                                    <Link to={`/`} className="text-primary text-uppercase px-3">IMG1</Link> 
                                </div>
                               
                            </a>
                            <div className="text-primary ">
                            <Link to={`/sach-khoa-hoc`} className="text-primary px-2">Sách khoa học</Link> 

                                
                            </div>
                            <div className="text-primary ">
                            <Link to={`/thieu-nhi`} className="text-primary px-2">Truyện thiếu nhi</Link> 

                                
                            </div>
                        
                            <div className="text-primary ">
                            <Link to={`/tieu-thuyet`} className="text-primary px-2">Tiểu thuyết</Link> 

                                
                            </div>
                            <div className="iq-search-bar " style={{marginLeft:"110px"}}>
                                    <form action="#" className="searchbox">
                                        <input type="text" className="text search-input" placeholder="Tìm kiếm sản phẩm..." />
                                        <a className="search-link" href="#"><i className="ri-search-line"></i></a>
                                    </form>
                            </div>
                                <button className="navbar-toggl" type="button"style={{color:"white"}}>
                                    Tìm kiếm
                                </button>
                        </div>
                    </div>
                  
                                
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-label="Toggle navigation">
                        <i className="ri-menu-3-line"></i>
                    </button>
                    <div className=" navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto navbar-list">
                         
                            <li className="nav-item nav-icon dropdown">
                                <a href="#" className="search-toggle iq-waves-effect text-gray rounded">
                                    <i className="ri-notification-2-line"></i>
                                    
                                    <span className="badge badge-danger count-cart rounded-circle">{ getLater? getLater.length : 0}</span>
                                </a>
                                <div className="iq-sub-dropdown">
                                    <div className="iq-card shadow-none m-0">
                                        <div className="iq-card-body p-0 toggle-cart-info">
                                            <div className="bg-primary p-3">
                                                <h5 className="mb-0 text-white">Danh sách đọc sau<small className="badge  badge-light float-right pt-1">{ getLater? getLater.length : 0}</small></h5>
                                            </div>
                                            {/* 
                                             */}
                                            
                                                
                                            {getLater?.map(item => {
                                                const product = products.find((product: IProduct) => product._id === item.productId)
                                                return <>
                                                    <Link to={`/products/${product?._id}`} className="iq-sub-card">
                                                        <div className="iq-sub-card">

                                                            <div className="media align-items-center">
                                                                <div className="">
                                                                    {<img className="rounded" src={product?.images[0]}></img>}
                                                                </div>
                                                                <div className="media-body ml-3">
                                                                    <h6 className="mb-0 ">{product?.name}</h6>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Link>

                                                </>
                                            })}
                                            

                                   
                                        </div>
                                    </div>
                                </div>
                            </li>
                                
                         
                            {user ?
                                <li className="line-height pt-3">
                                    <a href="#" className="search-toggle iq-waves-effect d-flex align-items-center">
                                        {/* <img src="src/style/images/user/1.jpg" className="img-fluid rounded-circle mr-3" alt="user" /> */}
                                        <div className="caption">
                                            <h6 className="mb-1 line-height text-white">Xin Chào, {user.fullname}</h6>
                                            <p className="mb-0 text-primary">Tài Khoản</p>
                                        </div>
                                    </a>
                                    <div className="iq-sub-dropdown iq-user-dropdown">
                                        <div className="iq-card shadow-none m-0">
                                            <div className="iq-card-body p-0 ">
                                                <div className="bg-primary p-3">
                                                    <h5 className="mb-0 text-white line-height">Xin Chào {user.fullname}</h5>
                                                </div>
                                                <a href="profile-edit.html" className="iq-sub-card iq-bg-primary-hover">
                                                    <div className="media align-items-center">
                                                        <div className="rounded iq-card-icon iq-bg-primary">
                                                            <i className="ri-file-user-line"></i>
                                                        </div>
                                                        <div className="media-body ml-3">
                                                            <h6 className="mb-0 ">Tài khoản của tôi</h6>
                                                        </div>
                                                    </div>
                                                </a>
                                                <Link to={`/history`} className="iq-sub-card iq-bg-primary-hover">
                                                    <div className="media align-items-center">
                                                        <div className="rounded iq-card-icon iq-bg-primary">
                                                            <i className="ri-account-box-line"></i>
                                                        </div>
                                                        <div className="media-body ml-3">
                                                            <h6 className="mb-0 ">Lịch sử</h6>
                                                        </div>
                                                    </div>
                                                </Link>
                                                <div className="d-inline-block w-100 text-center p-3">
                                                    <button className="bg-primary iq-sign-btn" onClick={() => logout()} role="button">Sign out<i className="ri-login-box-line ml-2"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>

                                :
                                <li className="line-height pt-3">
                                    <a href="#" className="search-toggle iq-waves-effect d-flex align-items-center">
                                        {/* <img src="src/style/images/user/1.jpg" className="img-fluid rounded-circle mr-3" alt="user" /> */}
                                        <div className="caption">
                                            <h6 className="mb-1 line-height"style={{color:"white"}}>Tài khoản</h6>
                                            {/* <p className="mb-0 text-primary">Tài Khoản</p> */}
                                        </div>
                                    </a>
                                    <div className="iq-sub-dropdown iq-user-dropdown">
                                        <div className="iq-card shadow-none m-0">
                                            <div className="iq-card-body p-0 ">
                                                <div className="bg-primary p-3">
                                                    <h5 className="mb-0 text-white line-height">Xin Chào </h5>
                                                </div>
                                                <Link to={`/signup`} className="iq-sub-card iq-bg-primary-hover">
                                                    <div className="media align-items-center">
                                                        <div className="rounded iq-card-icon iq-bg-primary">
                                                            <i className="ri-file-user-line"></i>
                                                        </div>
                                                        <div className="media-body ml-3">
                                                            <h6 className="mb-0 ">Đăng ký</h6>
                                                        </div>
                                                    </div>
                                                </Link>
                                                <Link to={`/signin`} className="iq-sub-card iq-bg-primary-hover">
                                                    <div className="media align-items-center">
                                                        <div className="rounded iq-card-icon iq-bg-primary">
                                                            <i className="ri-account-box-line"></i>
                                                        </div>
                                                        <div className="media-body ml-3">
                                                            <h6 className="mb-0 ">Đăng nhập</h6>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            }
                           
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    </>
}

export default Header
