<template>
  <div class="detail">
    <nav class="top">
      <ul>
        <router-link class="item" to="/travel">
          <span class="iconfont icon-fangxiangyou"></span>
        </router-link>
        <li class="desc">{{ title }}</li>
      </ul>
    </nav>
    <!-- <img src="http://b3-q.mafengwo.net/s7/M00/E0/48/wKgB6lRtnhCAOkAiAAyLalBGXD051.jpeg?imageView2%2F2%2Fw%2F2000%2Fh%2F600%2Fq%2F90" preview="1" preview-text="文本" alt=""> -->
    <div class="fixed">
      <div v-for="(item, index) in items" :key="index">
        <div>
          <img preview="repairDetail" :preview-text="title" :src="item.imgUrl" class="img">
        </div>
        <p class="city" v-if="item.city">{{ index+1 }}、{{ item.city }}</p>
        <p class="content" v-if="item.content" v-html="item.content"></p>
        <p class="spot" v-if="item.spot">{{ item.spot }}</p>
        <p class="items" v-if="item.items" v-html="item.items"></p>
        <p class="price" v-if="item.price">{{ item.price }}</p>
        <p class="term" v-html="item.term" v-if="item.term"></p>
        <p class="why" v-if="item.why">{{ item.why }}</p>
        <p class="contents" v-if="item.contents" v-html="item.contents"></p>
        <p class="introduce" v-if="item.introduce">{{ item.introduce }}</p>
        <p class="item" v-if="item.item" v-html="item.item">{{ item.item }}</p>
        <p class="tip" v-if="item.tip">{{ item.tip }}</p>
        <p class="tips" v-if="item.tips">{{ item.tips }}</p>
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
var getAa = require("../mock/week");
export default {
  name: "Detail",
  data() {
    return {
      items: [],
      title:''
    };
  },
  mounted() {
    var response = getAa;
    for (var i = 0; i < response.data.springList.length; i++) {
      if (response.data.springList[i].id == this.$route.params.id) {
        this.items = response.data.springList[i].item;
        this.title = response.data.springList[i].title;
        console.log(response.data.springList[i].item)
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
  padding: rem(30px) rem(16px);
  padding-top: rem(100px);  
  font-size: rem(22px);
  p {
    font-size: rem(26px);
  }
  .img {
    box-sizing: border-box;
    padding: rem(10px) rem(10px);
    margin-top: rem(10px);
    width: 100%;
    height: rem(340px);
    border: rem(1px) solid #000;
  }
  .why ,
  .introduce ,
  .tip ,
  .city ,
  .spot ,
  .price {
    font-weight: 700;
    font-size: rem(30px);
    padding: rem(8px) rem(10px);
    color: red;
  }
  .city {
    font-size: rem(40px);
    color: #f60;
  }
  .items {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .content {
    text-indent: rem(40px);
  }
}

</style>
