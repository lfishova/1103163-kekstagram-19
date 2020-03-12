'use strict';

(function () {
  var blockPictures = document.querySelector('.pictures');
  // const URL = 'https://js.dump.academy/kekstagram/data';
  // var loadPictures = [];
  // var xhr = new XMLHttpRequest();
  // xhr.responseType = 'json';
  // xhr.addEventListener('load', function () {
  //   if (xhr.status === 200) {
  //     loadPictures = xhr.response;
  //   }
  // });
  // // xhr.timeout = 1000; // 10s
  // xhr.open('GET', URL);
  // xhr.send();
  var renderPictures = function (pictures) {
    // var pictures = window.data.getPictures(countPictures);
    // pictures = window.load.loadPictures;
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pictures.length; i++) {
      fragment.appendChild(window.data.getPicture(pictures[i]));
    }
    blockPictures.appendChild(fragment);
  };
  renderPictures(window.loadData.load());
})();
