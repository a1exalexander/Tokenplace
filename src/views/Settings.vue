<template>
  <main class="settings">
    <nav class="settings__nav">
      <h1 class="settings__title">Settings</h1>
      <ul class="settings__list">
        <router-link
          to="/settings"
          class="settings__item"
          :class="{'active-setting-link': 'settings' == route}"
        >General</router-link>
        <router-link
          to="/settings/security"
          class="settings__item"
          :class="{'active-setting-link': 'security' == route}"
        >PASSWORD AND SECURITY</router-link>
        <router-link
          to="/settings/affiliate"
          class="settings__item"
          :class="{'active-setting-link': 'affiliate' == route}"
        >AFFILIATE PROGRAMM</router-link>
        <router-link
          to="/settings/plans"
          class="settings__item"
          :class="{'active-setting-link': 'plans' == route}"
        >PLANS</router-link>
        <router-link
          to="/settings/verification"
          class="settings__item"
          :class="{'active-setting-link': 'verification' == route}"
        >VERIFICATION</router-link>
      </ul>
    </nav>
    <router-view class="settings__box"/>
  </main>
</template>
<script>
export default {
  name: 'Settings',
  computed: {
    route() {
      return this.$route.name;
    },
  },
};
</script>
<style lang="scss">
.settings {
  padding: 64px 16px 16px;
  @include flex-row(stretch);
  align-items: stretch;
  height: 100vh;
  &__nav {
    width: 300px;
    position: fixed;
    height: calc(100vh - 80px);
    @extend %box;
    padding: 40px 0;
  }
  &__box {
    margin-left: 316px;
    flex: 1 1 100%;
    @extend %box;
    padding: 40px 56px;
    overflow-y: auto;
  }
  &__title {
    padding: 0 16px 0 56px;
    margin-bottom: 32px;
    @extend %setting-title;
  }
  &__list {
    list-style: none;
    @include flex-col-def(stretch);
  }
  &__item {
    padding: 11px 16px 11px 56px;
    color: $middle-grey;
    font-weight: 500;
    font-size: $size-4;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    @media (min-width: 600px) {
      &:hover {
        color: $text-hover-color;
      }
    }
  }
}
</style>
