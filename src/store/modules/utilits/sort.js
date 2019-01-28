import moment from 'moment-timezone';

class Sort {
  constructor(array) {
    this.array = array;
  }

  isNumeric(type) {
    return this.array.some(el => !Number.isNaN(parseFloat(el[type])));
  }

  isDate(type) {
    const value = this.array.some((el) => {
      const item = new Date(el[type]);
      return item instanceof moment || item instanceof Date;
    });
    return value;
  }

  sortDates(type) {
    const value = this.array.some((el, index, array) => {
      const a = moment(el[type], moment.ISO_8601);

      const b = moment(array[array.length - 1][type], moment.ISO_8601);
      return moment.max(a, b) !== a;
    });
    if (value) {
      this.array.sort((el1, el2) => {
        const a = moment(el1[type], moment.ISO_8601);

        const b = moment(el2[type], moment.ISO_8601);
        if (moment.max(a, b) === a) return 1;
        return -1;
      });
    } else {
      this.array.sort((el1, el2) => {
        const a = moment(el1[type], moment.ISO_8601);

        const b = moment(el2[type], moment.ISO_8601);
        if (moment.max(a, b) === a) return -1;
        return 1;
      });
    }
  }

  sortNumbers(type) {
    const value = this.array.some((el, index, array) => {
      let a = String(el[type])
        .split('')
        .filter(item => item !== ' ' && item !== ',')
        .join('');
      let b = String(array[array.length - 1][type])
        .split('')
        .filter(item => item !== ' ' && item !== ',')
        .join('');
      a = parseFloat(a);
      b = parseFloat(b);
      return a < b;
    });
    if (value) {
      this.array.sort((el1, el2) => {
        let a = String(el1[type])
          .split('')
          .filter(item => item !== ' ' && item !== ',')
          .join('');
        let b = String(el2[type])
          .split('')
          .filter(item => item !== ' ' && item !== ',')
          .join('');
        a = parseFloat(a);
        b = parseFloat(b);
        if (a < b) return 1;
        return -1;
      });
    } else {
      this.array.sort((el1, el2) => {
        let a = String(el1[type])
          .split('')
          .filter(item => item !== ' ' && item !== ',')
          .join('');
        let b = String(el2[type])
          .split('')
          .filter(item => item !== ' ' && item !== ',')
          .join('');
        a = parseFloat(a);
        b = parseFloat(b);
        if (a > b) return 1;
        return -1;
      });
    }
  }

  sortStrings(type) {
    const value = this.array.some((el, index, array) => {
      const a = el[type];

      const b = array[array.length - 1][type];
      return a < b;
    });
    if (value) {
      this.array.sort((a, b) => {
        if (a[type] < b[type]) return 1;
        return -1;
      });
    } else {
      this.array.reverse();
    }
  }
}

export default Sort;
