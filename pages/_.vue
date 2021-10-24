<template>
  <div></div>
</template>

<script>
export default {
  name: "_",
  middleware: [
    function ({redirect}) {
      return redirect('/');
    },
  ],
}
</script>

<style scoped>

</style>
