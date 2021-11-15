<template>
    <div id="footer" class="uk-flex uk-flex-column">
        <div class="uk-flex uk-flex-middle uk-flex-right icon">
          <div class="uk-margin-small-left uk-margin-small-right">
            <a href="#" target="_blank">
              <img src="/images/icon/f-youtube.png"/>
            </a>
          </div>
          <div class="uk-margin-small-left uk-margin-small-right">
            <a href="#" target="_blank">
              <img src="/images/icon/f-facebook.png"/>
            </a>
          </div>
          <div class="uk-margin-small-left uk-margin-small-right">
            <a href="#" target="_blank">
              <img src="/images/icon/f-ig.png"/>
            </a>
          </div>
          <div class="uk-margin-small-left uk-margin-small-right">
            <a href="#" target="_blank">
              <img src="/images/icon/f-line.png"/>
            </a>
          </div>
        </div>
        <div class="uk-flex">
            <div class="uk-width-1-4 uk-text-center logo">
                <a href="/"><img src="/S__111558660.jpg" /></a>
            </div>
            <div class="uk-width-3-4 uk-flex uk-flex-middle uk-text-bold uk-text-large">
                <div class="uk-margin-small-right uk-margin-small-left">
                    <a href="/" class="uk-link-heading">首頁</a>
                </div>
                <div class="uk-margin-small-right uk-margin-small-left">
                    <a href="/news" class="uk-link-heading">最新消息</a>
                </div>
                <div class="uk-margin-small-right uk-margin-small-left">
                    <a href="/cooking" class="uk-link-heading">烹飪教學</a>
                </div>
                <div class="uk-margin-small-right uk-margin-small-left">
                    <a href="#" class="uk-link-heading">關於我們</a>
                </div>
                <div class="uk-margin-small-right uk-margin-small-left">
                    <a href="/directory" class="uk-link-heading">線上購物</a>
                </div>
                <div class="uk-margin-small-right uk-margin-small-left">
                    <a href="#" class="uk-link-heading">購物說明</a>
                </div>
            </div>
        </div>
        <hr class="uk-margin-remove-bottom">
        <div class="uk-width-1-1 uk-text-center uk-padding-small">預定放地址</div>
    </div>
</template>

<script>
  export default {}
</script>

<style scoped lang="scss">

#footer {
  background-color: rgb(243, 243, 243);

  > div {
    > div {
      box-sizing: border-box;
    }
  }

  .icon {
    padding: 20px 20px 0 20px;

    img {
      width: 50px;
    }
  }

  .logo {
    img {
      height: 150px;
    }
  }
}

</style>
