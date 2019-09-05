const arr = Array.from(Array(30)).map((e, i) => i + 1);
const newArr = [];

const result = (n, mssg) => {
  arr.map(item => {
    if(item % n === 0) {
      newArr.push({
        n: item,
        mssg: mssg
      });
    }
  }, [])
  return newArr;
}

const result_2 = (n_1, n_2, mssg) => {
  arr.map(item => {
    if((item % n_1 === 0) && (item % n_2 === 0)) {
      newArr.push({
        n: item,
        mssg: mssg
      });
    }
  }, [])
  return newArr;
}


console.log("Multiplos de 3 \n");
console.log(result(3, 'fizz'));
console.log("Multiplos de 5 \n");
console.log(result(5, 'buzz'));
console.log("Multiplos de 3 y 5 \n");
console.log(result_2(3, 5, "fizzbuzz"));
