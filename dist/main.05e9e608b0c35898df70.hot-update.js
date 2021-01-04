/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_3dglo"]("main",{

/***/ "./src/modules/sendForm.js":
/*!*********************************!*\
  !*** ./src/modules/sendForm.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"sendForm\": () => /* binding */ sendForm\n/* harmony export */ });\nvar sendForm = function sendForm(formID) {\n  var errorMsg = \"\\u0427\\u0442\\u043E-\\u0442\\u043E \\u043F\\u043E\\u0448\\u043B\\u043E \\u043D\\u0435 \\u0442\\u0430\\u043A...\",\n      successMsg = \"\\u0421\\u043F\\u0430\\u0441\\u0438\\u0431\\u043E! \\u041C\\u044B \\u0441\\u043A\\u043E\\u0440\\u043E \\u0441 \\u0412\\u0430\\u043C\\u0438 \\u0441\\u0432\\u044F\\u0436\\u0435\\u043C\\u0441\\u044F\",\n      form = document.getElementById(formID),\n      statusMsg = document.createElement('h3'),\n      loader = document.createElement('div');\n\n  var postData = function postData(data) {\n    return fetch('./server.php', {\n      'method': 'POST',\n      'headers': {\n        'Content-Type': 'application/json'\n      },\n      'body': JSON.stringify(data)\n    });\n  }; // end postData\n\n\n  loader.classList.add('loader');\n  statusMsg.classList.add('status-msg');\n  form.addEventListener('input', function (e) {\n    var trg = e.target;\n    form.elements['user_email'].setCustomValidity('Заполните, пожалуйста это поле!');\n\n    if (trg.matches('input[name=user_name]')) {\n      trg.value = trg.value.replace(/[^аА-яёЯЁ ]/, '');\n    }\n\n    if (trg.matches('input[name=user_phone]')) {\n      trg.value = trg.value.replace(/[^+\\d]/, '');\n    }\n\n    if (trg.matches('input[name=user_email]')) {\n      trg.value = trg.value.replace(/[^a-z-0-9@.]/i, '');\n      trg.setCustomValidity('');\n    }\n\n    if (trg.matches('input[name=user_message]')) {\n      trg.value = trg.value.replace(/a-z-0-9/i, '');\n    }\n  }); // end form listener input\n\n  form.addEventListener('submit', function (e) {\n    e.preventDefault();\n    form.elements['user_email'].setCustomValidity('');\n\n    if (form.elements['user_email'].value === '') {\n      return;\n    }\n\n    var formData = new FormData(form),\n        body = {};\n    form.appendChild(loader);\n    form.appendChild(statusMsg);\n    loader.classList.add('active');\n    formData.forEach(function (val, key) {\n      return body[key] = val;\n    });\n    postData(body).then(function (response) {\n      loader.classList.remove('active');\n\n      if (response.status !== 200) {\n        throw new Error('status network not 200');\n      }\n\n      statusMsg.classList.add('active');\n      statusMsg.textContent = successMsg;\n    })[\"catch\"](function (error) {\n      statusMsg.classList.add('active');\n      statusMsg.textContent = errorMsg;\n      console.error(error);\n    })[\"finally\"](function () {\n      form.reset();\n      setTimeout(function () {\n        statusMsg.classList.remove('active');\n      }, 2000);\n    });\n  });\n};\n\n//# sourceURL=webpack://3dglo/./src/modules/sendForm.js?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ 	"use strict";
/******/ 
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => "6120acd9b1feb5ec0dee"
/******/ 	})();
/******/ 	
/******/ }
);