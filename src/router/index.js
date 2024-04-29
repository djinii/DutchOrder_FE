// export default router;
import { createRouter, createWebHistory } from "vue-router";
import store from "../store/store";

// import HomeView from '홈화면';

const routes = [
  {
    path: "/:level/login",
    name: "login",
    component: () => import("../views/comm/JH_Login.vue"),
  },
  {
    path: "/:level/findMyEmail",
    name: "findMyEmail",
    component: () => import("../views/comm/JH_FindMyEmail.vue"),
  },
  {
    path: "/:level/findMyPw",
    name: "findMyPw",
    component: () => import("../views/comm/JH_FindMyPw.vue"),
  },

  {
    path: "/selectMemberType",
    name: "selectMemberType",
    component: () => import("../views/comm/JH_SelectMemberType.vue"),
  },

  

  // business
  {
    path: "/business/home",
    name: "home",
    component: () => import("../views/business/MS_B_Ordering.vue"),
  },

  {
    path: "/business/join",
    name: "B_Join",
    component: () => import("../views/business/JH_B_Join.vue"),
  },
  {
    path: "/business/updateInfo", // 여기서 동적 세그먼트를 사용합니다.
    name: "B_updateInfo",
    component: () => import("../views/business/JH_B_UpdateInfo.vue"),
    props: true,
  },
  {
    path: "/business/reviewList",
    name: "JY_B_ReviewList",
    component: () => import("../views/business/JY_B_ReviewList.vue"),
  },

  {
    path: "/business/reviewComment",
    name: "JY_B_ReviewComment",
    component: () => import("../views/business/JY_B_ReviewComment.vue"),
  },
  {
    path: '/business/home',
    name: 'B_Ordering',
    component: () => import ('../views/business/MS_B_Ordering.vue'),
  },
  {
    path: '/business/Files',
    name: 'B_Files',
    component: () => import ('../views/business/MS_B_Files.vue'),
  },
  {
    path: '/business/Modify',
    name: 'ShopRevise',
    component: () => import ('../views/business/MS_B_ShopRevise.vue'),
  },

  // client
  {
    path: "/client/home",
    name: "C_Home",
    component: () => import("../views/client/DJ_C_Main.vue"),
  },
  {
    path: "/client/join",
    name: "C_Join",
    component: () => import("../views/client/JH_C_Join.vue"),
  },
  {
    path: "/client/myFriend",
    name: "C_MyFriend",
    component: () => import("../views/client/JY_C_MyFriend.vue"),
  },
  {
    path: "/client/updateInfo", // 여기서 동적 세그먼트를 사용합니다.
    name: "C_updateInfo",
    component: () => import("../views/client/JH_C_UpdateInfo.vue"),
    props: true,
  },

  {
    path: "/noticeList",
    name: "JY_NoticeList",
    component: () => import("../views/client/JY_C_NoticeList.vue"),
  },

  {
    path: "/client/noticeDetails",
    name: "JY_C_NoticeDetails",
    component: () => import("../views/client/JY_C_NoticeDetails.vue"),
  },
  {
    path: "/client/reviewList",
    name: "JY_C_ReviewList",
    component: () => import("../views/client/JY_C_ReviewList.vue"),
  },

  {
    path: "/client/reviewWrite",
    name: "JY_C_ReviewWrite",
    component: () => import("../views/client/JY_C_ReviewWrite.vue"),
  },

  {
    path: "/client/myReview",
    name: "JY_C_MyReview",
    component: () => import("../views/client/JY_C_MyReview.vue"),
  },

  {
    path: '/client/OrderList',
    name: 'OrderList',
    component: ()=> import('../views/client/MW_C_Receipt.vue'),
  },
  
  {
    path: '/order/:onum',
    name: 'OrderDetail',
    component: ()=> import('../views/client/MW_C_ReceiptDetail.vue'),
    props: true
  },
//dj
{
  path:'/shoplist',
  name:'shoplist',
  component:() => import('../views/client/DJ_C_CateShop.vue')
},
{
  path: '/client/shopinfo',
  name: 'shopinfo',
  component: () => import('../views/client/DJ_C_ShopInfo.vue')
},
{
  path: '/client/shopinfo/itemView',
  name: 'itemView',
  component: () => import('../views/client/DJ_C_MenuInfo.vue')
},
{
  path : '/client/myCart',
  name : 'myCart',
  component: () => import('../views/client/DJ_C_Cart.vue')
},
{
  path : '/client/ordPlaced',
  name : 'ordPlaced',
  component: () => import('../views/client/DJ_C_Order.vue')
},


  // admin
  {
    path: "/admin/home",
    name: "A_Home",
    component: () => import("../views/admin/JY_A_NoticeList.vue"),
  },
  {
    path: "/admin/noticeList",
    name: "JY_A_NoticeList",
    component: () => import("../views/admin/JY_A_NoticeList.vue"),
  },

  {
    path: "/admin/noticeWrite",
    name: "JY_A_NoticeWrite",
    component: () => import("../views/admin/JY_A_NoticeWrite.vue"),
  },

  {
    path: "/admin/noticeDetails",
    name: "JY_A_NoticeDetails",
    component: () => import("../views/admin/JY_A_NoticeDetails.vue"),
  },

  {
    path: "/admin/noticeModify",
    name: "JY_A_NoticeModify",
    component: () => import("../views/admin/JY_A_NoticeModify.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = store.getters.isLoggedIn;
  if (to.path === "/login" && isLoggedIn) {
    const userLevel = store.getters.getUserLevel;
    let redirectPath = "";

    if (userLevel === 103) {
      redirectPath = "/admin/home";
    } else if (userLevel === 101) {
      redirectPath = "/client/home";
    } else if (userLevel === 102) {
      redirectPath = "/business/home";
    }

    if (redirectPath) {
      next(redirectPath);
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;