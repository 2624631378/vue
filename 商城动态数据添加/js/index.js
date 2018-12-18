Window.onload = function () {
    new Vue({
        el: '#app',
        data: {

            lists: [{
                    name: "衣服",
                    status: "已购买"
                },
                {
                    name: "手机",
                    status: "未购买"
                },
                {
                    name: "电脑",
                    status: "已购买"
                },
            ]
        },
        methods: {
            // getlist() {
            //     axios({
            //         method: 'get', //请求方式
            //         url: ''
            //     }).then(function (res) {
            //         if (res.data.code == '200') {
            //             if (res.data.lists && res.data.lists.lenght > 0) {
            //                 this.lists = res.data.lists
            //             }
            //         } else {
            //             alert('error')
            //         }

            //     }).catch(function (error) {

            //     })
            // }

            add(){
                if(this.name == "")return;
                this.lists.unshift({name:'' ,status:'',});
                this.name ="";
            },
            del(i){
                this.lists.splice(i,1);
            }

        },
    })


}