<template>
  <svg xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    viewBox="0 0 400 400"
    :aria-labelledby="name"
    role="presentation"
  >
    <title :id="name" lang="en">{{name}} icon</title>
    <g :fill="fill">
      <slot />
    </g>
  </svg>
</template>

<script>

export default {
  name: 'IconBase',
  props: {
    name: {
      type: String,
      default: 'box',
    },
    width: {
      type: [Number, String],
      default: 18,
    },
    height: {
      type: [Number, String],
      default: 18,
    },
    fill: {
      type: String,
      default: 'currentColor',
    },
  },
};
</script>

<style scoped>
svg {
  display: inline-block;
  vertical-align: baseline;
  /* margin-bottom: -2px;  */
}
</style>
