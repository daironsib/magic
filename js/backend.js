//Файл backend.js - функции для работы с бэкэндом

'use strict'

window.backend = (function () {
  return {
    load: function (onLoad, onError) {
      var URL = `https://js.dump.academy/code-and-magick/data`

      var xhr = new XMLHttpRequest()
      xhr.responseType = 'json'

      xhr.addEventListener(`load`, function () {
        if (xhr.status === 200) {
          onLoad(xhr.response)
        } else {
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText)
        }
      })

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения')
      })

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс')
      })

      xhr.timeout = 10000

      xhr.open(`GET`, URL)
      xhr.send()
    },
    save: function (data, onSave, onError) {
      var URL = `https://js.dump.academy/code-and-magick`

      var xhr = new XMLHttpRequest()
      xhr.responseType = 'json'

      xhr.addEventListener('load', function () {
        onSave()
      })

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения')
      })

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс')
      })

      xhr.timeout = 10000
      
      xhr.open('POST', URL)
      xhr.send(data)
    }
  }
})()
