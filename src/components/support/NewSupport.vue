<template>
  <section class="new-support">
    <article class="new-support__card animated delay-01 fadeIn dur08">
      <button class="new-support__button-close" @click="cancel">
        <icon-close class="new-support__close-img"/>
      </button>
      <div class="new-support__logo-wrapper">
        <icon-logo class="new-support__logo"/>
      </div>
      <p class="new-support__heading">Send a new message</p>
      <form class="new-support__form">
        <label class="new-support__label">
          <p class="new-support__label-text">Theme</p>
          <input
            type="text"
            class="new-support__input"
            :class="{'input-accepted': theme}"
            autocomplete="on"
            v-model.trim="theme"
          >
        </label>
        <label class="new-support__label">
          <p class="new-support__label-text">Message</p>
          <textarea
            type="tex"
            class="new-support__input new-support__input--textarea"
            :class="{'input-accepted': text}"
            autocomplete="on"
            v-model="text"
          ></textarea>
        </label>
        <div class="new-support__button-wrapper">
          <button
            class="new-support__button"
            :class="{'button-loading': buttonLoading}"
            @click.prevent="send()"
            :disabled="!(theme && text)"
          >Send</button>
        </div>
      </form>
    </article>
  </section>
</template>
<script>
import IconLogo from '@/components/icons/IconLogo.vue';
import IconClose from '@/components/icons/IconClose.vue';
import { mapActions } from 'vuex';

export default {
  name: 'NewSupport',
  components: {
    IconLogo,
    IconClose,
  },
  data() {
    return {
      theme: '',
      text: '',
      buttonLoading: false,
    };
  },
  methods: {
    ...mapActions('support', ['newSupport']),
    // TODO: change to HTTP REQUEST
    send() {
      const data = [this.theme, this.text];
      this.newSupport(data);
      this.$emit('cancel');
    },
    cancel() {
      this.$emit('cancel');
    },
  },
};
</script>
<style lang="scss">
.new-support {
  padding: 24px;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  min-height: 100vh;
  background: $wrapper-color;
  z-index: 11;
  @include flex-row(center);
  overflow-y: auto;
  &__card {
    flex: 0 0 30%;
    min-width: 400px;
    @extend %login-card;
    padding: 40px;
    position: relative;
  }
  &__heading {
    @extend %login-heading;
    padding: 0 40px;
  }
  &__input {
    @extend %input;
    color: $semidark-grey;
    &--textarea {
      min-height: 120px;
      flex: 1 1 16vh;
      resize: none;
      padding: 8px 12px;
    }
  }
  &__logo-wrapper {
    text-align: center;
    margin-bottom: 24px;
    padding: 0 40px;
  }
  &__logo {
    width: 99px;
    height: 46px;
  }
  &__list {
    list-style-position: inside;
    padding: 0 40px;
  }
  &__form {
    @include flex-col-def(stretch);
    width: 100%;
  }
  &__item {
    font-weight: 600;
    font-size: $size-5;
    color: $text-active-color;
    margin-bottom: 32px;
  }
  &__label {
    margin-bottom: 16px;
    @include flex-col-def(stretch);
  }
  &__label-text {
    margin-bottom: 9px;
    color: $text-active-color;
    font-size: $size-2;
    letter-spacing: 0.28px;
    font-weight: 600;
  }
  &__qr-wrapper {
    margin-top: 18px;
    width: 104px;
    height: 104px;
    border: 1px solid $qr-border-color;
    padding: 1px;
  }
  &__button-wrapper {
    padding-top: 16px;
    @include flex-row(flex-end);
  }
  &__button {
    @extend %button;
    @extend %button-buy;
    text-transform: capitalize;
    font-weight: 500;
  }
  &__button-close {
    background-color: transparent;
    padding: 4px;
    position: absolute;
    top: 24px;
    right: 24px;
  }
  &__close-img {
    width: 14px;
    height: 14px;
    fill: $middle-grey;
  }
}
</style>
