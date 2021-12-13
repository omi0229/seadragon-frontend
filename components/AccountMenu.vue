<template>

    <div class="menu">
        <div>
          <a href="/account/basic" class="uk-link-text uk-text-decoration-none">基本資料</a>
        </div>
        <div>
          <a href="/account/password" class="uk-link-text uk-text-decoration-none">變更密碼</a>
        </div>
        <div>
          <a href="/account/record" class="uk-link-text uk-text-decoration-none">訂單紀錄</a>
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
  padding: 1% 15px;
  border-right: 1px solid #999;

  @media (max-width: 960px) {
    display: none;
  }

  > div {
    padding: 5px 0;
  }
}

</style>
