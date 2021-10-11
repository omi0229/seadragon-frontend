<template>
    <div id="footer" class="uk-flex uk-flex-column">
        <div class="uk-flex">
            <div class="uk-width-1-3 uk-padding uk-text-center">
                <a href="/"><img src="/S__111558660.jpg" style="height: 200px;" /></a>
            </div>
            <div class="uk-width-1-3 uk-padding uk-text-center uk-text-bold size-20">
                <div>
                    <a href="/news" class="uk-link-heading">最新消息</a>
                </div>
                <div class="uk-margin-small-top">
                    <a href="/cooking" class="uk-link-heading">烹飪教學</a>
                </div>
                <div class="uk-margin-small-top">
                    <a href="/directory" class="uk-link-heading">線上購物</a>
                </div>
            </div>
            <div class="uk-width-1-3 uk-padding uk-text-center icon">
                <div>
                    <img src="/images/icon/facebook.png" class="uk-border-circle"/>
                </div>
                <div class="uk-margin-small-top">
                    <img src="/images/icon/ig.png" class="uk-border-circle"/>
                </div>
                <div class="uk-margin-small-top">
                    <img src="/images/icon/line.png" class="uk-border-circle"/>
                </div>
            </div>
        </div>
        <div class="uk-width-1-1 uk-text-center uk-padding-small uk-margin-auto-top">預定放地址</div>
    </div>
</template>

<script>
  export default {}
</script>

<style scoped lang="scss">

#footer {
  height: 350px;
  background-color: #ddd;

  > div {
    > div {
      box-sizing: border-box;
    }
  }

  .icon {
    img {
      width: 60px;
    }
  }
}

</style>
