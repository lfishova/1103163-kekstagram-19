'use strict';

(function () {
  const START_SCALE = 100;
  const ESC_KEY = 'Escape';
  var pictureCancel = document.querySelector('#picture-cancel');
  var uploadFile = document.querySelector('#upload-file');
  var uploadCancel = document.querySelector('#upload-cancel');
  var imgPreview = document.querySelector('.img-upload__preview').querySelector('img');
  var closeBigPicture = function () {
    pictureCancel.addEventListener('click', function () {
      window.picture.bigPicture.classList.add('hidden');
    });
    document.addEventListener('keydown', function (evt) {
      onModalEscPress(evt, window.picture.bigPicture);
    });
  };
  var onModalEscPress = function (evt, element) {
    if (evt.target.className === 'text__hashtags' || evt.target.className === 'text__description') {
      evt.stopPropagation();
    } else if (evt.key === ESC_KEY) {
      closeModal();
      window.form.clearValue(element);
      window.form.removeAllFilter();
      window.form.startFilter();
      imgPreview.style.filter = 'none';
    }
  };
  var closeModal = function () {
    document.querySelector('.img-upload__overlay').classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
    window.picture.bigPicture.classList.add('hidden');
    document.removeEventListener('keydown', function (evt) {
      onModalEscPress(evt, uploadFile);
      onModalEscPress(evt, window.picture.bigPicture);
      window.form.removeAllFilter();
      window.form.startFilter();
      imgPreview.style.filter = 'none';
    });
  };
  var onEditFormChange = function () {
    uploadFile.addEventListener('change', function () {
      document.querySelector('.img-upload__overlay').classList.remove('hidden');
      window.form.setScaleValue(START_SCALE);
      window.slider.dragMouse();
    });
    document.addEventListener('keydown', function (evt) {
      onModalEscPress(evt, uploadFile);
    });
  };
  var onEditFormClick = function () {
    uploadCancel.addEventListener('click', function () {
      closeModal();
      window.form.removeAllFilter();
      window.form.startFilter();
      imgPreview.style.filter = 'none';
    });
  };
  closeBigPicture();
  onEditFormChange();
  onEditFormClick();
})();
