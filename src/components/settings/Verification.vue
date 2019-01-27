<template>
  <main class="verification">
    <section class="verification__header">
      <h1 class="verification__title">Verification</h1>
    </section>
    <section class="verification__section" v-if="successVerify">
      <p class="verification__caption">Your account has been verified</p>
      <icon-shield class="verification__success-image"/>
      <p
        class="verification__text"
      >We will only use the information you enter to verify who you are,
      and we'll only hold onto it untill your account issue is resolved
      </p>
    </section>
    <section
      class="verification__section"
      v-else-if="!successVerify && successUploud">
      <p class="verification__caption">Success! Your documents had recieved</p>
      <p class="verification__text"
        >We'll notify you by email once your submission has been reviewed
      </p>
    </section>
    <section class="verification__container" v-else>
      <section class="verification__section">
        <p class="verification__caption">START VERIFICATION</p>
        <p
          class="verification__text"
        >We will only use the information you enter to verify who you are,
        and we'll only hold onto it untill your account issue is resolved
        </p>
      </section>
      <section class="verification__section verification__section--upload">
        <div class="verification__upload-image-wrapper" v-if="dataInput.passport">
          <img :src="dataInput.passport" alt="passport" class="verification__upload-image">
          <button
            class="verification__button-del"
            @click="deleteFile('passport')">
            <icon-close class="verification__icon-close"/>
          </button>
        </div>
        <label class="verification__upload-button">
          <input
            type="file"
            name="passport"
            @change="uploadPassport($event)"
            class="verification__input"
          >
          <icon-upload class="verification__upload-ico" v-if="!dataInput.passport"/>
          <p
            class="verification__upload-text"
          >{{ dataInput.passport? "Change image": "Upload a passport scan" }}</p>
        </label>
      </section>
      <section class="verification__section verification__section--upload">
        <div class="verification__upload-image-wrapper" v-if="dataInput.selfie">
          <img :src="dataInput.selfie" alt="selfie" class="verification__upload-image">
          <button
            class="verification__button-del"
            @click="deleteFile('selfie')">
            <icon-close class="verification__icon-close"/>
          </button>
        </div>
        <label class="verification__upload-button">
          <input
            type="file"
            name="selfie"
            @change="uploadSelfie($event)"
            class="verification__input"
          >
          <icon-upload class="verification__upload-ico" v-if="!dataInput.selfie"/>
          <p
            class="verification__upload-text"
          >{{ dataInput.selfie? "Change image": "Upload selfie with a passport" }}</p>
        </label>
      </section>
      <section class="verification__section verification__section--button">
        <button
          class="verification__button"
          :disabled="!showButton"
          @click="verify"
        >Verify your identity</button>
      </section>
    </section>
  </main>
</template>
<script>
import IconUpload from '@/components/icons/IconUpload.vue';
import IconClose from '@/components/icons/IconClose.vue';
import IconShield from '@/components/icons/IconShield.vue';
import { mapMutations, mapState } from 'vuex';
import http from 'axios';

export default {
  name: 'Verification',
  components: {
    IconUpload,
    IconClose,
    IconShield,
  },
  data() {
    return {
      dataOutput: {
        passport: '',
        selfie: '',
      },
      dataInput: {
        passport: '',
        selfie: '',
      },
    };
  },
  methods: {
    ...mapMutations('settings', ['setUploadImage', 'setSuccessVerify']),
    deleteFile(type) {
      this.dataInput[type] = '';
      this.dataOutput[type] = '';
    },
    uploadPassport(event) {
      // eslint-disable-next-line
      this.dataOutput.passport = event.target.files[0];
      // eslint-disable-next-line
      this.dataInput.passport = require('@/assets/images/testPassport.jpg');
    },
    uploadSelfie(event) {
      // eslint-disable-next-line
      this.dataOutput.selfie = event.target.files[0];
      // eslint-disable-next-line
      this.dataInput.selfie = require('@/assets/images/testSelfie.jpg');
    },
    verify() {
      http.get('https://jsonplaceholder.typicode.com/posts').then(() => {
        this.setUploadImage();
        setTimeout(() => {
          this.setSuccessVerify();
        }, 5000);
      });
    },
  },
  computed: {
    ...mapState('settings', {
      successUploud: state => state.verification.successUploud,
      successVerify: state => state.verification.successVerify,
    }),
    showButton() {
      return this.dataInput.passport && this.dataInput.selfie;
    },
  },
};
</script>
<style lang="scss">
.verification {
  &__header {
    @extend %setting-section;
    padding: 0 0 40px;
  }
  &__section {
    @extend %setting-section;
    border: none;
    &--upload {
      @include flex-row-def(center);
      padding: 8px 0;
    }
    &--button {
      padding: 24px 0;
    }
  }
  &__title {
    @extend %setting-title;
  }
  &__caption {
    @extend %setting-caption;
  }
  &__text {
    @extend %setting-text;
    max-width: 600px;
  }
  &__button {
    @extend %button;
    @extend %button-buy;
    text-transform: none;
  }
  &__upload-button {
    @include flex-row-def(flex-end);
    background-color: transparent;
    transition: all ease-in-out 0.2s;
    cursor: pointer;
    position: relative;
    z-index: 1;
    &:active {
      .verification__upload-text {
        color: $text-pressed-color;
      }
      .verification__upload-ico {
        fill: $text-pressed-color;
      }
    }
  }
  &__upload-ico {
    fill: $text-hover-color;
    width: 16px;
    height: 16px;
    margin-right: 8px;
    position: relative;
    transition: all ease-in-out 0.2s;
  }
  &__upload-text {
    @extend %link;
  }
  &__upload-image-wrapper {
    width: 164px;
    height: 92px;
    border: 2px solid $upload-border-color;
    border-radius: 2px;
    text-align: center;
    overflow: hidden;
    position: relative;
    margin-right: 32px;
  }
  &__upload-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center right;
  }
  &__button-del {
    top: 8px;
    right: 8px;
    position: absolute;
    background-color: transparent;
  }
  &__icon-close {
    width: 10px;
    height: 10px;
    fill: $grey;
  }
  &__input {
    position: absolute;
    z-index: -2;
    visibility: hidden;
    opacity: 0;
  }
  &__success-image {
    width: 80px;
    height: 80px;
    margin-bottom: 32px;
  }
}
</style>
