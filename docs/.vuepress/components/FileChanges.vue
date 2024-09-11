<template>
  <div>
    <h2>File Changes</h2>
    <ul>
      <li v-for="(change, index) in fileChanges" :key="index">
        <strong>{{ change.type }}</strong>: {{ change.filePath }} ({{ change.timestamp }})
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fileChanges: this.$fileChanges || []
    };
  }
};
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 8px 0;
}
</style>
