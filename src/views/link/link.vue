<template>
  <div>
    <h1>申请友链</h1>
    <p>添加你的友链</p>
    <div>
      <form @submit.prevent="submitForm">
        <div>
          <label for="site_name">站点名称：</label>
          <input type="text" id="site_name" v-model="form.site_name" />
        </div>
        <div>
          <label for="site_desc">站点描述：</label>
          <input type="text" id="site_desc" v-model="form.site_desc" />
        </div>
        <div>
          <label for="url">站点URL：</label>
          <input type="text" id="url" v-model="form.url" />
        </div>
        <button type="submit">提交</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        site_name: "",
        site_desc: "",
        url: "",
      },
    };
  },
  methods: {
    async submitForm() {
      try {
        let {message} = await this.$http.post("/links/addOrUpdateLinks", this.form);
        this.$not.Notify.success(message)
        console.log(this.form);
      } catch (err) {
        console.log(err)
        console.error(err);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
