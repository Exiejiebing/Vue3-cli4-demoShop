<template>
  <div class="back-top" v-show="isShow" @click="onClick">
    <i class="iconfont icon-top"></i>
  </div>
</template>

<script>
  import { onMounted, ref, onUnmounted } from 'vue';

  export default {
    name: 'BackTop',
    setup(props, { emit }) {
      let isShow = ref(false);

      // 挂载
      onMounted(() => {
        // DOM渲染完成给window添加“scroll"事件
        window.addEventListener("scroll", handleScroll);
      })
      // 离开页面
      onUnmounted(() => {
        window.removeEventListener("scroll", handleScroll);
      })
      // 滚动到一定位置显示“回到顶部”元素
      const handleScroll = () => {
        let scrollTop =  window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        if (scrollTop >= 1000) {
          isShow.value = true;
        } else {
          isShow.value = false;
        }
      }
      /**
        * 回到顶部功能实现过程：
        * 1. 获取页面当前距离顶部的滚动距离（虽然IE不常用了，但还是需要考虑一下兼容性的）
        * 2. 计算出每次向上移动的距离，用负的滚动距离除以5，因为滚动的距离是一个正数，想向上移动就是做一个减法
        * 3. 用当前距离加上计算出的距离，然后赋值给当前距离，就可以达到向上移动的效果
        * 4. 最后记得在移动到顶部时，清除定时器
      */
      const onClick = () => {
        const timer = setInterval(() => {
          let osTop = document.documentElement.scrollTop || document.body.scrollTop;
          let ispeed = Math.floor(-osTop / 5); 
          document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed;
          isShow.value = false;
          if(osTop === 0){
            clearInterval(timer);
          }
        },30)
      }

      return {
        isShow,
        handleScroll,
        onClick
      }
    }
  }
</script>

<style scoped lang="scss">
  .back-top {
    position: fixed;
    right: 20px;
    bottom: 60px;
    color: var(--color-tint);
    .iconfont {
      font-size: 26px;
    }
  }
</style>