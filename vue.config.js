module.exports = {
	baseUrl: process.env.NODE_ENV === 'production'
	? '/Tokenplace/dist'
	: '/',
	css: {
		loaderOptions: {
		  sass: {
			data: `@import "@/assets/scss/style.scss";`
		  }
		}
	}
};
