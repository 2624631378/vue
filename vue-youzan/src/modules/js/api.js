let url = {
  hotLists: '/index/hotLists',
  navlist: '/category/navlist',
  toplists: '/caregory/toplists',
  ztoplists: '/caregory/ztoplists',
  goodsdetail: '/goods/goodsdetail',
  cartlist: '/cart/cartlist',
  addresslists: '/member/addresslists'
}

let host = "http://rap2api.taobao.org/app/mock/121743";

for (var prop in url) {
  if (url.hasOwnProperty(prop)) {
    url[prop] = host + url[prop];
  }

}

export default url
