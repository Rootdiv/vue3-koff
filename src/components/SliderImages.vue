<script setup lang="ts">
  const { images } = defineProps<{ images: string[] }>();

  import { ref } from 'vue';
  import { API_URL } from '@/const';
  import { Swiper as SwiperContainer, SwiperSlide } from 'swiper/vue';
  import { Navigation, Thumbs } from 'swiper/modules';
  import type Swiper from 'swiper';

  import 'swiper/css';
  import 'swiper/css/navigation';
  import 'swiper/css/thumbs';

  const thumbsSwiper = ref<Swiper>();
  const setThumbsSwiper = (swiper: Swiper) => {
    thumbsSwiper.value = swiper;
  };

  const prevButton = ref(null);
  const nextButton = ref(null);
</script>

<template>
  <div class="product__picture">
    <SwiperContainer
      :modules="[Navigation, Thumbs]"
      :thumbs="{ swiper: thumbsSwiper }"
      :navigation="{
        prevEl: nextButton,
        nextEl: prevButton,
      }"
      :spaceBetween="10"
      class="product__slider-main">
      <SwiperSlide class="product__slide" v-for="(image, i) in images" :key="i">
        <img :src="`${API_URL}/${image}`" class="product__image" />
      </SwiperSlide>
      <button class="product__arrow product__arrow_prev" ref="prevButton">
        <svg width="32" height="32" class="product__arrow-svg">
          <use href="/img/sprite.svg#prev" />
        </svg>
      </button>
      <button class="product__arrow product__arrow_next" ref="nextButton">
        <svg width="32" height="32" class="product__arrow-svg">
          <use href="/img/sprite.svg#next" />
        </svg>
      </button>
    </SwiperContainer>
    <SwiperContainer
      v-if="images.length > 1"
      @swiper="setThumbsSwiper"
      :modules="[Thumbs]"
      :watchSlidesProgress="true"
      :spaceBetween="14"
      :slidesPerView="4"
      class="product__slider-thumbnails">
      <SwiperSlide class="product__thumbnails-slide" v-for="(image, i) in images" :key="i">
        <img :src="`${API_URL}/${image}`" class="product__thumbnails-img" />
      </SwiperSlide>
    </SwiperContainer>
  </div>
</template>

<style scoped lang="scss">
  .product {
    &__picture {
      margin-bottom: 32px;

      @media (min-width: 580px) {
        margin-bottom: 40px;
      }

      @media (min-width: 820px) {
        grid-column: 1/2;
        margin-bottom: 0;
      }
    }

    &__slider-main {
      position: relative;
      width: 100%;
      height: 74vw;
      max-height: 688px;

      @media (min-width: 580px) {
        margin-bottom: 14px;
        height: 92vw;
      }

      @media (min-width: 820px) {
        height: 60vw;
      }

      @media (min-width: 1120px) {
        height: 48vw;
      }
    }

    &__slide {
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      border-radius: 16px;
    }

    &__image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &__slider-thumbnails {
      display: none !important;

      @media (min-width: 580px) {
        display: block !important;
        height: 22vw;
        max-height: 138px;
      }

      @media (min-width: 820px) {
        height: 12vw;
        max-height: 120px;
      }

      @media (min-width: 820px) {
        height: 12vw;
        max-height: 120px;
      }

      @media (min-width: 1120px) {
        max-height: 162px;
      }
    }

    &__thumbnails-slide {
      border-radius: 16px;
      overflow: hidden;
      cursor: pointer;
    }

    &__thumbnails-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &__arrow {
      position: absolute;
      z-index: 10;
      top: 50%;
      transform: translateY(-50%);
      width: 32px;

      &_next {
        left: 16px;

        @media (min-width: 580px) {
          left: 24px;
        }
      }

      &_prev {
        right: 16px;

        @media (min-width: 580px) {
          right: 24px;
        }
      }

      &-svg {
        fill-opacity: 0.4;

        &:hover {
          fill-opacity: 1;
        }
      }

      &:disabled {
        opacity: 20%;
        pointer-events: none;
      }
    }
  }
</style>
