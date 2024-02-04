function highlight(table) {
  for(let tr of table.rows) {
    
    if(tr.cells[3].dataset.available == 'true') {
      tr.classList.add('available');
    }
    else if(tr.cells[3].dataset.available == 'false') {
      tr.classList.add('unavailable');
    } else {
      tr.setAttribute('hidden', '');
    }
  
    if(tr.cells[2].textContent == 'm') {
      tr.classList.add('male');
    } else {
      tr.classList.add('female');
    }
  
    if(tr.cells[1].textContent < 18) {
      tr.style.cssText += 'text-decoration: line-through';
    }
  }
}
