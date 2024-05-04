import routes from "../config/routes";
import categoryAdd from "../pages/admin/CategoryAdd";
import categoryUpdate from "../pages/admin/CategoryUpdate";
import dashboardPage from "../pages/admin/DashboardPage";
import productAdd from "../pages/admin/ProductAdd";
import productPage from "../pages/admin/ProductPage";
import homePage from "../pages/client/Home";
import Product from "../pages/client/Product";
import productDetail from "../pages/client/ProductDetail";
import signin from "../pages/client/Signin/index.";
import signup from "../pages/client/Signup";
import categoryPage from "../pages/admin/CategoryPage";

import chapterPage from"../pages/admin/ChapterPage";
import chapterAdd from"../pages/admin/ChapterAdd";
import chapterUpdate from "../pages/admin/ChapterUpdate";

import viewBook from "../pages/client/viewBook";


export const publicRoutes = [
    { path: routes.home, Component: homePage },
    {path:routes.products,Component:Product},
    {path:routes.productDetail,Component:productDetail},
    {path:routes.viewBook,Component:viewBook},

  
    { path: routes.signin, Component: signin },
    { path: routes.signup, Component: signup },
]

export const privateRoutes = [
    { path: routes.admin, Component: dashboardPage },
    { path: routes.adminDashboard, Component: dashboardPage },
    { path: routes.adminProducts, Component: productPage },
    { path: routes.adminProductAdd, Component: productAdd },
  
    { path: routes.adminCategorys, Component: categoryPage },
    { path: routes.adminCategoryAdd, Component: categoryAdd },
    { path: routes.adminCategoryUpdate, Component: categoryUpdate },
    {path:routes.adminChapters,Component:chapterPage},
    {path:routes.adminChapterAdd,Component:chapterAdd},
    {path:routes.adminChapterUpdate,Component:chapterUpdate},

]