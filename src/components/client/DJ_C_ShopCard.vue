<template>
    <div class="card col-md-6">
        <!-- 위? 아래? 어디?? -->
        <h3 class="card-header mb-0" >{{ shopInfo.sname }}</h3>
        <svg class="bd-placeholder-img bd-placeholder-img-lg img-fluid" width="100%" height="250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Responsive image" preserveAspectRatio="xMidYMid slice" focusable="false">
            <title>Placeholder</title>
            <rect width="100%" height="100%" fill="#868e96"></rect>
            <!-- {{ shopInfo.simg1 }} -->
            <text x="50%" y="50%" fill="#dee2e6" dy=".3em">Responsive image</text>
        </svg>
      
      <div class="col p-4 d-flex flex-column position-static">
        <!-- 이름 리뷰보러가기 -->
        <strong class="d-inline-block mb-2 text-primary-emphasis">
          <a href="#" class="icon-link gap-1 icon-link-hover stretched-link">
            리뷰 보러가기 >
            <svg class="bi"><use xlink:href="#chevron-right"></use></svg>
          </a>
        </strong>

        <div class="mb-1 text-body-secondary">주소 : {{shopInfo.saddr}}</div>
        <div class="mb-1 text-body-secondary">전화번호 : {{shopInfo.stel}}</div>

        <!-- 지도 api로 위치 띄우기 -->
        <div class="mb-1 text-body-secondary">운영시간 : {{ shopInfo.start_time }} ~ {{ shopInfo.end_time }}</div>
        <div class="mb-1 text-body-secondary">최소주문금액 : 없음</div>
        <p class="card-text mb-auto">배달비 : 없음</p>
      </div>
    </div>
</template>
<script>
export default {
    props: {
        shopInfo: {
            type: Object,
            required: true
        },
    },data(){
        return{
        }
    }
    
}
</script>