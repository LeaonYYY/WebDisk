<template>
    <div id="login">
        <div id="contain">

            <h1>Login</h1>

          <div class="form" ><label for="name" >昵称:</label>
          <input name="username" v-model.trim="sname" type="text" placeholder="请输入昵称.." class="nickname" id="name"></div>
          <div class="form"><label for="code">密码:</label><input name="userpsw" v-model.trim="password" type="password" id="code"   style="margin-left:4px"   class="mcode" placeholder="请输入密码.."></div>
          <input type="button" value="登录" @click="handlelogin" class="btn" style="margin-left: 125px;">
          <button @click="goRegist" class="btn">注册一下</button>   <br>
          <router-link to="/" style="margin-left: 150px;">返回首页</router-link>
          </div>
      </div>
</template>

<script>
export default {
    name:'login',
    data(){
        return {
            sname:"",//姓名，用v-model绑定监听，将输入的字符串赋值给name变量
            tel:"",
            password:"",//密码
            st:"false",//false为不保存登录
        }
    },
    methods:{
        handlelogin:function(){
            var userN=this.sname;
            localStorage.setItem("flag","false");
            var xml = new XMLHttpRequest();
            xml.open('post','http://ycy.vipgz6.idcfengye.com/userlogin');
            xml.setRequestHeader('Content-type','application/x-www-form-urlencoded');
            xml.send('&username='+userN+'&userpsw='+this.password);
            xml.onreadystatechange = function(data){
                if(xml.readyState==4&&xml.status==200){
                    let flag = JSON.parse(xml.response);
                        if(flag==2){
                            alert("登陆成功");
                            localStorage.setItem("username",userN);
                            
                            localStorage.setItem("loginType","admin");
                            
                        }else if(flag==1){
                            alert('登陆成功');
                            localStorage.setItem("username",userN);
                            
                            localStorage.setItem("loginType","user");
                        }else if (flag==0){
                            alert("密码错误");
                        }else {
                            alert("该用户不存在");
                        }
                }
            }
            console.log(localStorage.loginType)
            if(localStorage.loginType==="user"){
                localStorage.setItem("flag","true");
                this.$router.push({path:'/disk'});
            }else if(localStorage.loginType==="admin"){
                localStorage.setItem("flag","true");
                this.$router.push({path:'/admin'});
            }
        },
        goRegist:function(){
            this.$router.replace({path:'/regist'})
        }  
    }
}
</script>

<style scoped>
   #login{
      height: 700px;
      position: relative;
      background-image: url(../assets/mountain.png);
      background-size:100% 100%;
    }
    #contain{
      position: absolute;
      left: 38%;
      top: 20%;
      height: 300px;
      width: 400px;
      background-color: #fff;
      border: solid 3px gray;
      border-radius: 15px;
    }
    #contain h1{
      text-align: center;
    }
    #contain .form{
      margin-left: 80px;
      margin-bottom: 15px;
    }
    #contain .btn{
      margin-top: 10px;
      margin-bottom: 10px;
      height: 30px;
      border: solid 1px gray;
      border-radius: 10px;
    }
    #contain .btn:hover{
      cursor: pointer;
      background-color: rgb(185, 182, 182);
    }
    
</style>