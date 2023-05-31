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
    <h1 class="index_top">
      <span>文章</span>
      <span class="top_total">文章数量:{{ total }}</span>
    </h1>
    <div v-for="(item, index) in articleList" :key="index">
      <div class="card">
        <router-link :to="'/article/' + item.id">
          <p class="card_title">{{ item.title }}</p>
          <p class="card_des">描述:{{ item.description }}</p>
          <p class="card_time">创建时间:{{ item.created }}</p>
        </router-link>
        <span v-if="item.is_top == '0'" class="card_top"></span>
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
      size: 10,
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
  display: flex;
  justify-content: space-between;
  margin-top: 4rem;
  margin-bottom: 2rem;
}
.top_total {
  font-size: .5em;
}
.hotArticle {
  margin-bottom: 2rem;
}
.card {
  position: relative;
  margin-top: 1rem;
  margin-bottom: 1rem;
  padding: 1rem;
  background-color: var(--theme-card-bg);
  border-radius: .5rem;
}
.card_top {
  position: absolute;
  width: 0;
  height: 0;
  border-width: 2rem 0 0 2rem;
  top: 0;
  right: 0;
  border-style: solid;
  border-color: var(--theme-accent) transparent transparent transparent;
}
.card:hover {
  box-shadow: 0 1.4286rem 1.7857rem -0.3571rem #0000001a, 0 0.5714rem 0.7143rem -0.4286rem #0000001a;
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
  right: 1rem;
  order: 2;
  padding: 1rem;
  border: 1px solid var(--theme-accent);
  width: 9rem;
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
