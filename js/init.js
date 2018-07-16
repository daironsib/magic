// Файл init.js
'use strict';

window.init = (function () {
  window.wizardsData = []

  // Функция отрисовки похожих волшебников
  var recievedHandler = function (wizards) {
    window.wizardsData = wizards
    window.wizard.renderWizards(wizards)
  }

  // Подгружаем данные о волшебниках с сервера
  window.backend.load(recievedHandler, window.util.errorHandler)
})()
