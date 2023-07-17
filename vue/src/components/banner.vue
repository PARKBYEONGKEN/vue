<template>
    <div>
        <carousel :items-to-show="1" :autoplay="10000">
            <Slide v-for="slide in 10" :key="slide">
                <div class="carousel__item">{{ slide }}</div>
            </Slide>
            <template #addons>
                <navigation />
                <pagination />
            </template>
        </carousel>
    </div>
</template>

<script>
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'


export default {
    components: {
        Carousel,
        Slide,
        Pagination,
        Navigation,

    },
    data() {
        return {



        };
    },
    methods: {



    }
}
</script>

<style lang="css" scoped>
.carousel__item {
    min-height: 450px;
    width: 100%;
    background-color: var(--vc-clr-primary);
    color: var(--vc-clr-white);
    font-size: 20px;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.carousel__slide {
    width: 100%important;
}
</style>