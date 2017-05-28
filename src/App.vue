<template>
  <main id="app">
    <p>1. Hello, {{ parentName }}.</p>
    <p>2. Hello, {{ childName }}.</p>
  </main>
</template>

<script>
  export default {
    name: 'app',
    props: ['parentName'],
    data () {
      return {
        childName: 'Ivanka'
      }
    }
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
