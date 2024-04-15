import {
    Space,
    Table,
    message,
    Popconfirm,
    Spin,
    Image,
    Button,
} from 'antd';
import {
    EditFilled,
    DeleteFilled,
    PlusOutlined,
    SearchOutlined
} from '@ant-design/icons';
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import { getAllChapter,removeChapter } from '../../../redux/Reducer/Chapter';
import IProduct from '../../../interface/product';

import { useForm } from 'react-hook-form';
import { ColumnsType } from 'antd/es/table';

interface DataType {
    _id: string,
    name: string,
    title:string,
    content:string
    
    productId: string,
}

const chapterPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const chapters = useAppSelector((state) => state.Chapter.chapters);
    const { register, handleSubmit } = useForm();

    useEffect(() => {
        setIsLoading(true);
        void dispatch(getAllChapter()).then(() => {
            setIsLoading(false);
        }).catch((error) => {
            setIsLoading(false);
            console.log(error);
        });
    }, [dispatch]);
    const [messageApi, contextHolder] = message.useMessage();

    const urlParams = new URLSearchParams(location.search);

    const handFound = (e: any) => {
        const searchText = e._searchText;

        urlParams.set("_searchText", encodeURIComponent(searchText));
        console.log("searchText:", searchText);

        const queryString = `${urlParams.toString() ? `?${urlParams.toString()}` : ""}`;

        navigate(`?${queryString}`);
        setIsLoading(true);
        console.log("queryString",queryString)
        void dispatch(getAllChapter(queryString)).then(() => {
            setIsLoading(false);
        }).catch((error) => {
            setIsLoading(false);
            console.log(error);
        });
    };

    const confirm = async (id: string) => {
        await dispatch(removeChapter(id));
        messageApi.open({
            type: 'success',
            content: 'Delete category successfully!',
        });
    }

    const columns: ColumnsType<DataType> = [
        {
            title: 'Product Name',
            key: 'name',
            render: (record: any) => (
                <div className="flex items-center  ">
                  
                    <a className='w-full overflow-hidden'>{record.name}</a>
                </div>
            ),
            // sortDirections: ['ascend', 'descend'],
            // showSorterTooltip: false,
            // className: 'w-1/4',
        },
     
      
        {
            title: 'title',
            key: 'title',
            render: (record: any) => (
                <div className="flex items-center  ">
                  
                    <a className='w-full overflow-hidden'>{record.title}</a>
                </div>
            ),
        },
    
        {
            title: "productId",
            key: "productId",
            dataIndex: "productId",
            render: (cate: IProduct) => <span>{cate?.name}</span>,
        },
        {
            title: 'Action',
            key: 'action',
            render: (record: any) => (
                <Space size="middle">
                    <Popconfirm
                        title="Delete category"
                        description="Are you sure to delete this category?"
                        onConfirm={() => confirm(record._id)}
                        okText="Yes"
                        cancelText="No"
                        okButtonProps={{ className: "text-white bg-blue-400" }}
                    >
                        <DeleteFilled className='text-xl text-red-400' />
                    </Popconfirm>
                    <Link to={`/admin/product/update/${record._id}`}>
                        <EditFilled className='text-xl text-yellow-400' />
                    </Link>
                </Space>
            ),
        },

    ];

    const data: DataType[] = chapters.map((chapter: any) => ({
        _id: chapter._id,
        name: chapter.name,
        title: chapter.title,
        content: chapter.content,

        productId: chapter.productId,
    }));
    const [isLoading, setIsLoading] = useState(false);
    return (
        <div className="">
            {contextHolder}
            <Space className='flex justify-between mb-5'>
                <div className="">
                    <span className="block text-xl text-primary">
                        Product List
                    </span>
                    <span className="block text-base  text-primary">
                        Manage your products
                    </span>
                </div>
                <Link to={`add`}>
                    <Button type='primary' className='bg-primary'
                        icon={<PlusOutlined />}
                    >
                        Add New Product
                    </Button>
                </Link>
            </Space>
            <div className="border p-3 rounded-lg min-h-screen bg-white">
                <div className="pb-6 pt-3">
                    <form onSubmit={handleSubmit(handFound)} >
                        <input type="text" className='border p-2 w-64 outline-none '
                            {...register("_searchText")}
                            placeholder="" />
                        <button type="submit" className='p-2 bg-primary'>
                            <SearchOutlined className='text-white' />
                        </button>
                    </form>
                </div>
                {isLoading ? (
             
                        <div className="text-center ">
                            <Spin size="large" />
    
                        </div>
                     
           
                        


                ) : (
               
                        <Table columns={columns} dataSource={data} pagination={{ pageSize: 20 }} />
                 
                )}
            </div>
        </div>
    )
}
export default chapterPage;