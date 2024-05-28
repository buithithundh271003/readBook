
import { useEffect, useState ,useRef} from "react";
import Footer from "../../../compoment/footer";
import Header from "../../../compoment/header";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { getAllProduct } from "../../../redux/Reducer/ProductSlice";
import { createReadLater } from "../../../redux/Reducer/readLater";
import { useMemo } from 'react';

import { createReview, getAllReview } from "../../../redux/Reducer/review";
import { getAllChapter} from "../../../redux/Reducer/Chapter";
import { Link, useNavigate, useParams } from "react-router-dom";

import {
    Table,
    message,
} from 'antd';
import {
    EditFilled,
    DeleteFilled,
    PlusOutlined,
    SearchOutlined
} from '@ant-design/icons';
import { useForm } from 'react-hook-form';

import { Comment } from '@ant-design/compatible';
import React from 'react';
// import { ColumnsType } from 'antd/es/table';
// import type { FormInstance } from 'antd';
import { FacebookShareButton, FacebookIcon } from 'react-share';
// import IProduct from "../../../interface/product";

import Cookies from 'js-cookie';

import { Avatar, Form, Button, List, Input,Affix } from 'antd';

import { useLocalStorage } from "../../../hook/useLocalStorage";


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
    const dispatch = useAppDispatch();
    const [form] = Form.useForm();
    const section1Ref = useRef(null);
    const { id } = useParams();

    const navigate = useNavigate();
    const [container, setContainer] = React.useState(null);
    const [user, setUser] = useState();
  
    const u = JSON.parse(localStorage.getItem("user") );
    
  
    const values = Form.useWatch("title", form);
  
    const products = useAppSelector((state) => state.Product.products);
    const chapter = useAppSelector((state) => state.Chapter.chapters);
    const rv = useAppSelector((state) => state.Review.reviews);
    const reviewr= rv.filter((re)=>re.productId==id);
    // const [checked, setChecked] = useState();

    const vwer = JSON.parse(localStorage.getItem("myList"));

            let v = 0; 

        if (vwer && Array.isArray(vwer)) {
        vwer.map((item, index) => {
            if (item.localStorageKey === id) {
            v = item.viewCount;
            
            }
        });
        }

        let vi = v / 2;
  

  
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
  
    const categories = useAppSelector((state) => state.Category.categories);
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
  
  
    const product = products?.find((product) => product._id === id); 
     
   
    const cateProduct = products?.filter(
      (newProduct) =>
        newProduct.categoryId?._id === product?.categoryId?._id
    );




    // useEffect(() => {
        let viewedProducts = localStorage.getItem('viewedProducts') ? JSON.parse(localStorage.getItem('viewedProducts')) : [];
      
        if (!Array.isArray(viewedProducts)) {
          viewedProducts = [];
        }
      
        if (!viewedProducts.includes(id)) {
          viewedProducts.push(id);
          localStorage.setItem('viewedProducts', JSON.stringify(viewedProducts));
        }
        else{
            let a= viewedProducts.indexOf(id);
            if (a !== -1) {
                viewedProducts.splice(a, 1); // Xóa phần tử tại chỉ số index
            }
          viewedProducts.push(id);

          localStorage.setItem('viewedProducts', JSON.stringify(viewedProducts));
        }
  
        // }
    //   }, [id])



    
    const getChapterProduct = chapter?.filter(
      (chap) => chap.productId?._id === id
    );
    const date = () => {
        const date = new Date(product?.createdAt);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    }
    const r = {
        userId: user ? user._id : undefined,
        // productId: { id: product._id || undefined },
        productId: id,

     
        title: values,
      };
    const onFinish = () => {
        void dispatch(createReview(r));
        message.success("Add to review successfully!");

    };
    const read = {
        userId: user ? user._id : undefined,
        productId: id,

        
    };
    const addToread = async (r) => {
        await dispatch(createReadLater(read));
        message.success("Add to readLater successfully!");
        
    }
   
  
    const columns = [
        {
          title: 'Product Name',
          key: 'name',
          render: (record) => (
            
            <div className="flex items-center">
                {/* <div>{record}</div> */}
            <Link to={`/viewBook/${record._id}`} >
              <a className="w-full overflow-hidden" style={{fontWeight:"bold"}}>{record.name}</a>

              </Link>
            </div>
          ),
          sorter: (a, b) => a.name.localeCompare(b.name), // Sắp xếp theo bảng chữ cái
          sortDirections: ['ascend', 'descend'],
          showSorterTooltip: false,
          className: 'w-1/4',
        },
      
        {
          title: 'title',
          key: 'title',
          render: (record) => (
            
            <div className="flex items-center">
         <Link to={`/viewBook/${record._id}`} >
              <a className="w-full overflow-hidden" style={{fontWeight:"bold"}}>{record.title}</a>

              </Link>
            </div>
          ),
          
        },
       
      ];
      
      const scrollToSection = (sectionRef) => {
        sectionRef.current.scrollIntoView({ behavior: 'smooth' });
      };
        const data = getChapterProduct.map((i) => ({
          name: i.name,
          title:i.title,
          _id: i._id,

        //   date:i.createdAt
        }));
    
        const localStorageKey = `${id}`;


    const storedList = JSON.parse(localStorage.getItem('myList')) || [];

    const initialProduct = storedList.find(item => item.localStorageKey === localStorageKey);
    const initialViews = initialProduct ? initialProduct.viewCount : 0;

    const [viewCount, setViewCount] = useState(initialViews);

    useEffect(() => {
        setViewCount(prevCount => prevCount + 1);
    }, []);

    useEffect(() => {
        if (viewCount > initialViews) {
        const updatedList = storedList.filter(item => item.localStorageKey !== localStorageKey);
        updatedList.push({ localStorageKey, viewCount });
        localStorage.setItem('myList', JSON.stringify(updatedList));
        }
    }, [viewCount, localStorageKey, storedList, initialViews]);

            

       
      
    return (
      <>
      
      <div className="wrapper">
            <Header />
            <div id="content-page" className="content-page">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="iq-card iq-card-block iq-card-stretch iq-card-height">
                               
                                <div className="iq-card-body pb-0">
                                    <div className="description-contens align-items-top row">
                                        <div className="col-md-3">
                                            <div className="iq-card-transparent iq-card-block iq-card-stretch iq-card-height">
                                                <div className="iq-card-body p-0">
                                                    <div className="row align-items-center">
                                                        
                                                        <div className="col-10">
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
                                        <div className="col-md-5">
                                            <div className="iq-card-transparent iq-card-block iq-card-stretch iq-card-height">
                                                <div className="iq-card-body p-0">
                                                    <h3 className="mb-1" style={{color:"blue",fontWeight:"bold", fontSize:"1.4em"}}>{product?.name}</h3>
                                                    
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
                                                    <div className="text-primary mb-2">Tác giả: <span className="text-body">{product?.author}</span></div>
                                                    <div className="text-primary mb-2">Ngày phát hành: <span className="text-body">{date()}</span></div>
                                                    <div className="text-primary mb-2">Số lượt xem: <span className="text-body">{vi}</span></div>

                                                    
                                                    {product?.status===0?<>
                                                        <div className="text-primary mb-2">Trạng thái cập nhập: <span className="text-body">Hoàn thành</span></div>

                                                    </>
                                                    :
                                                    <div className="text-primary mb-2">Tác giả: <span className="text-body">đang cập nhập</span></div>

                                                    }

                                            
                                                    {u?
                                                        <div className="mb-4 d-flex align-items-center">

                                                            <button className="btn btn-primary view-more mr-2"style={{fontWeight:"500", color:"black"}} onClick={() => scrollToSection(section1Ref)}>Đọc ngay</button>
                                                            <button className="btn btn-primary view-more mr-2" style={{fontWeight:"500", color:"black"}} onClick={() => addToread(read)}>Đọc sau</button>

                                                        </div>
                                                        :
                                                        <div className="mb-4 d-flex align-items-center">
                              
                                                            <button className="btn btn-primary view-more mr-2" style={{fontWeight:"500", color:"black"}} onClick={() => navigate(`/signin`)}>Đọc ngay</button>
                                                            <button className="btn btn-primary view-more mr-2" style={{fontWeight:"500", color:"black"}} onClick={() => navigate(`/signin`)}>Đọc sau</button>

                                                        </div>
                                                    }
                                                    <div className="mb-3">
                                                        <Link to="#" className="text-body text-center"><span className="avatar-30 rounded-circle bg-primary d-inline-block mr-2">
                                                            <i className="ri-heart-fill"></i>
                                                        
                                                        </span><span>Thêm vào danh sách yêu thích</span></Link>
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
                                        <div className="col-md-4">
                                            <div className="iq-card-transparent iq-card-block iq-card-stretch iq-card-height">
                                                <div className="iq-card-body p-0">
                                                <div className="iq-card shadow-none m-0">
                                        <div className="iq-card-body p-0 toggle-cart-info">
                                            <div className="bg-primary p-3">
                                                <h5 className="mb-0 text-black" style={{fontWeight:"bold"}}>Truyện mới phát hành<small className="badge  badge-light float-right pt-1">{}</small></h5>
                                            </div>
                                            {products?.slice(0, 5).map((item, index)=> {
                                                
                                                const date = () => {
                                                    const date = new Date(item?.createdAt);
                                                    const day = date.getDate();
                                                    const month = date.getMonth() + 1;
                                                    const year = date.getFullYear();
                                            
                                                    return `${day}/${month}/${year}`;
                                                }
                                                return <>
                                                    <Link to={`/products/${item?._id}`} className="iq-sub-card">
                                                        <div className="iq-sub-card">

                                                            <div className="media align-items-center py-1">
                                                                <div className="">
                                                                    <img className="rounded" src={item.images} alt="" />
                                                                   
                                                                </div>
                                                                <div className="media-body ml-3">
                                                                    <h6 className="mb-0 ">{item?.name}</h6>
                                                                    <span className='block mb-2'></span>
                                                                    <div className="text-primary mb-2"><span className="text-body">Ngày phát hành - {date()}</span></div>
                                                                    
                                                                    {item?.status===0?<>
                                                                        <div className="text-primary mb-2">Trạng thái: <span className="text-body">Hoàn thành</span></div>

                                                                            </>
                                                                            :
                                                                            <div className="text-primary mb-2">Trạng thái: <span className="text-body">đang cập nhập</span></div>

                                                                     }

                                                                </div>
                                                                {/* <div className="float-right font-size-24 text-danger" onClick={() => confirm(item._id)}><i className="ri-close-fill"></i></div> */}
                                                            </div>
                                                        </div>
                                                    </Link>

                                                </>
                                            })}
                                        
                                           
                                        </div>
                                    </div>
                                                  
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12" >
                            <div className="iq-card iq-card-block iq-card-stretch iq-card-height">
                               
                                <div className="iq-card-body pb-0">
                                    <div className="description-contens align-items-top row">
                                       
                                        <div className="col-md-8">
                                            <div className="iq-card-transparent iq-card-block iq-card-stretch iq-card-height">
                                                <div className="iq-card-body p-0">
                                                    <h3 className="mb-1" style={{color:"blue",fontWeight:"bold", fontSize:"1.4em"}} ref={section1Ref}>Danh sách các chương</h3>
                                                    
                                                 
                        <Table columns={columns} dataSource={data} pagination={{ pageSize: 30 }} />
                                                   

                                            
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="iq-card-transparent iq-card-block iq-card-stretch iq-card-height">
                                                <div className="iq-card-body p-0">
                                                <div className="iq-card shadow-none m-0">
                                        <div className="iq-card-body p-0 toggle-cart-info">
                                            <div className="bg-primary p-3">
                                                <h5 className="mb-0 text-black" style={{fontWeight:"bold"}}>Sách <small className="badge  badge-light float-right pt-1">{}</small></h5>
                                            </div>
                                            {products?.slice(6, 10).map((item, index)=> {
                                                
                                                const date = () => {
                                                    const date = new Date(item?.createdAt);
                                                    const day = date.getDate();
                                                    const month = date.getMonth() + 1;
                                                    const year = date.getFullYear();
                                            
                                                    return `${day}/${month}/${year}`;
                                                }
                                                return <>
                                                    <Link to={`/products/${item?._id}`} className="iq-sub-card">
                                                        <div className="iq-sub-card">

                                                            <div className="media align-items-center py-1">
                                                                <div className="">
                                                                    <img className="rounded" src={item.images} alt="" />
                                                                   
                                                                </div>
                                                                <div className="media-body ml-3">
                                                                    <h6 className="mb-0 ">{item?.name}</h6>
                                                                    <span className='block mb-2'>{}</span>
                                                                    <div className="text-primary mb-2"><span className="text-body">Ngày phát hành - {date()}</span></div>
                                                                    
                                                                    {item?.status===0?<>
                                                                        <div className="text-primary mb-2">Trạng thái: <span className="text-body">Hoàn thành</span></div>

                                                                            </>
                                                                            :
                                                                            <div className="text-primary mb-2">Trạng thái: <span className="text-body">đang cập nhập</span></div>

                                                                     }

                                                                </div>
                                                                {/* <div className="float-right font-size-24 text-danger" onClick={() => confirm(item._id)}><i className="ri-close-fill"></i></div> */}
                                                            </div>
                                                        </div>
                                                    </Link>

                                                </>
                                            })}
                                        
                                           
                                        </div>
                                    </div>
                                                  
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                     
                        {/* <Table columns={columns} dataSource={data} pagination={{ pageSize: 20 }} /> */}

                        <div className="col-lg-12">
                            <div className="iq-card iq-card-block iq-card-stretch iq-card-height">
                                <div className="iq-card-header d-flex justify-content-between align-items-center position-relative">
                                    <div className="iq-header-title">
                                        <h4 className="card-title mb-0" style={{fontWeight:"bold"}}>Đánh giá gần đây</h4>
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
                            <Comment
                                    author={<>Nguyen Hoa</>}
                                    avatar={
                                    <Avatar
                                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                        alt="Han Solo"
                                    />
                                    }
                                    content={
                                    <p>
                                       Ý nghĩa
                                    </p>
                                    }
                                  
                                />
                            {reviewr?.map(i=>{
                                
                            return<>
                                <Comment
                                    author={<>Bùi Thị Thu</>}
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
                                        <h4 className="card-title mb-0" style={{fontWeight:"bold"}}>Sản phẩm tương tự</h4>
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
                                                            <Link to={`/products/${item._id}`} className="text-black" >Đọc ngay<i className="ri-arrow-right-s-line"></i></Link>
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