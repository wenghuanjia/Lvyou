<template>
  <div id="app">    
    <router-view/>
    <nav class="myfooter" id="footer">
      <ul>
        <router-link tag="li" to="/weather" :class="resPath=='weather'?'active':''">
          <span class="iconfont icon-weather"></span>
          <p>天气</p>
        </router-link>
        <router-link tag="li" to="/travel" :class="resPath=='travel'?'active':''">
          <span class="iconfont icon-tr_lvyou"></span>
          <p>旅游</p>
        </router-link>
        <router-link tag="li" to="/map" :class="resPath=='map'?'active':''">
          <span class="iconfont icon-ditu"></span>
          <p>新闻</p>
        </router-link>
      </ul>
    </nav>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'App',
  // 计算属性
  computed:{
    resPath:function () {
      var arr = this.$route.path.split('/')
      return arr[1]
    }
  },
  created(){
    axios.get('http://hoa.hcoder.net/index.php?user=hcoder&pwd=hcoder&m=info&id=1').then(res => {
      console.log(res.data.content)
    })
    axios.get('http://hoa.hcoder.net/index.php?user=hcoder&pwd=hcoder&m=mediaList&page=1').then(res => {
      console.log(res)
    })
  }
}
</script>

<style lang="scss" scoped>
// 引入 公共 样式
@import './assets/sass/base.scss';
// 样式
nav.myfooter {
  position: fixed;
  z-index: 9999;
  bottom: -1px;
  left: 0;
  width: 100%;
  background: #FCFCFC;
  border-top: 1px solid #E0E0E0;
  color: #424145;
  ul {
    display: flex;
    justify-content: space-around;
    align-items: center;
    li {
      display: flex;
      width: 100%;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: rem(30px);
      span {
        font-size: rem(60px);
      }
      &.active {
        color: #C01D2E;
      }
    }
  }
}
</style>
