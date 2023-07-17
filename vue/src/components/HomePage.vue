<template>
  <div>
    <banner />
    <div style="width:1120px; margin:0 auto;">
      <p class="title" style="text-align: center;">BEST ITEM</p>
      <p class="sub" style="text-align: center;">가장 인기있는 상품입니다</p>
      <fbanner></fbanner>
    </div>
  </div>
</template>

<script>
import banner from '../components/banner.vue'
import fbanner from '../components/fbanner.vue'


export default {
  components: {
    banner,
    fbanner

  },
  data() {
    return {



    };
  },
  methods: {



  }
}
</script>

<style lang="css" scoped>
.title {
  margin: 20px 0px;
  font-size: 25px;
}

.sub {
  margin: 20px 0px;
}
</style>