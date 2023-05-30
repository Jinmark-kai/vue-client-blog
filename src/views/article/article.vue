<template>
  <div>
    <div class="content">
      <p class="content_title">{{ articleParams.title }}</p>
      <p class="content_author">作者:{{ articleParams.author_name }}</p>
      <div class="content_info">
        <div class="info_read info">
          <div class="info_top">阅读时长</div>
          <div class="info_bottom">{{ articleParams.read_time }} 分钟</div>
        </div>
        <div class="info_count info">
          <div class="info_top">访问量</div>
          <div class="info_bottom">{{ articleParams.view_count }}</div>
        </div>
        <div class="info_time info">
          <div class="info_top">创建时间</div>
          <div class="info_bottom">{{ articleParams.created }}</div>
        </div>
      </div>

      <div v-highlight v-html="markdown" class="mk"></div>
      <div class="lovebox">
        <p @click="likeCount" class="love">❤️</p>
        <span>点赞数: {{ articleParams.like_count }}</span>
      </div>
    </div>
    <div class="comment">
      <div v-if="isLogin">
        <label for="content">发表评论:</label>
        <textarea id="content" name="content" required v-model="content" placeholder="留下你的印记~" rows="5"></textarea>
        <button @click="addComment" class="comment_btn">评论</button>
      </div>
      <div v-else class="noLogin">
        <router-link to="/login">评论请先登录</router-link>
      </div>
      <h1>评论</h1>
      <div v-for="(item, index) in commentList" class="commentBox" v-if="commentList.length != 0">
        <p class="comment_user">用户: {{ item.username }}</p>
        <p class="comment_content">{{ item.comment.content ? item.comment.content : "暂无评论" }}</p>
        <p class="time">发布时间:{{ item.comment.created }}</p>
      </div>
      <div v-else>
        <p class="comment_not">暂无评论！</p>
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
import moment from "moment"
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
      // 评论信息列表
      commentList: [],
      // 留言内容
      content: "",
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
    // 根据文章id获取评论
    async getComment() {
      try {
        let res = await this.$http.get(`/comment/getArticleComment/${this.id}`);
        this.commentList = res.result;
      } catch (err) {
        this.$not.Notify.failure("获取评论信息失败！");
      }
    },
    // 添加评论
    async addComment() {
      try {
        let { message } = await this.$http.post("/comment/add", {
          article_id: this.id,
          content: this.content,
        });
        this.$not.Notify.success(message)
        let target = {
          comment: {
            content: this.content,
            created: moment(new Date).format('YYYY-MM-DD HH:mm:ss')
          },
          username: JSON.parse(localStorage.getItem("user")).username
        }
        this.commentList.push(target);
        this.content = ''
      } catch (err) {
        this.$not.Notify.failure("添加评论失败！");
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
    this.getComment();
    // this.getupdownArticle();
  },
  mounted() {},
  computed: {
    isLogin() {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");
      if (token && user) {
        return true;
      }
      return false;
    },
  },
};
</script>

<style scoped>
.lovebox {
  padding: 1rem;
  width: fit-content;
  margin: 0 auto;
}
.love {
  text-align: center;
  cursor: pointer;
}
[for="content"] {
  display: block;
  /* font-size: 2rem; */
}
[id="content"] {
  width: 100%;
  resize: vertical;
}
.commentBox {
  border-bottom: 1px solid;
}
.time {
  margin: 0;
  display: block;
  text-align: right;
  font-size: 0.6rem;
}
.comment_user {
  font-size: 0.8rem;
}
.comment_content {
  font-weight: 600;
}
.noLogin {
  padding-block: 1rem;
  text-align: center;
  color: var(--theme-accent);
  text-decoration: var(--theme-accent) wavy underline;
}
.content_title {
  text-align: center;
  font-weight: 900;
  font-size: 3rem;
  line-height: normal;
}

.content_author {
  text-align: center;
  font-size: 1.2rem;
  font-weight: 600;
}
.content_info {
  display: flex;
  width: 100%;
}
.info {
  flex: 1;
  padding: 0.5rem;
  text-align: center;
}
.info_bottom {
  font-weight: 700;
}
.comment_not {
  text-align: center;
  color: ;
}
.comment_btn {
  border: 0;
  padding: .5rem;
  color: var(--theme-text);
  cursor: pointer;
}
</style>
