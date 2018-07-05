// Файл wizard.js
'use strict'

var fireBall = document.querySelector(`.setup-fireball-wrap`)
var fireballColorInp = document.querySelector(`.fireball-color-inp`)
var eyesColorInp = document.querySelector(`.eyes-color-inp`)
var wizardEyes = document.querySelector(`.setup-wizard .wizard-eyes`)
var wizardCoat = document.querySelector('.wizard-coat')
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content
var similar = document.querySelector('.setup-similar')
var similarList = document.querySelector('.setup-similar-list')

var wizardsData = []
var coatColor
var eyesColor
var fireballColor

(function () {
  var getRank = function (wizard) {
    var rank = 0

    if (wizard.colorCoat === coatColor) {
      rank += 2
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1
    }

    return rank
  }

  var namesComparator = function (left, right) {
    if (left > right) {
      return 1
    } else if (left < right) {
      return -1
    } else {
      return 0
    }
  }

  var updateWizards = function () {
    renderWizards(wizardsData.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left)
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name)
      }
      return rankDiff
    }))
  }

  window.wizard.onEyesChange = function (color) {
    eyesColor = color
    eyesColorInp.value = color
    wizardEyes.style.fill = color
    window.debounce(updateWizards)
  }

  window.wizard.onCoatChange = function (color) {
    coatColor = color
    wizardCoat.style.fill = color
    window.debounce(updateWizards)
  }

  window.wizard.onFireBallChange = function (color) {
    fireballColor = color
    fireballColorInp.value = color
    fireBall.style.backgroundColor = color
    window.debounce(updateWizards)
  }

  // Функция отрисовки похожих волшебников
  var recievedHandler = function (wizards) {
    wizardsData = wizards
    renderWizards(wizards)
  }

  // Функция вывода ошибки получения данных о волшебниках
  var errorHandler = function (errorMessage) {
    var node = document.createElement('div')
    node.style = 'z-index: 100; width: 100%; text-align: center; background-color: red; padding: 15px 0;'
    node.style.position = 'absolute'
    node.style.top = 0
    node.style.left = 0
    node.style.right = 0
    node.style.fontSize = '25px'

    node.textContent = errorMessage
    document.body.insertAdjacentElement('afterbegin', node)
  }

  // Функция отрисовки одного волшебника
  var createNodeWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true)

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes

    return wizardElement
  }

  var renderWizards = function (wizards) {
    var takeNumber = wizards.length > 4 ? 4 : wizards.length
    similarList.innerHTML = ''
    for (var i = 0; i < takeNumber; i++) {
      similarList.appendChild(createNodeWizard(wizards[i]))
    }

    similar.classList.remove('hidden')
  }

  // Подгружаем данные о волшебниках с сервера
  window.backend.load(recievedHandler, errorHandler)
})()
