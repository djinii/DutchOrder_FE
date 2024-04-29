  <template>
  <div>
    <div class="card" v-for="(menu, index) in menus" :key="index">
      <div class="card-body">
        <h5 class="card-title">{{ menu.fname }}</h5>
        <p class="card-text">{{ menu.fprice.toLocaleString() }} 원</p>
        <p class="card-text">{{ menu.finfo }}</p>
        <div>
          <button class="btn btn-primary" @click="toggleEditCard(menu.fnum)">
            {{ showEditCardIndex === index ? "닫기" : "수정하기" }}
          </button>

          <!-- 삭제 버튼 -->
          <button
            class="btn btn-danger"
            @click="confirmDelete(menu.fnum, $event)"
          >
            삭제
          </button>
        </div>
      </div>
      <div v-if="showEditCardIndex === index" class="card" style="width: 18rem">
        <div class="card-body">
          <h5 class="card-title">메뉴 수정</h5>
          <div id="imagePreview">
            <img
              v-if="editedMenu.fimg"
              :src="editedMenu.fimg"
              class="rounded mx-auto d-block"
              style="max-width: 100%; max-height: 300px"
            />
          </div>
          <div id="MenuImg" class="custom-file">
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

          <br />
          <div id="imagePreview">
            <img
              v-if="imageUrl"
              :src="imageUrl"
              class="rounded mx-auto d-block"
              style="max-width: 100%; max-height: 300px"
            />
          </div>
          <input
            type="text"
            class="form-control"
            v-model="editedMenu.fname"
            required
          />
          <input
            type="number"
            class="form-control"
            v-model="editedMenu.fprice"
            required
          />
          <p>메뉴 설명</p>
          <input
            type="text"
            class="form-control"
            v-model="editedMenu.finfo"
            required
          />
          <div>
            <input
              type="radio"
              id="optionYes"
              class="form-check-input"
              v-model="editedMenu.foption"
              value="1"
            />
            <label for="optionYes">옵션 추가</label>
            <input
              type="radio"
              id="optionNo"
              class="form-check-input"
              v-model="editedMenu.foption"
              value="2"
            />
            <label for="optionNo">옵션 추가 안 함</label>
          </div>
          <button class="btn btn-success" @click="saveChanges">저장</button>
        </div>
      </div>
    </div>
  </div>
</template>


  <script>
import axios from "axios";

export default {
  name: "B_MenuPluse",
  props: ["menus", "fetchMenuList"],
  data() {
    return {
      showEditCardIndex: -1,
      editedMenu: {
        fname: "",
        fprice: 0,
        finfo: "",
        foption: "1",
        fimg: this.imageUrl,
        fnum: null,
      },
      imageUrl: null,
      image: null,
    };
  },

  created() {
    console.log("Menus:", this.menus);
  },
  methods: {
    async upload() {
      this.image = this.$refs.image[0].files[0];
      if (!this.image) return;
      const reader = new FileReader();

      reader.onload = (e) => {

        this.imageUrl = e.target.result;
      };

      reader.readAsDataURL(this.image);
    },

    toggleEditCard(fnum) {
      const index = this.menus.findIndex((menu) => menu.fnum === fnum);

      this.showEditCardIndex = this.showEditCardIndex === index ? -1 : index;

      this.editedMenu =
        this.showEditCardIndex === -1 ? {} : { ...this.menus[index] };

      console.log("ShowEditCardIndex: ", this.showEditCardIndex);
      console.log("EditedMenu: ", this.editedMenu);
    },
    async saveChanges() {
      try {

        if (this.image) {
          await this.upload(); 
          this.editedMenu.fimg = this.imageUrl;
        }
        console.log("fnum:", this.editedMenu.fnum);
        const res = await axios.post(`/B_MenuReUpdate`, this.editedMenu);
        console.log("Response from B_MenuReUpdate:", res.data);
        await this.fetchMenuList(); 
        this.showEditCardIndex = -1;

        alert("메뉴가 성공적으로 수정되었습니다.");

        console.log("Menu saved successfully.");
      } catch (error) {
        console.error("Error saving changes:", error);
      }
    },

    async confirmDelete(fnum, event) {
      event.stopPropagation();
      if (confirm("정말 삭제하시겠습니까?")) {
        await this.deleteMenu(fnum);
      }
    },
    async deleteMenu(fnum) {
      try {
        const res = await axios.post(`/B_MenuDelete`, { fnum });
        console.log("Response from B_MenuDelete:", res.data);

        await this.fetchMenuList();
        console.log("Menu deleted successfully.");
        alert("삭제되었습니다.");
      } catch (error) {
        console.error("Error deleting menu:", error);
      }
    },
  },
};
</script>
