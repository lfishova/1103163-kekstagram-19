'use strict';

(function () {
  var dragMouse = function () {
    window.varData.effectPin.addEventListener('mousedown', function (evt) {
      evt.preventDefault();
      var startCoords = {
        x: evt.clientX
      };
      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();
        var shift = {
          x: startCoords.x - moveEvt.clientX
        };
        startCoords = {
          x: moveEvt.clientX
        };
        if (window.varData.effectPin.offsetLeft - shift.x >= window.constData.EFFECT_LINE.MIN_LENGTH && window.varData.effectPin.offsetLeft - shift.x <= window.constData.EFFECT_LINE.MAX_LENGTH) {
          window.varData.effectPin.style.left = (window.varData.effectPin.offsetLeft - shift.x) + 'px';
          window.varData.effectDepth.style.width = (window.varData.effectDepth.offsetWidth - shift.x) + 'px';
          window.varData.effectDepth.style.fill = window.constData.EFFECT_LINE.COLOR;
          window.form.checkEffect(window.varData.imgPreview.className, (window.varData.effectDepth.offsetWidth - shift.x) * window.constData.PERCENT / window.constData.EFFECT_LINE.MAX_LENGTH);
        }
      };
      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();
        window.varData.effectLevel.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
      };
      window.varData.effectLevel.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    });
  };
  window.slider = {
    dragMouse: dragMouse
  };
})();
