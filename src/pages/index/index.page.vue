<script setup lang="ts">
import Counter from '~/src/pages/index/counter.vue';
</script>

<template>
  <div>
    <h1>Welcome</h1>
    This page is:
    <ul>
      <li>Rendered to HTML. ss ss</li>
      <li>Interactive. <Counter /></li>
    </ul>
  </div>
</template>

<style scoped lang="postcss">
ul {
  background: brown;
}
</style>
