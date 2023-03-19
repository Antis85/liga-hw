// Задача 1:
function sum(arg1) {
  return function innerSum1(arg2) {
    return function innerSum2(arg3) {
      return arg1 + arg2 + arg3;
    };
  };
}

// const result = sum(1)(2)(3);
// console.log('result', result);

// Задача 2:
const arr = [3, 2, 1, 4, 1, 5, 9, 3, 7];
function quickSort(arr) {
  if (arr.length <= 1) return arr;

  let pivot = arr[0];
  const lessArr = [];
  const greaterArr = [];

  for (let i = 1; i < arr.length; i++) {
    if (pivot > arr[i]) {
      lessArr.push(arr[i]);
    } else {
      greaterArr.push(arr[i]);
    }
  }

  return quickSort(lessArr).concat(pivot, quickSort(greaterArr));
}

// const sortedArr = quickSort(arr);
// console.log('sortedArr', sortedArr);

// Задача 3:
function taskCreator() {
  setTimeout(() => {
    console.log('1-macro');
    Promise.resolve('1-micro').then((res) => console.log(res));
    //1-render:
    document.body.style.color = 'red';
  }, 3 * 1000);
  setTimeout(() => {
    console.log('2-macro');
    Promise.resolve('2-micro1').then((res) => console.log(res));
    Promise.resolve('2-micro2').then((res) => console.log(res));
  }, 5 * 1000);
  setTimeout(() => {
    console.log('3-macro');
    Promise.resolve('3-micro').then((res) => console.log(res));
    document.body.innerText = '3-render: end tasks';
  }, 7 * 1000);
}

// taskCreator();
