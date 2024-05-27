import Header from "../../../compoment/header.jsx";
import Footer from "../../../compoment/footer.tsx";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hook.ts";
import { useEffect } from "react";
import { getAllProduct } from "../../../redux/Reducer/ProductSlice.ts";
import img from "../../../style/images/favorite/01.png";

import { getAllReadLater } from "../../../redux/Reducer/readLater.ts";

import IProduct from "../../../interface/product";

// import React from 'react';


import './index.scss';


const homePage = () => {
    const dispatch = useAppDispatch();
    const user = JSON.parse(localStorage.getItem("user")!)
    const con = JSON.parse(localStorage.getItem("viewedProducts")!)
    const viewer = JSON.parse(localStorage.getItem("myList")!)




    const products = useAppSelector((state) => state.Product.products);
    
    const reads = useAppSelector((state) => state.ReadLater.readLaters);
    console.log("SetInput",viewer);
    useEffect(() => {
        // setIsLoading(true);
        dispatch(getAllProduct());
        dispatch(getAllReadLater())


    }, [dispatch]);

    useEffect(() => {

        dispatch(getAllProduct());
        dispatch(getAllReadLater())


    }, []);
    

    const conpro= con.reverse();
  

  const Conproduct = con ? products.filter((newProduct: IProduct) => con.includes(newProduct._id)) : [];
  const Conproduct1 = conpro ? conpro.filter((newProduct:any) => products.filter(i=>i._id.includes(newProduct))) : [];
  console.log("mm",Conproduct1);
  const st= new Set(Conproduct1);
  console.log("new Set", st);
  console.log("new Tiep");
//  const ts={};
const ts: IProduct[] = []
 st.forEach((i)=>{
  const Conproduct = con ? products.find((newProduct: IProduct) => newProduct._id==i) : [];
  if (Conproduct) {
    ts.push(Conproduct);
  }
  console.log("hhhh",ts);

 });
  const DocTiep = st ? products.filter((newProduc: IProduct) => st.has(newProduc._id)) : [];
  console.log("new Tiep", DocTiep);




  
  const conpros= Conproduct.slice().reverse();
  console.log("------------",Conproduct);

    console.log("------------conpros",conpros);


//   viewer.sort((a:any, b: any) =>  b.viewCount - a.viewCount );
  viewer ? viewer.sort((a, b) => b.viewCount - a.viewCount) : [];

  console.log("viewerr",viewer);

    

    return <>
        <div className="wrapper">
            <Header />
            
            
            <div id="content-page" className="content-page">
                <div className="container-fluid">
                    <div className="row">
                   
                        <div className="col-lg-12">
                            <div className="iq-card iq-card-block iq-card-stretch iq-card-height">
                                {con?
                                <>
                                   <div className="iq-card-header d-flex justify-content-between align-items-center position-relative">
                                    <div className="iq-header-title">
                                        <h4 className="card-title mb-0 " style={{color:"blue", fontWeight:"bold",fontSize:"1.2rem"}}>Đọc tiếp |</h4>
                                    </div>
                                  
                                </div>
                                <div className="iq-card-body">
                                    <div className="row">

                                        {ts?.slice(0,4).map((product,item) => {
                                              const date = () => {
                                                const date = new Date(product?.createdAt);
                                                const day = date.getDate();
                                                const month = date.getMonth() + 1;
                                                const year = date.getFullYear();
                                        
                                                return `${day}/${month}/${year}`;
                                            }
                                            return <>
                                                <div className="col-sm-6 col-md-4 col-lg-3">
                                                    <div className="iq-card iq-card-block iq-card-stretch iq-card-height browse-bookcontent">
                                                        <div className="iq-card-body p-0">
                                                            <div className="d-flex align-items-center">
                                                                <div className="col-6 p-0 position-relative image-overlap-shadow">
                                                                    <Link to=""><img className="img-fluid rounded w-100" src={product.images} alt="" /></Link >
                                                                    <div className="view-book">
                                                                        <Link to={`/products/${product._id}`} className="btn btn-sm btn-white">Đọc Ngay</Link>
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
                                                                        <span className='font-size-13 line-height'>{date()}</span>
                                                                    
                                                                    {product?.status===0?<>
                                                                        <div className="text-primary mb-2"><span className="font-size-13 line-height">Hoàn thành</span></div>

                                                                            </>
                                                                            :
                                                                            <div className="text-primary mb-2"><span className="font-size-13 line-height">đang cập nhập</span></div>

                                                                     }

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
                                <div className="iq-card-header d-flex justify-content-between align-items-center position-relative">
                                    <div className="iq-header-title">
                                        <h4 className="card-title mb-0">Gợi ý cho bạn</h4>
                                    </div>
                                    <div className="iq-card-header-toolbar d-flex align-items-center">
                                        <Link to={`/products`} className="btn btn-sm btn-primary view-more">Xem Thêm</Link>
                                    </div>
                                </div>
                                </>
                                :<></>
                                }
                             
                                <div className="iq-card-body">
                                    <div className="row">
                                        {products.map((product) => {
                                              const date = () => {
                                                const date = new Date(product?.createdAt);
                                                const day = date.getDate();
                                                const month = date.getMonth() + 1;
                                                const year = date.getFullYear();
                                        
                                                return `${day}/${month}/${year}`;
                                            }
                                            return <>
                                                <div className="col-sm-6 col-md-3 col-lg-3">
                                                    <div className="iq-card iq-card-block iq-card-stretch iq-card-height browse-bookcontent">
                                                        <div className="iq-card-body p-0">
                                                            <div className="d-flex align-items-center">
                                                                <div className="col-6 p-0 position-relative image-overlap-shadow">
                                                                    <Link to=""><img className="img-fluid rounded w-100" src={product.images} alt="" /></Link >
                                                                    <div className="view-book">
                                                                        <Link to={`/products/${product._id}`} className="btn btn-sm btn-white">Đọc Ngay</Link>
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
                                                                        <span className='font-size-13 line-height'>{date()}</span>
                                                                    
                                                                    {product?.status===0?<>
                                                                        <div className="text-primary mb-2"><span className="font-size-13 line-height">Hoàn thành</span></div>

                                                                            </>
                                                                            :
                                                                            <div className="text-primary mb-2"><span className="font-size-13 line-height">đang cập nhập</span></div>

                                                                     }

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
                        <div className="col-sm-12">
                            <div className="iq-card iq-card-block iq-card-stretch iq-card-height">
                                <div className="iq-card-header d-flex justify-content-between align-items-center position-relative">
                                        <div className="iq-header-title">
                                            <h4 className="card-title mb-0" style={{color:"blue", fontSize:"1.5rem", fontWeight:"bolder"}}>| Bảng xếp hạng</h4>
                                        </div>
                                       
                                </div>
                               
                                <div className="iq-card-body pb-0">
                                    <div className="description-contens align-items-top row">
                                       
                                        <div className="col-md-4">
                                            <div className="iq-card-transparent iq-card-block iq-card-stretch iq-card-height">
                                                <div className="iq-card-body p-0">
                                                <div className="iq-sub-dropdown">
                                                <div className="iq-card shadow-none m-0">
                                                    <div className="iq-card-body p-0 toggle-cart-info">
                                                        <div className="bg-primary p-3">
                                                            <h5 className="mb-0 text-black" style={{fontSize:"1.3rem",fontWeight:"bold"}}>Top 1 - 3<small className="badge  badge-light float-right pt-1"></small></h5>
                                                        </div>
                                                      
                                                        
                                                            
                                                        {viewer?.slice(0,3).map((item,index)=>{
                                                            console.log(viewer.localStorageKey);

                                                            const pr = products?.find(

                                                                (c) => c._id === item.localStorageKey
                                                            );
                                                            console.log("dong 515", pr);
                                                            return <>
                                                                <Link to={`/products/${pr?._id}`} className="iq-sub-card">
                                                                    <div className="iq-sub-card">

                                                                        <div className="media align-items-center">
                                                                            <div className="py-2">
                                                                                {<img className="rounded" src={pr?.images[0]} style={{width:"100px"}}></img>}
                                                                            </div>
                                                                            <div className="media-body ml-3">
                                                                                <h6 className="mb-0 ">{pr?.name}</h6>
                                                                                <div className="text-primary mb-2">Tác giả: <span className="text-body">{pr?.author}</span></div>


                                                                                {pr?.status===0?<>
                                                                                    <div className="text-primary mb-2">Trạng thái: <span className="text-body">Hoàn thành</span></div>

                                                                                        </>
                                                                                        :
                                                                                        <div className="text-primary mb-2">Trạng thái: <span className="text-body">đang cập nhập</span></div>

                                                                                }
                                                                                        <div className="text-primary mb-2">Lượt xem: <span className="text-body">{item.viewCount}</span></div>
                                                                            </div>
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
                                        <div className="col-md-4">
                                            <div className="iq-card-transparent iq-card-block iq-card-stretch iq-card-height">
                                                <div className="iq-card-body p-0">
                                                <div className="iq-sub-dropdown">
                                                <div className="iq-card shadow-none m-0">
                                                    <div className="iq-card-body p-0 toggle-cart-info">
                                                        <div className="bg-primary p-3">
                                                            <h5 className="mb-0 text-black" style={{fontSize:"1.3rem",fontWeight:"bold"}}>Top 4 - 6<small className="badge  badge-light float-right pt-1"></small></h5>
                                                        </div>
                                                        {/* 
                                                        */}
                                                        
                                                            
                                                        {viewer?.slice(3,6).map((item,index)=>{
                                                            console.log(viewer.localStorageKey);

                                                            const pr = products?.find(

                                                                (c) => c._id === item.localStorageKey
                                                            );
                                                            console.log("dong 515", pr);
                                                            return <>
                                                                <Link to={`/products/${pr?._id}`} className="iq-sub-card">
                                                                    <div className="iq-sub-card">

                                                                        <div className="media align-items-center">
                                                                            <div className="py-2">
                                                                                {<img className="rounded" src={pr?.images[0]} style={{width:"100px"}}></img>}
                                                                            </div>
                                                                            <div className="media-body ml-3">
                                                                                <h6 className="mb-0 ">{pr?.name}</h6>
                                                                                <div className="text-primary mb-2">Tác giả: <span className="text-body">{pr?.author}</span></div>


                                                                                {pr?.status===0?<>
                                                                                    <div className="text-primary mb-2">Trạng thái: <span className="text-body">Hoàn thành</span></div>

                                                                                        </>
                                                                                        :
                                                                                        <div className="text-primary mb-2">Trạng thái: <span className="text-body">đang cập nhập</span></div>

                                                                                }
                                                                                        <div className="text-primary mb-2">Lượt xem: <span className="text-body">{item.viewCount}</span></div>
                                                                            </div>
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
                                        <div className="col-md-4">
                                            <div className="iq-card-transparent iq-card-block iq-card-stretch iq-card-height">
                                                <div className="iq-card-body p-0">
                                                <div className="iq-sub-dropdown">
                                                <div className="iq-card shadow-none m-0">
                                                    <div className="iq-card-body p-0 toggle-cart-info">
                                                        <div className="bg-primary p-3">
                                                            <h5 className="mb-0 text-black" style={{fontSize:"1.3rem",fontWeight:"bold"}}>Top 1 - 9<small className="badge  badge-light float-right pt-1"></small></h5>
                                                        </div>
                                                        {/* 
                                                        */}
                                                        
                                                            
                                                        {viewer?.slice(6,9).map((item,index)=>{
                                                            console.log(viewer.localStorageKey);

                                                            const pr = products?.find(

                                                                (c) => c._id === item.localStorageKey
                                                            );
                                                            console.log("dong 515", pr);
                                                            return <>
                                                                <Link to={`/products/${pr?._id}`} className="iq-sub-card">
                                                                    <div className="iq-sub-card">

                                                                        <div className="media align-items-center">
                                                                            <div className="py-2">
                                                                                {<img className="rounded" src={pr?.images[0]} style={{width:"100px"}}></img>}
                                                                            </div>
                                                                            <div className="media-body ml-3">
                                                                                <h6 className="mb-2 ">{pr?.name}</h6>
                                                                                <div className="text-primary mb-2">Tác giả: <span className="text-body">{pr?.author}</span></div>


                                                                                {pr?.status===0?<>
                                                                                    <div className="text-primary mb-2">Trạng thái: <span className="text-body">Hoàn thành</span></div>

                                                                                        </>
                                                                                        :
                                                                                        <div className="text-primary mb-2">Trạng thái: <span className="text-body">đang cập nhập</span></div>

                                                                                }
                                                                                        <div className="text-primary mb-2">Lượt xem: <span className="text-body">{item.viewCount}</span></div>

                                                                            </div>
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
                        </div>
                        <div className="col-lg-12">
                            <div className="iq-card iq-card-block iq-card-stretch iq-card-height">
                                <div className="iq-card-header d-flex justify-content-between align-items-center position-relative">
                                    <div className="iq-header-title">
                                        <h2 className="card-title mb-0" style={{color:"green", fontSize:"1.5rem", fontWeight:"bolder"}}>| Sách mới phát hành</h2>
                                    </div>
                                    <div className="iq-card-header-toolbar d-flex align-items-center">
                                        <Link to="category.html" className="btn btn-sm btn-primary view-more">Xem thêm</Link>
                                    </div>
                                </div>
                                <div className="iq-card-body favorites-contens">
                                <ul id="favorites-slider" className="list-inline p-0 mb-0 row">
                                    {products?.slice(3,6).map((item,index)=>{
                                        return <>
                                              <li className="col-md-4 ">
                                        <div className="d-flex align-items-center">
                                            <div className="col-5 p-0 position-relative">
                                            <Link to ={`/products/${item._id}`}>

                                                    <img src={item.images} className="img-fluid rounded w-100" alt="" />
                                            </Link>
                                            </div>
                                            <div className="col-7">
                                                <h5 className="mb-2"></h5>
                                                <p className="mb-2">Tác giả :{item.author} </p>
                                        
                                            
                                                
                                        <div className="iq-progress-bar-linear d-inline-block w-100">
                                            <div className="iq-progress-bar iq-bg-danger">
                                                <span className="bg-danger" data-percent="45"></span>
                                            </div>
                                        </div>
                                                <Link to={`/products/${item._id}`} className="text-danger">Đọc ngay<i className="ri-arrow-right-s-line"></i></Link>
                                            </div>
                                        </div>
                                    </li>
                                        </>
                                    })}

                                    {/* <li className="col-md-4 ">
                                        <div className="d-flex align-items-center">
                                            <div className="col-5 p-0 position-relative">
                                                <Link to="#">
                                                    <img src={img} className="img-fluid rounded w-100" alt="" />
                                                </Link>
                                            </div>
                                            <div className="col-7">
                                                <h5 className="mb-2"></h5>
                                                <p className="mb-2">Tác giả : </p>
                                        
                                            
                                                
                                        <div className="iq-progress-bar-linear d-inline-block w-100">
                                            <div className="iq-progress-bar iq-bg-danger">
                                                <span className="bg-danger" data-percent="45"></span>
                                            </div>
                                        </div>
                                                <Link to={`/products/`} className="text-danger">Đọc ngay<i className="ri-arrow-right-s-line"></i></Link>
                                            </div>
                                        </div>
                                    </li> */}
                                   

                                    </ul>
                                   
                                </div>
                            </div>
                        </div>
                        
                       
                   
                        <div className="col-lg-12">
                            <div className="iq-card iq-card-block iq-card-stretch iq-card-height">
                                <div className="iq-card-header d-flex justify-content-between align-items-center position-relative">
                                    <div className="iq-header-title">
                                        <h2 className="card-title mb-0" style={{color:"green", fontSize:"1.5rem", fontWeight:"bolder"}}>| Truyện mới phát hành</h2>
                                    </div>
                                    <div className="slider-truyenmoi">
                                    <nav aria-label="Page navigation example">
                                        <ul className="pagination">
                                            <li className="page-item">
                                            <a className="page-link" href="#" aria-label="Previous">
                                                <span aria-hidden="true">&laquo;</span>
                                                <span className="sr-only">Previous</span>
                                            </a>
                                            </li>
                                            <li className="page-item"><a className="page-link" href="#">1</a></li>
                                            <li className="page-item">
                                            <a className="page-link" href="#" aria-label="Next">
                                                <span aria-hidden="true">&raquo;</span>
                                                <span className="sr-only">Next</span>
                                            </a>
                                            </li>
                                        </ul>
                                        </nav>
                                    </div>
                                </div>
                                <div className="iq-card-body favorites-contens">
                                    <ul id="favorites-slider" className="list-inline p-0 mb-0 row">

                                    {products?.slice(5,8).map((item,index)=>{
                                        return <>
                                              <li className="col-md-4 ">
                                        <div className="d-flex align-items-center">
                                            <div className="col-5 p-0 position-relative">
                                                <Link to ={`/products/${item._id}`}>
                                                    <img src={item.images} className="img-fluid rounded w-100" alt="" />
                                                </Link>
                                            </div>
                                            <div className="col-7">
                                                <h5 className="mb-2"></h5>
                                                <p className="mb-2">Tác giả :{item.author} </p>
                                        
                                            
                                                
                                        <div className="iq-progress-bar-linear d-inline-block w-100">
                                            <div className="iq-progress-bar iq-bg-danger">
                                                <span className="bg-danger" data-percent="45"></span>
                                            </div>
                                        </div>
                                                <Link to={`/products/${item._id}`} className="text-danger">Đọc ngay<i className="ri-arrow-right-s-line"></i></Link>
                                            </div>
                                        </div>
                                    </li>
                                        </>
                                    })}
                                          
                        
                                    </ul>
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-lg-12">
                            <div className="iq-card iq-card-block iq-card-stretch iq-card-height">
                                <div className="iq-card-body favorites-contens">
                                <div className="iq-header-title">
                                        <h2 className="card-title mb-3" style={{color:"green", fontSize:"1.5rem", fontWeight:"bolder"}}>Truyền thông</h2>
                                    </div>
                                <div className="section-share section-about">
                        
                                    <div className="section-about-content">
                                        <div className="content-left">
                                        <iframe width="100%" height="390" src="https://www.youtube.com/embed/7SzEoYbV0vw?si=TCjg4B1-kvuXvCkF" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                                            {/* <iframe width="100%" height="350" src="https://www.youtube.com/embed/XTJFy86XNuE?si=BmNv3M9jfUaQtpMZ" title="Journaling Prompts to Change Your Life" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> */}
                                        </div>
                                        <div className="content-right">
                                        Truyện cổ tích ca ngợi và bênh vực cho đạo đức con người thông qua nhân vật lí tưởng/kiểu mẫu. Nhân vật lí tưởng thường bao giờ cũng là người tài năng và có nhân cách vượt trội song là những con người nhỏ bé, số phận bất hạnh. Nhân vật lí tưởng mang đạo đức, những giá trị đạo đức được thừa nhận nên họ nhận được sự giúp đỡ từ các thế lực thần kì. Nhân vật lí tưởng thường được các lực lượng thần kì thử thách về đạo đức và tài năng.Chính sự thử thách này là thước đo đánh giá nhân vật đồng thời tạo nên tình huống truyện. Ví dụ như: Cây khế; Sự tích con khỉ,…

                                        Nhân vật lí tưởng thường nhận được phần thưởng bởi đạo đức và tài năng. 
                                        Nhân vật phản diện ở tuyến đối lập không nhận được thưởng
                                        </div>
                                    </div>
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