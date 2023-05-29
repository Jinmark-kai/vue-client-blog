<template>
  <div>
    <h1>文章</h1>
    <div v-for="(item, index) in articleList" :key="index">
      <div class="card">
        <router-link :to="'/article/' + item.id">
          <span>标题:{{ item.title }}</span>
          <span>描述:{{ item.description }}</span>
          <span>创建时间:{{ item.created }}</span>
        </router-link>
      </div>
    </div>
    <!-- 侧边 -->
    <aside>
      <h1>热门文章</h1>
      <div v-for="(item, index) in HotarticleList" :key="index">
        <p><router-link :to="'/article/' + item.id">{{ item.title }}</router-link></p>
      </div>
    </aside>
  </div>
</template>

<script>
export default {
  created() {
    this.getHotArticle();
    this.getArticleList();
  },
  data() {
    return {
      // 热门文章列表
      HotarticleList: [],
      // 分页获取文章列表
      articleList: [],
      current: 1,
      size: 2,
      total: 0,
    };
  },
  methods: {
    // 获取热门文章
    async getHotArticle() {
      try {
        let { code, result } = await this.$http.get("/article/getHotArticle");
        this.HotarticleList = result;
        if (code != 0) {
          this.$not.Notify.failure("热门文章加载失败");
        }
      } catch (err) {
        console.error(err);
      }
    },
    // 分页获取文章
    async getArticleList() {
      try {
        let { code, result } = await this.$http.get(`/article/homeGetArticleList/${this.current}/${this.size}`);
        this.articleList = result.list;
        this.total = result.total;
      } catch (err) {
        this.$not.Notify.failure("文章加载失败");
      }
    },
  },
};
</script>

<style scoped></style>
