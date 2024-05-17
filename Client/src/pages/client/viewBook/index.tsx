import { useEffect, useState } from "react";
import React from 'react';
import "./index.scss";

import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { getAllProduct } from "../../../redux/Reducer/ProductSlice";
import { getAllChapter } from "../../../redux/Reducer/Chapter";


import { Link, useNavigate, useParams } from "react-router-dom";
import IProduct from "../../../interface/product";
import IChapter from "../../../interface/chapter";

 
import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';



import c from "../../../../../Backend/src/middlewares/tmp/Toi Thay Hoa Vang Tren Co Xanh.pdf";

// import v from "../../../../../Backend/src/middlewares/tmp/DauHoang-ATBM-Chuong 1 - Tong quan ve ATBM HTTT (1).pdf";


import b from "\ttcs\webComics_NodeJs\Store-book-main\backend\src\middlewares\tmp\Toi Thay Hoa Vang Tren Co Xanh.pdf"


import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const viewBook = () => {
   



const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const allowedFiles = ['application/pdf'];
  // const [defaultPDFFile]= useState(c);
  // console.log(defaultPDFFile);

  const [user, setUser] = useState(null);
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const [file, setFile] = useState('');
  const [pdfFile, setPdfFile] = useState<string | null>(null);

  const products = useAppSelector((state) => state.Product.products);
  const chapter = useAppSelector((state) => state.Chapter.chapters);

  console.log("hhh", chapter);

  useEffect(() => {
    dispatch(getAllProduct());
    dispatch(getAllChapter());

    const userStore = JSON.parse(localStorage.getItem("user")!);
    if (userStore) {
      setUser(userStore);
    }
  }, [dispatch]);

  const { id } = useParams();
  console.log("viewBookid", id);

  const getChapterProduct = chapter?.find((chap: IChapter) => chap._id === id);
  console.log("kk", getChapterProduct);
  const p =getChapterProduct?.productId;
  console.log(p);
  const getChapterProducts = chapter?.filter(
    (chap) => chap.productId?._id === p?._id
  );
  const product = products?.find((product: IProduct) => product._id === getChapterProduct?.productId?._id);
  console.log("productis", getChapterProducts);
//   let selectedFile = "http://localhost:5173/"+getChapterProduct?.content?.destination+"/"+getChapterProduct?.content?.filename;
const selected = `http://localhost:3000/${getChapterProduct.content?.filename}`;



 
  if (selected !== pdfFile) {
    setPdfFile(selected);
  }
  console.log("pdfFile", pdfFile);
 

  
  

 
    const getChapterOther= chapter?.filter((chap: IChapter) =>( chap?.productId?._id !== id && chap.productId?._id===product?._id) );
    

    const cateProduct = products?.filter((newProduct: IProduct) => newProduct.categoryId?._id === product?.categoryId?._id);
    

    return <>
    <div className="contain">

                <div id="wrap" className="d-flex " >
                    <div id="content"  className="overflow-scroll bg-light" style={{maxWidth:"100vw", maxHeight:"100vh"}}>
        
                    
                        {/* {defaultPDFFile &&(
                            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                                <Viewer fileUrl={defaultPDFFile}
                                plugins={[defaultLayoutPluginInstance]}></Viewer>
                            </Worker>
                        )} */}
                          {pdfFile &&(
                            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                                <Viewer fileUrl={pdfFile}
                                plugins={[defaultLayoutPluginInstance]}></Viewer>
                            </Worker>
                        )}
                        
                    </div>
                    <div className="chapter-view pr-4">
                        <h3 className="mb-3 ">Danh sách các chương </h3>
                       
                            {getChapterProducts?.map(item=>{
                                 {
                                    var checkactive= false;
                                    if(item._id===id){
                                        checkactive=true;
                                    }


                                }
                                      
                            return <>
                                                    
                                        <Link to={`/viewBook/${item._id}`} className={ checkactive? "btn btn-sm btn-warning m-1" :"btn btn-sm btn-danger m-1"} >{item.name}</Link>
                     
                                                            
                            </>
                            })}
                                                   
                                               
                                           
                        </div>
                </div>
    </div>

    </>
}
export default viewBook;

