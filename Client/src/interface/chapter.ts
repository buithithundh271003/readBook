import IProduct from "./product";
interface IChapter {
    createdAt: any;
    _id?: string;
    name: string;
    title: string;
    content: string;

    productId?: IProduct
}

export default IChapter;