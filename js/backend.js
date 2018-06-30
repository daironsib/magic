//Файл backend.js - функции для работы с бэкэндом

'use strict'

function request(url, options, success, error) {
  var xhr = new XMLHttpRequest()
  xhr.responseType = 'json'

  xhr.addEventListener(`load`, function () {
    if (xhr.status === 200) {
      success(xhr.response)
    } else {
      error('Статус ответа: ' + xhr.status + ' ' + xhr.statusText)
    }
  })

  xhr.addEventListener('error', function () {
    error('Произошла ошибка соединения')
  })

  xhr.addEventListener('timeout', function () {
    error('Запрос не успел выполниться за ' + xhr.timeout + 'мс')
  })

  xhr.timeout = options.timeout
  xhr.open(options.method, url)
  xhr.send()
}

window.backend = (function () {
  return {
    load: function (onLoad, onError) {
      var URL = `https://js.dump.academy/code-and-magick/data`
      var params = {
        method: `GET`,
        timeout: 10000
      }
      request(URL, params, onLoad, onError)
    },
    save: function (data, onSave, onError) {
      var URL = `https://js.dump.academy/code-and-magick`

      var params = {
        method: `POST`,
        timeout: 10000
      }
      request(URL, params, onLoad, onError)
    }
  }
})()
