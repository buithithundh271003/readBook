const routes = {
    //Client
    home: "/",
    products: "/products",
    productDetail: "/products/:id",
    viewBook:"/viewBook/:id",
    cart: "/cart",
    checkout: "/checkout",
    billconfirm: "/billconfirm/:id",
    order: "/account/order/:id",
    myorder: "/myorder",
    signin: "/signin",
    signup: "/signup",

    // Admin 
    admin: "/admin",
    adminDashboard: "/admin/dashboard",
    adminProducts: "/admin/product",
    adminChapters:"/admin/chapter",
    adminChapterAdd:"/admin/chapter/add",
    adminChapterUpdate:"/admin/chapter/update/:id",

    
    adminProductAdd: "/admin/product/add",
    adminProductUpdate: "/admin/product/update/:id",
    adminCategorys: "/admin/category",
    adminCategoryAdd: "/admin/category/add",
    adminCategoryUpdate: "/admin/category/update/:id",
    adminOrders: "/admin/order",
    adminOrderUpdate: "/admin/order/:id",


}

export default routes;