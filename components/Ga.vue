<template>
    <div></div>
</template>

<script>
export default {
  name: 'Ga',
  mounted() {
    // Google Analyist
    window.dataLayer = window.dataLayer || [];
    const gtag = () => {
      dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', 'G-DPSDE8NPMJ');
  },
}
</script>

<style scoped lang="scss">
</style>
