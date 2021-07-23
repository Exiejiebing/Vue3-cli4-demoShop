<template>
  <div ref="wrapper">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';
  import { reactive, onMounted, ref, nextTick } from 'vue'

  export default {
    name: 'Scroll',
    props: {
      /**
       * 1 滚动的时候会派发scroll事件，会截流。
       * 2 滚动的时候实时派发scroll事件，不会截流。
       * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
       */
      probeType: {
        type: Number,
        default: 1
      },
      /**
       * 点击列表是否派发click事件
       */
      click: {
        type: Boolean,
        default: true
      },
      /**
       * 是否派发滚动事件
       */
      listenScroll: {
        type: Boolean,
        default: false
      },
      /**
       * 是否派发滚动到底部超过阈值，用于上拉加载
       */
      pullUpLoad: {
        type: Boolean,
        default: false
      },
      /**
       * 当数据更新后，刷新scroll的延时。
       */
      refreshDelay: {
        type: Number,
        default: 20
      }
    },
    setup(props, { emit }) {
      let scroll = reactive({});
      let wrapper = ref(null);

      // 挂载
      onMounted(() => {
        // 保证在DOM渲染完毕后初始化better-scroll
        nextTick(() => {
          _initScroll();
        })
      })
      // 初始化方法
      const _initScroll = () => {
        if (!wrapper.value) return 
        // 注册插件
        scroll = new BScroll(wrapper.value, {
          click: props.click,
          probeType: props.probeType,
          pullUpLoad: props.pullUpLoad
        })
        
        /**
         * 监听事件
         */
        // 是否派发滚动事件
        if (props.listenScroll) {
          scroll.on('scroll', position => {
            emit('scroll', position)
          })
        }
        // 底部下拉距离超过阈值，上拉加载更多
        if (props.pullUpLoad) {
          scroll.on('pullingUp', () => {
            emit('pullingUp')
          })
        }
      }
      
      // 重新计算better-scroll，确保滚动效果正常
      const refresh = () => {
        scroll && scroll.refresh && scroll.refresh()
      }
      // 滚动至x,y的距离
      const scrollTo = (x, y, time=500) => {
        console.log(scroll)
        scroll && scroll.scrollTo && scroll.scrollTo(x, y, time)
      }
      // 重新载入下拉加载更多
      const finishPullUp = () => {
        scroll && scroll.finishPullUp && scroll.finishPullUp()
      }
      // 获取当前Y轴滚动位置
      const getScrollY = () => {
        return scroll ? scroll.y : 0
      }

      return {
        scroll,
        wrapper,
        refresh,
        scrollTo,
        finishPullUp,
        getScrollY
      }
    }
  }
</script>