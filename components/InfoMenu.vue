<template>

    <div class="menu">
        <div>
          <a href="/about" class="uk-link-text uk-text-decoration-none">關於海龍王</a>
        </div>
        <div>
          <a href="/shopping-explanation" class="uk-link-text uk-text-decoration-none">購物說明</a>
        </div>
    </div>

</template>

<script>
    export default {}
</script>

<style scoped lang="scss">

.menu {
  font-size: 18px;
  font-weight: bold;
  width: 40vmin;
  min-width: 150px;
  max-width: 200px;
  flex-basis: 40vmin;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 1%;
  border-right: 1px solid #999;

  @media (max-width: 960px) {
    display: none;
  }

  > div {
    padding: 5px 0;
  }
}

</style>
