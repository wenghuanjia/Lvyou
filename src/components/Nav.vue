<template>
  <div class="nav">
    <nav class="top">
      <ul>
        <router-link class="item" to="/travel">
          <span class="iconfont icon-fangxiangyou"></span>
        </router-link>
        <li class="desc">{{ name }}</li>
      </ul>
    </nav>
    <div class="shop-con">
      <div class="shop" v-for="item in shop" :key="item.id">
        <img :src="item.images[0]" class="shop-img" alt="">
        <div class="shop-info">
          <p class="shop-title">{{ item.name }}</p>
          <p class='shop-tel'>电话：{{ item.phone }}</p>
          <p class='shop-address ell'>地址：{{ item.address }}</p>
          <p class='shop-time'>营业时间{{ item.businessHours }}</p>
        </div>
        <div class="shop-star">
          <span class='star-after'>★★★★★</span>
          <span class='star-before' :style="'width:'+item.score+'%'">★★★★★</span>
        </div>
      </div>
    </div>
    <div v-if="isShow">
      <infinite-loading v-if="isShow" @infinite="infiniteHandler"></infinite-loading>
    </div>
    <div class="nomsg" v-else-if="shop.length===0">暂无对应的数据...</div>
  </div>
</template>
<script>
import InfiniteLoading from "vue-infinite-loading";
// 引入 axios 获取数据
import axios from "axios";
export default {
  data() {
    return {
      shop: [],
      id: '',
      name: '',
      arr: ['美食', '洗浴足疗', '结婚啦', '卡拉OK', '找工作', '辅导班', '汽车保养', '租房', '装修'],
      page: 1,
      isShow: false
    }
  },
  mounted() {
    // 保存id值
    this.id = this.$route.params.id;
    axios.get("https://locally.uieee.com/categories/"+ this.id +"/shops?_limit=10").then(res => {
      this.$nextTick(() => {
        this.shop = res.data;
        this.isShow = true;
      })
    })
    this.name = this.arr[this.id - 1];
    if (this.$route.path.indexOf("detail")) {
      document.getElementById("footer").style.display = "none";
    }
  },
  // 方法
  methods: {
    infiniteHandler($state) {
      setTimeout(() => {
        axios.get("https://locally.uieee.com/categories/"+ this.id +"/shops?_limit=10&_page=" + ++this.page).then(res => {
          this.shop = this.shop.concat(res.data);
          if (res.data.length == 0) {
            this.isShow = false;
            // 结束了
            return;
          }
        })
        // 再次调用请求的函数
        $state.loaded();
      }, 500);
    }
  },
  components: {
    InfiniteLoading
  }
}
</script>
<style lang="scss" scoped>
@import "../assets/sass/base.scss";
nav.top {
  position: fixed;
  z-index: 99;
  width: 100%;
  height: rem(80px);
  background: #00bcd4;
  ul {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .item {
      color: #fff;
      span {
        font-size: rem(40px);
        margin-left: rem(10px);
      }
    }
    .desc {
      flex: 1;
      color: #fff;
      text-align: center;
      font-size: rem(40px);
    }
  }
}
.shop-con {
  padding-top: rem(90px);
  .shop {
    padding: rem(20px);
    border-bottom: rem(1px) solid #ddd;
    display: flex;
    position: relative;
    .shop-img {
      width: rem(160px);
      height: rem(160px);
      margin-right: rem(20px);
    }
    .shop-info {
      width: rem(520px);
      display: flex;
      flex-direction: column;
      font-size: rem(20px);
      color: #666;
      line-height: 1.5;
      .shop-title {
        font-size: rem(30px);
        color: #333;
        margin-right: rem(22px);
      }
    }
    .shop-star {
      position: absolute;
      right: rem(20px);
      top: rem(20px);
      color: #e2e2e2;
      .star-after {
        color: #e2e2e2;
      }
      .star-before {
        color: #f19e38;
        position: absolute;
        left: 0;
        top: 0;
        width: 90%;
        overflow: hidden;
      }
    }
  }
}
.nomsg {
  padding-top: rem(90px);
  text-align: center;
  font-size: rem(30px);
}
</style>