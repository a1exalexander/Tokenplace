<template>
  <nav class="nav" @click.self="navDrop = false">
    <div class="nav__inner" @click="navDrop = false">
      <router-link to="/" class="nav__logo-wrapper">
        <icon-logo class="nav__logo"/>
      </router-link>
      <ul class="nav__list">
        <li class="nav__item">
          <router-link
            to="/dashboard"
            class="nav__link"
            :class="{'nav__link--active': 'dashboard' == route || 'home' == route}"
          >dashboard</router-link>
        </li>
        <li class="nav__item">
          <router-link
            to="/trading"
            class="nav__link"
            :class="{'nav__link--active': 'trading' == route}"
          >trading</router-link>
        </li>
        <li class="nav__item">
          <router-link
            to="/portfolio"
            class="nav__link"
            :class="{'nav__link--active': 'portfolio' == route}"
          >portfolio</router-link>
        </li>
        <li class="nav__item">
          <router-link
            to="/exchanges"
            class="nav__link"
            :class="{'nav__link--active': 'exchanges' == route}"
          >my exchanges</router-link>
        </li>
        <li class="nav__item">
          <router-link
            to="/support"
            class="nav__link"
            :class="{'nav__link--active': 'support' == route}"
          >support</router-link>
        </li>
      </ul>
    </div>
    <div class="nav__inner" @click="navDrop = !navDrop">
      <div class="nav__avatar-wrapper">
        <img :src="getProfile.ico" alt="avatar" class="nav__avatar">
      </div>
      <a href="#" class="nav__user-link">
        <p class="nav__user-name">{{ getProfile.name }}</p>
        <icon-angle-down class="nav__user-link-angle" :class="{'sort-image-active': navDrop}"/>
        <transition
          name="custom-classes-transition"
          enter-active-class="animated dur04 pullDownLight"
          leave-active-class="animated dur02 pullDownLight revers"
        >
          <div class="nav__drop-list" v-show="navDrop">
            <div class="nav__drop-list-inner">
              <router-link to="/settings" class="nav__drop-item">
                <icon-gear class="nav__drop-item-ico"/>Settings
              </router-link>
              <a href="#" @click.prevent="logout" class="nav__drop-item">
                <icon-log-out class="nav__drop-item-ico nav__drop-item-ico--logout"/>Log out
              </a>
            </div>
          </div>
        </transition>
      </a>
    </div>
  </nav>
</template>
<script>
import IconLogo from '@/components/icons/IconLogo.vue';
import IconAngleDown from '@/components/icons/IconAngleDown.vue';
import IconGear from '@/components/icons/IconGear.vue';
import IconLogOut from '@/components/icons/IconLogOut.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'Navigation',
  components: {
    IconLogo,
    IconAngleDown,
    IconGear,
    IconLogOut,
  },
  data() {
    return {
      navDrop: false,
    };
  },
  methods: {
    logout() {
      this.$store.dispatch('login/AUTH_LOGOUT').then(() => {
        this.$router.push('/login');
      });
    },
  },
  computed: {
    ...mapGetters('login', ['getProfile']),
    route() {
      return this.$route.name;
    },
  },
};
</script>
<style lang="scss">
.nav {
  position: fixed;
  width: 100%;
  left: 0;
  right: 0;
  top: 0;
  background-color: $white;
  @include flex-row(space-between);
  align-items: stretch;
  height: 48px;
  padding: 0 16px;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.06);
  z-index: 10;
  &__logo-wrapper {
    @include flex-row(space-between);
    height: 50px;
    width: 70px;
    margin-right: 35px;
  }
  &__logo {
    widows: 70px;
    height: 36px;
  }
  &__inner {
    @include flex-row(space-between);
  }
  &__list {
    height: 100%;
    list-style: none;
    @include flex-row(space-between);
  }
  &__item {
    height: 100%;
    @include flex-row(center);
  }
  &__link {
    @include flex-row(center);
    height: 100%;
    text-transform: uppercase;
    font-size: $size-2;
    font-family: $base-font;
    font-weight: 500;
    color: $grey;
    letter-spacing: 0.25px;
    white-space: nowrap;
    padding: 0 1rem;
    border-top: 2px solid transparent;
    border-bottom: 2px solid transparent;
    transition-property: border-color, color;
    transition-timing-function: ease-in-out;
    transition-duration: 0.15s;
    @media (min-width: 480px) {
      &:hover {
        color: $dark-grey;
      }
    }
    &:active {
      color: $text-active-color;
    }
    &--active {
      color: $text-active-color;
      border-bottom-color: $text-hover-color;
    }
  }
  &__avatar-wrapper {
    flex-shrink: 0;
    width: 24px;
    height: 24px;
  }
  &__avatar {
    max-width: 100%;
    height: auto;
  }
  &__user-link {
    @include flex-row(space-between);
    padding-left: 1rem;
    position: relative;
  }
  &__user-name {
    font-size: $size-2;
    font-family: $base-font;
    color: $grey;
    font-weight: 500;
    margin-right: 5px;
  }
  &__user-link-angle {
    @extend %ico;
  }
  &__drop-list {
    @extend %drop-list;
    top: calc(250%);
    right: -10px;
    box-shadow: 0 0px 33px 0 rgba(0, 0, 0, 0.16);
    border-radius: 5px;
    border: none;
    overflow: visible;
  }
  &__drop-list-inner {
    position: relative;
    padding: 9px 0;
    &::after {
      bottom: 100%;
      right: 5px;
      border: solid transparent;
      content: ' ';
      height: 0;
      width: 0;
      position: absolute;
      pointer-events: none;
      border-bottom-color: $white;
      border-width: 11px;
      transform: scaleX(0.75);
    }
  }
  &__drop-item {
    @extend %drop-item;
    height: auto;
    padding: 9px 18px;
    @media screen and (min-width: 600px) {
      &:hover .nav__drop-item-ico {
        fill: $text-hover-color;
      }
    }
  }
  &__drop-item-ico {
    @extend %ico;
    width: 15px;
    height: 15px;
    fill: $darker-grey;
    margin-right: 12px;
    &--logout {
      width: 17px;
      height: 17px;
    }
  }
}
</style>
