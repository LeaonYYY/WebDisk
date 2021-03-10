<template>
    <div id="bg">

        <form id="sentor" >
            
            <input type="file" name="file" id="file">
            <input type="button" value="上传" @click="add">
        </form>

        <div id="fileshow">
        <ul id="files">
            <li v-for="item in items" :key="item.id"> <span><img src="../assets/tb.png" style="height:30px"></span> <span id="na" >{{item.sname}}</span>  <span id="date" style="font-weight:400;font-size:8px">{{item.mydate}}</span> <button id="dl" @click="download(item.sname,item.username)">下载</button> <button id="de" @click="del(item.sname,item.username)">删除</button></li>
        </ul>

        <div id="pages">
            <button @click="backpage">上一页</button>
            <span>当前页：</span>
            <button @click="nextpage">下一页</button>
            <span>跳转至 <input type="text" size="1" v-model="chos">页 </span>
            <button @click="jumppage">跳转</button>
        </div>

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
            chos: 1     //选择的页数    
        }
    },

      created:function(){
            this.pageNow=1;
            this.chos=1;
            var xml = new XMLHttpRequest();
            xml.open('post','http://ycy.vipgz6.idcfengye.com/usershow');
            xml.setRequestHeader('Content-type','application/x-www-form-urlencoded'); 
            console.log(localStorage.username);
            xml.send("&pageNo="+this.conPage+'&username='+localStorage.username);
            xml.onreadystatechange = function(data){
                if(xml.readyState==4&&xml.status==200){
                localStorage.setItem("user",xml.response);
                }
            } 
            var datas=JSON.parse(localStorage.user);
            if(datas.PageTotalCount!=0){
                this.items=datas.myShower;
            }
            this.userName=localStorage.username;
            this.maxPage=datas.pageTotal;
            console.log(this.userName);
            },
    methods:{
        add:function(){
            var fileSenter=document.querySelector("#file");
            var filename=prompt("给你的文件起个名字吧");

            if(fileSenter.files.length===0){
                alert("未选择文件");
                return;
            }
            
            var formData = new FormData();
            
            formData.append("name",localStorage.username);
            formData.append("newFilename",filename);
            formData.append("file", fileSenter.files[0]);

            var xml = new XMLHttpRequest();
            xml.open('post','http://ycy.vipgz6.idcfengye.com/upload');
            //xml.setRequestHeader('Content-type','form/data');
            console.log(localStorage.username)
            xml.send(formData);
            xml.onreadystatechange=function(data){
                var flag=JSON.parse(xml.response);
                console.log(flag);
            }
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
            console.log(datas.myShower);
        },
        backpage:function(){
            if(this.pageNow===1){
                alert("已在首页");
            }else{
                this.pageNow--;
                this.show();
            }
        },
        nextpage:function(){
            if(this.pageNow===this.maxPage){
                alert("已经是最后一页");
            }else{
                this.pageNow++;
                this.show();
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
        download:function(fname,uname){
            var xml = new XMLHttpRequest();
            xml.open('post','http://ycy.vipgz6.idcfengye.com/download');
            xml.setRequestHeader('Content-type','application/x-www-form-urlencoded');
            
            //xml.send(formData);
            xml.send("&username="+uname+'&sname='+fname);
            xml.responseType = 'blob';
            xml.onreadystatechange=function(){
                console.log(xml.response)
                 let url = window.URL.createObjectURL(xml.response);
                 let a = document.createElement("a");
                 a.href = url;
                 a.style.display = 'none'
                 a.download = fileName;
                 a.click();
                 window.URL.revokeObjectURL(url);
                 a.remove();
                 }
        },
        del:function(fname,uname){
           /*  var formData = new FormData();
            
            formData.append("username",localStorage.username);
            formData.append("sname",fname);*/

            var xml = new XMLHttpRequest();
            xml.open('post','http://ycy.vipgz6.idcfengye.com/userDelFile');
            xml.setRequestHeader('Content-type','application/x-www-form-urlencoded');
            
            //xml.send(formData);
            xml.send("&username="+uname+'&sname='+fname);
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
        position: absolute;
        top:0px;
        right: 0px;
        width: 92%;
        background-color: rgb(234, 238, 227);
    }
    #fileshow {
        height: 650px;
        background-color: rgb(255, 252, 253);
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
    #fileshow #files li #dl{
        position: absolute;
        top: 15px;
        right: 70px;
    }
    #fileshow #files li #de{
        position: absolute;
        top: 15px;
        right: 10px;
    }
    #fileshow #files li span{
        position: absolute;
        top: 10px;
    }
    #fileshow #files li #na{
        position:absolute;
        top: 15px;
        left: 40px;
    }
    #fileshow #files li #date{
        position:absolute;
        top: 20px;
        left: 240px;
    }
</style>