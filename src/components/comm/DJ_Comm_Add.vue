<template>
    <div>
      <input type="text" v-model="postcode" placeholder="우편번호">
      <button @click="execDaumPostcode">우편번호 찾기</button><br>
      <input type="text" v-model="address" placeholder="주소"><br>
      <input type="text" v-model="detailAddress" placeholder="상세주소">
      <input type="text" v-model="extraAddress" placeholder="참고항목">
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        postcode: '',
        address: '',
        detailAddress: '',
        extraAddress: ''
      }
    },
    methods: {
      execDaumPostcode() {
        new window.daum.Postcode({
          oncomplete: data => {
            var addr = '';
            var extraAddr = '';
  
            if (data.userSelectedType === 'R') {
              addr = data.roadAddress;
            } else {
              addr = data.jibunAddress;
            }
  
            if(data.userSelectedType === 'R'){
              if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                extraAddr += data.bname;
              }
              if(data.buildingName !== '' && data.apartment === 'Y'){
                extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
              }
              if(extraAddr !== ''){
                extraAddr = ' (' + extraAddr + ')';
              }
              this.extraAddress = extraAddr;
            } else {
              this.extraAddress = '';
            }
  
            this.postcode = data.zonecode;
            this.address = addr;
          }
        }).open();
      }
    }
  }
  </script>
  