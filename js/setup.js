var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон']
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелл', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг']
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)']
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green']
var FIREBALL_COLORS = [`#ee4830`, `#30a8ee`, `#5ce6c0`, `#e848d5`, `#e6e848`]
var wizards = []

var similarListElement = document.querySelector('.setup-similar-list')
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content

var setupOpen = document.querySelector(`.setup-open`)
var setupClose = document.querySelector(`.setup-close`)
var wizardEyes = document.querySelector(`.setup-wizard .wizard-eyes`)
var fireBall = document.querySelector(`.setup-fireball-wrap`)
var fireballColorInp = document.querySelector(`.fireball-color-inp`)
var eyesColorInp = document.querySelector(`.eyes-color-inp`)

function getRandomItem(myArray) {
  return myArray[Math.floor(Math.random() * (myArray.length))]
}

function generateWizards() {
  var newWizards = []

  for (var i = 0; i < 4; i++) {
    newWizards.push(
      {
        name: getRandomItem(WIZARD_NAMES) + ' ' + getRandomItem(WIZARD_SURNAMES),
        coatColor: getRandomItem(COAT_COLORS),
        eyesColor: getRandomItem(EYES_COLORS),
      }
    )
  }

  return newWizards
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

//ФУНКЦИИ ДЛЯ РАБОТЫ С ОКНОМ SETUP

//Функция закрытия окна по нажатию ESC
function onPopupEscPress(evt) {
  if(evt.keyCode === 27) {
    closeSetupWindow()
  }
}

//Функция открытия окна
function openSetupWindow() {
  document.querySelector(`.setup`).classList.remove(`hidden`)

  document.addEventListener(`keydown`, onPopupEscPress)
}

//Функция закрытия окна
function closeSetupWindow() {
  document.querySelector(`.setup`).classList.add(`hidden`)
  document.removeEventListener(`keydown`, onPopupEscPress)
}


wizards = generateWizards()
renderWizards()


//РАБОТА С ОКНОМ SETUP

//Открыть, закрыть попап
setupOpen.addEventListener(`click`, openSetupWindow)
setupClose.addEventListener(`click`, closeSetupWindow)

//Обрабатываем нажание Enter по аватарке
setupOpen.addEventListener(`keydown`, function(evt){
  if(evt.keyCode === 13) { openSetupWindow() }
})

//Обрабатываем нажание Enter по крестику
setupClose.addEventListener(`keydown`, function(evt){
  if(evt.keyCode === 13) { closeSetupWindow() }
})

//Обрабатываем клик по глазам
wizardEyes.addEventListener(`click`, function(){
  var newColor = getRandomItem(EYES_COLORS)
  eyesColorInp.value = newColor
  wizardEyes.style.fill = newColor
})

//Обрабатываем клик по файерболу
fireBall.addEventListener(`click`, function(){
  var newColor = getRandomItem(FIREBALL_COLORS)
  fireballColorInp.value = newColor
  fireBall.style.backgroundColor = newColor
})
