<template>
  <div>
    <h1>用户登录/注册</h1>
    <!-- 登录表单 -->
    <div v-if="isLogin">
      <div class="form">
        <div class="form-group">
          <label for="username" class="form-label">用户名：</label>
          <input type="text" id="username" name="username" required v-model="loginData.username" class="form-input" />
        </div>
        <div>
          <label for="password" class="form-label">密码：</label>
          <input type="password" id="password" name="password" required v-model="loginData.password" class="form-input" />
        </div>
      </div>
      <button @click="login" class="form-btn">登录</button>
      <a href="#" @click="isLogin = false" data-login>没有账号？请注册</a>
    </div>
    <!-- 注册表单 -->
    <div v-if="!isLogin">
      <div class="form">
        <div class="form-group">
          <label for="username" class="form-label">用户名：</label>
          <input type="text" id="username" name="username" required v-model="registerData.username" class="form-input" />
        </div>
        <div class="form-group">
          <label for="password" class="form-label">密码：</label>
          <input type="password" id="password" name="password" required v-model="registerData.password1" class="form-input" />
        </div>
        <button @click="register" class="form-btn">注册</button>
        <a href="#" @click="isLogin = true" data-login>已有账号？请登录</a>
      </div>
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
      const { result } = await this.$http.post("/user/login", this.loginData);
      const { token, ...user } = result;
      this.$store.commit("auth/setUser", JSON.stringify(user));
      this.$store.commit("auth/setToken", token);
      this.$not.Notify.success("登录成功");
      window.location.href = "/";
      try {
      } catch (err) {
        console.log(err);
        this.$not.Notify.failure("登陆失败");
      }
    },
    // 注册用户
    async register() {
      try {
        let { result } = await this.$http.post("/user/register", this.registerData);
        console.log(result)
        this.$not.Notify.success(`${result}快去登录吧~`);
        // this.isLogin = true;
      } catch (err) {
        const { message } = err.response.data;
        this.$not.Notify.failure(message);
      }
    },
  },
};
</script>

<style scoped>
.form {
  max-width: 100%;
  padding: 1rem 0;
  border-radius: 0.25rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-label {
  display: inline-block;
  width: 7.1429rem;
  font-weight: bold;
}

.form-input,
.form-textarea {
  display: inline-block;
  width: calc(100% - 90px);
  padding: 0.5rem;
  border: 1px solid #999;
  border-radius: 0.25rem;
}

.form-textarea {
  height: 8.5714rem;
  resize: vertical;
}

.form-btn {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
}
[data-login] {
  text-decoration: wavy blue underline;
}
</style>
