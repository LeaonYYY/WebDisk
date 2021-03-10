<template>
    <div id="nav">
        <div id="navButton" style="display:inline-block">
            <div class="folder"> <span><img src="../assets/file.png" alt="" style="height:27px"></span><router-link to="/allFile" >全部文件</router-link></div>
            <div class="folder" ><span><img src="../assets/file.png" alt="" style="height:27px"></span><router-link to='/pic' >图片</router-link></div>
            <div class="folder" ><span><img src="../assets/file.png" alt="" style="height:27px"></span><router-link to="/dom" >文档</router-link></div>
            <div class="folder" ><span><img src="../assets/file.png" alt="" style="height:27px"></span><router-link to="/video" >视频</router-link></div>
            <div class="folder" ><span><img src="../assets/file.png" alt="" style="height:27px"></span><router-link to="/seed" >种子</router-link></div>
        </div>      
        <button @click="signOut">注销</button>
        <router-view></router-view>
    </div>
    
</template>

<script>
export default {
    name: 'disk',
    methods:{
        signOut:function(){
            localStorage.setItem('flag',"false");
            localStorage.setItem('username','');
            this.$router.replace('/login');
        }
    }
}
</script>

<style scoped>
    #nav {
        position: relative;
        width: 88%;
        height: 690px;
        margin-left: 75px;
        border: solid 3px rgb(0, 0, 0);
        border-radius: 5px;
    }
    #navButton {
        position: relative;
        width: 100px;
        display: inline-block;
    }
    #nav button{
        position: absolute;
        bottom: 10px;
        left: 10px;
        height: 20px;
    }
    #navButton span:hover{
        cursor: pointer;
        background-color: rgb(180, 176, 176);
    }
    #navButton .folder {
        height: 27px;
    } 
    
</style>