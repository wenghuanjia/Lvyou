<template>
  <div class="contaner">
    <div class="address">
      <div class="address_header">
        <!-- <span class="localtime">{{localTime}}</span> -->
        <span>{{mapData.city||"广州市"}}</span>
        <span class="change-city" @click="changeCity">切换城市</span>
      </div>
      <div class="city-info">
        <div class="num">{{mapData.temperature||"0"}}°</div>
        <div class="desc_city">{{mapData.city || '广州市'}}</div>
        <div class="desc_weather">{{mapData.weather||"晴"}}</div>
        <div
          class="other"
        >风力:{{mapData.windPower}} | 风向:{{mapData.windDirection}} | 空气湿度:{{mapData.humidity}}%</div>
      </div>
      <!-- <div class="city-info">
        <dl>
          <dt class="fon18">{{mapData.city||"广州市"}}</dt>
        </dl>
        <dl>
          <dt>{{mapData.weather||"晴"}}</dt>
        </dl>
        <dl>
          <dt class="font45">{{mapData.temperature||"0"}}°c</dt>
        </dl>
        <dl>
          <dt>风力:{{mapData.windPower}} | 风向:{{mapData.windDirection}} | 空气湿度:{{mapData.humidity}}%</dt>
        </dl>
      </div>-->
    </div>
    <div class="feature">
      <div class="group" v-if="featureMapData&&featureMapData[0]">
        明日：
        <span
          class="tm"
        >白天:{{featureMapData[0].dayTemp}} {{featureMapData[0].dayWeather}} {{featureMapData[0].dayWindDir}} {{featureMapData[0].dayWindPower}}</span>
        <span
          class="tm"
        >夜间:{{featureMapData[0].nightTemp}} {{featureMapData[0].nightWeather}} {{featureMapData[0].nightWindDir}} {{featureMapData[0].nightWindPower}}</span>
      </div>
      <div class="group" v-if="featureMapData&&featureMapData[1]">
        后天：
        <span
          class="tm"
        >白天:{{featureMapData[1].dayTemp}} {{featureMapData[1].dayWeather}} {{featureMapData[1].dayWindDir}} {{featureMapData[1].dayWindPower}}</span>
        <span
          class="tm"
        >夜间:{{featureMapData[1].dayTemp}} {{featureMapData[1].dayWeather}} {{featureMapData[1].dayWindDir}} {{featureMapData[1].dayWindPower}}</span>
      </div>
    </div>
    <div class="echart-contaier" ref="echartcontaier"></div>
    <div class="map-container" ref="mapContainer"></div>
    <div class="loading" v-show="loader">
      <div class="loader">
        <div class="face">
          <div class="circle"></div>
        </div>
        <div class="face">
          <div class="circle"></div>
        </div>
      </div>
    </div>
    <div class="select-city-box" v-show="citybox">
      <van-area
        :area-list="areaList"
        @confirm="complete"
        @cancel="cancel"
        :columns-num="3"
        title="选择城市"
      />
    </div>
  </div>
</template>
<script>
import AreaList from "./area";
export default {
  data() {
    return {
      citybox: false,
      // localTime: "",
      loader: true,
      mapData: {},
      featureMapData: {},
      seriesData: [],
      areaList: AreaList,
      selectedCity: ""
    };
  },
  /* created() {
    this.localTime = this.getLocalTime();
    // 每一秒钟调用一次函数 实现时间的累计
    setInterval(() => {
      this.localTime = this.getLocalTime();
    }, 1000);
  }, */
  mounted() {
    this.initMap();
  },
  methods: {
    changeCity() {
      this.citybox = true;
    },
    complete(val) {
      this.seriesData = [];
      this.selectedCity = val[1].name;
      this.cancel();
      this.getCurrentCityData(this.selectedCity);
    },
    cancel() {
      this.citybox = false;
    },
    // 处理时间函数
    /* getLocalTime() {
      let myDate = new Date();
      let hours = myDate.getHours() < 10 ? '0' + myDate.getHours() : myDate.getHours();
      let minutes = myDate.getMinutes() < 10 ? '0' + myDate.getMinutes() : myDate.getMinutes();
      let seconds = myDate.getSeconds() < 10 ? '0' + myDate.getSeconds() : myDate.getSeconds();
      let date = `${hours}:${minutes}:${seconds}`;
      return date;
    }, */
    // 城市
    initMap() {
      // 保存 this
      let _self = this;
      var map = new AMap.Map(this.$refs.mapContainer, {
        resizeEnable: true
      });
      AMap.plugin("AMap.CitySearch", function() {
        var citySearch = new AMap.CitySearch();
        citySearch.getLocalCity(function(status, result) {
          if (status === "complete" && result.info === "OK") {
            // 查询成功，result即为当前所在城市信息
            _self.getCurrentCityData(result.city);
          }
        });
      });
    },
    // 天气
    getCurrentCityData(cityName) {
      // 保存 this
      let _self = this;
      AMap.plugin("AMap.Weather", function() {
        //创建天气查询实例
        var weather = new AMap.Weather();
        //执行实时天气信息查询
        weather.getLive(cityName, function(err, data) {
          _self.mapData = data;
        });
        weather.getForecast(cityName, function(err, data) {
          _self.featureMapData = data.forecasts;
          _self.featureMapData.map((item, index) => {
            _self.seriesData.push(item.dayTemp);
          });
          _self.initEchart();
          _self.loader = false;
        });
      });
    },
    initEchart() {
      let dom = this.$refs.echartcontaier;
      var myChart = echarts.init(dom);
      var app = {},
        option = null;
      option = {
        xAxis: {
          show: true,
          splitLine: { show: false },
          type: "category",
          data: ["今天", "明天", "后天", "三天后"],
          axisLine: {
            lineStyle: {
              color: "#fff"
            }
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          show: false,
          axisLine: {
            show: false,
            lineStyle: {
              color: "#fff"
            }
          },
          axisTick: { show: true },
          splitLine: { show: false }
        },
        tooltip: {
          trigger: "axis",
          formatter: function(params) {
            var relVal = params[0].name;
            for (var i = 0, l = params.length; i < l; i++) {
              relVal += params[i].value + "°C";
            }
            return relVal;
          }
        },
        legend: {
          data: ["气温"]
        },
        series: [
          {
            data: this.seriesData,
            type: "line",
            label: {
              normal: {
                show: true,
                position: "top"
              }
            }
          }
        ]
      };
      myChart.setOption(option, true);
    }
  }
};
</script>
<style lang="scss" scoped>
// 引入 公共 样式
@import "../assets/sass/base.scss";
/* loader */
.loading {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
}
.loader {
  width: 20em;
  height: 20em;
  font-size: 10px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loader .face {
  position: absolute;
  border-radius: 50%;
  border-style: solid;
  animation: animate 3s linear infinite;
}

.loader .face:nth-child(1) {
  width: 100%;
  height: 100%;
  color: gold;
  border-color: currentColor transparent transparent currentColor;
  border-width: 0.2em 0.2em 0em 0em;
  --deg: -45deg;
  animation-direction: normal;
}

.loader .face:nth-child(2) {
  width: 70%;
  height: 70%;
  color: lime;
  border-color: currentColor currentColor transparent transparent;
  border-width: 0.2em 0em 0em 0.2em;
  --deg: -135deg;
  animation-direction: reverse;
}

.loader .face .circle {
  position: absolute;
  width: 50%;
  height: 0.1em;
  top: 50%;
  left: 50%;
  background-color: transparent;
  transform: rotate(var(--deg));
  transform-origin: left;
}

.loader .face .circle::before {
  position: absolute;
  top: -0.5em;
  right: -0.5em;
  content: "";
  width: 1em;
  height: 1em;
  background-color: currentColor;
  border-radius: 50%;
  box-shadow: 0 0 2em, 0 0 4em, 0 0 6em, 0 0 8em, 0 0 10em,
    0 0 0 0.5em rgba(255, 255, 0, 0.1);
}

@keyframes animate {
  to {
    transform: rotate(1turn);
  }
}

/* loader end */
.contaner {
  margin-bottom: rem(100px);
  background: rgba(0, 0, 0, 0.8);
  .address {
    .address_header {
      display: flex;
      padding: 10px;
      font-size: rem(28px);
      color: #fff;
      justify-content: space-between;
      align-items: center;
    }
    .city-info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: rem(10px) rem(30px);
      color: #fff;
      .num {
        font-size: rem(150px);
        color: #fff;
        font-weight: 400;
      }
    }
  }
  .feature {
    margin-top: rem(30px);
    padding: 0 rem(10px);
    .group {
      height: 44px;
      line-height: 44px;
      border-radius: 4px;
      background-color: rgba(255, 255, 255, 0.26);
      color: rgba(16, 16, 16, 1);
      font-size: 16px;
      margin-bottom: 10px;
      padding: 0 10px;
      .tm {
        color: #fff;
        font-size: rem(26px);
      }
    }
  }
  .echart-contaier {
    width: 100%;
    height: 50vh;
  }
  .select-city-box {
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
  }
}
</style>