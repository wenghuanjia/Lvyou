<template>
  <div class="list">
    <!-- loading 组件 -->
    <!-- <loading v-if="!items.length"></loading> -->
    <ul class="items">
      <li v-for="(item,index) in items" class="item" :key="index">
        <div class="info">
          <p class="info-abstract" v-if="item.abstract">{{ item.abstract }}</p>
          <p class="info-source">{{ item.source }}</p>
        </div>
        <img :src="item.middle_image" alt>
      </li>
    </ul>
  </div>
</template>

<script>
// 引入 Loading 组件
import loading from "@/components/Loading";
export default {
  name: "List",
  data() {
    return {};
  },
  props: ["items"],
  // 加载组件
  components: {
    // loading 组件
    loading
  }
};
</script>

<style scoped lang="scss">
// 引入 公共样式
@import "../../assets/sass/base.scss";
.list {
  width: 100%;
  .items {
    width: 100%;
    padding: rem(10px) rem(5px);
    box-sizing: border-box;
    .item {
      width: 100%;
      display: flex;
      .info {
        width: 100%;
        .info-abstract {
          width: 100%;
          margin: rem(10px) rem(5px);
          font-size: rem(30px);
        }
        .info-source {
          margin: rem(10px);
          font-size: rem(24px);
          color: red;
        }
      }
    }
  }
}
</style>
