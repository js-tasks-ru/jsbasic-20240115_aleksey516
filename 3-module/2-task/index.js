function filterRange(arr, a, b) {
  return arr
      .filter(num => (a <= num && num <= b));
}
