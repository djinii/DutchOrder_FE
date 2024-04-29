<!-- OrderDetailModal.vue -->
<template>
  <div class="modal" tabindex="-1" role="dialog" id="orderDetailModal">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">주문 상세 정보</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body">
          <p>전화번호: {{ order.phone }}</p>
          <p>주소: {{ order.address }}</p>
          <p>메뉴: {{ order.menu }}</p>
          <p>가격: {{ order.price }}</p>
        </div>
        <div class="modal-footer">
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
              @click="showModal = false"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MS_B_OrderDetailModal",
  props: ["order"],
  data() {
    return {
      showModal: false,
    };
  },
  methods: {
    openModal() {
      this.showModal = true;
    },
  },
};
</script>
