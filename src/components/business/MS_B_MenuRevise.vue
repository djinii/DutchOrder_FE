<template>
  <div class="card" style="width: 18rem">
<div class="card-body">
          <h5 class="card-title">메뉴이름</h5>
          <input
            type="text"
            class="form-control"
            id="menuName"
            v-model="menu.fname"
            required
          />
          <p class="card-text">메뉴 설명</p>
          <input
            type="text"
            class="form-control"
            id="menuName"
            v-model="menu.finfo"
            required
          />
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">메뉴 가격</li>
          <input
            type="text"
            class="form-control"
            id="menuName"
            v-model="menu.fprice"
            required
          />
          <li class="list-group-item">
            <label for="optionYes" class="form-check-label">
              <input
                type="radio"
                id="optionYes"
                class="form-check-input"
                v-model="menu.foption"
                value="1"
              />
              옵션 추가
            </label>
          </li>
          <li class="list-group-item">
            <label for="optionNo" class="form-check-label">
              <input
                type="radio"
                id="optionNo"
                class="form-check-input"
                v-model="menu.foption"
                value="2"
              />
              옵션 추가 안 함
            </label>
          </li>
        </ul>
        <div class="card-body"></div>
      </div>
</template>

<script>
import axios from "axios";

export default {
  name: "B_MenuRevise",

  props: ["bnum"], 

  data() {
    return {
      menus: [],
    };
  },
  created() {
    this.menuList();
  },
  methods: {
    async menuList() {
      try {
        const res = await axios.get(`/B_MenuInfo?bnum=${this.bnum}`);
        this.menus = res.data.sort(
          (a, b) => new Date(b.fnum) - new Date(a.fnum)
        );
        console.log("Response: ", res.data);
      } catch (error) {
        console.log("Error fetching menus:", error);
      }
    },
  },
};
</script>
