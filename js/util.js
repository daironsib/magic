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
    }
  }
})()
