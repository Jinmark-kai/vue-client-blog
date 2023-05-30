<template>
  <div>
    <button @click="toggleDarkMode">❤️</button>
  </div>
</template>

<script>
export default {
  methods: {
    toggleDarkMode() {
      document.documentElement.classList.toggle("dark");
    },
  },
};
</script>

<style scoped>
button {
  margin-left: 1rem;
}
</style>
