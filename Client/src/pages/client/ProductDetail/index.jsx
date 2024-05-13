
import { useEffect, useState } from "react";
import Footer from "../../../compoment/footer";
import Header from "../../../compoment/header";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { getAllProduct } from "../../../redux/Reducer/ProductSlice";
import { createReview, getAllReview } from "../../../redux/Reducer/review";
import { getAllChapter} from "../../../redux/Reducer/Chapter";
import { Link, useNavigate, useParams } from "react-router-dom";


import { Comment } from '@ant-design/compatible';
import React from 'react';
// import type { FormInstance } from 'antd';
import { FacebookShareButton, FacebookIcon } from 'react-share';

// import IChapter from "../../../interface/chapter";

import { Avatar, Form, Button, List, Input,Affix } from 'antd';
// import { rangeContainsRange } from "@fullcalendar/core/datelib/date-range";
// import moment from 'moment';


const SubmitButton = ({ form }) => {
    const [submittable, setSubmittable] = React.useState(false);
  
    const values = Form.useWatch("title", form);
  
    React.useEffect(() => {
      form
        .validateFields({ validateOnly: true })
        .then(() => {
          setSubmittable(true);
        })
        .catch(() => {
          setSubmittable(false);
        });
    }, [values]);
  
    return (
      <Button
        type="primary"
        htmlType="submit"
        disabled={!submittable}
        className="bg-blue-500"
      >
        Submit
      </Button>
    );
  };
  
  const productDetail = () => {
    console.log("Vào trang detail r");
    const dispatch = useAppDispatch();
    const [form] = Form.useForm();
    console.log(form);
    const navigate = useNavigate();
    const [container, setContainer] = React.useState(null);
    const [user, setUser] = useState();
  
  const userStore = JSON.parse(localStorage.getItem("user") || "{}");
  
    const values = Form.useWatch("title", form);
    console.log("jjjj", values);
  
    const products = useAppSelector((state) => state.Product.products);
    const chapter = useAppSelector((state) => state.Chapter.chapters);
    console.log("chapter", chapter);
    const rv = useAppSelector((state) => state.Review.reviews);
    console.log("pro000000000",products);
    console.log(rv);
  
    const containerStyle = {
      width: "100%",
      height: 300,
      overflow: "auto",
      border: "1px solid #40a9ff",
    };
    const style = {
      width: "100%",
      height: 300,
    };
    console.log("trang review");
  
    const categories = useAppSelector((state) => state.Category.categories);
    console.log(categories);
    useEffect(() => {
      dispatch(getAllProduct());
      dispatch(getAllReview());
      dispatch(getAllChapter());
  const userStore = JSON.parse(localStorage.getItem("user") || "{}");
        if (userStore) {
        setUser(userStore);
      }
    }, []);
    useEffect(() => {
      dispatch(getAllProduct());
      dispatch(getAllReview());
      dispatch(getAllChapter());
      
      const userStore = JSON.parse(localStorage.getItem("user") || "{}");
  
      if (userStore) {
        setUser(userStore);
      }
    }, [dispatch]);
  
    const { id } = useParams();
    const product = products?.find((product) => product._id === id);  
   
    const cateProduct = products?.filter(
      (newProduct) =>
        newProduct.categoryId?._id === product?.categoryId?._id
    );
    console.log("cateProduct", cateProduct);
    const getChapterProduct = chapter?.filter(
      (chap) => chap.productId?._id === id
    );
    const r = {
        userId: user ? user._id : undefined,
        // productId: { id: product._id || undefined },
        productId: id,

     
        title: values,
      };
    console.log(getChapterProduct);
    const onFinish = () => {
        void dispatch(createReview(r));
    };
  
    return (
      <>
      
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
                                        <div className="col-md-6">
                                            <div className="iq-card-transparent iq-card-block iq-card-stretch iq-card-height">
                                                <div className="iq-card-body p-0">
                                                    <div className="row align-items-center">
                                                        <div className="col-3">
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
                                                        <div className="col-9">
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
                                        <div className="col-md-6">
                                            <div className="iq-card-transparent iq-card-block iq-card-stretch iq-card-height">
                                                <div className="iq-card-body p-0">
                                                    <h3 className="mb-3">{product?.name}</h3>
                                                    <div className="price d-flex align-items-center font-weight-500 mb-2">
                                                    </div>
                                                    <div className="mb-3 d-block">
                                                        <span className="font-size-20 text-warning">
                                                            <i className="fa fa-star mr-1"></i>
                                                            <i className="fa fa-star mr-1"></i>
                                                            <i className="fa fa-star mr-1"></i>
                                                            <i className="fa fa-star mr-1"></i>
                                                            <i className="fa fa-star"></i>
                                                        </span>
                                                    </div>
                                                    <span className="text-dark mb-4 pb-4 iq-border-bottom d-block">{product?.description}</span>
                                                    <div className="text-primary mb-4">Tác giả: <span className="text-body">{product?.author}</span></div>
                                            
                                                    {user ?
                                                        <div className="mb-4 d-flex align-items-center">

                                                            <button className="btn btn-primary view-more mr-2">Đọc ngay</button>
                                                        </div>
                                                        :
                                                        <div className="mb-4 d-flex align-items-center">
                              
                                                            <button className="btn btn-primary view-more mr-2" onClick={() => navigate(`/signin`)}>Đọc ngay</button>
                                                        </div>
                                                    }
                                                    <div className="mb-3">
                                                        <Link to="#" className="text-body text-center"><span className="avatar-30 rounded-circle bg-primary d-inline-block mr-2"><i className="ri-heart-fill"></i></span><span>Thêm vào danh sách yêu thích</span></Link>
                                                    </div>
                                                    <div className="iq-social d-flex align-items-center">
                                                        <h5 className="mr-2">Chia sẻ:</h5>
                                                        <ul className="list-inline d-flex p-0 mb-0 align-items-center">
                                                      
                                                        <li>
                                                                <FacebookShareButton
                                                                    url={product?.images[0]}
                                                                    hashtag={product?.nameProduct}
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
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div className="iq-card iq-card-block iq-card-stretch iq-card-height">
                                <div className="iq-card-header d-flex justify-content-between align-items-center position-relative">
                                    <div className="iq-header-title">
                                        <h4 className="card-title mb-0">Danh sách các chương</h4>
                                    </div>
                                   
                                </div>
                                <div className="iq-card-body single-similar-contens">
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
                        <div className="col-lg-12">
                            <div className="iq-card iq-card-block iq-card-stretch iq-card-height">
                                <div className="iq-card-header d-flex justify-content-between align-items-center position-relative">
                                    <div className="iq-header-title">
                                        <h4 className="card-title mb-0">Đánh giá gàn đây</h4>
                                    </div>
                                   
                                </div>
                                <div className="iq-card-body single-similar-contens">
                                <div>
                             
                    
                         <Form
                            form={form}
                            name="validateOnly"
                            layout="vertical"
                            onFinish={onFinish}
                            autoComplete="off"
                            className="mx-auto max-w-[500px]"
                            >
                            <Form.Item name="title">
                                <Input />
                            </Form.Item>

                            <Form.Item>
                                <SubmitButton form={form} />
                                <Button htmlType="reset">Reset</Button>
                            </Form.Item>
                        </Form>

                         <div>
                         <div style={containerStyle} >
                        <div style={style}>
                            <Affix target={() => container}>
                            {rv?.map(i=>{
                            return<>
                                <Comment
                                    author={<>{i.userId?.fullname}</>}
                                    avatar={
                                    <Avatar
                                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                        alt="Han Solo"
                                    />
                                    }
                                    content={
                                    <p>
                                       {i.title}
                                    </p>
                                    }
                                  
                                />
                            </>
                        })}
                            </Affix>
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
    );
  };
export default productDetail;