<template>
  <div>
    <div id="bizRegFileImg" class="custom-file">
      <label for="bizRegFileImg">사업자등록증</label>
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
    <div id="bizRegImagePreview">
      <img
        v-if="bizRegImageUrl"
        :src="bizRegImageUrl"
        class="rounded mx-auto d-block"
        style="max-width: 100%; max-height: 300px"
      />
    </div>
    <button @click="submitForm" class="btn btn-primary">업로드</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "B_FileInsert",
  props: ["mnum", "bnum"],
  data() {
    return {
      bizRegImage: null,
      bizRegImageUrl: null,
    };
  },
  methods: {
    async upload() {
      this.image = this.$refs.image.files[0];
      if (!this.image) {
        this.bizRegImageUrl = null;
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        this.bizRegImageUrl = e.target.result; // 이미지 URL을 설정합니다.
      };
      reader.readAsDataURL(this.image); 
    },

    async submitForm() {
      if (!this.bizRegImageUrl) {
        alert("사진을 선택하세요.");
        return;
      }

      if (!this.mnum) {
        alert("가게 등록을 먼저 해주세요.");

        return;
      }
      try {
        const formData = {
          bnum: this.bnum,
          mnum: this.mnum,
          bfnum: this.bfnum,
          bftype_makey: 600,
          bftype_mikey: 601,
          bfimg1: this.bizRegImageUrl,
        };
        console.log("formData->" + formData);

        const response = await axios.post("/BFileInsert", formData);

        console.log("파일 등록 완료:", response.data);
        alert(
          "파일 등록 완료 되었습니다. 2~3일 정도 확인할 시간이 소요됩니다."
        );
        this.$router.push("/business/home");
      } catch (error) {
        console.error("파일 등록 오류:", error);
        alert("파일 등록에 실패했습니다.");
      }
    },
  },
};
</script>
