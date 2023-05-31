<template>
  <div>
    <h1 class="message_title">总要留点什么吧，或许只是一个问候，一句祝福。</h1>
    <form @submit.prevent="submitForm" class="form">
      <div class="form-group">
        <label for="nickname" class="form-label">昵称：</label>
        <input type="text" id="nickname" name="nickname" required v-model="formData.nickname" class="form-input" />
      </div>
      <div class="form-group">
        <label for="email" class="form-label">邮箱：</label>
        <input type="email" id="email" name="email" required v-model="formData.email" class="form-input" />
      </div>
      <div class="form-group">
        <label for="website" class="form-label">网站：</label>
        <input type="url" id="website" name="website" v-model="formData.website" class="form-input" />
      </div>
      <div class="form-group">
        <label for="content" class="form-label">留言内容：</label>
        <textarea id="content" name="content" required v-model="formData.content" class="form-textarea"></textarea>
      </div>
      <button type="submit" class="form-btn">提交</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        nickname: "",
        email: "",
        website: "",
        content: "",
      },
    };
  },
  methods: {
    // 提交表单
    async submitForm() {
      try {
        let { result, code } = await this.$http.post("/message/add", this.formData);
        if (code != 0) {
          this.$not.Notify.failure("网络错误！");
          return;
        }
        (this.formData = {
          nickname: "",
          email: "",
          website: "",
          content: "",
        }),
          this.$not.Notify.success("提交成功啦！");
      } catch (err) {
        console.log(err);
        this.$not.Notify.failure("未知错误！");
      }
    },
  },
};
</script>

<style scoped>
.message_title {
  font-size: 1rem;
}
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
  width: 80px;
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
  height: 120px;
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

.form-btn:hover {
  background-color: #0069d9;
}
</style>
