
let url={

    bannerlists: "/index/banner",
}

let host =' http://rapapi.org/mockjsdata/37195'


for (let key in url) {
    if (url.hasOwnProperty(key)) {
      url[key] = host + url[key]
    }
  }
  
  export default url