<template>
  <div class="detail">
    <nav class="top">
      <ul>
        <router-link class="item" to="/travel">
          <span class="iconfont icon-fangxiangyou"></span>
        </router-link>
        <li class="desc">{{ items.title }}</li>
      </ul>
    </nav>
    <div class="fixed">
      <img :src="items.imgUrl" class="img">
      <div class="txt">
        <div class="title">{{ items.title }}</div>
        <div class="desc">{{ items.desc }}</div>
        <div class="content" v-html="items.content"></div>
      </div>
    </div>
  </div>
</template>
<script>
// 引入 axios 获取数据
import axios from "axios";
// 引入 Loading 组件
import loading from "@/components/Loading";
// 引入本地数据
var getAa = require("../mock/detail");
export default {
  name: "Detail",
  data() {
    return {
      items: []
    };
  },
  mounted() {
    var response = getAa;
    for (var i = 0; i < response.data.recommendList.length; i++) {
      if (response.data.recommendList[i].id == this.$route.params.id) {
        this.items = response.data.recommendList[i];
      }
    }
    if (this.$route.path.indexOf("detail")) {
      document.getElementById("footer").style.display = "none";
    }
  },
  components: {
    // loading 组件
    loading
  }
};
</script>
<style lang="scss" scoped>
// 公共样式
@import "../assets/sass/base.scss";
nav.top {
  position: fixed;
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
.fixed {
  .img {
    box-sizing: border-box;
    padding: rem(0px) rem(5px);
    margin-top: rem(100px);
    width: 100%;
  }
  .txt {
    padding: rem(0px) rem(20px);
    .title {
      font-size: rem(30px);
      text-align: center;
      padding: rem(10px) rem(10px);
    }
    .desc {
      text-align: center;
      font-size: rem(24px);
      color: #ff9300;
    }
    .content {
      font-size: rem(30px);
      text-indent: rem(20px);
    }
  }
}
</style>
