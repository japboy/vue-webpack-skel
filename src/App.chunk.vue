<template>
  <main id="app">
    <p :class="$style.parent">1. Hello, {{ parentName }}.</p>
    <p :class="$style.child">2. Hello, {{ childName }}.</p>
  </main>
</template>

<script>
  export default {
    name: 'app',
    props: {
      parentName: {
        type: String,
        required: true
      }
    },
    data () {
      return {
        childName: 'Ivanka'
      }
    }
  }
</script>

<style lang="postcss" module>
  :root {
    --color-parent: rgb(0, 0, 0);
    --color-child: rgb(255, 0, 0);
  }

  .parent {
    color: var(--color-parent);
  }

  .child {
    color: var(--color-child);
  }
</style>
