
const routes = {
    //Client
    home: "/",
  
    products: "/products",
    productDetail: "/products/:id",
 
    signin: "/signin",
    signup: "/signup",
    viewBook:"/viewBook/:id",
    review:"/review",

    // Admin 
    admin: "/admin",
    pdf: "/pdf",

    adminDashboard: "/admin/dashboard",
    adminProducts: "/admin/product",
  

    
    adminProductAdd: "/admin/product/add",
    adminCategorys: "/admin/category",
    adminCategoryAdd: "/admin/category/add",
    adminCategoryUpdate: "/admin/category/update/:id",
    adminChapters:"/admin/chapter",
    adminChapterAdd:"/admin/chapter/add",
    adminChapterUpdate:"/admin/chapter/update/:id",



}

export default routes;