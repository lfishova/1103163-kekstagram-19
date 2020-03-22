'use strict';

(function () {
  var Url = {
    POST: 'https://js.dump.academy/kekstagram',
    GET: 'https://js.dump.academy/kekstagram/data'
  };
  var loadPictures = [];
  var onSuccess = function (data) {
    data.forEach(function (it) {
      loadPictures.push(it);
    });
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
    xhr.open('GET', Url.GET);
    xhr.send();
  };
  var upload = function (data, onSuccessUpload, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccessUpload(xhr.response);
      }
    });
    xhr.addEventListener('error', function () {
      onError(xhr.status);
    });
    xhr.open('POST', Url.POST);
    xhr.send(data);
  };
  load();
  window.backend = {
    loadPictures: loadPictures,
    upload: upload
  };
})();
