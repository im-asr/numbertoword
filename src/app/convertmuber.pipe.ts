import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'numbertowords',
})
export class NumberToWordsPipe implements PipeTransform {
  transform(value: any): string {
    if (value && isInteger(value)) {
        return numToWords(value);
    }
    return value;
  }
}

const isInteger = function (x: any) {
  return x % 1 === 0;
};

const arr = (x) => Array.from(x);
const num = (x) => Number(x) || 0;
const str = (x) => String(x);
const isEmpty = (xs) => xs.length === 0;
const take = (n) => (xs) => xs.slice(0, n);
const drop = (n) => (xs) => xs.slice(n);
const reverse = (xs) => xs.slice(0).reverse();
const comp = (f) => (g) => (x) => f(g(x));
const not = (x) => !x;
const chunk = (n) => (xs) =>
  isEmpty(xs) ? [] : [take(n)(xs), ...chunk(n)(drop(n)(xs))];
let numToWords = (n) => {
  let a = ['', 'one', 'two', 'three'];
  let b = [
    '',
    '',
    'twenty',
    'thirty',
    'forty',
    'fifty',
    'sixty',
    'seventy',
    'eighty',
    'ninety',
  ];
  let g = ['', 'thousand'];

  let makeGroup = ([ones, tens, huns]) => {
    return [
      num(huns) === 0 ? '' : a[huns] + ' hundred ',
      num(ones) === 0 ? b[tens] : (b[tens] && b[tens] + '-') || '',
      a[tens + ones] || a[ones],
    ].join('');
  };

  let thousand = (group, i) => (group === '' ? group : `${group} ${g[i]}`);

  if (typeof n === 'number') return numToWords(String(n));
  if (n === '0') return 'zero';
  return comp(chunk(3))(reverse)(arr(n))
    .map(makeGroup)
    .map(thousand)
    .filter(comp(not)(isEmpty))
    .reverse()
    .join(' ');
};
