<template>
  <main :class="$style.background">
    <p>Hello, {{ id }}.</p>
  </main>
</template>

<script>
  export default {
    name: 'top',
    props: {
      id: {
        type: String,
        default: 'top',
      },
      store: {
        type: Object,
        required: true
      }
    },
    mounted () {
      this.store.commit('increment')
    },
    updated () {
      this.store.commit('increment')
    }
  }
</script>

<style lang="postcss" module>
  :root {
    --foo: orange;
  }

  .background {
    background-color: var(--foo);
  }
</style>
