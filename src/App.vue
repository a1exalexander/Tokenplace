<template>
  <div id="app">
    <navigation v-if="showNav"></navigation>
    <transition
      name="custom-classes-transition"
      enter-active-class="animated dur05 fadeIn"
      leave-active-class="animated dur03 fadeOut"
      mode="out-in"
    >
      <router-view/>
    </transition>
  </div>
</template>
<script>
import Navigation from '@/components/Navigation.vue';

export default {
  name: 'app',
  components: {
    Navigation,
  },
  computed: {
    showNav() {
      return this.$route.name !== 'login';
    },
  },
};
</script>
