<template>
  <div class="travel">
    <router-view></router-view>
    <!-- loading 组件 -->
    <loading v-if="!items.length"></loading>
    <!-- 轮播图 start -->
    <mt-swipe :auto="0" class="items">
      <mt-swipe-item v-for="item in items" class="item" :key="item.id">
        <img :src="item.imgUrl" alt>
      </mt-swipe-item>
    </mt-swipe>
    <!-- 轮播图 end -->
    <!-- list start -->
    <div class="list">
      <ul class="list_top">
        <li>
          <a href>
            <span class="iconfont icon-meishi new_icon" style="background: #ef8943"></span>
            <span>美食</span>
          </a>
        </li>
        <li>
          <a href>
            <span class="iconfont icon-cat new_icon" style="background: #e45749;"></span>
            <span>电影</span>
          </a>
        </li>
        <li>
          <a href>
            <span class="iconfont icon-jiudianzhusu new_icon" style="background:#ac7c59"></span>
            <span>酒店住宿</span>
          </a>
        </li>
        <li>
          <a href>
            <span class="iconfont icon-beizi101 new_icon" style="background: #5ec4b3"></span>
            <span>休闲娱乐</span>
          </a>
        </li>
        <li>
          <a href>
            <span class="iconfont icon-waimai new_icon" style="background:#f4bc44"></span>
            <span>外卖</span>
          </a>
        </li>
      </ul>
      <ul class="list_bottom">
        <li>
          <a href>
            <span class="iconfont icon-waimai icon-xuexi" style="color:#57bdaa"></span>
            <span>学习培训</span>
          </a>
        </li>
        <li>
          <a href>
            <span class="iconfont icon-waimai icon-lv_zuanshi" style="color:#eb6474"></span>
            <span>结婚/摄影</span>
          </a>
        </li>
        <li>
          <a href>
            <span class="iconfont icon-waimai icon-lvyou" style="color:#5ca2f8"></span>
            <span>周边游</span>
          </a>
        </li>
        <li>
          <a href>
            <span class="iconfont icon-waimai icon-jipiao" style="color:#5ca2f8"></span>
            <span>火车票</span>
          </a>
        </li>
        <li>
          <a href>
            <span class="iconfont icon-waimai icon-kuaidiyuanguanli_o" style="color:#f5be45"></span>
            <span>跑腿代购</span>
          </a>
        </li>
        <li>
          <a href>
            <span class="iconfont icon-waimai icon-jingdian" style="color:#6aabf6"></span>
            <span>景点/门票</span>
          </a>
        </li>
        <li>
          <a href>
            <span class="iconfont icon-waimai icon-40" style="color:#ed6f80"></span>
            <span>丽人/美发</span>
          </a>
        </li>
        <li>
          <a href>
            <span class="iconfont icon-waimai icon-daohangshangou" style="color:#f4b73f"></span>
            <span>闪购超市</span>
          </a>
        </li>
        <li>
          <a href>
            <span class="iconfont icon-waimai icon-liebiaodaohang_shishang" style="color:#8d68ed"></span>
            <span>时尚购</span>
          </a>
        </li>
        <li>
          <a href>
            <span class="iconfont icon-waimai icon-fenlei" style="color:#ed7081"></span>
            <span>全部分类</span>
          </a>
        </li>
      </ul>
    </div>
    <!-- list end -->
    <ul class="datas">
      <li class="description">热门推荐</li>
      <li v-for="(recommend,index) in recommends" :key="index" class="data">
        <img :src="recommend.imgUrl" class="img" alt>
        <div class="item-info">
          <p class="item-title">{{recommend.title}}</p>
          <p class="item-desc">{{recommend.desc}}</p>
          <router-link :to="'/detail/'+recommend.id" tag="button" class="item-button">查看详情</router-link>
        </div>
      </li>
    </ul>
    <div class="gos">
      <div class="go">周末去哪儿</div>
      <div class="weeks" v-for="(week,index) in weeks" :key="index">
        <img :src="week.imgUrl" alt class="goImg">
        <p class="title">{{ week.title }}</p>
        <p class="desc">{{ week.desc }}</p>
      </div>
    </div>
  </div>
</template>

<script>
// 引入 axios 获取数据
import axios from "axios";
// 引入 Loading 组件
import loading from "@/components/Loading";
var getAa = require('../mock/index');
export default {
  name: "Travel",
  data() {
    return {
      items: [],
      recommends: [],
      weeks: []
    };
  },
  mounted() {
    console.log(getAa);
    var response = getAa;
    // axios.get("/static/mock/index.json").then(response => {
      this.items = response.data.swiperList;
    // });
    // axios.get("/static/mock/index.json").then(response => {
      this.recommends = response.data.recommendList;
    // });
    // axios.get("/static/mock/index.json").then(response => {
      this.weeks = response.data.weekendList;
    // });
    if (this.$route.path.indexOf("detail")) {
      document.getElementById("footer").style.display = "block";
    }
  },
  components: {
    // loading 组件
    loading
  }
};
</script>

<style lang="scss" scoped>
// 引入基础公共样式
@import "../assets/sass/base.scss";
// 样式
.travel {
  width: 100%;
  margin-bottom: rem(100px);
  .items {
    width: 100%;
    margin-bottom: rem(20px);
    .item {
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .mint-swipe {
    height: rem(300px);
  }

  // list
  .list {
    height: rem(500px);
    width: 100%;
    border-bottom: rem(20px) solid #f4f4f4;
    .list_top {
      height: rem(200px);
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      li {
        width: 20%;

        a {
          display: flex;
          flex: 1;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          font-size: rem(30px);
          color: #333;

          span {
            font-size: rem(30px);

            &.new_icon {
              display: block;
              margin: auto;
              margin-bottom: 0.14rem;
              width: rem(90px);
              height: rem(90px);
              border-radius: 50%;
              text-align: center;
              line-height: rem(90px);
              font-size: rem(50px);
              color: #fff;
            }
          }
        }
      }
    }

    .list_bottom {
      height: rem(300px);
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;

      li {
        width: 20%;

        a {
          display: flex;
          flex: 1;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: #333;

          // font-size: rem(26px);
          span {
            &:nth-child(1) {
              font-size: rem(50px);
              margin-bottom: rem(22px);
            }
          }
        }
      }
    }
  }

  // datas
  .datas {
    padding: rem(20px) rem(15px);
    .description {
      font-size: rem(30px);
      padding: rem(10px) 0;
    }
    .data {
      display: flex;
      margin-top: rem(20px);
      img {
        width: rem(200px);
        height: rem(200px);
        margin-right: rem(20px);
      }
      .item-info {
        font-size: rem(28px);
        .item-title {
          font-size: rem(34px);
          line-height: rem(60px);
        }
        .item-desc {
          font-size: rem(30px);
          color: #999;
        }
        .item-button {
          border: none;
          line-height: rem(40px);
          background: #ff9300;
          font-size: rem(26px);
          margin-top: rem(20px);
          outline: none;
          padding: 0 rem(16px);
          border-radius: rem(10px);
          color: #fff;
        }
      }
    }
  }
  // gos
  .gos {
    .go {
      padding: rem(20px) rem(15px);
      font-size: rem(30px);
      // padding: rem(10px) 0;
    }
    .goImg {
      width: 100%;
    }
    .weeks {
      font-size: rem(24px);
      .title {
        padding: rem(10px) rem(15px);
      }
      .desc {
        color: #999;
        font-size: rem(24px);
        padding-left: rem(10px);
        padding-bottom: rem(15px);
      }
    }
  }
}
</style>
