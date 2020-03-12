'use strict';

(function () {
  var load = function () {
    const URL = 'https://js.dump.academy/kekstagram/data';
    var loadPictures = [];
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        loadPictures = xhr.response;
      }
    });
    xhr.timeout = 1000; // 10s
    xhr.open('GET', URL);
    xhr.send();
    return loadPictures;
  };
  window.loadData = {
    load: load
  };
})();
