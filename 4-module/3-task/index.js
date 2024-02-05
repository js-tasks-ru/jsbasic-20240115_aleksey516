function highlight(table) {
  
  function indexByName(headerName) {
    const cellsHeader = table.querySelectorAll('thead>tr>td');
    for(let cellName of cellsHeader) {
      if(cellName.textContent == headerName) {
        return cellName.cellIndex;
      }
    }
  }
    
  for(let tr of table.querySelectorAll('tbody>tr')) {
    
    if(tr.cells[indexByName('Status')].dataset.available == 'true') {
      tr.classList.add('available');
    }
    else if(tr.cells[indexByName('Status')].dataset.available == 'false') {
      tr.classList.add('unavailable');
    } else {
      tr.setAttribute('hidden', '');
    }
  
    if(tr.cells[indexByName('Gender')].textContent == 'm') {
      tr.classList.add('male');
    } else {
      tr.classList.add('female');
    }
  
    if(tr.cells[indexByName('Age')].textContent < 18) {
      tr.style.cssText += 'text-decoration: line-through';
    }
  }
}
