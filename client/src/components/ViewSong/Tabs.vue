<template>
  <div>
        <panel title="Tab">
          <textarea readonly v-model="song.tab"></textarea>
        </panel>
  </div>
</template>

<script>
export default {
  props: [
    'song'
  ]
}
</script>

<style scoped>
  textarea {
    width: 100%;
    font-family: monospace;
    border: none;
    height: 600px;
    border-style: none;
    border-color: transparent;
    overflow: auto;
    padding: 10px;
  }
</style>
