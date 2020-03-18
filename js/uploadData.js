'use strict';

(function () {
  const URL = 'https://js.dump.academy/kekstagram';
  var upload = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      }
    });
    xhr.addEventListener('error', function () {
      onError(xhr.status);
    });
    xhr.open('POST', URL);
    xhr.send(data);
  };
  window.uploadData = {
    upload: upload
  };
})();
