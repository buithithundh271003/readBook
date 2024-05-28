import Table, { ColumnsType } from "antd/es/table";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../../compoment/header";
import Footer from "../../../compoment/footer";
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../redux/hook";
import IProduct from "../../../interface/product";
import IChapter from "../../../interface/chapter";
import { getAllProduct } from "../../../redux/Reducer/ProductSlice";
import { getAllChapter} from "../../../redux/Reducer/Chapter";


interface DataType {
    date: string;
    id: string;
    pro:string;
    chap:string;
    ob:object;

    
}
const History = () => {
    const dispatch: Dispatch<any> = useDispatch()
    const navigate = useNavigate();
    // const [user, setUser] = useState(null)

    const user = JSON.parse(localStorage.getItem("user")!);
    // const h = JSON.parse(localStorage.getItem("viewingHistory")!);
    const viewingHistory = localStorage.getItem("viewingHistory");
const h = viewingHistory ? JSON.parse(viewingHistory) : [];


    const products = useAppSelector((state) => state.Product.products);
    const chapters = useAppSelector((state) => state.Chapter.chapters);


    // const orders = ordersData.filter((order: any) => order.userId === user._id);

    useEffect(() => {
      dispatch(getAllChapter());
      dispatch(getAllProduct());


    }, [dispatch]);
    useEffect(() => {
      dispatch(getAllChapter());
      dispatch(getAllProduct());


    }, []);

    const columns: ColumnsType<DataType> = [
       
        {
            title: 'Ngày',
            dataIndex: 'date',
            key: 'date',
           
        },
        {
            title: 'Sách | Truyện',
            key:'id',
            dataIndex: 'ob',
            render: (record) => (
                
            
                <div className="flex items-center">
                    {/* <div>{record}</div> */}
                <Link to={`/viewBook/${record[0].a}`} >
                  <a className="w-full overflow-hidden" style={{fontWeight:"bold"}}>{record[0].namePro}</a>
    
                  </Link>
                </div>
              ),
           
        },
        {
            title: 'Chương',
            key:'id',
            dataIndex: 'ob',
            render: (record) => (
                
            
                <div className="flex items-center">
                    {/* <div>{record}</div> */}
                <Link to={`/viewBook/${record[0].a}`} >
                  <a className="w-full overflow-hidden" style={{fontWeight:"bold"}}>{record[0].nameChap}</a>
    
                  </Link>
                </div>
              ),
           
        },
      

    ];
    const data: DataType[] = h.map((item: any) => {
        console.log(item.id, item.date);
        const chapt = chapters?.find((i:IChapter) => i._id === item.id); 
        // console.log(chapt?._id);

        const prod = products?.find((product:IProduct) => product._id === chapt?.productId?._id); 
        const namePro=prod?.name;
        const nameChap=chapt?.name+": "+chapt?.title;
        const obj=[];
        const a=item.id;
        obj.push({nameChap,namePro,a});
        console.log(obj[0].namePro);


       

        return {
            date: item.date,
            id: item.id,
            pro:namePro,
            chap:nameChap,
            ob:obj,
          
            
         
        };
    });
    return <>
        <div className="wrapper">
            <Header />
            <div id="content-page" className="content-page">
                <div className="container-fluid checkout-content">
                    <div className="row">
                        <div className="mx-14 mt-10 mb-16 w-full">
                            <h1 className='uppercase font-normal text-[20px] text-center mb-10 relative p-3'>
                                <span>Lịch sử của tôi</span>
                                <span className='block w-20 h-1 bg-black absolute left-1/2 transform -translate-x-1/2 bottom-0'></span>
                            </h1>
                            <div className="row">
                                 <Link to ="/" className="py-4" style={{"paddingTop":"8px"}}> Quay về </Link>


                                <div className="w-full">
                                    <h3 className='uppercase font-medium text-[17px] mb-3'>
                                        danh sách đã xem
                                    </h3>

                                    <Table columns={columns} dataSource={data} pagination={false} />
                                </div>
                            </div>
                        </div >
                    </div>
                </div>
            </div>
            <Footer />
        </div>



    </>
}

export default History