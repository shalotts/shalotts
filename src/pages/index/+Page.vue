<script setup lang='ts'>
import Counter from '#root/pages/index/counter.vue';
</script>

<template>
  <div>
    <h1 class='mb-[2px]'>
      Welcome
    </h1>
    This page is:
    <ul class='p-5'>
      <li>ITS NOT WORDPRESS FUCKING IDIOT</li>
      <li>Interactive.
        <Counter />
      </li>
    </ul>
  </div>
</template>

<style scoped lang='postcss'>
ul {
  background: cadetblue;

  li {
    color: #fff;
  }
}
</style>
