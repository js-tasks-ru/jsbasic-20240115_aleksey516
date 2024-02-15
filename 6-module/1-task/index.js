/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  elem = null;
  rows = [];

  constructor(rows) {
    this.rows = rows || this.rows;
    this.elem = this.createTable() || this.elem;
    this.deleteRowOnClick();
  }

  createTable() {
    let tmp = document.createElement('div');
    tmp.innerHTML = this.template();
    return tmp.firstElementChild;
  }

  deleteRowOnClick() {
    this.elem.addEventListener('click', (event) => {
      if(event.target.tagName === 'BUTTON') {
        event.target.closest('tr').remove();
      }
    })
  }

  template(rows) {
    return `
    <table>
    <thead>
      <tr>
        <th>Имя</th>
        <th>Возраст</th>
        <th>Зарплата</th>
        <th>Город</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      ${this.rows
      .map(row =>
      `<tr>
        <td>${row.name}</td>
        <td>${row.age}</td>
        <td>${row.salary}</td>
        <td>${row.city}</td>
        <td><button>X</button></td>
      </tr>`)
      .join('')}
      </tbody>
    </table>
    `
  }
}
