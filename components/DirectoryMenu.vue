<template>

    <div class="menu">
        <div v-for="item in list">
          <a :href="'/directory/' + item.id" class="uk-link-text uk-text-decoration-none">{{item.name}}</a>
        </div>
    </div>

</template>

<script>
    export default {
      data() {
        return {
          list: this.$store.state.directory_list,
        }
      },
    }
</script>

<style scoped lang="scss">

.menu {
  font-size: 18px;
  font-weight: bold;
  width: 40vmin;
  min-width: 150px;
  max-width: 200px;
  flex-basis: 40vmin;
  padding: 1% 15px;
  border-right: 1px solid #999;

  > div {
    padding: 5px 0;
  }

  @media (max-width: 960px) {
    display: none;
  }
}

</style>
