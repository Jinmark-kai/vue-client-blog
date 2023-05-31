<template>
  <div>
    <div class="link_list">
      <h1 class="link_h1">友链列表</h1>
      <div class="list_item" v-for="(item, index) in linksList" :key="index">
        <a :href="item.url" target="_blank" rel="noopener noreferrer">
          {{ item.site_name }}
          <svg width="13.5" height="13.5" aria-hidden="true" viewBox="0 0 24 24" class="iconExternalLink_nPIU">
            <path
              fill="currentColor"
              d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"
            ></path>
          </svg>
        </a>
        <p class="link_desc">
          {{ item.site_desc }}
        </p>
      </div>
    </div>
    <h1 class="link_h1">申请友链</h1>
    <p class="link_add">你想加入友链吗？填写信息，我将会公开你的博客链接！</p>
    <div>
      <form @submit.prevent="submitForm" class="form">
        <div class="form-group">
          <label for="site_name" class="form-label">站点名称：</label>
          <input type="text" id="site_name" v-model="form.site_name" class="form-input" />
        </div>
        <div class="form-group">
          <label for="site_desc" class="form-label">站点描述：</label>
          <input type="text" id="site_desc" v-model="form.site_desc" class="form-input" />
        </div>
        <div class="form-group">
          <label for="url" class="form-label">站点URL：</label>
          <input type="text" id="url" v-model="form.url" class="form-input" />
        </div>
        <button type="submit" class="form-btn">提交</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.getAllLink();
  },
  data() {
    return {
      form: {
        site_name: "",
        site_desc: "",
        url: "",
      },
      // 所有已审核友链
      linksList: {},
    };
  },
  methods: {
    // 提交友链表单逻辑
    async submitForm() {
      try {
        let { message } = await this.$http.post("/links/addOrUpdateLinks", this.form);
        console.log(this.form);
        this.$not.Notify.success(message);
        console.log(this.form);
      } catch (err) {
        const { message } = err.response.data;
        this.$not.Notify.failure(message);
      }
    },
    // 获取所有已经审核友链
    async getAllLink() {
      try {
        let { result } = await this.$http.get("/links/getAllLinks");
        this.linksList = result;
        console.log(this.linksList);
      } catch (err) {
        console.error(err);
      }
    },
  },
};
</script>

<style scoped>
.link_h1 {
  text-align: center;
}

.link_add {
}
.list_item a:hover {
  color: blue;
  text-decoration: underline blue;
}
.link_desc {
  margin: 0.5em 0 0 0;
  text-indent: 2em;
}
/* 表单样式 */
.form {
  display: flex;
  flex-direction: column;
  max-width: 100%;
  padding: 1rem;
  border-radius: 0.5rem;
}

.form-group {
  margin-bottom: 1rem;
  display: flex;
}

.form-label {
  display: inline-block;
  width: calc(7.1429rem - 10 * (100vw - 1000px) / 1000);
  font-weight: bold;
}

.form-input {
  display: inline-block;
  width: calc(100% - 7.1429rem);
  padding: 0.5rem;
  border: 0.0714rem solid #999;
  border-radius: 0.25rem;
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
