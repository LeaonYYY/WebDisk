<template>
    <div id="regist">
      <div id="contain">
        <h1>Register</h1>

        <div class="form">
          <label>用户名：</label><input type="text"  name="username" v-model="name"><br/>
        </div>
        <div class="form">
          <label>密码：</label><input type="password"  name="userpsw" v-model="password" style="margin-left:15px"><br/>
        </div>
        <div class="form">
          <label>手机号：</label><input type="password"  name="usertel" v-model="tel"><br/>
        </div>
        <button @click="gologin" class="btn" style="margin-left: 125px;">马上登录</button>
        <input type="button"  value="免费注册" @click="submitRegist" class="btn"><br>
        <router-link to="/" style="margin-left: 165px;">返回首页</router-link>
      </div>
    </div>
</template>
<script>
export default {
    props: {
    msg: String
    },
  data(){
    return{
      name:"",
      password:"",
      tel:""
      };
  },
  methods:{
      submitRegist:function(){
        var xml = new XMLHttpRequest();
            xml.open('post','http://ycy.vipgz6.idcfengye.com/register');
            xml.setRequestHeader('Content-type','application/x-www-form-urlencoded');
            if(this.name===""){
              alert("用户名不能为空");
              return;
            }
            if(this.password===""){
              alert("密码不能为空");
              return;
            }
            if (this.tel===''){
              alert("电话号码不能为空")
              return;
            }
            xml.send('&username='+this.name+'&userpsw='+this.password+'&usertel='+this.tel);

            xml.onreadystatechange = function(data){
                if(xml.readyState==4&&xml.status==200){
                    let flag = JSON.parse(xml.response);
                    if(flag==true){
                      alert("注册成功");
                      lflag=true;
                    }else{
                      alert("用户已存在");
                    }
                }
            }
            
      },
      gologin:function(){
        this.$router.replace('/login');
      }
  }
};
</script>

<style scoped>
    #regist{
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