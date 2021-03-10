<template>
  <div id="main">

    <div id="userbox">
    <h1>{{msg}}</h1>
    <button @click="goLogin" class="login">登录</button>
    <button @click="goRegist" class="regist" style="margin-left:15px">注册</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'welcome',
  data () {
    return {
      msg: 'Welcome to My Disk App'
    }
  },
  methods:{
    goLogin:function(){
    this.$router.replace({path:'/login'})
    },
    goRegist:function(){
    this.$router.replace({path:'/regist'})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    #main {
      height: 700px;
      position: relative;
      background-image: url(../assets/sea.jpg);
      background-size:100% 100%;
    }
    #userbox {
      position: absolute;
      height: 200px;
      left: 35%;
      top: 37%;
      background-color: rgb(187, 182, 182);
      border: solid 4px gray;
      border-radius:20px;
    }
    #userbox button{
      margin-top: 20px;
      height: 40px;
      width: 60px;
      border: solid 3px gray;
      border-radius: 10px;
    }
    #userbox .login {
      margin-left: 125px;
    }
    #userbox button:hover{
      cursor: pointer;
      background-color: rgb(163, 91, 91);
    }
</style>
