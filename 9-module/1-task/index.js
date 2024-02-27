export default function promiseClick(button) {
  return new Promise((resolve) => {
    function listener(event) {
      resolve(event);
    }
    button.addEventListener("click", listener);
  });
}
