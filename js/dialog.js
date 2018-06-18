var dialogHandle = document.querySelector(`.setup-user-pic`)
var setup = document.querySelector(`.setup`)

dialogHandle.addEventListener(`mousedown`, function(e){
  e.preventDefault()

  var startCoords = {
    x: e.clientX,
    y: e.clientY
  }

  function onMouseMove(moveEvt) {
    moveEvt.preventDefault()

    console.log(startCoords)

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    }

    var startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    }

    setup.style.top = (setup.offsetTop - shift.y) + `px`
    setup.style.left = (setup.offsetLeft - shift.x) + `px`
  }

  function onMouseUp(upEvt) {
    upEvt.preventDefault()

    document.removeEventListener(`mousemove`, onMouseMove)
    document.removeEventListener(`mouseup`, onMouseUp)
  }

  document.addEventListener(`mousemove`, onMouseMove)
  document.addEventListener(`mouseup`, onMouseUp)
})
