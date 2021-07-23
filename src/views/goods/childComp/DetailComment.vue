<template>
  <div v-if="Object.keys(list).length" class="comment">
    <div class="title"><strong>宝贝评价</strong></div>
    <div class="comment-con">
      <van-skeleton title avatar :row="2" :loading="loading">
        <div class="comment-sers">
          <div class="user">
            <img src="~assets/images/user.png" alt="">
            <div class="user-info">
              <p>淘宝***用户</p>
              <p class="time">2021-06-24 12:30:20</p>
            </div>
          </div>
          <div class="content">
            <p>非常不错，是真正的冰丝布料，非常的柔软舒服、款式色泽，都是我想要的！穿上去很舒服！</p>
            <van-grid :border="false" :column-num="3" square :gutter="5">
              <van-grid-item>
                <img src="~assets/images/comment/1.jpg">
              </van-grid-item>
              <van-grid-item>
                <img src="~assets/images/comment/2.jpg">
              </van-grid-item>
              <van-grid-item>
                <img src="~assets/images/comment/3.jpg">
              </van-grid-item>
              <van-grid-item>
                <img src="~assets/images/comment/4.jpg">
              </van-grid-item>
              <van-grid-item>
                <img src="~assets/images/comment/5.jpg">
              </van-grid-item>
            </van-grid>
          </div>
        </div>
        <div class="comment-sers">
          <div class="user">
            <img src="~assets/images/user.png" alt="">
            <div class="user-info">
              <p>淘宝***用户</p>
              <p class="time">2021-06-24 12:30:20</p>
            </div>
          </div>
          <div class="content">
            <p>非常不错，是真正的冰丝布料，非常的柔软舒服、款式色泽，都是我想要的！穿上去很舒服！</p>
            <van-grid :border="false" :column-num="3" square :gutter="5">
              <van-grid-item>
                <img src="~assets/images/comment/1.jpg">
              </van-grid-item>
              <van-grid-item>
                <img src="~assets/images/comment/2.jpg">
              </van-grid-item>
              <van-grid-item>
                <img src="~assets/images/comment/3.jpg">
              </van-grid-item>
              <van-grid-item>
                <img src="~assets/images/comment/4.jpg">
              </van-grid-item>
              <van-grid-item>
                <img src="~assets/images/comment/5.jpg">
              </van-grid-item>
            </van-grid>
          </div>
        </div>
      </van-skeleton>
    </div>
  </div>
</template>

<script>
  import { onMounted, ref } from 'vue';

  export default {
    name: 'DetailComment',
    props: {
      list: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    setup() {
      // 骨架屏状态
      let loading = ref(true);
      // 挂载
      onMounted(() => {
        loading.value = false;
      })

      return {
        loading
      }
    }
  }
</script>

<style scoped lang="scss">
  .comment {
    padding: 10px;
    background: var(--color-background);
    border-radius: 8px;
    .title {
      font-size: 16px;
      color: #000000;
      line-height: 1.5;
    }
    .comment-con {
      line-height: 1.5;
      .user {
        display: flex;
        align-items: center;
        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }
        .user-info {
          font-size: 14px;
          color: #000000;
        }
        .user-info p {
          margin-bottom: 5px;
        }
        .time {
          font-size: 12px;
          color: #b5b2b2;
        }
      }
      .comment-sers {
        margin-top: 10px;
      }
      .content {
        ::v-deep .van-grid-item__content {
          padding: 0;
        }
        img {
          width: 100%;
          height: 100%;
        }
      }
      
    }
  }
</style>