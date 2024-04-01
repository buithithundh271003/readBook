import { useEffect } from "react";
import React from "react";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { getAllCategory } from "../redux/Reducer/CategorySlice";
import { Link, useNavigate } from "react-router-dom";
import { getAllProduct } from "../redux/Reducer/ProductSlice";
import { message } from "antd";

const Header = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [input, setInput] = React.useState("");
    console.log("SetInput",setInput);
    const categories = useAppSelector((state) => state.Category.categories);

    const user = JSON.parse(localStorage.getItem("user")!)
   
    

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
        }
    }, [dispatch]);

    useEffect(() => {
        // setIsLoading(true);
        dispatch(getAllCategory())
        if (user) {
            dispatch(getAllProduct())
        }
    }, []);
    return <>
        <div className="iq-sidebar">
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
        </div>
        <div className="iq-top-navbar">
            <div className="iq-navbar-custom">
                <nav className="navbar navbar-expand-lg navbar-light p-0">
                    <div className="iq-menu-bt d-flex align-items-center">
                        <div className="wrapper-menu">
                        </div>
                        <div className="iq-navbar-logo d-flex justify-content-between">
                            <a href="index.html" className="header-logo">
                                <img src="src/src/style/images/logo.png" className="img-fluid rounded-normal" alt="" />
                                <div className="logo-title">
                                    <span className="text-primary text-uppercase">img01</span >
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="navbar-breadcrumb">
                        <h5 className="mb-0">Trang Chủ</h5>
                    </div>
                    <div className="iq-search-bar">
                        <form action="#" className="searchbox">
                            <input type="text" className="text search-input" placeholder="Tìm kiếm sản phẩm..." onChange={(e)=>handelOnchange(e.target.value) }/>
                            <a className="search-link" href="#"><i className="ri-search-line"></i></a>
                        </form>
                    </div>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-label="Toggle navigation">
                        <i className="ri-menu-3-line"></i>
                    </button>
                    <div className=" navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto navbar-list">
                            <li className="nav-item nav-icon search-content">
                                <a href="#" className="search-toggle iq-waves-effect text-gray rounded">
                                    <i className="ri-search-line"></i>
                                </a>
                                <form action="#" className="search-box p-0">
                                    <input type="text" className="text search-input" placeholder="Type here to search..." />
                                    <a className="search-link" href="#"><i className="ri-search-line"></i></a>
                                </form>
                            </li>
        
                         
                            {user ?
                                <li className="line-height pt-3">
                                    <a href="#" className="search-toggle iq-waves-effect d-flex align-items-center">
                                        {/* <img src="src/style/images/user/1.jpg" className="img-fluid rounded-circle mr-3" alt="user" /> */}
                                        <div className="caption">
                                            <h6 className="mb-1 line-height">{user.fullname}</h6>
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
                                                <Link to={`/myorder`} className="iq-sub-card iq-bg-primary-hover">
                                                    <div className="media align-items-center">
                                                        <div className="rounded iq-card-icon iq-bg-primary">
                                                            <i className="ri-account-box-line"></i>
                                                        </div>
                                                        <div className="media-body ml-3">
                                                            <h6 className="mb-0 ">Đơn hàng của tôi</h6>
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
                                            <h6 className="mb-1 line-height">Tài khoản</h6>
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