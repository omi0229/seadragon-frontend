<template>
    <div id="footer" class="uk-flex uk-flex-column">
        <div class="mobile">
            <div class="uk-flex uk-flex-middle uk-flex-center uk-flex-right@m icon">
                <div class="uk-margin-small-left uk-margin-small-right">
                    <a :href="$store.state.config.link_youtube ? $store.state.config.link_youtube : 'javascript:void(0)'" :target="$store.state.config.link_youtube ? '_blank' : '_self'">
                      <img src="/images/icon/f-youtube.png"/>
                    </a>
                </div>
                <div class="uk-margin-small-left uk-margin-small-right">
                    <a :href="$store.state.config.link_facebook ? $store.state.config.link_facebook : 'javascript:void(0)'" :target="$store.state.config.link_facebook ? '_blank' : '_self'">
                      <img src="/images/icon/f-facebook.png"/>
                    </a>
                </div>
                <div class="uk-margin-small-left uk-margin-small-right">
                    <a :href="$store.state.config.link_instagram ? $store.state.config.link_instagram : 'javascript:void(0)'" :target="$store.state.config.link_instagram ? '_blank' : '_self'">
                      <img src="/images/icon/f-ig.png"/>
                    </a>
                </div>
                <div class="uk-margin-small-left uk-margin-small-right">
                    <a :href="$store.state.config.link_line ? $store.state.config.link_line : 'javascript:void(0)'" :target="$store.state.config.link_line ? '_blank' : '_self'">
                      <img src="/images/icon/f-line.png"/>
                    </a>
                </div>
            </div>
        </div>
        <div class="uk-flex uk-flex-wrap uk-position-relative">
            <div class="uk-width-1-1 uk-width-1-4@m uk-text-center logo">
                <a href="/"><img src="/footer_logo.png" /></a>
            </div>
            <div class="uk-width-1-1 uk-width-3-4@m uk-flex uk-flex-middle uk-flex-wrap uk-text-bold uk-text-large uk-position-relative menu">
                <div>
                    <a href="/" class="uk-link-heading">首頁</a>
                </div>
                <div>
                    <a href="/news" class="uk-link-heading">最新消息</a>
                </div>
                <div>
                    <a href="/cooking" class="uk-link-heading">烹飪教學</a>
                </div>
                <div>
                    <a href="/about" class="uk-link-heading">關於海龍王</a>
                </div>
                <div>
                    <a href="/directory" class="uk-link-heading">線上購物</a>
                </div>
                <div>
                    <a href="/shopping-explanation" class="uk-link-heading">購物說明</a>
                </div>
            </div>
            <div class="uk-flex uk-flex-middle uk-flex-center uk-flex-right@m uk-position-top-right icon web">
                <div class="uk-margin-small-left uk-margin-small-right">
                    <a :href="$store.state.config.link_youtube ? $store.state.config.link_youtube : 'javascript:void(0)'" :target="$store.state.config.link_youtube ? '_blank' : '_self'">
                        <img src="/images/icon/f-youtube.png"/>
                    </a>
                </div>
                <div class="uk-margin-small-left uk-margin-small-right">
                    <a :href="$store.state.config.link_facebook ? $store.state.config.link_facebook : 'javascript:void(0)'" :target="$store.state.config.link_facebook ? '_blank' : '_self'">
                        <img src="/images/icon/f-facebook.png"/>
                    </a>
                </div>
                <div class="uk-margin-small-left uk-margin-small-right">
                    <a :href="$store.state.config.link_instagram ? $store.state.config.link_instagram : 'javascript:void(0)'" :target="$store.state.config.link_instagram ? '_blank' : '_self'">
                        <img src="/images/icon/f-ig.png"/>
                    </a>
                </div>
                <div class="uk-margin-small-left uk-margin-small-right">
                    <a :href="$store.state.config.link_line ? $store.state.config.link_line : 'javascript:void(0)'" :target="$store.state.config.link_line ? '_blank' : '_self'">
                        <img src="/images/icon/f-line.png"/>
                    </a>
                </div>
            </div>
        </div>
        <hr class="uk-margin-remove-bottom">
        <div class="uk-width-1-1 uk-padding-small contact">
            <div class="uk-flex uk-flex-middle uk-flex-wrap uk-flex-center@m">
                <div class="email">
                    <div> Email： </div>
                    <div> {{ $store.state.config.basic_email }} </div>
                </div>
                <div class="service">
                    <div> 客服專線： </div>
                    <div> {{ $store.state.config.basic_phone }} </div>
                </div>
            </div>
            <div>Copyright © {{ $store.state.config.basic_company }} </div>
        </div>
    </div>
</template>

<script>
  export default {}
</script>

<style scoped lang="scss">

#footer {

  .email {
    display: flex;
    align-items: center;
    margin-right: 30px;

    @media (max-width: 960px) {
      justify-content: center;
      width: 100%;
      flex-basis: 100%;
      align-items: initial;
      margin-right: 0;
    }

    > div:first-child {
      min-width: 100px;
      text-align: right;
    }

    > div:last-child {
      word-break: break-all;
      @media (max-width: 960px) {
        width: 331px;
        text-align: left;
      }
    }
  }
  .service {
    display: flex;
    align-items: center;

    @media (max-width: 960px) {
      justify-content: center;
      width: 100%;
      flex-basis: 100%;
      align-items: initial;
    }

    > div:first-child {
      min-width: 100px;
      text-align: right;
    }

    > div:last-child {
      @media (max-width: 960px) {
        width: 331px;
        text-align: left;
      }
    }
  }

  hr {
    border-top: 1px solid #a2a2a2;
    margin-top: 0;

    @media (max-width: 960px) {
      margin-top: 20px;
    }
  }

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
      height: 280px;
    }
  }

  .menu {
    @media (max-width: 960px) {
      margin-top: 15px;
    }

    > div {
      margin: 0 20px;

      @media (max-width: 960px) {
        margin: 5px 0;
        width: 50%;
        flex-basis: 50%;

        $menu_div_padding: 12%;

        &:nth-child(odd) {
          padding-left: $menu_div_padding;
        }

        &:nth-child(even) {
          padding-right: $menu_div_padding;
        }
      }
    }
  }

  .contact {
    font-size: 20px;
    text-align: center;
    color: rgb(33, 37, 41);

    > div {
      line-height: 30px;

      @media (max-width: 960px) {
        flex-direction: column;
      }
    }
  }
}

</style>
