<template>
  <h1>文章分类</h1>
  <ul class="cat_ul">
    <li v-for="(item, index) in categoryList" :key="index" class="cat_li">
      <span>{{ item.categoryName }}</span>
      <span class="cat_count">(文章数:<span style="font-weight: 700;">{{ item.categoryCount }}</span>)</span>
      <ul class="cat_info">
        <li v-for="(article, idx) in item.list" :key="idx">
          <router-link :to="`/article/${article.id}`">{{ article.title }}</router-link>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script>
export default {
  created() {
    this.getCategoryList();
  },
  data() {
    return {
      categoryList: [],
    };
  },
  methods: {
    // 获取所有分类
    async getCategoryList() {
      try {
        let { result } = await this.$http.get("/article/getArticleCategory");
        this.categoryList = result;
        console.log(this.categoryList);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped>
ul, ol {
  list-style: none;
}
.cat_ul {
  font-size: 2rem;
}
.cat_count {
  font-size: 0.8rem;
}
.cat_info {
  margin: 1rem 0;
  font-size: 1.2rem;
  text-indent: 2em;
  line-height: 2em;
}
.cat_info a {
  text-decoration: var(--theme-cat-link) wavy underline;
}
</style>
