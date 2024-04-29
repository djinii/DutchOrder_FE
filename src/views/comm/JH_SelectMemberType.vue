<template>
  <div>
    <h2 class="main-title">회원 구분을 선택해주세요</h2>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-sm-12 col-md-4">
          <div class="client-start">
            <img src="@/assets/img/client_ava.png" class="ava_img" alt="..." />
            <div class="body">
              <p class="content">
                더치오더의 배달시스템을 <br />
                이용하고 싶은 누구나
              </p>
              <!-- <router-link :to="{ name: 'login', params: { level: 'client' } }"> -->

              <!-- <a href="client/login" class="btn btn-primary">일반사용자</a> -->
              <!-- <a href="#" class="btn btn-primary">일반사용자</a> -->
              <router-link :to="{ path: '/client/login' }">
                <a
                  href="#"
                  class="btn btn-primary"
                  @click="selectUserLevel('client')"
                  >일반사용자</a
                >
              </router-link>
            </div>
          </div>
        </div>

        <div class="col-sm-12 col-md-4">
          <div class="business-start">
            <img
              src="@/assets/img/business_ava.png"
              class="ava_img"
              alt="..."
            />
            <div class="body">
              <p class="content">
                더치오더에서 음식을 <br />
                판매 하고싶은 사장님
              </p>
              <!-- <router-link
                :to="{ name: 'login', params: { level: 'business' } }"
              > -->
              <!-- <a href="#" class="btn btn-primary">사업자</a> -->
              <router-link :to="{ path: '/business/login' }">
                <a
                  href="#"
                  class="btn btn-primary"
                  @click="selectUserLevel('business')"
                  >사업자</a
                >
              </router-link>
            </div>
          </div>
        </div>

        <div class="col-sm-12 col-md-4">
          <div class="admin-start">
            <img src="@/assets/img/admin_ava.png"  class="ava_img" alt="..." />
            <div class="body">
              <p class="content">
                각자결제 배달시스템 <br />
                더치오더 관리자
              </p>
              <!-- <router-link :to="{ name: 'login', params: { level: 'admin' } }"> -->
              <router-link :to="{ path: '/admin/login' }">
                <!-- <a href="client/login" class="btn btn-primary">일반사용자</a> -->
                <!-- <a href="#" class="btn btn-primary">관리자</a> -->
                <a
                  href="#"
                  class="btn btn-primary"
                  @click="selectUserLevel('admin')"
                  >관리자</a
                >
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    selectUserLevel(userLevel) {
      this.$store.commit("authStore/setUserLevel", userLevel);
      console.log("Selected User Level:", userLevel);
    },
  },
};
</script>

<style scoped>
.main-title,
.container {
  font-family: "Pretendard-Regular";
}

.client-start,
.business-start,
.admin-start {
  margin-top: 15px;
  margin-bottom: 15px;
}

.main-title {
  font-size: 1.5rem;
  margin-top: 10px;
  margin-bottom: 50px;
  text-align: center;
}

.title {
  margin-top: 10px;
  font-size: 1.3rem;
}

.content {
  margin-top: 20px;
  font-size: 0.9rem;
  opacity: 80%;
}

.ava_img {
  width: 100px;
  height: 100px;
  display: flex;
  margin: auto;
}

.body {
  text-align: center;
}

.btn-primary {
  background-color: #fff9f4;
  border-color: #fff9f4;
  color: #2c2b2b;
}

.btn-primary:hover {
  background-color: #ffe0c7;
  border-color: #ffe0c7;
  color: #2c2b2b;
}
</style>
