import routes from "../config/routes";
import categoryAdd from "../pages/admin/CategoryAdd";
import pdf from "../pages/admin/files";

import categoryUpdate from "../pages/admin/CategoryUpdate";
import dashboardPage from "../pages/admin/DashboardPage";
import productAdd from "../pages/admin/ProductAdd";
import productPage from "../pages/admin/ProductPage";
import homePage from "../pages/client/Home";
import Product from "../pages/client/Product";
import ProductUpdate from "../pages/admin/ProductUpdate";

// import productDetail from "../pages/client/ProductDetail";
import signin from "../pages/client/Signin/index.";
import signup from "../pages/client/Signup";
import categoryPage from "../pages/admin/CategoryPage";

import chapterPage from"../pages/admin/ChapterPage";
import chapterAdd from"../pages/admin/ChapterAdd";
import chapterUpdate from "../pages/admin/ChapterUpdate";

import viewBook from "../pages/client/viewBook";
import review from "../pages/client/revie";
import productDetail from "../pages/client/ProductDetail";

import  chuyenmucPage from "../pages/admin/ChuyenMucPage";
import chuyenmucAdd from "../pages/admin/ChuyenMucAdd";
import Product_TT from "../compoment/tieu-thuyet";
import Product_TN from "../compoment/truyen-thieu-nhi";
import Product_KH from "../compoment/sach-khoa-hoc";








export const publicRoutes = [
    { path: routes.home, Component: homePage },
    {path:routes.products,Component:Product},
    {path:routes.adminProductUpdate,Component:ProductUpdate},

    {path:routes.productDetail,Component:productDetail},
    {path:routes.viewBook,Component:viewBook},

  
    { path: routes.signin, Component: signin },
    { path: routes.signup, Component: signup },
    { path: routes.review, Component:review  },
    { path: routes.tieu_thuyet, Component:Product_TT  },
    { path: routes.thieu_nhi, Component:Product_TN  },
    { path: routes.sach_kH, Component:Product_KH },




]

export const privateRoutes = [
    { path: routes.admin, Component: dashboardPage },
    { path: routes.pdf, Component: pdf },

    { path: routes.adminDashboard, Component: dashboardPage },
    { path: routes.adminProducts, Component: productPage },
    { path: routes.adminProductAdd, Component: productAdd },
    {path: routes.adminChuyenMucAdd, Component: chuyenmucAdd},
    {path: routes.adminChuyenMuc, Component: chuyenmucPage },
    { path: routes.adminCategorys, Component: categoryPage },
    { path: routes.adminCategoryAdd, Component: categoryAdd },
    { path: routes.adminCategoryUpdate, Component: categoryUpdate },
    {path:routes.adminChapters,Component:chapterPage},
    {path:routes.adminChapterAdd,Component:chapterAdd},
    {path:routes.adminChapterUpdate,Component:chapterUpdate},

]