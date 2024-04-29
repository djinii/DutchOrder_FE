<template>
  <footer>
    <div class="footer-container">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <h2>Dutch Order</h2>
            <p>주소: 서울시 더치구 오더로 123</p>
            <p>대표이사 : 중앙정보 4조</p>
            <p>개인정보보호책임자 : 팀원</p>
            <p>Email: dutchOrder4@gmail.com</p>
          </div>

          <div class="footer-section">
            <h2>고객센터</h2>
            <p>연락처 : 02-1234-5678</p>
            <p>운영시간 09:00 ~ 18 : 00</p>
          </div>

          <div class="footer-section">
            <h2>About Us</h2>
            <p>각자 결제 배달시스템 더치오더입니다</p>
            <p>ⓒ {{ currentYear }} {{ shopName }}. All rights reserved.</p>
            <p
              href="https://www.flaticon.com/kr/free-icons/"
              title="메뉴 아이콘"
            >
              메뉴 아이콘 제작자: ariefstudio - Flaticon
            </p>
            <p
              href="https://www.flaticon.com/kr/free-icons/-"
              title="음식 배달 아이콘"
            >
              음식 배달 아이콘 제작자: Freepik - Flaticon
            </p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const shopName = "DutchOrder";
const currentYear = new Date().getFullYear();
</script>

<style scoped>
/* 푸터 영역 위치 고정 */
.footer-container {
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: #f5835d;
  color: white;
  padding: 20px 0;
  display: flex;
  justify-content: center;
}

/* 화면 너비가 768px 미만일 때 적용될 스타일 */
@media (max-width: 768px) {
  .footer-container {
    padding: 10px 0; /* 패딩 줄이기 */
  }

  .footer-container h2,
  .footer-container p {
    font-size: 0.8rem; /* 폰트 크기 줄이기 */
  }
}

/* 화면 너비가 480px 미만일 때 적용될 스타일 */
@media (max-width: 480px) {
  .footer-container {
    padding: 5px 0; /* 더 작은 패딩으로 줄이기 */
  }

  .footer-container h2 {
    font-size: 0.7rem; /* 더 작은 폰트 크기로 줄이기 */
  }

  .footer-container p {
    font-size: 0.6rem; /* 더 작은 폰트 크기로 줄이기 */
  }
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.footer-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.footer-section {
  margin: 10px 10px;
  max-width: 300px;
}

h2 {
  font-size: 1.2rem;
  margin-bottom: 10px;
}

p {
  font-size: 0.8rem;
  margin: 5px 0;
}

footer a {
  color: white;
  text-decoration: none;
}
</style>
