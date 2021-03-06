let url = {
  hotLists: '/index/hotLists',
  bannerlists: '/index/bannerlists',
  categorynavlists: '/category/navlist',
  ztoplists: '/caregory/ztoplists',
  caregorytoplists: '/caregory/toplists',
  searchlists:"/search/seaechlists",
  goodsdetail: '/goods/goodsdetail',
  cartlist:'/cart/cartlist',
  addcart:'/cart/addcart',
  addresslists:'/member/addresslists',
  addaddress:'/member/addaddress',
  deladress:'/member/deladress',
  addresssave:'/member/addresssave',
  updataaddress:'/member/updataaddress'
}

let host = 'http://rap2api.taobao.org/app/mock/121743'


for (let key in url) {
  if (url.hasOwnProperty(key)) {
    url[key] = host + url[key]
  }
}

export default url
