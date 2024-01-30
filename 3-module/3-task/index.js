function camelize(str) {
  return str
    .split('')
    .map((char, i, arr) => {
      if(char == '-') {
        arr[i + 1] = arr[i + 1].toUpperCase();
      } else return char;
    })
    .join('');
}
