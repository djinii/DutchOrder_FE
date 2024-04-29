<template>
  <!-- 실제 최종 frontEnd파일 header 파일명 수정이 필요함 -->
  <div id="app" class="site">
  <Comm_Header></Comm_Header>
      
      <div id="page-content-wrapper" style="min-height: 1000px;">
        <div class="container-fluid">
          <MW_Chatbot class="z-2 position-absolute" ></MW_Chatbot>
          <div class="site-content p-5"><router-view /></div>
        </div>
      </div>
      
      <Comm_Footer></Comm_Footer>
    </div>
  <!-- </div> -->
</template>

<script setup>
import Comm_Header from "./components/comm/JH_Comm_Header2.vue";
import Comm_Footer from "./components/comm/JH_Comm_Footer2.vue";
import MW_Chatbot from "./components/comm/MW_Chatbot.vue";
</script>

<style>
.site {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* 메인 콘텐츠 영역 스타일 */
.site-content {
  flex: 1; /* 콘텐츠 영역이 유동적으로 확장하여 푸터를 밀어내도록 함 */
  padding: 20px; /*  콘텐츠 영역의 패딩 */
}

/* 푸터 영역 스타일 - 기존 스타일 유지하되 position 관련 속성 제거 */
.Comm_Footer {
  width: 100%;
  background-color: #f5835d;
  color: white;
  padding: 20px 0;
  display: flex;
  justify-content: center;
}
</style>