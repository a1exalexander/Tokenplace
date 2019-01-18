import moment from 'moment-timezone';
class Sort {

  constructor(array) {
    this.array = array;
  }

  isNumeric(type) {
    let value = this.array.some(el => {
			let item = parseFloat(el[type]);
			return !isNaN(parseFloat(item)) && isFinite(item);
		})
		return value;
	}
	isDate(type) {
		let value = this.array.some(el => {
			let item = new Date(el[type]);
			return item instanceof moment || item instanceof Date;
		})
		return value;
	}
	sortDates(type) {
		let	value = this.array.some((el, index, array) => {
			let a = moment(el[type], moment.ISO_8601),
					b = moment(array[array.length - 1][type], moment.ISO_8601);
			return (moment.max(a, b) == a)? false: true;
		})
		if(value) {
			this.array.sort((el_1, el_2) => {
				let a = moment(el_1[type], moment.ISO_8601),
						b = moment(el_2[type], moment.ISO_8601);
				if(moment.max(a, b) == a) return 1;
				if(moment.max(a, b) == b) return -1;
			})
		} else {
			this.array.sort((el_1, el_2) => {
				let a = moment(el_1[type], moment.ISO_8601),
						b = moment(el_2[type], moment.ISO_8601);
				if(moment.max(a, b) == a) return -1;
				if(moment.max(a, b) == b) return 1;
			})
		}
	}
	sortNumbers(type) {
		let	value = this.array.some((el, index, array) => {
			let a = String(el[type]).split('').filter(item => {
				return item !== ' ' && item !== ',';
			}).join('');
			let b = String(array[array.length - 1][type]).split('').filter(item => {
				return item !== ' ' && item !== ',';
			}).join('');
			a = parseFloat(a);
			b = parseFloat(b);
			return  a < b;
		})
		if(value) {
			this.array.sort((el_1, el_2) => {
				let a = String(el_1[type]).split('').filter(item => {
					return item !== ' ' && item !== ',';
				}).join('');
				let b = String(el_2[type]).split('').filter(item => {
					return item !== ' ' && item !== ',';
				}).join('');
				a = parseFloat(a);
				b = parseFloat(b);
				if(a < b) return 1;
				if(a > b) return -1;
			})
		} else {
			this.array.sort((el_1, el_2) => {
				let a = String(el_1[type]).split('').filter(item => {
					return item !== ' ' && item !== ',';
				}).join('');
				let b = String(el_2[type]).split('').filter(item => {
					return item !== ' ' && item !== ',';
				}).join('');
				a = parseFloat(a);
				b = parseFloat(b);
				if(a > b) return 1;
				if(a < b) return -1;
			})
		}
	}
	sortStrings(type) {
		let	value = this.array.some((el, index, array) => {
			let a = el[type],
					b = array[array.length - 1][type];
			return  a < b;
		})
		if(value) {
			this.array.sort((a, b) => {
				if(a[type] < b[type]) return 1;
				if(a[type] > b[type]) return -1;
			})
		} else {
			this.array.reverse();
		}
	}
}

export default Sort