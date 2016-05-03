<style scoped>
    /*$blue: #0b97c4;*/
    .main{
        color: #444444;
        font-size: 20px;
    }
</style>

<template>
    <div class="main">
        lalala, {{msg}}
    </div>
    <comp-a></comp-a>
    <comp-b></comp-b>
</template>

<script>
    import CompA from './components/a.vue'
    import CompB from './components/b.vue'

    export default{
        data(){
            return{
                msg:'Slim Shady'
            }
        },
        components:{
            CompA,
            CompB
        }
    }
</script>
