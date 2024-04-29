<!-- 카테코리마다 경로 연결후 get요청 -->
<template>
    <div class="row d-flex justify-content-center ">
        <div class="col-3 mb-3 text-center " style="width: 75px; height: 75px;" v-for="item in cateLi" :key="item" @click="selectCategory(item.fkey)">
            <img class="card-img" :src="item.image" :alt="item.name" />{{ item.name }}
        </div>
    </div>
</template>

<script>
export default {
    props:{
        cateLi:{
            type:Array,
            required:true
        }
    },
    data(){
        return{

        }
    },
    methods:{
        // 카테고리 클릭 시 해당 카테고리 페이지로 이동
      selectCategory(category) {
        this.$emit('update:category', category);
    }
    }
}
</script>