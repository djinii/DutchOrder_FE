<!-- 결제 금액 list eg. 각 멤버별 금액, 배달비 등등 -->
<template>
    <div>
        <div v-for="rec in receipt" :key="rec.item" class="hstack gap-3">
          <div class="p-2">
            <p class="mb-0">{{ rec.item }}</p>
          </div>
          <div class="p-2 ms-auto">
            <h6 class="mb-0">{{ rec.amount }} 원</h6>
          </div>
        </div>
        
    
        <div class="hstack gap-2 fw-bold">
            <div class="p-2">총 결제금액</div>
            <div class="p-2 ms-auto">{{total}} 원</div>
        </div>
        <br>
    </div>
  </template>

<script>
export default {
  props: {
        total: {
            type: Number,
            required: true
        },
        receipt:{
          type:Array,
          required:true
        }
    },
  data() {
    return {
      modal: null,
    }
  },
  created(){
    // this.receipt[-1].amount = this.total;
  },
  computed:{
    cal_total(){
      let sum = 0;
      for(var i=0; i < 2; i++){
        console.log(this.receipt)
        // sum += this.receipt[i].amount
      }
      return sum
    }
  },
  methods:{
  }
}
// addFrd의 값에 따라서 commit을 다르게 
// 혼자 결제할때 화면에 출력띄우는건...
// 주문금액 -> 카드 메뉴들의 총합 가져오기 cartStore
// 주문하기 눌렀을때 cartStore에 있는 값의 합과 mnum을 ordMap의 receiptLi에 저장, 배달금액도 함꼐

//  맵 길잉를 확인하고 메뉴갯수와 다르면 리턴 yet -> 부모컴포넌트에
// 그걸 방탕으로 결제완료 받아들이
</script>

  