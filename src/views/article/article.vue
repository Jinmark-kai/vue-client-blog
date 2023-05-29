<template>
  <div>
    <h1>文章</h1>
    <div class="content">
      <span>标题:{{ articleParams.title }}</span>
      <span>描述:{{ articleParams.description }}</span>
      <span>作者:{{ articleParams.author_name }}</span>
      <span>阅读时长:{{ articleParams.read_time }}</span>
      <span>访问量:{{ articleParams.view_count }}</span>
      <span>创建时间:{{ articleParams.created }}</span>
      <div v-highlight v-html="markdown" class="mk"></div>
      <div>
        <p @click="likeCount">❤️</p>
        <span>点赞数: {{ articleParams.like_count }}</span>
      </div>
    </div>
    <!-- <div>
      <div>
        <span>上一篇</span>
        <router-link
          :to="{ name: 'article', params: { id: updownInfo.contentPrevious.id } }"
          v-if="updownInfo && updownInfo.contentPrevious"
        >
          {{ updownInfo.contentPrevious.title }}
        </router-link>
      </div>
      <div>
        <span>下一篇</span>
        <router-link
          :to="{ name: 'article', params: { id: updownInfo.contentNext.id } }"
          v-if="updownInfo && updownInfo.contentNext"
          @click="nextClick"
        >
          {{ updownInfo.contentNext.title }}
        </router-link>
      </div>
    </div> -->
  </div>
</template>

<script>
import "../../assets/markdown.css";
import { marked } from "marked";
import { mangle } from "marked-mangle";
import { gfmHeadingId } from "marked-gfm-heading-id";
const options = {
  headefIds: false,
};
marked.use(mangle());
marked.use(gfmHeadingId(options));
export default {
  data() {
    return {
      //  文章id
      id: this.$route.params.id,
      // 文章信息
      articleParams: {},
      markdown: "",
      // 上下文信息
      // updownInfo: {},
    };
  },
  methods: {
    // 通过id获取文章信息
    async getArticleById() {
      try {
        let { result } = await this.$http.get(`/article/getArticleById/${this.id}`);
        this.articleParams = result;
        this.markdown = marked(result.content);
      } catch (err) {
        console.log(err);
        this.$not.Notify.failure("文章加载失败");
      }
    },
    // 点赞数
    async likeCount() {
      try {
        await this.$http.get(`/article/articleThumbsUp/${this.id}`);
        this.articleParams.like_count += 1;
        this.$not.Notify.success("感谢你的点赞!❤️");
      } catch (err) {
        this.$not.Notify.failure("点赞失败！");
      }
    },
    // // 获取上下文信息
    // async getupdownArticle() {
    //   try {
    //     let { result } = await this.$http.get(`/article/getRecommendArticleById/${this.id}`);
    //     this.updownInfo = result;
    //   } catch (err) {
    //     console.log(err);
    //     this.$not.Notify.failure("获取信息失败！");
    //   }
    // }
  },
  created() {
    this.getArticleById();
    // this.getupdownArticle();
  },
  mounted() {},
};
</script>

<style scoped>
.mk {
  width: min(70ch, 80%);
  margin: 0 auto;
}
</style>
