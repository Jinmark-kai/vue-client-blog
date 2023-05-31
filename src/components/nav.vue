<template>
  <div>
    <nav class="nav">
      <router-link to="/">首页</router-link>
      <router-link to="/link">友链</router-link>
      <router-link to="/message">留言</router-link>
      <router-link to="/category">分类</router-link>
      <template v-if="isShow">
        <span class="loginuser">{{ user }}</span>
      </template>
      <template v-else>
        <router-link to="/login" class="loginBtn">登陆</router-link>
      </template>
      <Btn />
    </nav>
  </div>
</template>

<script>
import Btn from "./dark.vue";
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
  components: {
    Btn
  },
};
</script>

<style scoped>
.nav {
  display: flex;
  margin-bottom: 2.5rem;
  align-items: center;
}
.nav a {
  padding-inline: 0.5rem;
  text-decoration: none;
  color: var(--theme-accent);
  border-right: 1px dashed var(--theme-accent);
}
.nav a:last-of-type {
  border: none;
}
.nav a:hover {
  text-decoration: underline var(--theme-accent);
}

.loginuser,
.loginBtn {
  margin-left: auto;
}
.loginuser::before {
  content: "欢迎用户:";
  font-size: 0.5em;
}

</style>
