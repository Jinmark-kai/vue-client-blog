<template>
  <div>
    <h1>用户登录/注册</h1>
    <!-- 登录表单 -->
    <div v-if="isLogin">
      <div>
        <label for="username">用户名：</label>
        <input type="text" id="username" name="username" required v-model="loginData.username" />
      </div>
      <div>
        <label for="password">密码：</label>
        <input type="password" id="password" name="password" required v-model="loginData.password" />
      </div>
      <button @click="login">登录</button>
      <a href="#" @click="isLogin = false">没有账号？请注册</a>
    </div>
    <!-- 注册表单 -->
    <div v-if="!isLogin">
      <div>
        <label for="username">用户名：</label>
        <input type="text" id="username" name="username" required v-model="registerData.username" />
      </div>
      <div>
        <label for="password">密码：</label>
        <input type="password" id="password" name="password" required v-model="registerData.password1" />
      </div>
      <button @click.prevent="register">注册</button>
      <a href="#" @click="isLogin = true">已有账号？请登录</a>
    </div>
  </div>
</template>

<script>
export default {
  created() {},
  data() {
    return {
      // 切换登录/注册
      isLogin: true,
      loginData: {
        username: "",
        password: "",
      },
      registerData: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    // 用户登录
    async login() {
      const {result} = await this.$http.post("/user/login", this.loginData);
      const { token, ...user } = result;
      this.$store.commit("auth/setUser", JSON.stringify(user));
      this.$store.commit("auth/setToken", token);
      this.$not.Notify.success("登录成功");
      window.location.href ="/"
      try {
      } catch (err) {
        console.log(err)
        this.$not.Notify.failure("登陆失败");
      }
    },
    // 注册用户
    async register() {
      try {
        let { result } = await this.$http.post("/user/register", this.registerData);
        this.$not.Notify.success(`${result}快去登录吧~`);
        this.isLogin = true
      } catch (err) {
        this.$not.Notify.failure("注册失败");
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
