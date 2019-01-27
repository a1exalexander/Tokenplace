<template>
  <section class="sign-up">
    <form class="sign-up__card">
      <div class="sign-up__logo-wrapper">
        <icon-logo class="sign-up__logo"/>
      </div>
      <p class="sign-up__heading">Sign Up</p>
      <label class="sign-up__label">
        <p class="sign-up__input-name">Full Name</p>
        <input
          type="text"
          class="sign-up__input"
          :class="{
            'input-error': !checkName && signUpData.name,
            'input-accepted': checkName
          }"
          autocomplete="on"
          v-model.trim="signUpData.name"
          required
        >
      </label>
      <label class="sign-up__label">
        <p class="sign-up__input-name">Email</p>
        <input
          type="email"
          class="sign-up__input"
          :class="{
            'input-error': !checkEmail && signUpData.email,
            'input-accepted': checkEmail
          }"
          autocomplete="on"
          v-model.trim="signUpData.email"
        >
      </label>
      <label class="sign-up__label">
        <p class="sign-up__input-name">Password</p>
        <input
          type="password"
          class="sign-up__input"
          :class="{
            'input-error': !checkPassword && signUpData.password,
            'input-accepted': checkPassword
          }"
          autocomplete="off"
          v-model.trim="signUpData.password"
        >
      </label>
      <label class="sign-up__check-label">
        <input class="sign-up__check-default" type="checkbox" v-model="statusAgree">
        <div class="sign-up__check">
          <icon-check class="sign-up__check-img"/>
        </div>
        <p class="sign-up__check-text">
          I agree to
          <a
            class="sign-up__check-link"
            href="https://ru.vuejs.org/v2/guide/events.html"
            target="_blank"
          >Terms & Conditions</a>
        </p>
      </label>
      <button
        class="sign-up__button"
        :class="{'button-loading': buttonLoading}"
        :disabled="showButton"
        @click.prevent="signUp"
      >Sign Up</button>
    </form>
    <p class="sign-up__subtext">
      Already have an account?
      <a
        href="#"
        class="sign-up__sublink"
        @click.prevent="toSignIn()"
      >Log In</a>
    </p>
  </section>
</template>
<script>
import IconLogo from '@/components/icons/IconLogo.vue';
import IconCheck from '@/components/icons/IconCheck.vue';
import http from 'axios';

export default {
  name: 'SignUp',
  components: {
    IconLogo,
    IconCheck,
  },
  data() {
    return {
      signUpData: {
        name: null,
        email: null,
        password: null,
      },
      statusAgree: false,
      buttonLoading: false,
    };
  },
  methods: {
    signUp() {
      this.buttonLoading = true;
      http
        .post('https://jsonplaceholder.typicode.com/posts', this.signUpData)
        .then(() => {
          this.buttonLoading = false;
          this.toSignIn('emailSend');
        })
        .catch((error) => {
          this.pushError(this.errors.signIn, error);
        });
    },
    toSignIn(param) {
      this.$emit('toSignIn', param);
    },
    validName(name) {
      // eslint-disable-next-line
      let re = /^([A-ZА-Я])+([a-zA-Zа-яА-Я]{1,15})((\s?)([a-zA-Zа-яА-Я]{1,10})){1,3}?$/g;
      return re.test(name);
    },
    validEmail(email) {
      // eslint-disable-next-line
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g;
      return re.test(email);
    },
    validPassword(password) {
      // eslint-disable-next-line
      let re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/g;
      return re.test(password);
    },
  },
  computed: {
    showButton() {
      return !(this.checkPassword && this.checkEmail && this.checkName && this.statusAgree);
    },
    checkPassword() {
      return this.validPassword(this.signUpData.password);
    },
    checkEmail() {
      return this.validEmail(this.signUpData.email);
    },
    checkName() {
      return this.validName(this.signUpData.name);
    },
  },
};
</script>
<style lang="scss">
.sign-up {
  @include flex-col-def(stretch);
  &__card {
    @include flex-col-def(stretch);
    @extend %login-card;
    margin-bottom: 27px;
  }
  &__logo-wrapper {
    text-align: center;
    margin-bottom: 24px;
  }
  &__logo {
    width: 120px;
    height: 60px;
  }
  &__heading {
    @extend %login-heading;
  }
  &__label {
    @include flex-col-def(stretch);
    margin-bottom: 16px;
    z-index: 2;
  }
  &__check-label {
    @include flex-row-def(center);
    margin-bottom: 30px;
    position: relative;
  }
  &__check-default {
    @extend %check-default;
    &:checked + .sign-up__check {
      background-color: $text-hover-color;
      .sign-up__check-img {
        display: block;
      }
    }
  }
  &__check {
    @extend %check;
    margin-right: 14px;
  }
  &__check-text {
    @extend %check-input-text;
  }
  &__check-link {
    color: $text-hover-color;
  }
  &__check-img {
    @extend %check-img;
  }
  &__input-name {
    @extend %login-input-name;
  }
  &__input {
    @extend %input;
    color: $semidark-grey;
  }
  &__subtext {
    text-align: center;
  }
  &__button {
    @extend %button;
    @extend %button-buy;
    align-self: flex-end;
    text-transform: capitalize;
  }
  &__subtext {
    @extend %login-subtext;
  }
  &__sublink {
    color: $text-hover-color;
  }
}
</style>
