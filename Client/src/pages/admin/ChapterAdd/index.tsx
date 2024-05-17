import React, { useEffect, useState } from 'react';
import type { FormInstance, UploadProps } from 'antd';
import {
    Button,
    Form,
    Input,
    
    Select,
    Upload,
    Space,
    message,
    
    Spin
} from 'antd';
import axios from "axios";

import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import Iproduct from '../../../interface/product';


import { createChapter } from '../../../redux/Reducer/Chapter';
const { TextArea } = Input;

const SubmitButton = ({ form }: { form: FormInstance }) => {
    const [submittable, setSubmittable] = React.useState(false);

    // Watch all values
    const values = Form.useWatch([], form);
    console.log("values",values);

    React.useEffect(() => {
        form.validateFields({ validateOnly: true }).then(
            () => {
                setSubmittable(true);
            },
            () => {
                setSubmittable(false);
            },
        );
    }, [values]);
    const props: UploadProps = {
        listType: "picture",
        name: "image",
        multiple: true,
        action: "http://localhost:3000/api/images/upload",
    };

    return (
        <Button type="primary" htmlType="submit" disabled={!submittable} className='bg-blue-500'>
            Submit
        </Button>
    );
};

const chapterAdd = () => {

    const [form] = Form.useForm();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const products = useAppSelector((state) => state.Product.products);
    //  lấy tất cả các danh mục category
    const selectOptions = products
        ?.filter((cate: Iproduct) => cate.name !== "Uncategorized") // Loại bỏ danh mục "Uncategorized"
        .map((cate: Iproduct) => ({
            label: `${cate.name}`,
            value: `${cate._id!}`,
        }));
    // useEffect(() => {
    //     void dispatch(getAllChapter());
    // }, [dispatch]);
  const [file, setFile] = useState("");
    
  const [content, setContent] = useState("");
  console.log(typeof(content));
    const [isLoading, setIsLoading] = useState(false);

    // const [uploading, setUploading] = useState(false);
    const onFinish = async (values: any) => {
        setIsLoading(true);
       

        const newValues = { ...values,content};
        console.log("ki",newValues);
        const results = await axios.post(
            "http://localhost:3000/api/chapters",
            newValues,
            {
              headers: { "Content-Type": "multipart/form-data" },
            }
          );

        // void dispatch(createChapter(newValues));
        // console.log("new", newValues);

        await message.success(`Add chapter successfully!`);
        navigate("/admin/chapter");
    };
    const handleFile = (e:any) =>{
        setContent(e.target.files[0]);
  
      }
    
  console.log(content);
  
    return <>
        {isLoading ? (

            <div className="text-center ">
                <Spin size="large" className='mt-16' />
            </div>
        ) : (
            <div>
                <h3 className="text-center text-2xl font-bold uppercase text-[#1677ff]">
                    Create New Chapter
                </h3>
                <Form
                    form={form}
                    name="validateOnly"
                    layout="vertical"
                    onFinish={onFinish}
                    autoComplete="off"
                    className="mx-auto max-w-[500px]"
                >
                       
                        <Form.Item name="productId" label="Product" rules={[{ required: true, message: 'Please input your Product!' }]}>
                        <Select
                            placeholder="Select a category"
                            allowClear
                            options={selectOptions}
                        ></Select>
                    </Form.Item>
                 
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Name!'
                            }
                        ]}>
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="title"
                        label="Title"
                        rules={[
                            {
                                required: true, message: 'Please input your Title!'
                            }
                        ]}
                    >
                        <TextArea rows={4} />
                    </Form.Item>
                    
                     {/* <Form.Item label="Files" name="content" rules={[{ required: true, message: 'Please input your Image!' }]}>
                  
                    
                    </Form.Item> */}
                    <Input
                        name='content'
                        type="file"
                        className="form-control"
                        accept="application/pdf"
                        required
                        onChange={handleFile}
                        
                        />

                    <Form.Item>
                        <Space>
                            <SubmitButton form={form} />
                            <Button htmlType="reset">Reset</Button>
                        </Space>
                    </Form.Item>
                </Form>
            </div>
        )
        }

    </>
}
export default chapterAdd;

