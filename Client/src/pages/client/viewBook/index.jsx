import { useEffect, useState } from "react";
import React from 'react';
import "./index.scss";

import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { getAllProduct } from "../../../redux/Reducer/ProductSlice";
import { getAllChapter } from "../../../redux/Reducer/Chapter";
import { useLocalStorage } from "../../../hook/useLocalStorage";


import { Link, useNavigate, useParams } from "react-router-dom";
// import IProduct from "../../../interface/product";
// import IChapter from "../../../interface/chapter";

 
import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
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
  // const [pdfFile, setPdfFile] = useState<string | null>(null);
  const [pdfFile, setPdfFile] = useState(null);
  const { id } = useParams();


  const products = useAppSelector((state) => state.Product.products);
  const chapter = useAppSelector((state) => state.Chapter.chapters);

  console.log("hhh", chapter);

  useEffect(() => {
    dispatch(getAllProduct());
    dispatch(getAllChapter());

  }, [dispatch]);


  const getChapterProduct = chapter?.find((chap) => chap._id === id);
  console.log("kk", getChapterProduct);
  const p =getChapterProduct?.productId;
  const getChapterProducts = chapter?.filter(
    (chap) => chap.productId?._id === p?._id
  );
  const product = products?.find((product) => product._id === getChapterProduct?.productId?._id);
  console.log("productis", getChapterProducts);

if (getChapterProduct && getChapterProduct.content) {
  const selected = `http://localhost:3000/${getChapterProduct.content.filename}`;
  if (selected !== pdfFile) {
    setPdfFile(selected);
  }
} else {
  console.error('getChapterProduct or getChapterProduct.content is undefined');
}
const [historyData, setHistoryData] = useState(null);



 
let history = [];
const today = new Date();
const day = today.getDate();
const month = today.getMonth() + 1; // Months are zero-indexed
const year = today.getFullYear();

// Ensure day and month are two digits
const formattedDay = day < 10 ? `0${day}` : day;
const formattedMonth = month < 10 ? `0${month}` : month;

const dates=`${formattedDay}/${formattedMonth}/${year}`;




  try {
    const storedHistory = localStorage.getItem('viewingHistory');
    if (storedHistory) {
      history = JSON.parse(storedHistory);
    }
  } catch (error) {
    console.error('Error parsing viewing history from localStorage', error);
  }

  // Ensure history is an array
  if (!Array.isArray(history)) {
    history = [];
  }

  // Get the current date
  const currentDate = dates;

  // Add the new entry to the history
  history.push({ id: id, date: currentDate });

  // Remove duplicates within the same day
  history.sort((a, b) => {
    const dateA = new Date(a.date.split('/').reverse().join('/'));
    const dateB = new Date(b.date.split('/').reverse().join('/'));
    return dateB - dateA;
  });
  const uniqueHistory = [];
  const seen = new Set();

  for (const item of history) {
    const uniqueKey = `${item.id}_${item.date}`;
    if (!seen.has(uniqueKey)) {
      uniqueHistory.push(item);
      seen.add(uniqueKey);
    }
  }

  // Save the updated history back to localStorage
  try {
    localStorage.setItem('viewingHistory', JSON.stringify(uniqueHistory));
  } catch (error) {
    console.error('Error saving viewing history to localStorage', error);
  }



 

 
 

  
  

 
    // const getChapterOther= chapter?.filter((chap: IChapter) =>( chap?.productId?._id !== id && chap.productId?._id===product?._id) );
    

    // const cateProduct = products?.filter((newProduct: IProduct) => newProduct.categoryId?._id === product?.categoryId?._id);
    

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
                        <Link to ="/" className="py-4" style={{"paddingTop":"8px"}}> Quay về </Link>

                                                   
                                               
                                           
                        </div>
                    
                </div>
    </div>

    </>
}
export default viewBook;

