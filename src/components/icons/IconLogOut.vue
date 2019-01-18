<template>
<svg viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
	<defs>
			<path d="M15,5 L21,5 L21,19 L15,19 L15,17.1333333 L18.75,17.1333333 L18.75,6.86666667 L15,6.86666667 L15,5 Z M6,12 L9.42857143,8.5 L9.42857143,10.46 L16,10.46 L16,13.54 L9.42857143,13.54 L9.42857143,15.5 L6,12 Z" id="path-1"></path>
	</defs>
	<g id="Icons-/-Interface-/-Log-out" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
			<mask id="mask-2" fill="white">
					<use xlink:href="#path-1"></use>
			</mask>
			<use id="Combined-Shape" :fill="fill" fill-rule="nonzero" transform="translate(13.500000, 12.000000) rotate(180.000000) translate(-13.500000, -12.000000) " xlink:href="#path-1"></use>
	</g>
</svg>
</template>
<script>
export default {
	name: "IconLogOut",
	props: {
		fill: {
      type: String,
      default: 'currentColor'
    }
	}
}
</script>

