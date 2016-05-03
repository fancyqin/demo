<style lang="sass" scoped>
    .container{
        border: 1px solid #0D3349;
        .text{
            color: #8a1e7e;
        }
    }
</style>

<template>
    <h2>compA</h2>
    <div class="container">
        <img src="../assets/img/vhbal.jpg" height="100" alt="">
        哈哈分发发 <span class="text">{{msg}}</span>
    </div>
</template>


<script>
    export default{
        data(){
            return{
                msg:'紫紫紫紫色'
            }
        }
    }
</script>