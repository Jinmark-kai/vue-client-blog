<script setup>
import Nav from "./components/nav.vue"
import Footer from "./components/footer.vue";
import { RouterView } from "vue-router";
</script>

<template>
  <div>
    <Nav />
    <RouterView />
    <Footer />
  </div>
</template>

<style>

</style>
