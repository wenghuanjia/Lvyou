// 移动板块
<template>
  <div class="mobile">
    <ul class="items">
      <li v-for="(item,index) in items" class="item" :key="index">
        <div class="info">
          <p class="title">{{ item.title }}</p>
          <p class="description">{{ item.description }}</p>
          <p class="ctime">{{ item.ctime }}</p>
        </div>
        <img v-lazy="item.picUrl" alt>
      </li>
    </ul>
    <!-- 上下滑动的组件 -->
    <infinite-loading v-if="isShow" @infinite="infiniteHandler"></infinite-loading>
  </div>
</template>

<script>
// 引入 分页滑动组件
import InfiniteLoading from "vue-infinite-loading";
import axios from "axios";
export default {
  name: "Sport",
  data() {
    return {
      items: [],
      // 默认显示 第一页
      page: 1,
      isShow: true
    };
  },
  mounted() {
    axios
      .get(
        "http://api.tianapi.com/mobile/?key=cf3c751948de97ae55bc930010cef3c2&num=10"
      )
      .then(response => {
        // console.log(response.data.newslist);
        this.items = response.data.newslist;
      });
  },
  // 方法
  methods: {
    infiniteHandler($state) {
      setTimeout(() => {
        axios
          .get(
            "http://api.tianapi.com/mobile/?key=cf3c751948de97ae55bc930010cef3c2&num=10&page=" +
              ++this.page
          )
          .then(response => {
            // 把查询到的数据放到 items里
            this.items = this.items.concat(response.data.newslist);
            // 判断下一页，还有没有数据
            if (response.data.newslist.length == 0) {
              this.isShow = false;
              // 结束了
              return;
            }
          });
        // 再次调用请求的函数
        $state.loaded();
      }, 500);
    }
  },
  // 加载组件
  components: {
    // 主题列表组件
    InfiniteLoading
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/sass/base.scss";
@import "../../assets/sass/list.scss";
.mobile {
  margin-top: rem(90px);
  margin-bottom: rem(130px);
}
</style>
