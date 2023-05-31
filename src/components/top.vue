<template>
  <div id="goTop" v-show="goTopShow">
    <a @click="goTop" class="toTop">
      <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" fill="">
        <path
          fill-rule="evenodd"
          d="M13.204 3.107a1.75 1.75 0 0 0-2.408 0L3.806 9.73c-1.148 1.088-.378 3.02 1.204 3.02h2.24V20c0 .966.784 1.75 1.75 1.75h6A1.75 1.75 0 0 0 16.75 20v-7.25h2.24c1.582 0 2.353-1.932 1.204-3.02l-6.99-6.623Z"
          clip-rule="evenodd"
        ></path>
      </svg>
    </a>
  </div>
</template>

<script>
export default {
  name: "backTop",
  data() {
    return {
      scrollTop: "",
      goTopShow: false,
    };
  },
  created() {},
  methods: {
    handleScroll() {
      this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      if (this.scrollTop > 150) {
        //设置页面滑动多少显示按钮
        this.goTopShow = true;
      } else {
        this.goTopShow = false;
      }
    },
    goTop() {
      let timer = null,
        _that = this;
      cancelAnimationFrame(timer);
      timer = requestAnimationFrame(function fn() {
        if (_that.scrollTop > 0) {
          _that.scrollTop -= 50; //回到顶部的速度
          document.body.scrollTop = document.documentElement.scrollTop = _that.scrollTop;
          timer = requestAnimationFrame(fn);
        } else {
          cancelAnimationFrame(timer);
          _that.goTopShow = false;
        }
      });
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style scoped>
.toTop {
  display: inline-block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #fff;
  opacity: 0.8;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 40px;
  right: 10px;
  color: #409eff;
  font-size: 20px;
  cursor: pointer;
  z-index: 999;
  box-shadow: 0 0 6px rgb(0 0 0 / 12%);
}
</style>
