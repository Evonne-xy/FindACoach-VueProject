<template>
    <span class = "badge" :class = mode>
        {{text}}
    </span>
</template>


<script>
export default ({
   props:['title','mode'],
   computed:{
       text(){
           return this.title.toUpperCase();
       }
   }
})
</script>

<style scoped>
.badge{
    background-color: #ccc;
    color:#252525;
    border-radius:30px;
    display:inline-block;
    padding:0.3rem 0.3rem;
    margin-right: 0.5rem
}

.frontend{
    background-color: #3d008d;
    color:white
}

.backend{
    background-color: #71008d;
    color:white
}

.career{
    background-color: #8d006e;
    color:white
}

</style>
