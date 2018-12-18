new Vue({
    el: "#app",
    data: {
        curindex: 0,
        lists: [{
                name: "男装",
                issubshow: true,
                subitems: [{
                    name: "男装1"
                }, {
                    name: "男装2"
                }, {
                    name: "男装3"
                }]
            },
            {
                name: "男装a",
                issubshow: false,
                subitems: [{
                    name: "男装a1"
                }, {
                    name: "男装a2"
                }, {
                    name: "男装a3"
                }]
            },
            {
                name: "男装b",
                issubshow: false,
                subitems: [{
                    name: "男装b1"
                }, {
                    name: "男装b2"
                }, {
                    name: "男装b3"
                }]
            },
            {
                name: "男装d",
                issubshow: false,
                subitems: [{
                    name: "男装d1"
                }, {
                    name: "男装d2"
                }, {
                    name: "男装d3"
                }]
            },
        ]
    },
    methods: {

        //方法一，通过传入的lisit，遍历所有的项目置为不显示，然后将当前项目设置为显示，然后处理类
        curshow(list) {
            this.lists.forEach(function (item, index) {  //注意forEach的大小写
                item.issubshow = false;
            });
            list.issubshow = true;
        },
        //方法二，通过传入index，将当前项的index赋值给curindex，如果两者相等，则是当前项，然后处理类和控制显示与否即可
        curshow1(index) {
            this.curindex = index;           
        },

    },



})