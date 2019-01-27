<template>
  <article class="two-step-login">
    <div class="two-step-login__logo-wrapper">
      <icon-logo class="two-step-login__logo"/>
    </div>
    <p class="two-step-login__heading">2-Step Verification</p>
    <p class="two-step-login__email">elisgud@gmail.com</p>
    <p
      class="two-step-login__text"
      >To confirm that you are the owner of the page,
      please write a code from the Google Authenticator App
    </p>
    <form class="two-step-login__form">
      <label class="two-step-login__label">
        <p class="two-step-login__input-name">Code</p>
        <input
          type="text"
          class="two-step-login__input"
          :class="{'input-error': !checkCode && code, 'input-accepted': checkCode}"
          autocomplete="on"
          maxlength="6"
          v-model.trim="code"
        >
      </label>
      <label class="two-step-login__check-label">
        <input class="two-step-login__check-default" type="checkbox" v-model="dontAsk">
        <div class="two-step-login__check">
          <icon-check class="two-step-login__check-img"/>
        </div>
        <p class="two-step-login__check-text">Don't ask again on this computer</p>
      </label>
      <div class="two-step-login__button-wrapper">
        <button
          class="two-step-login__button"
          :class="{'button-loading': buttonLoading}"
          :disabled="!checkCode"
          @click.prevent="apply"
        >Apply</button>
      </div>
    </form>
  </article>
</template>
<script>
import IconLogo from '@/components/icons/IconLogo.vue';
import IconCheck from '@/components/icons/IconCheck.vue';
import http from 'axios';

export default {
  name: 'TwoStepLogin',
  components: {
    IconLogo,
    IconCheck,
  },
  data() {
    return {
      dontAsk: false,
      code: '',
      buttonLoading: false,
      errors: [],
    };
  },
  methods: {
    apply() {
      this.buttonLoading = true;
      const data = {
        dontAsk: this.dontAsk,
        code: this.code,
      };
      http
        .post('https://jsonplaceholder.typicode.com/posts', data)
        .then(() => {
          this.buttonLoading = false;
          this.$router.push('/');
        })
        .catch((error) => {
          this.errors.push(error);
        });
    },
    validCode(code) {
      // eslint-disable-next-line
      let re = /^[0-9]{6}$/;
      return re.test(code);
    },
  },
  computed: {
    checkCode() {
      return this.validCode(this.code);
    },
  },
};
</script>
<style lang="scss">
.two-step-login {
  @extend %login-card;
  padding: 40px 54px;
  &__form {
    @include flex-col-def(flex-start);
  }
  &__logo-wrapper {
    text-align: center;
    margin-bottom: 24px;
    align-self: center;
  }
  &__logo {
    width: 99px;
    height: 46px;
  }
  &__heading {
    @extend %login-heading;
    align-self: center;
  }
  &__label {
    @include flex-col-def(flex-start);
    margin-bottom: 24px;
  }
  &__check-label {
    @include flex-row-def(center);
    margin-bottom: 30px;
    position: relative;
  }
  &__check-default {
    @extend %check-default;
    &:checked + .two-step-login__check {
      background-color: $text-hover-color;
      .two-step-login__check-img {
        display: block;
      }
    }
  }
  &__check {
    @extend %check;
    margin-right: 16px;
  }
  &__check-text {
    @extend %check-input-text;
  }
  &__check-img {
    @extend %check-img;
  }
  &__input-name {
    @extend %login-input-name;
  }
  &__input {
    @extend %input;
    width: 100px;
    color: $semidark-grey;
  }
  &__email {
    color: $darker-grey;
    opacity: 0.27;
    margin-bottom: 16px;
    text-align: center;
    align-self: center;
  }
  &__button-wrapper {
    align-self: flex-end;
  }
  &__button {
    @extend %button;
    @extend %button-buy;
    text-transform: capitalize;
  }
  &__text {
    font-weight: 600;
    font-size: $size-5;
    color: $text-active-color;
    margin-bottom: 24px;
  }
}
</style>
