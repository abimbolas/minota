/* eslint-disable */

document.addEventListener('click', function (event) {
  if (event.target.closest('.submit-get-url')) {
    var url = document.querySelector('.get-url').value;
    axios.get(url).then(function (res) {
      console.log(res.data.length, 'notes loaded');
      document.querySelector('.note-content').textContent = res.data[0].content;
    });
  }
});
