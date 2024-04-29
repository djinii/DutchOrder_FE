<template>
  <div>
    <div class="nav nav-tabs" id="nav-tab" role="tablist">
      <button
        v-for="(tab, index) in tabs"
        :key="index"
        :class="{ 'nav-link': true, active: index === activeTabIndex }"
        :id="'nav-' + tab.id + '-tab'"
        data-bs-toggle="tab"
        :data-bs-target="'#nav-' + tab.id"
        type="button"
        role="tab"
        :aria-controls="'nav-' + tab.id"
        :aria-selected="index === activeTabIndex"
        @click="changeTab(index)"
      >
        <router-link
          :to="{ path: '/business/home', query: { status: tab.status } }"
        >
          {{ tab.name }}
        </router-link>
      </button>
    </div>

    <div class="tab-content" id="nav-tabContent">
      <!-- 각 탭 내용 -->
      <keep-alive>
        <div
          v-for="(tab, index) in tabs"
          :key="index"
          :id="'nav-' + tab.id"
          class="tab-pane fade"
          :class="{ 'show active': index === activeTabIndex }"
          :role="'tabpanel'"
          :aria-labelledby="'nav-' + tab.id + '-tab'"
        >
          <div class="container">
            <div class="row">
              <template v-if="tab.id === 'home'">
                <B_Ordcard :bnum="getUserBnum()" />
              </template>
              <template v-else>
                <B_OrdSpecCard
                  :bnum="getUserBnum()"
                  :orderStatus="tab.orderStatus"
                  :orderList="orderList"
                />
              </template>
            </div>
          </div>
        </div>
      </keep-alive>
      <B_ShopStatus :bnum="getUserBnum()" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import B_OrdSpecCard from "@/components/business/MS_B_OrdSpecCard.vue";
import B_Ordcard from "@/components/business/MS_B_AllOrdcard.vue";
import B_ShopStatus from "@/components/business/MS_B_ShopStatus.vue";

export default {
  name: "B_Ordering",
  components: {
    B_OrdSpecCard,
    B_Ordcard,
    B_ShopStatus,
  },
  data() {
    return {
      tabs: [
        { id: "home", name: "전체", orderStatus: 800, status: 800 },
        {
          id: "OrderReady",
          name: "주문수락대기",
          orderStatus: 802,
          status: 802,
        },
        { id: "Preparing", name: "조리중", orderStatus: 803, status: 803 },
        { id: "Start", name: "배달시작", orderStatus: 804, status: 804 },
        { id: "contact", name: "배달완료", orderStatus: 805, status: 805 },
      ],
      activeTabIndex: 0,
      orderList: [],
      bnum: null,
    };
  },
  created() {
    console.log("bnum", this.getUserBnum());
    this.bnum = this.getUserBnum();
    if (this.bnum == -1) {
      alert("가게 정보가 존재하지 않습니다. 가게를 등록해주세요!");
      this.$router.push("/business/Files");
    } else {
      // 스토어에서 bnum 가져오기
      //this.bnum = this.$store.getters.getUserBnum;
      this.bnum = this.$store.getters['authStore/getUserBnum'];
      const status = this.$route.query.status;
      if (status) {
        this.activeTabIndex = status - 1;
      }
      // 초기에도 주문 목록을 가져오도록 설정
      this.fetchOrderList();
    }
  },
  methods: {
    getUserBnum() {
      return this.$store.getters['authStore/getUserBnum'];
    },
    changeTab(index) {
      this.activeTabIndex = index;
    },
    async fetchOrderList() {
      try {
        this.bnum = this.$store.getters['authStore/getUserBnum'];
        const response = await axios.post(`/business/home`, {
          bnum: this.bnum,
        });
        this.orderList = response.data;
        console.log("mmmmmResponse:", response.data);
      } catch (error) {
        console.error("Error fetching orderList:", error);
      }
    },
    async setOstatusMikey(order) {
      try {
        let newStatus;
        if (order.ostatus_mikey === 803) {
          newStatus = 804;
        } else if (order.ostatus_mikey === 804) {
          newStatus = 805;
        } else {
          newStatus = 803;
        }

        console.log("osnum", order.osnum);
        console.log("mnum", order.mnum);
        const response = await axios.post("/OrderStatusUpdate", {
          mnum: order.mnum,
          ostatus_mikey: newStatus,
        });
        console.log("Response:", response.data);

        // 주문 상태를 변경한 후에 해당 주문 목록만 다시 불러오기
        this.fetchOrderList();
      } catch (error) {
        console.error("Error updating ostatus_mikey:", error);
      }
    },
    async reloadOrderList() {
      // 버튼 클릭 시 주문 목록 다시 불러오기
      this.fetchOrderList();
    },
  },
  watch: {
    activeTabIndex() {
      this.fetchOrderList();
    },
  },
};
</script>

