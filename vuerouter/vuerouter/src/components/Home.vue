<template>
<div>
  <h1>home</h1>
    <div style="float:left; border: 2px solid red;width: 200px;">
        <ul>

            <li v-for="(list,index) in lists" :key="index" @click="selectli(list)">
               {{list.name}}-{{list.qq}}
            </li>

        </ul>

    </div>

    
    <div style="float:left; border: 2px solid red; margin-left: 90px; width: 200px;">
        以选择{{seclists.length}}人
        <ul>

            <li  v-for="(item,i) in seclists" :key="i" @click="del(i)" @mouseout="jkl = te"  @mousemove=" jkl = i" >
               {{item.name}}-{{item.qq}}-{{i}}
               <span v-if="i == jkl">jkha</span>
            </li>

        
   
        </ul>

    </div></div>
</template>
<script>
export default {
  data() {
    return {
      jkl:'false',
        lists:[
                {id:1,name:'zhangs',qq:'123455'},
                {id:2,name:'afd',qq:'45134'},
                {id:3,name:'q3rt',qq:'365546'},
                {id:4,name:'sfagf',qq:'132434'},
            ],
            seclists:[]
    }
  },
       methods: {

            selectli(list){

               this.seclists.push(list)




            },
            del(i){
              alert(i)
              this.seclists.splice(i,1)
            }


        }
}
</script>
