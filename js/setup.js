(function () {
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green']
  var FIREBALL_COLORS = [`#ee4830`, `#30a8ee`, `#5ce6c0`, `#e848d5`, `#e6e848`]
  var COAT_COLORS = ['rgb(146, 100, 161)', 'rgb(215, 210, 55)', 'rgb(241, 43, 107)', 'rgb(101, 137, 164)', 'rgb(0, 0, 0)', 'rgb(215, 210, 55)', 'rgb(56, 159, 117)', 'rgb(241, 43, 107)']

  var setupOpen = document.querySelector(`.setup-open`)
  var setupClose = document.querySelector(`.setup-close`)
  var wizardEyes = document.querySelector(`.setup-wizard .wizard-eyes`)
  var fireBall = document.querySelector(`.setup-fireball-wrap`)
  var wizardCoat = document.querySelector(`.wizard-coat`)
  var setup = document.querySelector(`.setup`)
  var setupArtifacts = document.querySelectorAll(`.setup-artifacts-shop .setup-artifacts-cell img`)
  var setupArtifactsCell = document.querySelectorAll(`.setup-artifacts .setup-artifacts-cell`)
  var form = document.querySelector('.setup-wizard-form')

  var dragEnterElem
  var star

  form.addEventListener('submit', function (e) {
    e.preventDefault()
    window.backend.save(new FormData(form), closeSetupWindow, window.wizard.errorHandler)
  })

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

  //РАБОТА С ОКНОМ SETUP

  //Открыть, закрыть попап
  setupOpen.addEventListener(`click`, openSetupWindow)
  setupClose.addEventListener(`click`, closeSetupWindow)

  //Обрабатываем нажание Enter по аватарке
  setupOpen.addEventListener(`keydown`, function(evt) {
    if(evt.keyCode === 13) { openSetupWindow() }
  })

  //Обрабатываем нажание Enter по крестику
  setupClose.addEventListener(`keydown`, function(evt) {
    if(evt.keyCode === 13) { closeSetupWindow() }
  })

  //Обрабатываем клик по глазам
  wizardEyes.addEventListener(`click`, function() {
    var newColor = window.util.getRandomItem(EYES_COLORS)
    window.wizard.onEyesChange(newColor)
  })

  //Обрабатываем клик по файерболу
  fireBall.addEventListener(`click`, function() {
    var newColor = window.util.getRandomItem(FIREBALL_COLORS)
    window.wizard.onFireBallChange(newColor)
  })

  //Обрабатываем клик по плащу
  wizardCoat.addEventListener(`click`, function() {
    var newColor = window.util.getRandomItem(COAT_COLORS)
    window.wizard.onCoatChange(newColor)
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
