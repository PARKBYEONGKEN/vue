<template>
    <div>
        <ul class="typeA">
            <li class="btnbox active" v-on:click="numberchange(1)">제품1</li>
            <li class="btnbox" v-on:click="numberchange(2)">제품2</li>
            <li class="btnbox" v-on:click="numberchange(3)">제품3</li>
            <li class="btnbox" v-on:click="numberchange(4)">제품4</li>
            <li class="btnbox" v-on:click="numberchange(5)">제품5</li>
            <li class="btnbox" v-on:click="numberchange(6)">제품6</li>
            <li class="btnbox" v-on:click="numberchange(7)">제품7</li>
        </ul>
        <div v-if="typenum === 1" class="typeall type1">1</div>
        <div v-if="typenum === 2" class="typeall type2">2</div>
        <div v-if="typenum === 3" class="typeall type3">3</div>
        <div v-if="typenum === 4" class="typeall type4">4</div>
        <div v-if="typenum === 5" class="typeall type5">5</div>
        <div v-if="typenum === 6" class="typeall type5">6</div>
        <div v-if="typenum === 7" class="typeall type5">7</div>
    </div>
</template>

<script>



export default {
    components: {


    },
    data() {
        return {
            typenum: 1,



        };
    },
    methods: {
        numberchange: function (e) {
            this.typenum = e;
            var btnb = document.getElementsByClassName("btnbox");
            if (event.target.classList[1] === "active") {
                event.target.classList.remove("active");
            } else {
                for (var i = 0; i < btnb.length; i++) {
                    btnb[i].classList.remove("active");
                }
                event.target.classList.add("active");
            }
        }
    }
}





</script>

<style lang="css" scoped>
.btnbox {
    float: left;

    width: 14.285%;
    background: rgb(225, 239, 241);
    text-align: center;
    cursor: pointer;
    border: 1px solid black;
    overflow: hidden;
    box-sizing: border-box;
}



.typeall {
    height: 300px;
    border: 1px solid black;
}

.btncolor:hover,
.btnbox.active {
    background-color: #FFE0C9;
}
</style>