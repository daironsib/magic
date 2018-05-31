var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон']
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелл', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг']
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)']
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green']
var wizards = []

var similarListElement = document.querySelector('.setup-similar-list')
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content

//Функция генерации случайного числа в диапазоне

function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateWizards() {
  for (var i = 0; i < 4; i++) {
    wizards.push(
      {
        name: WIZARD_NAMES[getRandomInRange(0, WIZARD_NAMES.length - 1)] + ' ' + WIZARD_SURNAMES[getRandomInRange(0, WIZARD_SURNAMES.length - 1)],
        coatColor: COAT_COLORS[getRandomInRange(0, COAT_COLORS.length - 1)],
        eyesColor: EYES_COLORS[getRandomInRange(0, EYES_COLORS.length - 1)],
      }
    )
  }
}

function renderWizards() {
  for (var i = 0; i < wizards.length; i++) {
    var wizardElement = similarWizardTemplate.cloneNode(true)

    wizardElement.querySelector('.setup-similar-label').textContent = wizards[i].name
    wizardElement.querySelector('.wizard-coat').style.fill = wizards[i].coatColor
    wizardElement.querySelector('.wizard-eyes').style.fill = wizards[i].eyesColor

    similarListElement.appendChild(wizardElement)
  }
}

generateWizards()
renderWizards()

//Показываем окно

document.querySelector('.setup').classList.remove('hidden')
document.querySelector('.setup-similar').classList.remove('hidden')
