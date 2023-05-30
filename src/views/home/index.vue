<template>
  <div>
    <header>
        <h1>你好！</h1>
        <section>
          我是一位在校学生！这是一个个人博客前台项目，如果你想关注我，可以尝试下面链接！
        </section>
        <section class="social_box">
          <Social />
        </section>
    </header>
    <h1 class="index_top">文章</h1>
    <div v-for="(item, index) in articleList" :key="index">
      <div class="card">
        <router-link :to="'/article/' + item.id">
          <p class="card_title">{{ item.title }}</p>
          <p class="card_des">描述:{{ item.description }}</p>
          <p class="card_time">创建时间:{{ item.created }}</p>
        </router-link>
      </div>
    </div>
    <!-- 侧边 -->
    <aside class="aside">
      <h1 class="hotArticle">热门文章</h1>
      <div v-for="(item, index) in HotarticleList" :key="index">
        <p>
          <router-link :to="'/article/' + item.id">{{ item.title }}</router-link>
        </p>
      </div>
    </aside>
  </div>
</template>

<script>
import Social from "../../components/social.vue"
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
  components: {
    Social
  }
};
</script>

<style scoped>
.index_top {
  margin-top: 4rem;
  margin-bottom: 2rem;
}
.hotArticle {
  margin-bottom: 2rem;
}
.card {
  margin-top: 1rem;
  margin-bottom: 1rem;
  padding: 1rem;
}
.card:hover {
  box-shadow: 0 20px 25px -5px #0000001a, 0 8px 10px -6px #0000001a;
    transform: scale(102%);
    border-radius: .5rem;
    transition: all .15s;
}
.card_title {
  font-size: 2rem;
  font-weight: 600;
}
.card_time {
  text-align: right;
}

.aside {
  position: fixed;
  top: 5rem;
  right: 2rem;
  order: 2;
  padding: 1rem;
  border: 1px solid var(--theme-accent);
  width: 10rem;

}

.aside p {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.aside a {
  text-decoration: #d480aa wavy underline;
}

.social_box {
  display: flex;
  align-items: center;
  column-gap: 1rem;
}

@media screen and (max-width: 1120px){
  .aside {
    display: none;
  }
}
</style>
