<template>
    <div class="d-flex text-body-secondary pt-3" @click="showDetail(menu)">
      <div class="pb-3 mb-0 small lh-sm border-bottom w-100">
        <div class="d-flex justify-content-between">
          <strong class="text-gray-dark" style="padding-left: 10px;">{{ menu.fname }}</strong>
          <p href="#" style="padding-right: 10px;">{{ menu.fprice }} 원 </p>
        </div>
        <span class="d-block" style="padding-left: 13px;">{{menu.finfo}}</span>
      </div>
    </div>

</template>
<script>
export default{
    props: {
        menu: {
            type: Object,
            required: true
        }
    },
    methods:{
        showDetail(m){
            console.log(m); // 객체의 내용을 콘솔에 출력
            let fnum_16 = (m.fnum*100).toString(16);
            console.log(fnum_16 + "  -   " + m.fnum);
            console.log((parseInt(fnum_16, 16))*0.01 + " -- " + fnum_16);
            this.$router.push({ path: '/client/shopInfo/itemView', 
            query: { fdeT: fnum_16 } });
            // 라우팅 주소에 메뉴정보를 전달해서 가져와야함
        }
    }
}
</script>