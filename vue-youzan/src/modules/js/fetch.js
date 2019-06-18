import url from 'js/api'
import axios from 'axios'

function fetch(url, data) {
  return new Promise((resolve, reject) => {
    axios.get(url, data).then(res => {
      if (res.data.status === 200) {
        resolve(res)
      } else if (res.data.status === 300) {
        location.herf = "login.html";
        resolve(res)
      } else {
        reject(res)
      }
    }).catch(error => {
      reject(error)
    })
  })
}
export default fetch