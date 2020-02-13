'use strict';

const COUNT_PICTURES = 25;
var ESC_KEY = 'Escape';
const LIKES = {
  MIN: 15,
  MAX: 200
};
const COMMENT = {
  MIN: 25,
  MAX: 125
};
var comments = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var names = ['Артем', 'Лена', 'Игорь', 'Саша', 'Сергей', 'Кекс'];
var blockPictures = document.querySelector('.pictures');
var bigPicture = document.querySelector('.big-picture');
var imgBigPicture = bigPicture.querySelector('.big-picture__img');
var blockComments = bigPicture.querySelector('.social__comments');
var uploadFile = document.querySelector('#upload-file');
var uploadCancel = document.querySelector('#upload-cancel');
var scale = document.querySelector('.scale');
var effect = document.querySelector('.effects');
var imgPreview = document.querySelector('.img-upload__preview').querySelector('img');

var getCommentaries = function () {
  var randomComments = getRandomInt(COMMENT.MIN, COMMENT.MAX);
  var commentaries = [];
  for (var i = 0; i < randomComments; i++) {
    var index = getRandomInt(0, names.length);
    var comment = getCommentTemplate(index);
    comment.name = names[index];
    comment.message = getCommentPicture(getRandomIndexes(comments.length));
    commentaries[i] = comment;
  }
  return commentaries;
};
var getCommentTemplate = function (index) {
  index++;
  var comment = {
    'avatar': 'img/avatar-' + index + '.svg',
    'message': 'messages',
    'name': 'name'
  };
  return comment;
};
var getCommentPicture = function (indexes) {
  var comment = indexes.length > 1 ? comments[indexes[0]] + ' ' + comments[indexes[1]] : comments[indexes[0]];
  return comment;
};
var getPictures = function (countPictures) {
  var pictures = [];
  for (var i = 0; i < countPictures; i++) {
    var index = i + 1;
    var picture = getPictureTemplate(index);
    pictures[i] = picture;
  }
  return pictures;
};
var getPictureTemplate = function (index) {
  var picture = {
    'url': 'photos/' + index + '.jpg',
    'description': 'description picture',
    'likes': getRandomInt(LIKES.MIN, LIKES.MAX),
    'comments': getCommentaries()
  };
  return picture;
};
var getRandomIndexes = function (length) {
  var indexes = [];
  indexes[0] = getRandomInt(0, length);
  if (getRandomInt(0, 2)) {
    do {
      indexes[1] = getRandomInt(0, length);
    } while (indexes[1] === indexes[0]);
  }
  return indexes;
};
var getRandomInt = function (minInt, maxInt) {
  var value = Math.floor(Math.random() * (maxInt - minInt)) + minInt;
  return value;
};
var getPicture = function (picture) {
  var pictureElement = document.querySelector('#picture').content.querySelector('.picture').cloneNode(true);
  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length.toString();
  return pictureElement;
};
var renderPictures = function (countPictures) {
  var pictures = getPictures(countPictures);
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < pictures.length; i++) {
    fragment.appendChild(getPicture(pictures[i]));
  }
  blockPictures.appendChild(fragment);
};
var renderOnePicture = function (picture) {
  imgBigPicture.querySelector('img').src = picture.url;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.comments-count').textContent = picture.comments.length.toString();
  bigPicture.querySelector('.social__caption').textContent = picture.description;
  renderCommentsOnePicture(picture.comments);
};
var renderCommentsOnePicture = function (arr) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(getCommentElement(arr[i]));
  }
  blockComments.appendChild(fragment);
};
// var showBigPicture = function () {
//   bigPicture.classList.remove('hidden');
// };
var getCommentElement = function (comment) {
  var fragment = document.createElement('li');
  fragment.className = 'social__comment';
  fragment.appendChild(fillAttributeImage(comment));
  fragment.appendChild(fillAttributeParagraph(comment));
  return fragment;
};
var fillAttributeImage = function (comment) {
  var imageElement = document.createElement('img');
  imageElement.className = 'social__picture';
  imageElement.src = comment.avatar;
  imageElement.alt = comment.name;
  imageElement.width = '35';
  imageElement.height = '35';
  return imageElement;
};
var fillAttributeParagraph = function (comment) {
  var paragraphElement = document.createElement('p');
  paragraphElement.className = 'social__text';
  paragraphElement.textContent = comment.message;
  return paragraphElement;
};
var addClass = function () {
  document.querySelector('.social__comment-count').classList.add('hidden');
  document.querySelector('.comments-loader').classList.add('hidden');
  document.querySelector('body').classList.add('modal-open');
};
var showEditForm = function () {
  uploadFile.addEventListener('change', function () {
    document.querySelector('.img-upload__overlay').classList.remove('hidden');
  });
  document.addEventListener('keydown', function (evt) {
    onModalEscPress(evt, uploadFile);
  });
};
var closeEditForm = function () {
  uploadCancel.addEventListener('click', function () {
    closeModal();
  });
};
var closeModal = function () {
  document.querySelector('.img-upload__overlay').classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', function (evt) {
    onModalEscPress(evt, uploadFile);
  });
};
var onModalEscPress = function (evt, element) {
  if (evt.key === ESC_KEY) {
    closeModal();
    clearValue(element);
  }
};
var clearValue = function (element) {
  element.value = '';
};
var setScaleValue = function (setValue) {
  scale.querySelector('.scale__control--value').value = setValue + '%';
  document.querySelector('.img-upload__preview').querySelector('img').style.transform = 'scale(' + setValue * 0.01 + ')';
};
var getScaleValue = function () {
  return scale.querySelector('.scale__control--value').value;
};
var onScaleControlSmallerClick = function () {
  var smallNumber = parseInt(getScaleValue().replace('%', ''), 10);
  scale.querySelector('.scale__control--bigger').disabled = false;
  smallNumber -= 25;
  if (smallNumber === 0) {
    scale.querySelector('.scale__control--smaller').disabled = true;
  } else {
    setScaleValue(smallNumber);
  }
};
var onScaleControlBiggerClick = function () {
  var bigNumber = parseInt(getScaleValue().replace('%', ''), 10);
  scale.querySelector('.scale__control--smaller').disabled = false;
  bigNumber += 25;
  if (bigNumber === 125) {
    scale.querySelector('.scale__control--bigger').disabled = true;
  } else {
    setScaleValue(bigNumber);
  }
};
var stepScaleDown = function () {
  scale.querySelector('.scale__control--smaller').addEventListener('click', function () {
    onScaleControlSmallerClick();
  });
};
var stepScaleUp = function () {
  scale.querySelector('.scale__control--bigger').addEventListener('click', function () {
    onScaleControlBiggerClick();
  });
};
var onFilterChange = function (evt) {
  imgPreview.classList.remove(imgPreview.classList.value);
  if (evt.target && evt.target.matches('input[type="radio"]')) {
    imgPreview.classList.add('effects__preview--' + evt.target.value);
  }
};
var checkFilter = function () {
  effect.addEventListener('change', function (evt) {
    onFilterChange(evt);
  });
};
var startFilter = function () {
  imgPreview.classList.add('.effects__preview--none');
};


setScaleValue(100);
renderPictures(COUNT_PICTURES);
renderOnePicture(getPictures(COUNT_PICTURES)[0]);
// showBigPicture();
stepScaleUp();
stepScaleDown();
showEditForm();
closeEditForm();
addClass();
checkFilter();
startFilter();
