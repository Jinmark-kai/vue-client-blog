<template>
  <ul class="siderIndex">
    <p>联系我吧:</p>
    <li>
      <a href="https://github.com/Jinmark-kai" target="_blank" rel="noopener noreferrer">
        <svg
          aria-hidden="true"
          focusable="false"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path
            d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5"
          ></path>
        </svg>
        <span class="sr-only">Github</span>
      </a>
    </li>
    <li>
      <a href="mailto:ch_kaijack@outlook.com">
        <svg
          class="h-6 w-6"
          aria-hidden="true"
          focusable="false"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <rect x="3" y="5" width="18" height="14" rx="2"></rect>
          <polyline points="3 7 12 13 21 7"></polyline>
        </svg>
        <span class="sr-only">Email</span>
      </a>
    </li>
  </ul>
</template>

<script>
export default {};
</script>

<style scoped>
.siderIndex {
  display: flex;
  column-gap: 1rem;
  align-items: center;
}
.siderIndex svg {
  width: 1.5rem;
  height: 1.5rem;
}
li a {
  display: inline-block;
}
li {
  list-style: none;
}
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
.siderIndex a {
  transition: all 0.3s;
}
.siderIndex a:hover {
  transform: scale(1.2);
}
</style>
