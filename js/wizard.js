// Файл wizard.js
'use strict';

window.wizard = (function () {
  var fireBall = document.querySelector(`.setup-fireball-wrap`)
  var fireballColorInp = document.querySelector(`.fireball-color-inp`)
  var eyesColorInp = document.querySelector(`.eyes-color-inp`)
  var wizardEyes = document.querySelector(`.setup-wizard .wizard-eyes`)
  var wizardCoat = document.querySelector('.wizard-coat')
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content
  var similar = document.querySelector('.setup-similar')
  var similarList = document.querySelector('.setup-similar-list')

  var coatColor
  var eyesColor
  var fireballColor

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
    window.wizard.renderWizards(window.wizardsData.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left)
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name)
      }
      return rankDiff
    }))
  }

  // Функция отрисовки одного волшебника
  var createNodeWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true)

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes

    return wizardElement
  }

  return {
    renderWizards: function (wizards) {
      similarList.innerHTML = ''
      wizards.forEach(function(item, i){
        if (i < 4) {
          similarList.appendChild(createNodeWizard(item))
        }
      })

      similar.classList.remove('hidden')
    },
    onEyesChange: function (color) {
      eyesColor = color
      eyesColorInp.value = color
      wizardEyes.style.fill = color
      window.debounce(updateWizards)
    },
    onCoatChange: function (color) {
      coatColor = color
      wizardCoat.style.fill = color
      window.debounce(updateWizards)
    },
    onFireBallChange: function (color) {
      fireballColor = color
      fireballColorInp.value = color
      fireBall.style.backgroundColor = color
      window.debounce(updateWizards)
    }
  }
})()
