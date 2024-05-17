import IProduct from "./product";
interface IChapter {
    createdAt: any;
    _id?: string;
    name: string;
    title: string;
    content: object;

    productId?: IProduct
}

export default IChapter;