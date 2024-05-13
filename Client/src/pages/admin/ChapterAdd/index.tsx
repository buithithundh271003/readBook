import React, { useEffect, useState } from 'react';
import type { FormInstance, UploadProps } from 'antd';
import {
    Button,
    Form,
    Input,
    InputNumber,
    Select,
    Upload,
    Space,
    message,
    
    Spin
} from 'antd';
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import Iproduct from '../../../interface/product';
// import { getAllCategory } from '../../../redux/Reducer/CategorySlice';
// import { getAllChapter } from '../../../redux/Reducer/Chapter';

import { createChapter } from '../../../redux/Reducer/Chapter';
const { TextArea } = Input;

const { Dragger } = Upload;
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
    const [isLoading, setIsLoading] = useState(false);
    const onFinish = async (values: any) => {
        console.log("vao day r,", values);
        setIsLoading(true);
       

        const newValues = { ...values};
        console.log("ki",newValues);

        void dispatch(createChapter(newValues));
        await message.success(`Add chapter successfully!`);
        navigate("/admin/chapter");
    };
    // const props: UploadProps = {
    //     listType: "picture",
    //     name: "image",
    //     multiple: true,
    //     action: "http://localhost:3000/api/images/upload",
    // };
  
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
                        {/* Input Category */}
                        <Form.Item name="productId" label="Product" rules={[{ required: true, message: 'Please input your Product!' }]}>
                        <Select
                            placeholder="Select a category"
                            allowClear
                            options={selectOptions}
                        ></Select>
                    </Form.Item>
                    {/* Input Name */}
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

        

                

                

                   

                    {/* Input Desription */}
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
                     {/* Input Desription */}
                     <Form.Item label="Files" name="content" rules={[{ required: true, message: 'Please input your Image!' }]}>
                     <Upload >
                        <Button icon={<UploadOutlined />}>Select File</Button>
                    </Upload>
                    </Form.Item>
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