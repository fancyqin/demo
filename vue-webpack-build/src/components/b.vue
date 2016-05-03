<style scoped>
    .inner{
        border: 1px solid #d8df11;
    }
    .text{
        color: #008a0c;
    }
</style>

<template>
    <h2>compB</h2>
    <div class="inner">
        <img src="../assets/img/ok.png" alt="">
        付款咖啡机按时打卡发卡上 <span class="text">{{msg}}</span>
    </div>
</template>


<script>
    export default{
        data(){
            return{
                msg:'绿绿绿绿色'
            }
        }
    }
</script>