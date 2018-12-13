<template>
  <div class="map">
    <nav class="top">
      <ul>
        <router-link to="/map/" tag="li" class="mo">国际</router-link>
        <router-link to="/map/military" tag="li">军事</router-link>
        <router-link to="/map/society" tag="li">科技</router-link>
        <router-link to="/map/mobile" tag="li">移动</router-link>
        <router-link to="/map/sport" tag="li">体育</router-link>
        <router-link to="/map/entertainment" tag="li">娱乐</router-link>
      </ul>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
import { getTopics } from '@/getdata/getTopic'
export default {
  name: 'Index',
  data () {
    return {
      contents:'',
    }
  },
  comupted:{
    
  },
  /* mounted: function (){
    getTopics({category:'news_hot'}).then((respense)=>{
      console.log(respense.data.data[0].content)
    })
  } */
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  // 引入 公共样式
  @import '../assets/sass/base.scss';
  // 顶部导航
  nav.top{
    position: fixed;
    top:0;
    left:0;
    width:100%;
    height: rem(90px);
    background: #C01D2E;
    ul{
      display: flex;
      align-items: center;
      justify-content: space-around;
      height: rem(90px);
      li{
        font-size: rem(34px);
        padding: rem(8px) rem(18px);
        border-radius: rem(10px);
        color: #fff;
        &.router-link-exact-active{
          color:#000;     
        }
      }
    }
  }

</style>
