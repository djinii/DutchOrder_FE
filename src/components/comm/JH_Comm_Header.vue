<template>
  <div>
    <header class="logo-header">
      <div class="logo-container">
        <!-- 로고 이미지 -->
        <a to="client/home" @click="goToHome">
          <img
            src="@/assets/img/dutchOrder_colored.png"
            alt="Logo"
            class="logo-image"
          />
        </a>
        <span class="site-name"> 더치오더</span>
      </div>
    </header>
    <header class="nav-header">
      <!-- 사용자 레벨이 admin인 경우 -->
      <template v-if="userLevel === '103' || userLevel === 103 || userLevel === 'admin'">

        <!-- <router-link
          v-if="isLoggedIn"
          to="/admin/clientCheck"
          style="text-decoration: none; color: #454545"
          @click="showLoginAlert"
          >회원관리</router-link
        >
        <router-link
          v-if="isLoggedIn"
          to="/admin/businessCheck"
          style="text-decoration: none; color: #454545"
          @click="showLoginAlert"
          >사업자관리</router-link
        >
        <router-link
          v-if="isLoggedIn"
          to="/admin/reviewBoard"
          style="text-decoration: none; color: #454545"
          @click="showLoginAlert"
          >리뷰관리</router-link
        > -->
          <!-- <router-link
            to="/admin/noticeList"
            style="text-decoration: none; color: #454545"
            @click="showLoginAlert"
            >공지사항</router-link
          > -->
          <router-link
            v-if="isLoggedIn"
            to="/login/admin"
            style="text-decoration: none; color: #454545"
            @click="logout"
            >로그아웃</router-link
          >
          <router-link
            v-else
            to="/selectMemberType"
            style="text-decoration: none; color: #454545"
            >로그인</router-link
          >
      </template>
      <!-- 사용자 레벨이 business인 경우 -->
      <!-- <template v-if="userLevel === '102' || userLevel === 102"> -->
        <template v-if="userLevel === '102' || userLevel === 102 || userLevel === 'business'">

        <router-link
          to="/business/orderState"
          style="text-decoration: none; color: #454545"
          @click="showLoginAlert"
          >주문현황</router-link
        >
        <router-link
          to="/business/reviewList"
          style="text-decoration: none; color: #454545"
          @click="showLoginAlert"
          >리뷰관리하기</router-link
        >
        <router-link
          to="/noticeList"
          style="text-decoration: none; color: #454545"
          @click="showLoginAlert"
          >공지사항</router-link
        >
        <router-link
          v-if="isLoggedIn"
          to="/business/updateInfo"
          style="text-decoration: none; color: #454545"
          @click="showLoginAlert"
          >정보수정</router-link
        >
        <router-link
          v-if="isLoggedIn"
          to="business/login"
          style="text-decoration: none; color: #454545"
          @click="logout"
          >로그아웃</router-link
        >
        <router-link
          v-else
          to="/selectMemberType"
          style="text-decoration: none; color: #454545"
          >로그인</router-link
        >
      </template>
      <!-- 사용자 레벨이 client인 경우 -->
      <template v-else-if="userLevel === '101' || userLevel === 101 || userLevel === 'client' || userLevel === null">

        <router-link
          to="/client/reviewList"
          style="text-decoration: none; color: #454545"
          @click="showLoginAlert"
          >내리뷰보기</router-link
        >
        <router-link
          to="/client/OrderList"
          style="text-decoration: none; color: #454545"
          @click="showLoginAlert"
          >주문내역</router-link
        >
        <router-link
          to="/client/myCart"
          style="text-decoration: none; color: #454545"
          @click="showLoginAlert"
          >장바구니</router-link
        >
        <router-link
          to="/noticeList"
          style="text-decoration: none; color: #454545"
          @click="showLoginAlert"
          >공지사항</router-link
        >
        <router-link
          to="/client/myFriend"
          style="text-decoration: none; color: #454545"
          @click="showLoginAlert"
          >내친구확인</router-link
        >
        <router-link
          v-if="isLoggedIn"
          to="/client/updateInfo"
          style="text-decoration: none; color: #454545"
          @click="showLoginAlert"
          >정보수정</router-link
        >
        <router-link
          v-if="isLoggedIn"
          to="/login/client"
          style="text-decoration: none; color: #454545"
          @click="logout"
          >로그아웃</router-link
        >
        <router-link
          v-else
          to="/selectMemberType"
          style="text-decoration: none; color: #454545"
          >로그인</router-link
        >
      </template>
    </header>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Cookies from 'js-cookie'
import "@/assets/css/fonts.css";

const store = useStore();
const router = useRouter();
const isLoggedIn = computed(() => store.getters['authStore/isLoggedIn']);
const userLevel = computed(() => store.getters['authStore/getUserLevel']);

const logout = function() {
  store.dispatch("authStore/logout").then(() => {
    Cookies.remove('mnum');
    router.push(`/selectMemberType`);
  });
};


const goToHome = () => {
  if (!isLoggedIn.value) {
    alert("로그인 후 이용하세요");
    router.push("/selectMemberType");
  } else {
    if (userLevel.value === 101) {
      router.push("/client/home");
    } else if (userLevel.value === 102) {
      router.push("/business/home");
    } else if (userLevel.value === 103) {
      router.push("/admin/home");
    } else {
      alert("유효하지 않은 사용자 레벨입니다.");
      router.push("/selectMemberType");
    }
  }
};

const showLoginAlert = () => {
  if (!isLoggedIn.value) {
    alert("로그인 후 이용하세요");
    router.push("/selectMemberType");
  }
};
</script>

<style scoped>
.logo-header,
.nav-header {
  background-color: #fff9f4;
  color: #242424;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
}


/* 미디어 쿼리 추가 - 화면 너비가 768px 이하일 때 적용될 스타일 */
@media (max-width: 768px) {
  .nav-header a {
    /* nav-header 내부의 a 태그에 적용 */
    margin-top: 15px;
    font-size: 0.8rem;
    margin-right: 5px;
  }

  .nav-header {
    padding: 5px 10px; /* 패딩 축소 */
  }
}

/* 로고 이미지와 사이트 이름의 크기 조정이 필요할 경우 */
@media (max-width: 768px) {
  .logo-image {
    width: 30px; /* 로고 이미지 크기 조정 */
    height: 30px;
  }

  .site-name {
    font-size: 1.4rem; /* 사이트 이름 텍스트 크기 조정 */
  }
}
.logo-container {
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.logo-image {
  width: 40px;
  height: 40px;
  margin-right: 10px;
}

.site-name {
  font-family: "KBO-Dia-Gothic_bold";
  font-size: 1.8rem;
}
</style>
