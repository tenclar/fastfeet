/* eslint-disable no-useless-concat */
/* eslint-disable no-bitwise */
/* eslint-disable no-unused-vars */
function randomHSL() {
  return `hsla(${~~(360 * Math.random())},` + `70%,` + `80%,1)`;
}
