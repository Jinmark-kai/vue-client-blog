<template>
  <div>分类</div>
  <ul v-for="(item, index) in categoryList" :key="index">
        <li>{{ item.name }}</li>
    </ul>
</template>

<script>
export default {
    created() {
        this.getCategoryList()
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
        let { result } = await this.$http.post("/categary/getCategaryAll");
        this.categoryList = result
      } catch (err) {
        console.log(err)
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
