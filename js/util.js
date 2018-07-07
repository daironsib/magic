// Файл util.js - Вспомогательные функции
'use strict'

window.util = (function () {
  return {
    shuffle: function (array) {
      var currentIndex = array.length
      var temporaryValue
      var randomIndex

      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex -= 1
        temporaryValue = array[currentIndex]
        array[currentIndex] = array[randomIndex]
        array[randomIndex] = temporaryValue
      }
      return array
    },
    getRandomItem: function (array) {
      return array[Math.floor(Math.random() * (array.length))]
    },
    errorHandler: function (errorMessage) {
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
  }
})()
