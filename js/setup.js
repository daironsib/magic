(function () {
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
  var setup = document.querySelector(`.setup`)
  var setupArtifacts = document.querySelectorAll(`.setup-artifacts-shop .setup-artifacts-cell img`)
  var setupArtifactsCell = document.querySelectorAll(`.setup-artifacts .setup-artifacts-cell`)
  var form = document.querySelector('.setup-wizard-form')

  var dragEnterElem
  var star

  form.addEventListener('submit', function (e) {
    e.preventDefault()
    window.backend.save(new FormData(form), closeSetupWindow, errorHandler)
  })

  // Функция отрисовки похожих волшебников
  function recievedHandler(wizards) {
    // Перемешиваем волшебников
    wizards = window.util.shuffle(wizards)

    for (var i = 0; i < 4; i++) {
      var wizardElement = similarWizardTemplate.cloneNode(true)

      wizardElement.querySelector('.setup-similar-label').textContent = wizards[i].name
      wizardElement.querySelector('.wizard-coat').style.fill = wizards[i].colorCoat
      wizardElement.querySelector('.wizard-eyes').style.fill = wizards[i].colorEyes

      similarListElement.appendChild(wizardElement)
    }

    document.querySelector('.setup-similar').classList.remove('hidden')
  }

  // Функция вывода ошибки получения данных о волшебниках
  function errorHandler(errorMessage) {
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

  //ФУНКЦИИ ДЛЯ РАБОТЫ С ОКНОМ SETUP

  //Функция закрытия окна по нажатию ESC
  function onPopupEscPress(evt) {
    if(evt.keyCode === 27) {
      closeSetupWindow()
    }
  }

  //Функция открытия окна
  function openSetupWindow() {
    setup.classList.remove(`hidden`)
    setup.style = ``
    document.addEventListener(`keydown`, onPopupEscPress)
  }

  //Функция закрытия окна
  function closeSetupWindow() {
    setup.classList.add(`hidden`)
    document.removeEventListener(`keydown`, onPopupEscPress)
  }

  // Подгружаем данные о волшебниках с сервера
  window.backend.load(recievedHandler, errorHandler)

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

  //DRAG AND DROP

  setupArtifacts.forEach(function(artifact) {
    artifact.addEventListener('dragstart', handleDragStart, false)
    artifact.addEventListener('dragend', handleDragEnd, false)
  })

  setupArtifactsCell.forEach(function(artifactCell) {
    artifactCell.addEventListener('dragleave', handleDragLeave, false)
    artifactCell.addEventListener('dragover', handleDragOver, false)
    artifactCell.addEventListener('dragenter', handleDragEnter, false)
    artifactCell.addEventListener('drop', handleDrop, false)
  })

  function handleDragStart() {
    star = this
    // Подсвечиваем ячейки красной рамкой
    setupArtifactsCell.forEach(function(artifactCell) {
      artifactCell.style.outline = `2px dashed red`
    })
  }

  function handleDragEnd() {
    // Убираем подсветку ячейки красной рамкой
    setupArtifactsCell.forEach(function(artifactCell) {
      artifactCell.style.outline = `none`
    })
  }

  function handleDragEnter() {
    this.style.background = `rgba(245, 240, 10, .3)`
  }

  function handleDragLeave() {
    this.style.background = `rgba(0, 0, 0, .1)`
  }

  function handleDragOver(e) {
    e.preventDefault()
  }

  function handleDrop() {
    dragEnterElem = this
    dragEnterElem.style.background = `rgba(0, 0, 0, .1)`

    // Проверяем есть ли элемент в ячейке
    if (dragEnterElem.querySelectorAll(`img`).length === 0) {
      var newStar = star.cloneNode(true)
      newStar.addEventListener('dragstart', handleDragStart, false)
      newStar.addEventListener('dragend', handleDragEnd, false)
      dragEnterElem.appendChild(newStar)

      // Если перемещение внутри рюкзака удаляем звезду
      if (star.parentNode.parentNode.className !== `setup-artifacts-shop`) {
        star.parentNode.removeChild(star)
      }
    }
  }
})()
