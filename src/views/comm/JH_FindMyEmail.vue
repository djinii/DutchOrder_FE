<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <h3 class="text-center">아이디 찾기</h3>
        <!-- <h3>{{ $route.params.level }}</h3> -->
        <form @submit.prevent="findMyEmail">
          <div class="form-group row">
            <label for="mname" class="col-sm-4 col-form-label">이름</label>
            <div class="col-sm-11">
              <input
                type="text"
                class="form-control"
                id="mname"
                v-model="mname"
                required
                placeholder="이름을 입력하세요"
              />
            </div>
          </div>
          <div class="form-group row">
            <label for="mtel" class="col-sm-4 col-form-label">연락처</label>
            <div class="col-sm-11">
              <input
                type="tel"
                v-model="mtel"
                class="form-control"
                id="mtel"
                pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
                required
                placeholder="예시: 010-1234-5678"
              />
            </div>
          </div>
          <div class="form-group row">
            <div class="col-sm-12 text-center">
              <button type="submit" class="btn btn-primary">확인</button>
            </div>
          </div>
        </form>
        <div class="resultMessage">
          <div v-if="myEmailFound !== null && myEmailFound !== ''">
            당신의 아이디는 {{ myEmailFound }} 입니다.
          </div>
          <div v-else-if="myEmailFound === ''">
            해당하는 아이디 정보를 찾을 수 없습니다.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from "axios";

export default {
  data() {
    return {
      mname: "",
      mtel: "",
      myEmailFound: null,
    };
  },
  methods: {
    findMyEmail() {
      this.axios
        .post("/findMyEmail", {
          mname: this.mname,
          mtel: this.mtel,
        })
        .then((response) => {
          // 서버로부터의 응답 처리
          this.myEmailFound = response.data ? response.data : "";
        })
        .catch((error) => {
          // 에러 처리
          console.error("Error:", error);
          this.myEmailFound = ""; // 에러가 발생했을 때 처리
        });
    },
  },
};
</script>

<style scoped>
.form-group {
  margin-top: 20px;
  margin: bottom 20px;
}

.btn {
  margin-top: 10px;
  margin-bottom: 5px;
  color: black;
  background-color: #f5beae;
  border-color: #f5beae;
}

.btn:hover {
  background-color: #f5835d;
}

.resultMessage {
  display: flex;
  justify-content: center; 
  align-items: center;
  font-size: 1.2rem;
  margin-top: 20px; 
}

</style>
