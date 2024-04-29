<template>
  <div>
    <h2 class="main-title">내 친구 확인하기</h2>
    <hr class="my-4" />

    <!-- 사용자 정보 표시 -->
    <div id="myInfo">
      <p>
        <strong>{{ myData.mnic }}</strong
        >님 안녕하세요!
      </p>
      <p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          class="bi bi-envelope-at-fill"
          viewBox="0 0 16 16"
        >
          <path
            d="M2 2A2 2 0 0 0 .05 3.555L8 8.414l7.95-4.859A2 2 0 0 0 14 2zm-2 9.8V4.698l5.803 3.546zm6.761-2.97-6.57 4.026A2 2 0 0 0 2 14h6.256A4.5 4.5 0 0 1 8 12.5a4.49 4.49 0 0 1 1.606-3.446l-.367-.225L8 9.586zM16 9.671V4.697l-5.803 3.546.338.208A4.5 4.5 0 0 1 12.5 8c1.414 0 2.675.652 3.5 1.671"
          />
          <path
            d="M15.834 12.244c0 1.168-.577 2.025-1.587 2.025-.503 0-1.002-.228-1.12-.648h-.043c-.118.416-.543.643-1.015.643-.77 0-1.259-.542-1.259-1.434v-.529c0-.844.481-1.4 1.26-1.4.585 0 .87.333.953.63h.03v-.568h.905v2.19c0 .272.18.42.411.42.315 0 .639-.415.639-1.39v-.118c0-1.277-.95-2.326-2.484-2.326h-.04c-1.582 0-2.64 1.067-2.64 2.724v.157c0 1.867 1.237 2.654 2.57 2.654h.045c.507 0 .935-.07 1.18-.18v.731c-.219.1-.643.175-1.237.175h-.044C10.438 16 9 14.82 9 12.646v-.214C9 10.36 10.421 9 12.485 9h.035c2.12 0 3.314 1.43 3.314 3.034zm-4.04.21v.227c0 .586.227.8.581.8.31 0 .564-.17.564-.743v-.367c0-.516-.275-.708-.572-.708-.346 0-.573.245-.573.791"
          />
        </svg>
        {{ myData.memail }}
      </p>
    </div>
  </div>
  <hr class="my-4" />

  <!-- 회원(친구) 검색 -->
  <div class="search-area">
    <div class="col-auto">
      <label for="friendSearch" class="form-label">
        닉네임으로 친구 검색
      </label>
    </div>
    <div class="col-auto">
      <div class="input-group">
        <input
          type="text"
          v-model="friendSearchQuery"
          class="form-control"
          id="friendSearch"
          required
        />
        <button
          type="submit"
          class="btn btn-primary btn-primary-search"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          @click="showSearchFriend"
        >
          검색
        </button>
      </div>
    </div>
  </div>

  <!-- 검색된 친구 목록 -->
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">
            검색된 친구 목록
          </h1>
        </div>
        <div class="modal-body">
          <p v-if="!searchFriend">검색된 닉네임이 없습니다</p>
          <!-- 유효한 계정의 닉네임만 가져옴 -->
          <p v-if="searchFriend.mstatus_mikey === 201">
            - {{ searchFriend.mnic }} -
          </p>
          <button
            v-if="searchFriend.mstatus_mikey === 201"
            type="button"
            class="btn btn-primary"
            @click="fetchPlusFriend"
          >
            친구추가
          </button>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-primary"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  </div>

  <hr class="my-4" />

  <!-- 내친구 목록보기, 요청대기중인 친구보기 버튼 -->
  <div class="d-grid gap-2">
    <button
      id="friendList"
      type="button"
      class="btn btn-primary"
      @click="showFriendList"
    >
      나의 친구목록 보기
    </button>
    <button
      id="friendWait"
      type="button"
      class="btn btn-primary"
      @click="showFriendWait"
    >
      요청 대기중인 친구 보기
    </button>
    <button
      id="friendCall"
      type="button"
      class="btn btn-primary"
      @click="showFriendCall"
    >
      받은 요청 보기
    </button>
  </div>

  <hr class="my-4" />

  <!-- 내친구 목록보기 -->
  <div v-if="friendList">
    <div class="card text-center">
      <div class="card-header">
        <h5 class="card-title">나의 친구목록</h5>
      </div>
      <div class="card-body">
        <p class="card-text" v-for="friend in myFriendList" :key="friend">
          - {{ friend.mnic }} -
        </p>
      </div>
    </div>
  </div>
  <!-- 요청대기중인 친구목록 보기 -->
  <div v-if="friendWait">
    <div class="card text-center">
      <div class="card-header">
        <h5 class="card-title">요청대기중인 친구</h5>
      </div>
      <div class="card-body">
        <p class="card-text" v-for="friend in myFriendWait" :key="friend">
          - {{ friend.mnic }} -
        </p>
      </div>
    </div>
  </div>
  <!-- 요청받은 친구목록 보기 -->
  <div v-if="friendCall">
    <div class="card text-center">
      <div class="card-header">
        <h5 class="card-title">받은 요청</h5>
      </div>
      <div class="card-body">
        <p class="card-text" v-for="(friend, i) in myFriendCall" :key="i">
          - {{ friend.mnic }} -
          <button
            type="button"
            class="btn btn-primary"
            @click="acceptFriend(i)"
          >
            수락
          </button>
          <button
            type="button"
            class="btn btn-secondary"
            @click="refuseFriend(i)"
          >
            거절
          </button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from "axios";
export default {
  data() {
    return {
      myFriendList: [],
      myFriendWait: [],
      myFriendCall: {},
      searchFriend: {},
      myData: {},
      friendList: false,
      friendWait: false,
      friendCall: false,
      friendSearchQuery: "",
    };
  },
  mounted() {
    this.fetchMyData();
  },
  methods: {
    // 페이지들어오면 내정보와 친구목록 가져오기
    async fetchMyData() {
      try {
        const response = await this.axios.post("/JY_C_MyFriend", {
          mnum: this.$store.state.userMnum
        }); 
        this.myData = response.data;
        console.log("Response:", response.data);
      } catch (error) {
        console.error("Error fetching MyFriends:", error);
      }
    },
    // 친구목록 버튼 클릭시 수락된 친구 불러옴
    async showFriendList() {
      try {
        const response = await this.axios.post("/JY_C_MyFriendList", {
          mnum: this.myData.mnum
        });
        this.myFriendList = response.data;
        console.log("showFriendList clicked");
        this.friendList = true;
        this.friendWait = false;
        this.friendCall = false;
        console.log("Response:", response.data);
      } catch (error) {
        console.error("Error showing MyFriendList:", error);
      }
    },
    // 요청대기중인 친구 목록 버튼 클릭시 수락요청중인 친구 불러옴
    async showFriendWait() {
      try {
        const response = await this.axios.post("/JY_C_MyFriendWait", {
          mnum: this.myData.mnum
        }); 
        this.myFriendWait = response.data;
        console.log("showFriendWait clicked");
        this.friendWait = true;
        this.friendList = false;
        this.friendCall = false;
        console.log("Response:", response.data);
      } catch (error) {
        console.error("Error showing MyFriendWait:", error);
      }
    },
    // 받은 요청 불러오는 메소드
    async showFriendCall() {
      try {
        const response = await this.axios.post("/JY_C_MyFriendCall", {
          mnum: this.myData.mnum
        });
        this.myFriendCall = response.data;
        console.log("showFriendCall clicked");
        this.friendCall = true;
        this.friendList = false;
        this.friendWait = false;
        console.log("Response:", response.data);
      } catch (error) {
        console.error("Error showing MyFriendCall:", error);
      }
    },

    // 받은요청 수락 메소드
    async acceptFriend(i) {
      try {
        this.myFriendCall[i].mfstatus_mikey = 702;
        const response = await this.axios.post(
          "/JY_C_UpdateFriend",
          this.myFriendCall[i]
        );
        console.log("Response: ", response.data);
        // acceptFriend 메소드 실행 후에 showFriendCall 메소드를 호출하여 받은 요청을 다시 불러옵니다.
        await this.showFriendCall();
      } catch (error) {
        // 요청이 실패한 경우 에러 처리
        console.error("Error accepting friend request:", error);
      }
    },

    // 받은요청 거절 메소드
    async refuseFriend(i) {
      try {
        this.myFriendCall[i].mfstatus_mikey = 703;
        const response = await this.axios.post(
          "/JY_C_UpdateFriend",
          this.myFriendCall[i]
        );
        console.log("Response: ", response.data);
        // refuseFriend 메소드 실행 후에 showFriendCall 메소드를 호출하여 받은 요청을 다시 불러옵니다.
        await this.showFriendCall();
      } catch (error) {
        // 요청이 실패한 경우 에러 처리
        console.error("Error accepting friend request:", error);
      }
    },

    // 친구검색 메소드
    async showSearchFriend() {
      try {
        const response = await this.axios.post("/JY_C_MyFriendSearch", {
          mnic: this.friendSearchQuery
        });
        this.searchFriend = response.data;
        console.log("Search", this.friendSearchQuery);
        console.log("Response:", response.data);
      } catch (error) {
        console.error("Error showing MyFriendSearch:", error);
      }
    },
    // 친구추가 신청 메소드
    async fetchPlusFriend() {
      try {
        const response = await this.axios.post("/JY_C_PlusFriend", {
          mnum: this.myData.mnum,
          mfnum: this.searchFriend.mnum,
          mfstatus_makey: 700,
          mfstatus_mikey: 701,
          from_id: this.myData.mnum
        });

        if (response.data === -1) {
          // 친구 추가에 실패한 경우
          alert("이미 친구이거나 추가 할 수 없는 상대입니다.");
        } else {
          // 친구 추가에 성공한 경우
          console.log("kkkResponse:", response.data);
          alert("친구요청을 보냈습니다.");
        }
      } catch (error) {
        console.error("Error adding friend:", error);
        // 에러 메시지 표시
        alert("친구 추가 중 오류가 발생했습니다.");
      }
    }
  }
}
</script>

<style>
.search-area {
  margin-top: 50px;
  margin-bottom: 50px;
}

.btn-primary {
  background-color: #f5835d;
  border-color: #ffe0c7;
}

/* 검색 버튼에만 다른 스타일 */
.btn-primary-search {
  background-color: #f5835d;
  border-color: #f5835d;
  color: #ffff;
}

.btn-primary-search:hover {
  background-color: #ffe0c7;
  border-color: #ffe0c7;
  color: #2c2b2b;
}

.text-center {
  border-color: #f5835d;
}

.my-4 {
  border-color: blue;
}

.bi-envelope-at-fill {
  color: #f5835d;
}
</style>
