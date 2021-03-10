<template>
    <div id="bg">

        <div id="fileshow">
        <ul id="files">
            <li v-for="item in items" :key="item.id">{{item.username}}: {{item.sname}}  <button>下载</button> <button @click="aOK(item.sname,item.username)">通过</button> <button @click="aDel(item.sname,item.username)">拒绝</button> </li>
        </ul>

        <div id="pages">
            <button @click="backpage">上一页</button>
            <span>当前页：</span>
            <button @click="nextpage">下一页</button>
            <span>跳转至 <input type="text" size="1" v-model="chos">页 </span>
            <button @click="jumppage">跳转</button>
        </div>
        
        <button @click="signOut">注销</button>

        </div>

        
    </div>
</template>
<script>
export default {
    data(){
        return{
            items:[],
            sum:0,
            filename:'',
            conPage:1,
            pageNow:1,
            userName:'',
            maxPage:-1,
            chos: 1  
        }
    },
    created:function(){
             var xml = new XMLHttpRequest();
            xml.open('post','http://ycy.vipgz6.idcfengye.com/managershow');
            xml.setRequestHeader('Content-type','application/x-www-form-urlencoded'); 
            console.log(localStorage.username);
            xml.send('&username='+localStorage.username);
            xml.onreadystatechange = function(data){
                if(xml.readyState==4&&xml.status==200){
                localStorage.setItem("user",xml.response);
                }
            } 
            var datas=JSON.parse(localStorage.user);
            if(datas.myShower!=''){
                this.items=datas.myShower;
            }
            this.userName=localStorage.username;
            this.maxPage=datas.pageTotal;
            },
    methods:{
        signOut:function(){
            localStorage.setItem('flag',"false");
            this.$router.replace('/login');
        },
        show:function(){
            var xml = new XMLHttpRequest();
            xml.open('post','http://ycy.vipgz6.idcfengye.com/usershow');
            xml.setRequestHeader('Content-type','application/x-www-form-urlencoded'); 
            console.log(localStorage.username);
            xml.send("&pageNo="+this.pageNow+'&username='+localStorage.username);
            xml.onreadystatechange = function(data){
                if(xml.readyState==4&&xml.status==200){
                localStorage.setItem("user",xml.response);
                }
            } 
            var datas=JSON.parse(localStorage.user);
            this.items=datas.myShower;  
        },
        backpage:function(){
            if(this.pageNow===1){
                alert("已在首页");
            }else{
                this.pageNow--;
                this.pageNowshow();
            }
        },
        nextpage:function(){
            if(this.pageNow===this.maxPage){
                alert("已经是最后一页");
            }else{
                this.pageNow++;
                this.pageNowshow();
            }
        },
        jumppage:function(){
            if(0<this.chos&&this.chos<=this.maxPage){
                this.pageNow=this.chos;
                this.show();
            }else{
                alert("页面不存在")
            }
        },
        aOK:function(fname,uname){
             console.log(fname,uname)

            var xml = new XMLHttpRequest();
            xml.open('post','http://ycy.vipgz6.idcfengye.com/managerUpd');
            xml.setRequestHeader('Content-type','application/x-www-form-urlencoded');
            
            xml.send("&username="+uname+'&sname='+fname+"&res="+true);
            xml.onreadystatechange=function(){
                console.log(xml.response)
            }
        },
        aDel:function(fname,uname){
            
            console.log(fname,uname)

            var xml = new XMLHttpRequest();
            xml.open('post','http://ycy.vipgz6.idcfengye.com/managerUpd');
            xml.setRequestHeader('Content-type','application/x-www-form-urlencoded');
            
            xml.send("&username="+uname+'&sname='+fname+"&res="+false);
            xml.onreadystatechange=function(){
                console.log(xml.response)
            }
        }
    }
}
</script>
<style scoped>
    #bg {
        height: 100%;
        width: 92%;
        
    }
    #fileshow {
        height: 650px;
        position: relative;
        margin-left: 60px;
        
    }
    #files {
        height: 600px;
        padding: 0;
    }
    #pages {
        margin-left: 35%;
    }
     #fileshow #files li{
        list-style: none;
        position: relative;
        height: 58px;
        width: 100%;
        background-color: rgb(206, 202, 202);
        border: solid 1px gray;
    }
</style>