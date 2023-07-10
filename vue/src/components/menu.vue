<template>
    <div>
        <p>이름 : {{ this.userid2 }}</p>
        <p>비번 : 1111</p>
        <button v-on:click="onChange()">클릭</button>
    </div>
</template>

<script>


import axios from "axios";
export default {
    components: {


    },
    data() {
        return {
            file: null,
            abs: 0,

            ads: null,
            collection: null,
            userid2: this.$route.query.id,
            userpw: 1111,


        };
    },
    mounted() {


    },
    methods: {

        async onChange() {
            const headers = { "Content-Type": "application/json" };
            const body = { asd: "asd", cxx: "asd", };
            const url = `/home`;
            const response = await axios.post(url, body, headers);
            console.log(response);
        },
    }
}
</script>