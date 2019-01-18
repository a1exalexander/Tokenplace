module.exports = {
	baseUrl: process.env.NODE_ENV === 'production'
	? '/Tokenplace/'
	: '/',
	css: {
		loaderOptions: {
		  sass: {
			data: `@import "@/assets/scss/style.scss";`
		  }
		}
	}
};
