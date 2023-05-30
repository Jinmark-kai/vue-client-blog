<template>
  <div>
    <form @submit.prevent="submitForm">
      <label for="nickname">昵称</label>
      <input type="text" id="nickname" name="nickname" required v-model="formData.nickname"/>

      <label for="email">邮箱</label>
      <input type="email" id="email" name="email" required v-model="formData.email"/>

      <label for="website">网站</label>
      <input type="url" id="website" name="website" v-model="formData.website"/>

      <label for="content">留言内容</label>
      <textarea id="content" name="content" required v-model="formData.content"></textarea>

      <button type="submit">提交</button>
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
            content: ""
        }
    };
  },
  methods: {
    // 提交表单
    submitForm() {
        console.log(this.formData)
    },
  },
};
</script>

<style lang="scss" scoped></style>
