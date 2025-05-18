import Swiper from 'swiper';
import { EffectCreative, Navigation, Autoplay, Mousewheel } from 'swiper/modules';

export const initHeroSliders = () => {
  const sliders = document.querySelectorAll('.hero-slider');

  if (!sliders.length) {
    return;
  }

  const prevBtn = document.querySelector('.slider-btn--prev');
  const nextBtn = document.querySelector('.slider-btn--next');

  const navigation = prevBtn && nextBtn && {
    nextEl: nextBtn,
    prevEl: prevBtn,
  };

  sliders.forEach((slider) => {
    new Swiper(slider, {
      modules: [EffectCreative, Navigation, Autoplay, Mousewheel],
      // autoplay: {
      //   delay: 4000,
      //   disableOnInteraction: false,
      //   pauseOnMouseEnter: true,
      // },
      speed: 600,
      threshold: 10,
      touchRatio: 1,
      mousewheel: {
        forceToAxis: true,
        thresholdDelta: 40,
        sensitivity: 1,
        axis: 'horizontal',
      },
      loop: true,
      grabCursor: true,
      effect: 'creative',
      creativeEffect: {
        prev: {
          shadow: true,
          translate: ['-30%', 0, -1],
        },
        next: {
          translate: ['100%', 0, 0],
        },
      },
      navigation,
    });
  });
};
