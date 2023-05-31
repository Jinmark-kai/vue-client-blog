<script setup>
import Nav from "./components/nav.vue";
import Footer from "./components/footer.vue";
import Top from "./components/top.vue";
import { RouterView } from "vue-router";
</script>

<template>
  <div>
    <Nav />
    <RouterView />
    <Footer />
    <Top />
  </div>
</template>

<style></style>
