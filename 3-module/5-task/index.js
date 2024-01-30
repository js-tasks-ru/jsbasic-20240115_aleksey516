function getMinMax(str) {
  numArr = str
    .split(' ')
    .filter(subStr => Number(subStr));
  
  return {min: numArr.reduce((min, num) => Math.min(min, num)),
         max: numArr.reduce((max, num) => Math.max(max, num))};
}
