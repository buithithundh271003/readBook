import IProduct from "./product";
import IUser from "./user";


interface IReview {
  
    _id?: string;
    title: string;
    productId?: IProduct;
    userId?:IUser
}

export default IReview;