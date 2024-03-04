import ICategory from "./category";
interface IProduct {
    createdAt: any;
    _id?: string;
    name: string;
    author: string;
    description: string;
    content: string;

    images: any[];
    categoryId?: ICategory
}

export default IProduct;