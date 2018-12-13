<template>
  <div class="weather">
    <transition>
      <form action onsubmit="return false;" @keyup.enter="none" id="myform" style="display:none">
        <input type="text" name id="city" v-model="city" placeholder="请输入城市···">
      </form>
    </transition>
    <div class="items">
      <div v-for="(item) in weatherData.results" class="item">
        <div class="top">
          <p class="currentCity">
            {{ item.currentCity }}
            <!-- <router-link class="iconfont icon-local" to="/weather/city" tag="span"></router-link> -->
            <span class="iconfont icon-local" @click="toggleCity"></span>
          </p>
          <p class="currentDate">{{ weatherData.date }}</p>
          <p class="PM">
            <i>PM2.5:</i>
            {{ item.pm25 }}
          </p>
        </div>
        <ul v-for="(item) in item.weather_data" class="item_weather">
          <li class="img">
            <!-- <img :src="item.dayPictureUrl" alt=""> -->
            <img :src="item.dayPictureUrl" v-if="ctime<19" alt>
            <img :src="item.nightPictureUrl" v-else alt>
            <div class="txt">
              <p>{{ item.weather }}</p>
              <p>{{ item.date }}</p>
            </div>
          </li>
          <li class="now">{{ item.temperature }}</li>
          <li class="wind">风向：{{ item.wind }}</li>
        </ul>
        <p class="num">生活指数</p>
        <div class="live">
          <ul v-for="(item) in item.index" class="life">
            <li class="title">
              <span>{{ item.title }}</span>
              <span class="zs">{{ item.zs }}</span>
            </li>
            <li class="tipt">{{ item.tipt }}:</li>
            <li class="des">{{ item.des }}</li>
          </ul>
        </div>
      </div>
      <br>
    </div>
  </div>
</template>
<script>
// 引入 axios
import axios from "axios";
var d = new Date();
var h = d.getHours();
const root = process.env.API_ROOT;
export default {
  name: "Weather",
  data() {
    return {
      city: "广州",
      weatherData: {},
      ctime: h,
      search: false
    };
  },
  mounted() {
    /* axios
      .get("/api?output=json&ak=ohA7QHfg0BBrpiY4kyuIAAsD&location=" + this.city)
      .then(resopnse => {
        this.weatherData = resopnse.data;
      }); */
    $.ajax({
      url:
        "http://api.map.baidu.com/telematics/v3/weather?output=json&ak=ohA7QHfg0BBrpiY4kyuIAAsD&location=" +
        this.city,
      type: "get",
      dataType: "JSONP",
      success: resopnse => {
        this.weatherData = resopnse;
      }
    });
  },
  watch: {
    city: function() {
      if (
        document.getElementById("city").value.length == 1 ||
        document.getElementById("city").value == ""
      ) {
        $.ajax({
          url:
            "http://api.map.baidu.com/telematics/v3/weather?output=json&ak=ohA7QHfg0BBrpiY4kyuIAAsD&location=广州",
          type: "get",
          dataType: "JSONP",
          success: resopnse => {
            this.weatherData = resopnse;
          }
        });
      } else if (this.weatherData.error == -3) {
        $.ajax({
          url:
            "http://api.map.baidu.com/telematics/v3/weather?output=json&ak=ohA7QHfg0BBrpiY4kyuIAAsD&location=广州",
          type: "get",
          dataType: "JSONP",
          success: resopnse => {
            this.weatherData = resopnse;
          }
        });
      } else {
        $.ajax({
          url:
            "http://api.map.baidu.com/telematics/v3/weather?output=json&ak=ohA7QHfg0BBrpiY4kyuIAAsD&location=" +
            this.city,
          type: "get",
          dataType: "JSONP",
          success: resopnse => {
            this.weatherData = resopnse;
          }
        });
      }
    }
  },
  methods: {
    toggleCity: function() {
      document.getElementById("myform").style.cssText = "display:block";
      // document.getElementsByClassName('items')[0].style.cssText = 'display:none';
    },
    none: function() {
      document.getElementById("myform").style.cssText = "display:none";
      // document.getElementsByClassName('items')[0].style.cssText = 'display:block';
    }
  }
};
</script>
<style lang="scss" scoped>
// 公共样式
@import "../assets/sass/base.scss";
.weather {
  margin-bottom: rem(110px);
  font-size: rem(30px);
  padding: rem(30px) rem(26px) rem(0px);
  background: linear-gradient(to bottom, #fafafa, #539ad9, #3e7dbe, #64a6dc);
  .items {
    .item {
      .top {
        display: flex;
        flex-direction: column;
        font-size: rem(30px);
        align-items: flex-end;
        padding-bottom: rem(10px);
        p {
          line-height: rem(50px);
        }
        .PM {
          i {
            margin-right: rem(20px);
            font-style: normal;
          }
        }
        .currentCity {
          span {
            font-size: rem(40px);
            margin-left: rem(10px);
          }
        }
      }
      ul.item_weather {
        display: flex;
        flex-direction: column;
        color: #fff;
        /* &:nth-child(2) {
          // color: red;
        } */
        .img {
          display: flex;
          img {
            width: 20%;
            height: 20%;
          }
          .txt {
            margin-left: rem(20px);
            p {
              line-height: rem(50px);
            }
          }
        }
        .now {
          padding: rem(10px) rem(0px);
          font-size: rem(40px);
        }
        .wind {
          width: 100%;
          height: rem(60px);
          padding-left: rem(10px);
          line-height: rem(60px);
          border-radius: rem(10px);
          background: #64a6dc;
          margin-bottom: rem(10px);
        }
      }
      .num {
        font-size: rem(36px);
        color: #fff;
      }
    }
    .live {
      color: #fff;
      font-size: rem(18px);
      .life {
        border: rem(2px) dashed #fff;
        border-radius: rem(10px);
        margin: rem(10px) rem(0px);
        padding: rem(8px);
        .title {
          .zs {
            width: rem(100px);
            height: rem(30px);
            color: #fcd692;
            padding: rem(0px) rem(16px);
            margin-left: rem(10px);
          }
        }
        /* .des {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        } */
      }
    }
  }
}
.v-enter,
.v-leave-to {
  opacity: 0;
  transform: translateX(150px);
}

.v-enter-active,
.v-leave-active {
  transition: all 0.8s ease;
}
#myform input {
  width: 100%;
  height: rem(60px);
  border: none;
  font-size: rem(40px);
  background: transparent;
  border-bottom: rem(2px) solid #fff;
}
</style>
