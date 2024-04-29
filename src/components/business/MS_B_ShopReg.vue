<template>
  <div>
    <div class="mb-3">
      <label for="sname" class="form-label">식당명</label>
      <input type="text" v-model="sname" class="form-control" id="sname" />
      <div class="btn-verify">
        <button
          type="button"
          class="btn btn-primary"
          @click="checkDuplicates('sname')"
        >
          중복확인
        </button>
      </div>
    </div>

    <div class="mb-3">
      <label for="fcategory_mikey" class="form-label">가게 분류</label>
      <select
        v-model="fcategory_mikey"
        class="form-select"
        id="fcategory_mikey"
      >
        <option value="301">한식</option>
        <option value="302">중식</option>
        <option value="303">일식</option>
        <option value="304">분식</option>
      </select>
    </div>

    <div class="mb-3">
      <label for="saddr" class="form-label">주소</label>
      <input type="text" v-model="saddr" class="form-control" id="saddr" />
    </div>

    <div class="mb-3">
      <label for="stel" class="form-label">전화번호</label>
      <input
        type="text"
        v-model="stel"
        class="form-control"
        id="stel"
        pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
        placeholder="예시: 000-0000-0000"
      />
    </div>

    <div class="mb-3">
      <label for="bid" class="form-label">사업자번호</label>
      <input
        type="text"
        v-model="bid"
        class="form-control"
        id="bid"
        pattern="[0-9]{4}-[0-9]{2}-[0-9]{4}"
        placeholder="예시: 0000-00-0000"
      />
      <div class="btn-verify">
        <button
          type="button"
          class="btn btn-primary"
          @click="checkDuplicates('bid')"
        >
          중복확인
        </button>
      </div>
    </div>
    <div class="mb-3">
      <label for="start_time" class="form-label">운영시간 시작</label>
      <input
        type="text"
        v-model="start_time"
        class="form-control"
        id="start_time"
      />
    </div>
    <div class="mb-3">
      <label for="end_time" class="form-label">운영시간 종료</label>
      <input
        type="text"
        v-model="end_time"
        class="form-control"
        id="end_time"
      />
    </div>


    <div id="reviewImg" class="custom-file">
      <input id="customFile" type="file" ref="image" @change="upload" />
      <label class="custom-file-label" for="customFile">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="50"
          fill="currentColor"
          class="bi bi-card-image"
          viewBox="0 0 16 16"
        >
          <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
          <path
            d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54L1 12.5v-9a.5.5 0 0 1 .5-.5z"
          />
        </svg>
      </label>
    </div>

    <div id="imagePreview">
      <img
        v-if="imageUrl"
        :src="imageUrl"
        class="rounded mx-auto d-block"
        style="max-width: 100%; max-height: 300px"
      />
    </div>

    <button @click="submitRegistrationForm" class="btn btn-primary">
      가게 등록
    </button>
  </div>
</template>
  
<script>
import axios from "axios";

export default {
  name: "B_ShopReg",

  props: ["mnum"],
  data() {
    return {
      sname: "",
      fcategory_mikey: "301",
      saddr: "",
      stel: "",
      start_time: "",
      end_time: "",
      imageUrl: null,
      simg1: null,
      bid: "",
      duplicateChecked: false,
      duplicateCheckedBid: false,
    };
  },
  methods: {
    async upload() {

      this.image = this.$refs.image.files[0];
      console.log(this.image);
      if (!this.image) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageUrl = e.target.result; 
      };
      reader.readAsDataURL(this.image); 
    },
    async checkDuplicates(field) {
      if (field === "sname") {
        // 가게이름 중복 확인
        if (!this.sname) {
          alert("상호명을 입력해주세요.");
          return;
        }
        try {
          const response = await axios.get(
            `/check-duplicate/sname?sname=${this.sname}`
          );
          if (response.data.isDuplicate) {
            alert("이미 사용 중인 상호명입니다.");
            this.duplicateChecked = false;
          } else {
            alert("사용 가능한 상호명입니다.");
            this.duplicateChecked = true;
          }
        } catch (error) {
          console.error("상호명 중복 확인 오류:", error);
          alert("상호명 중복 확인 중 문제가 발생했습니다.");
        }
      } else if (field === "bid") {
        // 사업자번호 중복 확인
        if (!this.bid) {
          alert("사업자번호를 입력해주세요.");
          return;
        }
        try {
          const response = await axios.get(
            `/check-duplicate/bid?bid=${this.bid}`
          );
          if (response.data.isDuplicate) {
            alert("이미 사용 중인 사업자번호입니다.");
            this.duplicateCheckedBid = false;
          } else {
            alert("사용 가능한 사업자번호입니다.");
            this.duplicateCheckedBid = true;
          }
        } catch (error) {
          console.error("사업자번호 중복 확인 오류:", error);
          alert("사업자번호 중복 확인 중 문제가 발생했습니다.");
        }
      }
    },
    async submitRegistrationForm() {
      if (
        !this.sname ||
        !this.fcategory_mikey ||
        !this.saddr ||
        !this.stel ||
        !this.start_time ||
        !this.end_time
      ) {
        alert("모든 필수 입력 항목을 작성해주세요.");
        return;
      }

      if (!this.duplicateChecked) {

        alert("상호명 중복을 확인해주세요.");
        return;
      }

      if (!this.duplicateCheckedBid) {

        if (!this.bid) {
          alert("사업자번호를 입력해주세요.");
        } else {
          alert("사업자번호 중복을 확인해주세요.");
        }
        return;
      }

      try {
        const formData = {
          bnum: this.bnum,
          sname: this.sname,
          fcategory_mikey: this.fcategory_mikey,
          saddr: this.saddr,
          stel: this.stel,
          start_time: this.start_time,
          end_time: this.end_time,
          simg1: this.imageUrl,
          simg2: null,
          simg3: null,
          sconfirm: null,
          mnum: this.mnum,
          fcategory_makey: 300,
          sstatus_makey: 400,
          sstatus_mikey: 401,
          bstaus_makey: 500,
          bstaus_mikey: 501,
          bid: this.bid,
        };

        if (this.imageUrl) {
          formData.simg1 = this.imageUrl;
        }

        console.log("formData->" + formData);

        const response = await axios.post("/ShopReg", formData);

        if (response.data === 1) {

          console.log("가게 등록 완료:", response.data);
          alert("가게가 성공적으로 등록되었습니다.");

          this.$router.push("/business/Files");
        } else {
      
          console.error("가게 등록 실패:", response.data);
          alert("가게 등록에 실패했습니다.");
        }
      } catch (error) {
        
        console.error("가게 등록 오류:", error);
        alert("가게 등록에 실패했습니다.");
      }
    },
  },
};
</script>
