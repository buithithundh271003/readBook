import React from 'react';
import type { FormInstance } from 'antd';
import { Button, Form, Input, Space, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../redux/hook';
import IChuyenMuc from '../../../interface/chuyenMuc';
import { createChuyenMuc } from '../../../redux/Reducer/ChuyenMuc';


const SubmitButton = ({ form }: { form: FormInstance }) => {
    const [submittable, setSubmittable] = React.useState(false);

    // Watch all values
    const values = Form.useWatch([], form);

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

    return (
        <Button type="primary" htmlType="submit" disabled={!submittable} className='bg-blue-500'>
            Submit
        </Button>
    );
};

const ChuyenMucAdd = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const onFinish = (values: IChuyenMuc) => {
        void dispatch(createChuyenMuc(values));
        message.success(`Add category successfully!`);
        navigate("/admin/chuyenmuc");
    };
    return <>
        <h3 className="text-center text-2xl font-bold uppercase text-[#1677ff]">
            Create New ChuyenMuc
        </h3>
        <Form
            form={form}
            name="validateOnly"
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
            className="mx-auto max-w-[500px]"
        >
            <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please input your Name!' }]}>
                <Input />
            </Form.Item>

            <Form.Item>
                <Space>
                    <SubmitButton form={form} />
                    <Button htmlType="reset">Reset</Button>
                </Space>
            </Form.Item>
        </Form>
    </>
}
export default ChuyenMucAdd;