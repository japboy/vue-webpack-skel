<template>
  <p>{{ message }}</p>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {
        message: 'Hello, world.',
      }
    },
  }
</script>

<style lang="postcss" scoped>
  :root {
    --color-main: rgb(255, 0, 0);
  }
  p {
    color: var(--color-main);
  }
</style>
