<template>
    <header>
        <div class="container">
            <nav class="navbar mt-4 navbar-expand-lg navbar-dark">
                <a @click="goToHome">
                    <img src="@/assets/img/dutchOrder_colored.png" style="width: 40x; height: 40px;">
                </a>
                <a @click="goToHome" class="navbar-brand" style="color: black;">
                    더치오더
                </a>
                <button type="button" data-bs-toggle="collapse" data-bs-target="#navbar-primary" aria-controls="navbar-primary" aria-label="Toggle navigation" class="navbar-toggler">
                    <span class="navbar-toggler-icon"></span>
                </button>
                
                <div id="navbar-primary" class="collapse navbar-collapse" >
                    <div class="navbar-collapse-header">
                        <div class="row">
                            <div class="col-6 collapse-brand">
                                
                            </div>
                            <div class="col-6 collapse-close">
                                <button type="button" data-bs-toggle="collapse" data-bs-target="#navbar-primary" aria-controls="navbar-primary" aria-label="Toggle navigation" class="navbar-toggler">
                                    <span></span><span></span>
                                </button>
                            </div>
                        </div>
                    </div> <!-- navbar-collapse-header -->
                    <!-- client 레벨 -->
                    <ul class="navbar-nav ml-lg-auto" v-if="userLevel === 101 || userLevel === 'client' || !userLevel">
                        <li class="nav-item" v-if="isLoggedIn">
                            <router-link to="/client/updateInfo" class="nav-link" style="color: black;"> 마이 페이지 </router-link>
                        </li>
                        <li class="nav-item" v-if="isLoggedIn">
                            <router-link to="/client/myFriend" class="nav-link"> 친구 목록 </router-link>
                        </li>
                        <li class="nav-item" v-if="isLoggedIn">
                            <router-link to="/client/OrderList" class="nav-link"> 주문 내역 </router-link>
                        </li>
                        <li class="nav-item" v-if="isLoggedIn">
                            <router-link to="/client/myCart" class="nav-link"> 장바구니 </router-link>
                        </li>
                        <hr>
                        <li class="nav-item" v-if="isLoggedIn">
                            <router-link to="/noticeList" class="nav-link"> 공지사항 </router-link>
                        </li>
                        <li class="nav-item" v-if="isLoggedIn">
                            <a class="nav-link" href="selectMemberType" @click="logout">로그아웃</a>
                        </li>
                        <li class="nav-item" v-else>
                            <a class="nav-link" href="/selectMemberType">로그인</a>
                        </li>
                    </ul>

                    <!-- biz 레벨 -->
                    <ul class="navbar-nav ml-lg-auto" v-if="userLevel === 102 || userLevel === 'business'">
                        <li class="nav-item" v-if="isLoggedIn">
                            <router-link to="/business/orderState" @click="showLoginAlert" class="nav-link"> 주문 현황 </router-link>
                        </li>
                        <li class="nav-item" v-if="isLoggedIn">
                            <router-link to="/business/reviewList" class="nav-link"> 리뷰 관리 </router-link>
                        </li>
                        <li class="nav-item" v-if="isLoggedIn">
                            <router-link to="/noticeList" class="nav-link"> 공지사항 </router-link>
                        </li>
                        <li class="nav-item" v-if="isLoggedIn">
                            <router-link to="/business/updateInfo" class="nav-link"> 마이 페이지 </router-link>
                        </li>
                        <hr>
                        <li class="nav-item" v-if="isLoggedIn">
                            <a class="nav-link" href="/selectMemberType" @click="logout">로그아웃</a>
                        </li>
                        <li class="nav-item" v-else>
                            <a class="nav-link" href="/selectMemberType">로그인</a>
                        </li>
                    </ul>

                    <!-- admin -->
                    <ul class="navbar-nav ml-lg-auto" v-if="userLevel === 103 || userLevel === 'admin'">
                        <li class="nav-item" v-if="isLoggedIn">
                            <router-link to="/admin/clientCheck" class="nav-link"> 회원 관리 </router-link>
                        </li>
                        <li class="nav-item" v-if="isLoggedIn">
                            <router-link to="/admin/businessCheck" class="nav-link"> 사업자 관리 </router-link>
                        </li>
                        <li class="nav-item" v-if="isLoggedIn">
                            <router-link to="/admin/reviewBoard" class="nav-link"> 우리가게 리뷰</router-link>
                        </li>
                        <li class="nav-item" v-if="isLoggedIn">
                            <router-link to="/admin/noticeList" class="nav-link"> 공지사항 </router-link>
                        </li>
                        <hr>
                        <li class="nav-item" v-if="isLoggedIn">
                            <a class="nav-link" href="/login/admin" @click="logout">로그아웃</a>
                        </li>
                        <li class="nav-item" v-else>
                            <a class="nav-link" href="/selectMemberType">로그인</a>
                        </li>
                    </ul>
                </div> <!-- navbar-primary -->
            </nav>
        </div>
    </header>
</template>

<script>
import Cookies from 'js-cookie'

export default {
    computed: {
        isLoggedIn() {
            return this.$store.getters['authStore/isLoggedIn'];
        },
        userLevel() {
            return this.$store.getters['authStore/getUserLevel'];
        }
    },
    methods: {
        logout() {
            this.$store.dispatch("authStore/logout").then(() => {
                Cookies.remove('mnum');
                this.$router.push({ path: "/selectMemberType"});
            })
        },
        goToHome() {
            if (!this.isLoggedIn) {
                alert("로그인 후 이용하세요");
                this.$router.push({ path: "/selectMemberType"});
            } else {
                switch (this.userLevel) {
                    case 101:
                        this.$router.push({ path: "/client/home"});
                        break;
                    case 102:
                        this.$router.push({ path: "/business/home"});
                        break;
                    case 103:
                        this.$router.push({ path: "/admin/home"});
                        break;
                    default:
                        alert("로그인 후 이용하세요");
                        this.$router.push({ path: '/selectMemberType'});
                        break;
                }
            }
        },
        showLoginAlert() {
            if (!this.isLoggedIn) {
                alert("로그인 후 이용하세요");
                this.$router.push("/selectMemberType");
            }
        }
    }
}
</script>

<style>
header {
    background-color: #fff9f4;
    background-color: #f5835d;
    color: black;
}
.navbar {
    /* background-color: #f5835d; */
}
@media (max-width: 768px) {
    .h2,
    .p {
    font-size: 0.8rem; /* 폰트 크기 줄이기 */
    }
}

/* 화면 너비가 480px 미만일 때 적용될 스타일 */
@media (max-width: 480px) {
    .h2 {
    font-size: 0.7rem; /* 더 작은 폰트 크기로 줄이기 */
    }

    .p {
    font-size: 0.6rem; /* 더 작은 폰트 크기로 줄이기 */
    }
}
</style>
