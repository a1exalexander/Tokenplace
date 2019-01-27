import moment from 'moment-timezone';

class Sort {
  constructor(array) {
    this.array = array;
  }

  isNumeric(type) {
    const value = this.array.some((el) => {
      const item = parseFloat(el[type]);
      return !isNaN(parseFloat(item)) && isFinite(item);
    });
    return value;
  }

  isDate(type) {
    const value = this.array.some((el) => {
      const item = new Date(el[type]);
      return item instanceof moment || item instanceof Date;
    });
    return value;
  }

  sortDates(type) {
    const	value = this.array.some((el, index, array) => {
      const a = moment(el[type], moment.ISO_8601);


      const b = moment(array[array.length - 1][type], moment.ISO_8601);
      return moment.max(a, b) != a;
    });
    if (value) {
      this.array.sort((el_1, el_2) => {
        const a = moment(el_1[type], moment.ISO_8601);


        const b = moment(el_2[type], moment.ISO_8601);
        if (moment.max(a, b) == a) return 1;
        if (moment.max(a, b) == b) return -1;
      });
    } else {
      this.array.sort((el_1, el_2) => {
        const a = moment(el_1[type], moment.ISO_8601);


        const b = moment(el_2[type], moment.ISO_8601);
        if (moment.max(a, b) == a) return -1;
        if (moment.max(a, b) == b) return 1;
      });
    }
  }

  sortNumbers(type) {
    const	value = this.array.some((el, index, array) => {
      let a = String(el[type]).split('').filter(item => item !== ' ' && item !== ',').join('');
      let b = String(array[array.length - 1][type]).split('').filter(item => item !== ' ' && item !== ',').join('');
      a = parseFloat(a);
      b = parseFloat(b);
      return a < b;
    });
    if (value) {
      this.array.sort((el_1, el_2) => {
        let a = String(el_1[type]).split('').filter(item => item !== ' ' && item !== ',').join('');
        let b = String(el_2[type]).split('').filter(item => item !== ' ' && item !== ',').join('');
        a = parseFloat(a);
        b = parseFloat(b);
        if (a < b) return 1;
        if (a > b) return -1;
      });
    } else {
      this.array.sort((el_1, el_2) => {
        let a = String(el_1[type]).split('').filter(item => item !== ' ' && item !== ',').join('');
        let b = String(el_2[type]).split('').filter(item => item !== ' ' && item !== ',').join('');
        a = parseFloat(a);
        b = parseFloat(b);
        if (a > b) return 1;
        if (a < b) return -1;
      });
    }
  }

  sortStrings(type) {
    const	value = this.array.some((el, index, array) => {
      const a = el[type];


      const b = array[array.length - 1][type];
      return a < b;
    });
    if (value) {
      this.array.sort((a, b) => {
        if (a[type] < b[type]) return 1;
        if (a[type] > b[type]) return -1;
      });
    } else {
      this.array.reverse();
    }
  }
}

export default Sort;
