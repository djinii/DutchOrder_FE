<template>
  <div>

    <!-- 챗봇 아이콘 -->
    <button class="btn btn-dark btn-md chatbot" @click="toggleChatModal">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="25"
        fill="white"
        class="bi bi-chat-dots"
        viewBox="0 0 16 16"
      >
        <path
          d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2"
        />
        <path
          d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9 9 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.4 10.4 0 0 1-.524 2.318l-.003.011a11 11 0 0 1-.244.637c-.079.186.074.394.273.362a22 22 0 0 0 .693-.125m.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6-3.004 6-7 6a8 8 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a11 11 0 0 0 .398-2"
        />
      </svg>
    </button>
  
    <div
      class="chat_modal"
      id="chatModal"
      tabindex="-1"
      aria-labelledby="chatModalLabel"
      aria-hidden="true"
      v-show="showChatModal"
    >
      <div class="row d-flex justify-content-center">
        <div
          class="col-md-8 col-lg-6 col-xl-4"
          style="width: 330px; height: 600px"
        >
          <div
            class="card"
            id="chat1"
            style="border-radius: 15px; overflow-y: auto; height: 100%"
          >
            <div
              class="card-header d-flex justify-content-between align-items-center p-3 bg-info text-white border-bottom-0"
              style="border-top-left-radius: 15px; border-top-right-radius: 15px"
            >
              <p class="mb-0 fw-bold">Chat Bot</p>
  
              <button
                type="button"
                class="btn-close"
                @click="toggleChatModal"
                aria-label="Close"
              ></button>
            </div>
            <div class="card-body">
              <!-- 메시지 반복 -->
              <div v-for="(message, index) in messages" :key="index">
                <!-- 사람메세지 -->
                <div
                  class="d-flex flex-row justify-content-end mb-4"
                  v-if="message.isUser"
                >
                  <div
                    class="p-3 me-3 border"
                    style="border-radius: 15px; background-color: #fbfbfb"
                  >
                    <p class="small mb-0">
                      {{ message.text }}
                    </p>
                  </div>
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                    alt="avatar 1"
                    style="width: 45px; height: 100%"
                  />
                </div>
  
                <!-- 챗봇응답메세지 -->
                <div class="d-flex flex-row justify-content-start mb-4" v-else>
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                    alt="avatar 1"
                    style="width: 45px; height: 100%"
                  />
                  <div
                    class="p-3 ms-3"
                    style="
                      border-radius: 15px;
                      background-color: rgba(57, 192, 237, 0.2);
                    "
                  >
                    <p class="small mb-0">{{ message.text }}</p>
                  </div>
                </div>
              </div>
            </div>
  
            <!-- 메세지 입력칸 -->
            <div class="card-footer">
              <div class="input-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="메세지를 입력하세요..."
                  v-model="currentMessage"
                  @keyup.enter="handleEnterKey"
                />
                <button
                  class="btn btn-primary"
                  type="button"
                  @click="sendMessageToBackend"
                >
                  보내기
                </button>
              </div>
            </div>
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
      currentMessage: "", // 입력된 메시지
      messages: [], // 채팅 메시지 목록
      showChatModal: false, // 모달 표시 여부
    };
  },
  methods: {
    // 챗봇 모달 열기/닫기 토글
    toggleChatModal() {
      this.showChatModal = !this.showChatModal;
    },
    async sendMessageToBackend() {
      // 사용자가 메시지를 입력하고 보내기 버튼을 클릭할 때 실행되는 메소드
      // 사용자 메시지를 메시지 목록에 추가
      this.messages.push({
        text: this.currentMessage,
        isUser: true,
      });

      try {
        // 사용자가 입력한 메시지를 서버로 전송
        const response = await this.axios.post("/api/chat", {
          message: this.currentMessage,
        });

        console.log("response.data->", response.data);

        // 백엔드에서 받은 응답 메시지를 채팅 목록에 추가
        this.messages.push({
          text: response.data,
          isUser: false,
        });

      } catch (error) {
        console.error("Error sending message to backend:", error);
        // 에러 발생 시 "질문을 이해하지 못했어요" 메시지를 채팅 목록에 추가
        this.messages.push({
          text: "질문을 이해하지 못했어요",
          isUser: false,
        });
      }

      // 메시지를 전송한 후 입력 칸 비우기
      this.currentMessage = "";
    },
    // 엔터 키 이벤트 핸들러
    handleEnterKey(event) {
      if (event.key === "Enter") {
        this.sendMessageToBackend();
      }
    },
  },
};
</script>

<style>
.chatbot {
  position: fixed;
  bottom: 230px; /* 원하는 위치에 조정하세요 */
  right: 20px; /* 원하는 위치에 조정하세요 */
  z-index: 1000; /* 다른 요소 위에 표시되도록 설정 */
}
.chat_modal {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed; /* 화면 스크롤에 따라 모달 위치 고정 */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
}

/* .modal-dialog {
max-width: 80%;  모달의 최대 너비를 조정 
max-height: 80vh;  모달의 최대 높이를 조정 
} 
.modal-content {
border-radius: 15px;
}
*/
</style>
