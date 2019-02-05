<template>
  <div>
    <h1>Epic of Elthelas: Book 4</h1>
    <div v-html="$options.filters.marked(chaptertext)" />
  </div>
</template>
<script src="./book4.js"></script>
<style lang="scss" scoped src="./book4.scss"></style>
