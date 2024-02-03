function makeDiagonalRed(table) {
  for(let i = 0; i < table.querySelectorAll('tr').length; i++) {
    table.rows[i].cells[i].style.backgroundColor = 'red';
  }
}
