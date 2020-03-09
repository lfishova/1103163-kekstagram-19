'use strict';

// const COUNT_PICTURES = 25;
// const STEP = 25;
// const START_SCALE = 100;
// const ESC_KEY = 'Escape';
// const REGULAR = /^#[a-zA-Z0-9]+$/;
// const SCALE = {
//   MAX_SCALE: 100,
//   MIN_SCALE: 25
// };
// const LIKES = {
//   MIN: 15,
//   MAX: 200
// };
// const COMMENT = {
//   MIN: 25,
//   MAX: 125
// };
// const HASHTAG = {
//   MAX_LENGTH: 20,
//   MAX_COUNT: 5
// };
// const MESSAGE = {
//   NONE: -1,
//   BEGIN_HASHTAG: 0,
//   TOO_MORE_COUNT: 1,
//   MAX_TAG_LETTER_COUNT: 2,
//   ONLY_HASGTAG: 3,
//   DOUBLE_HASHTAG: 4
// };
// const EFFECT_LIMIT = {
//   MIN: 1,
//   MAX: 3,
//   PERCENT: 100
// };
// const EFFECT_LINE = {
//   MIN_LENGTH: 0,
//   MAX_LENGTH: 453,
//   COLOR: '#ffe753'
// };
// const PERCENT = 100;
// var hashtagMessages = ['Хештег начинается с символа #', 'Количество тегов не должно превышать 5', 'максимальная длина одного хэш-тега 20 символов, включая решётку', 'хеш-тег не может состоять только из одной решётки', 'один и тот же хэш-тег не может быть использован дважды', 'строка после решётки должна состоять из букв и чисел'];
// var comments = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
// var names = ['Артем', 'Лена', 'Игорь', 'Саша', 'Сергей', 'Кекс'];
// var blockPictures = document.querySelector('.pictures');
// var bigPicture = document.querySelector('.big-picture');
// var imgBigPicture = bigPicture.querySelector('.big-picture__img');
// var blockComments = bigPicture.querySelector('.social__comments');
// var uploadFile = document.querySelector('#upload-file');
// var uploadCancel = document.querySelector('#upload-cancel');
// var scale = document.querySelector('.scale');
// var effect = document.querySelector('.effects');
// var imgPreview = document.querySelector('.img-upload__preview').querySelector('img');
// var pictureCancel = document.querySelector('#picture-cancel');
// var textHashtags = document.querySelector('.text__hashtags');
// var effectLine = document.querySelector('.effect-level__line');
// var effectPin = document.querySelector('.effect-level__pin');
// var effectDepth = document.querySelector('.effect-level__depth');
// var domPictures = document.querySelectorAll('.picture');

// var getCommentaries = function () {
//   var randomComments = getRandomInt(COMMENT.MIN, COMMENT.MAX);
//   var commentaries = [];
//   for (var i = 0; i < randomComments; i++) {
//     var index = getRandomInt(0, names.length);
//     var comment = getCommentTemplate(index);
//     comment.name = names[index];
//     comment.message = getCommentPicture(getRandomIndexes(comments.length));
//     commentaries[i] = comment;
//   }
//   return commentaries;
// };
// var getCommentTemplate = function (index) {
//   index++;
//   var comment = {
//     'avatar': 'img/avatar-' + index + '.svg',
//     'message': 'messages',
//     'name': 'name'
//   };
//   return comment;
// };
// var getCommentPicture = function (indexes) {
//   var comment = indexes.length > 1 ? comments[indexes[0]] + ' ' + comments[indexes[1]] : comments[indexes[0]];
//   return comment;
// };
// var getPictures = function (countPictures) {
//   var pictures = [];
//   for (var i = 0; i < countPictures; i++) {
//     var index = i + 1;
//     var picture = getPictureTemplate(index);
//     pictures[i] = picture;
//   }
//   return pictures;
// };
// var getPictureTemplate = function (index) {
//   var picture = {
//     'url': 'photos/' + index + '.jpg',
//     'description': 'description picture',
//     'likes': getRandomInt(LIKES.MIN, LIKES.MAX),
//     'comments': getCommentaries()
//   };
//   return picture;
// };
// var getRandomIndexes = function (length) {
//   var indexes = [];
//   indexes[0] = getRandomInt(0, length);
//   if (getRandomInt(0, 2)) {
//     do {
//       indexes[1] = getRandomInt(0, length);
//     } while (indexes[1] === indexes[0]);
//   }
//   return indexes;
// };
// var getRandomInt = function (minInt, maxInt) {
//   var value = Math.floor(Math.random() * (maxInt - minInt)) + minInt;
//   return value;
// };
// var getPicture = function (picture) {
//   var pictureElement = document.querySelector('#picture').content.querySelector('.picture').cloneNode(true);
//   pictureElement.querySelector('.picture__img').src = picture.url;
//   pictureElement.querySelector('.picture__likes').textContent = picture.likes;
//   pictureElement.querySelector('.picture__comments').textContent = picture.comments.length.toString();
//   return pictureElement;
// };
// var renderPictures = function (countPictures) {
//   var pictures = getPictures(countPictures);
//   var fragment = document.createDocumentFragment();
//   for (var i = 0; i < pictures.length; i++) {
//     fragment.appendChild(getPicture(pictures[i]));
//   }
//   blockPictures.appendChild(fragment);
// };
// var renderOnePicture = function (picture) {
//   imgBigPicture.querySelector('img').src = picture.url;
//   bigPicture.querySelector('.likes-count').textContent = picture.likes;
//   bigPicture.querySelector('.comments-count').textContent = picture.comments.length.toString();
//   bigPicture.querySelector('.social__caption').textContent = picture.description;
//   renderCommentsOnePicture(picture.comments);
// };
// var renderCommentsOnePicture = function (arr) {
//   var fragment = document.createDocumentFragment();
//   for (var i = 0; i < arr.length; i++) {
//     fragment.appendChild(getCommentElement(arr[i]));
//   }
//   blockComments.appendChild(fragment);
// };
// var showBigPicture = function () {
//   window.picture.bigPicture.classList.remove('hidden');
// };
// var closeBigPicture = function () {
//   pictureCancel.addEventListener('click', function () {
//     window.picture.bigPicture.classList.add('hidden');
//   });
//   document.addEventListener('keydown', function (evt) {
//     onModalEscPress(evt, window.picture.bigPicture);
//   });
// };
// var getCommentElement = function (comment) {
//   var fragment = document.createElement('li');
//   fragment.className = 'social__comment';
//   fragment.appendChild(fillAttributeImage(comment));
//   fragment.appendChild(fillAttributeParagraph(comment));
//   return fragment;
// };
// var fillAttributeImage = function (comment) {
//   var imageElement = document.createElement('img');
//   imageElement.className = 'social__picture';
//   imageElement.src = comment.avatar;
//   imageElement.alt = comment.name;
//   imageElement.width = '35';
//   imageElement.height = '35';
//   return imageElement;
// };
// var fillAttributeParagraph = function (comment) {
//   var paragraphElement = document.createElement('p');
//   paragraphElement.className = 'social__text';
//   paragraphElement.textContent = comment.message;
//   return paragraphElement;
// };
// var addClass = function () {
//   document.querySelector('.social__comment-count').classList.add('hidden');
//   document.querySelector('.comments-loader').classList.add('hidden');
//   document.querySelector('body').classList.add('modal-open');
// };
// var onEditFormChange = function () {
//   uploadFile.addEventListener('change', function () {
//     document.querySelector('.img-upload__overlay').classList.remove('hidden');
//     window.form.setScaleValue(START_SCALE);
//     window.form.dragMouse();
//   });
//   document.addEventListener('keydown', function (evt) {
//     onModalEscPress(evt, uploadFile);
//   });
// };
// var onEditFormClick = function () {
//   uploadCancel.addEventListener('click', function () {
//     closeModal();
//     window.form.removeAllFilter();
//     window.form.startFilter();
//     imgPreview.style.filter = 'none';
//   });
// };
// var closeModal = function () {
//   document.querySelector('.img-upload__overlay').classList.add('hidden');
//   document.querySelector('body').classList.remove('modal-open');
//   window.picture.bigPicture.classList.add('hidden');
//   document.removeEventListener('keydown', function (evt) {
//     onModalEscPress(evt, uploadFile);
//     onModalEscPress(evt, window.picture.bigPicture);
//     window.form.removeAllFilter();
//     window.form.startFilter();
//     imgPreview.style.filter = 'none';
//   });
// };
// var onModalEscPress = function (evt, element) {
//   if (evt.target.className === 'text__hashtags' || evt.target.className === 'text__description') {
//     evt.stopPropagation();
//   } else if (evt.key === ESC_KEY) {
//     closeModal();
//     window.form.clearValue(element);
//     window.form.removeAllFilter();
//     window.form.startFilter();
//     imgPreview.style.filter = 'none';
//   }
// };
// var clearValue = function (element) {
//   element.value = '';
// };
// var setScaleValue = function (setValue) {
//   scale.querySelector('.scale__control--value').value = setValue + '%';
//   document.querySelector('.img-upload__preview').querySelector('img').style.transform = 'scale(' + setValue * 0.01 + ')';
// };
// var getScaleValue = function () {
//   return scale.querySelector('.scale__control--value').value;
// };
// var onScaleControlSmallerClick = function () {
//   var smallNumber = parseInt(getScaleValue().replace('%', ''), 10);
//   scale.querySelector('.scale__control--bigger').disabled = false;
//   smallNumber -= STEP;
//   if (smallNumber < SCALE.MIN_SCALE) {
//     scale.querySelector('.scale__control--smaller').disabled = true;
//   } else {
//     setScaleValue(smallNumber);
//   }
// };
// var onScaleControlBiggerClick = function () {
//   var bigNumber = parseInt(getScaleValue().replace('%', ''), 10);
//   scale.querySelector('.scale__control--smaller').disabled = false;
//   bigNumber += STEP;
//   if (bigNumber > SCALE.MAX_SCALE) {
//     scale.querySelector('.scale__control--bigger').disabled = true;
//   } else {
//     setScaleValue(bigNumber);
//   }
// };
// var stepScaleDown = function () {
//   scale.querySelector('.scale__control--smaller').addEventListener('click', function () {
//     onScaleControlSmallerClick();
//   });
// };
// var stepScaleUp = function () {
//   scale.querySelector('.scale__control--bigger').addEventListener('click', function () {
//     onScaleControlBiggerClick();
//   });
// };
// var onFilterChange = function (evt) {
//   imgPreview.classList.remove(imgPreview.classList.value);
//   imgPreview.style.filter = 'none';
//   if (evt.target && evt.target.matches('input[type="radio"]')) {
//     var filter = 'effects__preview--' + evt.target.value;
//     imgPreview.classList.add(filter);
//     if (evt.target.value !== 'none') {
//       document.querySelector('.effect-level').classList.remove('hidden');
//       var value = 100;
//       window.form.checkEffect(filter, value);
//       effectPin.style.left = EFFECT_LINE.MAX_LENGTH + 'px';
//       effectDepth.style.width = effectLine.clientWidth + 'px';
//       effectDepth.style.fill = EFFECT_LINE.COLOR;
//     } else {
//       document.querySelector('.effect-level').classList.add('hidden');
//     }
//   }
// };
// var checkFilter = function () {
//   effect.addEventListener('change', function (evt) {
//     onFilterChange(evt);
//   });
// };
// var startFilter = function () {
//   imgPreview.classList.add('.effects__preview--none');
//   document.querySelector('.effect-level').classList.add('hidden');
// };
// var removeAllFilter = function () {
//   imgPreview.classList.remove(imgPreview.classList.value);
// };
// var checkForm = function () {
//   document.querySelector('#upload-submit').addEventListener('click', function () {
//     var hashtags = textHashtags.value.trim().split(/[' ']+/);
//     hashtags = getLowerLetter(hashtags);
//     textHashtags.value = hashtags.join(' ');
//     var num = checkOneHaskTag(hashtags);
//     if ((hashtags[0] !== '') && (num !== MESSAGE.NONE)) {
//       textHashtags.setCustomValidity(hashtagMessages[num]);
//     } else {
//       textHashtags.setCustomValidity('');
//     }
//   });
// };
// var checkCountHashtags = function (arr) {
//   return arr.length > HASHTAG.MAX_COUNT ? MESSAGE.TOO_MORE_COUNT : MESSAGE.NONE;
// };
// var checkOneHaskTag = function (arr) {
//   var num = checkCountHashtags(arr);
//   if (num === MESSAGE.NONE) {
//     for (var i = 0; i < arr.length; i++) {
//       var str = arr[i];
//       if (str[0] !== '#') {
//         num = MESSAGE.BEGIN_HASHTAG;
//         break;
//       } else if (str.length > HASHTAG.MAX_LENGTH) {
//         num = MESSAGE.MAX_TAG_LETTER_COUNT;
//         break;
//       } else if (str === '#') {
//         num = MESSAGE.ONLY_HASGTAG;
//         break;
//       } else if (!REGULAR.test(str)) {
//         num = 5;
//         break;
//       } else {
//         num = uniqueElement(arr);
//       }
//
//     }
//   }
//   return num;
// };
// var uniqueElement = function (arr) {
//   var uniques = [];
//   for (var i = 0; i < arr.length; i++) {
//     if (!uniques.includes(arr[i])) {
//       uniques.push(arr[i]);
//     }
//   }
//   return uniques.length === arr.length ? MESSAGE.NONE : MESSAGE.DOUBLE_HASHTAG;
// };
// var getLowerLetter = function (arr) {
//   var result = [];
//   for (var i = 0; i < arr.length; i++) {
//     result.push(arr[i].toLowerCase());
//   }
//   return result;
// };
// var checkEffect = function (effectFilter, value) {
//   document.querySelector('.effect-level__value').value = Math.floor(value);
//   if (effectFilter === 'effects__preview--chrome') {
//     imgPreview.style.filter = 'grayscale(' + value + '%)';
//   } else if (effectFilter === 'effects__preview--marvin') {
//     imgPreview.style.filter = 'invert(' + value + '%)';
//   } else if (effectFilter === 'effects__preview--phobos') {
//     imgPreview.style.filter = 'blur(' + (EFFECT_LIMIT.MIN + value * (EFFECT_LIMIT.MAX - EFFECT_LIMIT.MIN) / EFFECT_LIMIT.PERCENT) + 'px)';
//   } else if (effectFilter === 'effects__preview--heat') {
//     imgPreview.style.filter = 'brightness(' + (EFFECT_LIMIT.MIN + value * (EFFECT_LIMIT.MAX - EFFECT_LIMIT.MIN) / EFFECT_LIMIT.PERCENT) + ')';
//   } else if (effectFilter === 'effects__preview--sepia') {
//     imgPreview.style.filter = 'sepia(' + value + '%)';
//   }
// };
// var dragMouse = function () {
//   effectPin.addEventListener('mousedown', function (evt) {
//     evt.preventDefault();
//     var startCoords = {
//       x: evt.clientX
//     };
//     var onMouseMove = function (moveEvt) {
//       moveEvt.preventDefault();
//       var shift = {
//         x: startCoords.x - moveEvt.clientX
//       };
//       startCoords = {
//         x: moveEvt.clientX
//       };
//       if (effectPin.offsetLeft - shift.x >= EFFECT_LINE.MIN_LENGTH && effectPin.offsetLeft - shift.x <= EFFECT_LINE.MAX_LENGTH) {
//         effectPin.style.left = (effectPin.offsetLeft - shift.x) + 'px';
//         effectDepth.style.width = (effectDepth.offsetWidth - shift.x) + 'px';
//         effectDepth.style.fill = EFFECT_LINE.COLOR;
//         checkEffect(imgPreview.className, (effectDepth.offsetWidth - shift.x) * PERCENT / EFFECT_LINE.MAX_LENGTH);
//       }
//     };
//     var onMouseUp = function (upEvt) {
//       upEvt.preventDefault();
//       document.removeEventListener('mousemove', onMouseMove);
//       window.removeEventListener('mouseup', onMouseUp);
//     };
//     document.addEventListener('mousemove', onMouseMove);
//     window.addEventListener('mouseup', onMouseUp);
//   });
// };
// var onRandomPictureClick = function (evt) {
//   if (evt.target && evt.target.matches('img.picture__img')) {
//     var indexRandomPicture = getIndexRandomPicture(evt.target.attributes['src'].value);
//     var picture = window.data.getPictureTemplate(indexRandomPicture);
//     window.picture.renderOnePicture(picture);
//     showBigPicture();
//   }
// };
// var onRandomPictureEnterPress = function (evt) {
//   if (evt.target && evt.target.matches('a.picture')) {
//     window.picture.renderOnePicture(window.data.getPictureTemplate(getIndexRandomPicture(evt.target.firstElementChild.attributes['src'].value)));
//     showBigPicture();
//   }
// };
// var getIndexRandomPicture = function (str) {
//   return parseInt(str.match(/[0-9]+/), 10);
// };
// var openRandomPicture = function () {
//   document.addEventListener('click', function (evt) {
//     onRandomPictureClick(evt);
//   });
//   document.addEventListener('keydown', function (evt) {
//     var evtCheck = evt;
//     if (evtCheck.key === 'Enter') {
//       onRandomPictureEnterPress(evtCheck);
//     }
//   });
// };
// var addTabIndexPictures = function (pictures) {
//   for (var i = 0; i < pictures.length; i++) {
//     pictures[i].tabIndex = 0;
//   }
// };

// closeBigPicture();
// addTabIndexPictures(domPictures);
// openRandomPicture();
// checkForm();
// renderPictures(COUNT_PICTURES);
// renderOnePicture(window.data.getPictures(window.data.COUNT_PICTURES)[0]);
// showBigPicture();
// stepScaleUp();
// stepScaleDown();
// onEditFormChange();
// onEditFormClick();
// addClass();
// checkFilter();
// startFilter();
