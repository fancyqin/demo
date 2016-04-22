<style lang="sass" scoped>
    .app{
        h2{
            color: red;
        }
    }
</style>

<template>
    <div class="app">
        <h2>{{msg}}</h2>
        <div>aa</div>
    </div>
</template>

<script>
    module.exports = {
        data: function(){
            return{
                msg:'qwerty ddd'
            }
        }
    }
</script>