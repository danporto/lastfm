// Limpar usuário
function clearResults () {
  let clearUser = document.querySelector('#user')
  let clearResult = document.querySelector(".searchResult")
  clearUser.value = ""
  clearResult.setAttribute("hidden", "true")
}


