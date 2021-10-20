<template>

    <div class="menu">
        <div>
          <a href="/register" class="uk-link-text uk-text-decoration-none">會員註冊</a>
        </div>
        <div>
          <a href="/forget" class="uk-link-text uk-text-decoration-none">忘記密碼</a>
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

  > div {
    padding: 5px 0;
  }
}

</style>
