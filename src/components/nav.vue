<template>
  <div>
    <nav>
      <router-link to="/">首页</router-link>
      <router-link to="/link">友链</router-link>
      <router-link to="/message">留言</router-link>
      <router-link to="/category">分类</router-link>
      <template v-if="isShow">
        <span>{{ user }}</span>
      </template>
      <template v-else>
        <router-link to="/login">登陆</router-link>
      </template>
    </nav>
  </div>
</template>

<script>
import { RouterLink } from "vue-router";
export default {
  computed: {
    isShow() {
      const user = localStorage.getItem("user");
      const token = localStorage.getItem("token");
      return user && token;
    },
    user() {
      if (localStorage.getItem("user")) return JSON.parse(localStorage.getItem("user")).username;
    },
  },
};
</script>

<style lang="scss" scoped></style>
