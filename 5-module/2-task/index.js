function toggleText() {
  const text = document.querySelector('#text');
  const button = document.querySelector('.toggle-text-button');
  button.addEventListener('click', () => {
    (text.hidden) ? text.hidden = false : text.hidden = true;
  });
}
