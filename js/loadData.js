'use strict';

(function () {
  const URL = 'https://js.dump.academy/kekstagram/data';
  var onSuccess = function (data) {
    window.gallery.renderPictures(data);
    window.preview.openRandomPicture(data);
  };
  var load = function () {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      }
    });
    xhr.timeout = 1000; // 10s
    xhr.open('GET', URL);
    xhr.send();
  };
  load();
})();
