<template>
  <section class="sign-in">
    <form class="sign-in__card">
      <div class="sign-in__logo-wrapper">
        <icon-logo class="sign-in__logo"/>
      </div>
      <p class="sign-in__heading" v-if="someMessage">{{ showStatus }}</p>
      <p
        class="sign-in__description sign-in__description--margin-send"
        :class="{
          'sign-in__description--margin-success': messages.confirmEmail || messages.newPassword}"
        v-if="someMessage"
      >
        <icon-success class="sign-in__success-img"/>
        {{ showSuccess }}
      </p>
      <p
        class="sign-in__description"
        v-if="emailSend"
      >Follow the instruction on your email address to continue registration</p>
      <p class="sign-in__heading">{{ showTitle }}</p>
      <label class="sign-in__label">
        <p class="sign-in__input-name">Email</p>
        <input
          type="email"
          class="sign-in__input"
          :class="{'input-error': !checkEmail && signInData.email, 'input-accepted': checkEmail}"
          autocomplete="on"
          v-model.trim="signInData.email"
        >
      </label>
      <label class="sign-in__label sign-in__label--password">
        <div class="sign-in__label-inner">
          <p class="sign-in__input-name sign-in__input-name--margin-0">Password</p>
          <a
            href="#"
            class="sign-in__input-name sign-in__input-name--link"
            @click.prevent="toResetPassword()"
          >Forgot Password?</a>
        </div>
        <input
          type="password"
          class="sign-in__input"
          :class="{
            'input-error': !checkPassword && signInData.password, 'input-accepted': checkPassword}"
          autocomplete="off"
          v-model.trim="signInData.password"
        >
      </label>
      <button
        class="sign-in__button"
        :class="{'button-loading': buttonLoading}"
        @click.prevent="signIn"
        :disabled="showButton"
      >Log In</button>
    </form>
    <p class="sign-in__subtext">
      Don't have an account?
      <a href="#" class="sign-in__sublink" @click.prevent="toSignUp">Sign Up</a>
    </p>
  </section>
</template>
<script>
import IconLogo from '@/components/icons/IconLogo.vue';
import IconSuccess from '@/components/icons/IconSuccess.vue';
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'SignIn',
  components: {
    IconLogo,
    IconSuccess,
  },
  data() {
    return {
      emailSend: false,
      emailConfirm: false,
      successReset: false,
      signInData: {
        email: null,
        password: null,
      },
      buttonLoading: false,
      errors: [],
    };
  },
  methods: {
    signIn() {
      this.buttonLoading = true;
      this.$store
        .dispatch('login/AUTH_REQUEST', this.signInData)
        .then(() => {
          this.buttonLoading = false;
          if (this.twoStepVerification) {
            this.toTwoStepVerification();
          } else {
            this.$router.push('/');
          }
        })
        .catch((error) => {
          this.errors.push(error);
        });
    },
    toTwoStepVerification() {
      this.$emit('toTwoStepVerification');
    },
    toResetPassword() {
      this.$emit('toResetPassword');
    },
    toSignUp() {
      this.$emit('toSignUp');
    },
    validEmail(email) {
      // eslint-disable-next-line
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    validPassword(password) {
      // eslint-disable-next-line
      let re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
      return re.test(password);
    },
  },
  computed: {
    ...mapState({
      messages: state => state.login.messages,
      twoStepVerification: state => state.settings.twoStepVerification,
    }),
    ...mapGetters('login', ['someMessage']),
    showSuccess() {
      if (this.emailSend) {
        return 'Activation email has been sent';
      }
      if (this.emailConfirm) {
        return 'You have confirmed your email';
      }
      return 'Your password has been changed';
    },
    showStatus() {
      if (this.messages.activationEmail || this.messages.confirmEmail) {
        return 'Thanks for sign up!';
      }
      return 'Success';
    },
    showTitle() {
      if (this.messages.confirmEmail || this.messages.activationEmail) {
        return 'Log In to Token Place';
      }
      return 'Log In';
    },
    showButton() {
      return !(this.checkPassword && this.checkEmail);
    },
    checkPassword() {
      return this.validPassword(this.signInData.password);
    },
    checkEmail() {
      return this.validEmail(this.signInData.email);
    },
  },
};
</script>
<style lang="scss">
.sign-in {
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
    &--password {
      margin-bottom: 32px;
    }
  }
  &__label-inner {
    margin-bottom: 9px;
    @include flex-row(space-between);
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
    &--margin-0 {
      margin: 0;
    }
    &--link {
      color: $text-hover-color;
      margin: 0;
    }
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
  &__success-img {
    width: 22px;
    height: 22px;
    margin-right: 4px;
  }
  &__description {
    text-align: center;
    @extend %login-description;
    @include flex-row(center);
    padding: 0 6%;
    &--margin-send {
      margin-bottom: 16px;
    }
    &--margin-success {
      margin-bottom: 32px;
    }
  }
}
</style>
