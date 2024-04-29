<template>
  <div>
    <button
      type="button"
      class="btn btn-primary"
      data-bs-toggle="modal"
      data-bs-target="#B_MenuPlus"
    >
      메뉴 추가하기
    </button>
    <div
      class="modal fade"
      id="B_MenuPlus"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      ref="modal"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">
              메뉴 추가하기
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="saveChanges">
              <div class="mb-2">
                <label for="menuName" class="form-label">메뉴 이름</label>
                <input
                  type="text"
                  class="form-control"
                  id="menuName"
                  v-model="fname"
                  required
                />
              </div>

              <div class="mb-3">
                <label for="menuDescription" class="form-label"
                  >메뉴 설명</label
                >
                <textarea
                  class="form-control"
                  id="menuDescription"
                  v-model="finfo"
                  required
                ></textarea>
              </div>

              <div class="mb-3">
                <label for="menuPrice" class="form-label">메뉴 가격</label>
                <input
                  type="text"
                  class="form-control"
                  id="menuPrice"
                  v-model="fprice"
                  required
                  pattern="[0-9,]+"
                  @input="checkIfNumber"
                />
                <div v-if="!isNumber" class="text-danger">
                  숫자만 입력해주세요.
                </div>
              </div>
              <!-- 메뉴 사진 첨부 -->
              <div id="MenuImg" class="custom-file">
                <input
                  id="customFile"
                  type="file"
                  ref="image"
                  @change="upload"
                />
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
              <br />
              <!-- 이미지 미리보기 -->
              <div id="imagePreview">
                <img
                  v-if="imageUrl"
                  :src="imageUrl"
                  class="rounded mx-auto d-block"
                  style="max-width: 100%; max-height: 300px"
                />
              </div>
              <div class="mb-3">
                <label class="form-check-label">옵션 추가 여부:</label>
                <div class="form-check">
                  <input
                    type="radio"
                    id="optionYes"
                    class="form-check-input"
                    v-model="foption"
                    value="1"
                  />
                  <label for="optionYes" class="form-check-label"
                    >옵션 추가</label
                  >
                </div>
                <div class="form-check">
                  <input
                    type="radio"
                    id="optionNo"
                    class="form-check-input"
                    v-model="foption"
                    value="2"
                  />
                  <label for="optionNo" class="form-check-label"
                    >옵션 추가 안 함</label
                  >
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="saveChanges"
              :disabled="!isNumber"
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "B_MenuPlusMD",
  props: ["fetchMenuList", "menus", "bnum"],

  data() {
    return {
      fname: "",
      finfo: "",
      fprice: "",
      foption: "2", // 기본값은 "옵션 추가 안 함"으로 설정
      isNumber: true,
      image: null,
      imageUrl: null,
    };
  },

  methods: {
    checkIfNumber() {
      const formattedPrice = this.fprice.replace(/\D/g, "");
      this.fprice = Number(formattedPrice).toLocaleString();
      this.isNumber = /^[0-9,]+$/.test(formattedPrice);
    },

    async saveChanges() {
      if (!this.isNumber) return;

      const formData = {
        fname: this.fname,
        finfo: this.finfo,
        fprice: this.fprice.replace(/,/g, ""),
        foption: this.foption,
        bnum: this.bnum,
        fimg: this.imageUrl,
      };

      try {
        const response = await axios.post("/MenuInsert", formData, {});
        console.log("메뉴 추가 성공:", response.data);

        await this.fetchMenuList();

        this.$refs.modal.dispatchEvent(new Event("hide.bs.modal"));
      } catch (error) {
        console.error("메뉴 추가 실패:", error);
      }
    },

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
  },
};
</script>
