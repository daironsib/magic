// Файл render.js

'use strict';

var similarWizardTemplate = document.querySelector('#similar-wizard-template').content
var similar = document.querySelector('.setup-similar')
var similarList = document.querySelector('.setup-similar-list');

(function () {
  // Функция отрисовки одного волшебника
  window.renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true)

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes

    return wizardElement
  }

  window.render = function (wizards) {
    var takeNumber = wizards.length > 4 ? 4 : wizards.length
    similarList.innerHTML = ''
    for (var i = 0; i < takeNumber; i++) {
      similarList.appendChild(window.renderWizard(wizards[i]))
    }

    similar.classList.remove('hidden')
  }
})()
