<template>
  <aside :class="$style.aside">
    <img
      src="http://loremflickr.com/320/320"
      width="320"
      height="320"
      alt="loremflickr"
      :class="$style.image">
  </aside>
</template>

<script>
  export default {
    name: 'sub',
    props: {
      store: {
        type: Object,
        required: true
      }
    },
    mounted () {
      this.store.commit('increment')
    }
  }
</script>

<style lang="postcss" module>
  .aside {
    position: absolute;
    right: 30px;
    top: 30px;
  }

  .image {
    background-color: rgba(200, 200, 200, 0.6);
    padding: 10px;
  }
</style>
