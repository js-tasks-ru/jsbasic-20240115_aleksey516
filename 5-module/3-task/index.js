function initCarousel() {
  const carousel = document.querySelector('.carousel');
  const carouselArrowRight = document.querySelector('.carousel__arrow_right');
  const carouselArrowLeft = document.querySelector('.carousel__arrow_left');
  let counterSlidePos = 0;
  
  function carouselMove(event) {
    const carouselInner = document.querySelector('.carousel__inner');
    const slidelWidth = document.querySelector('.carousel__slide').offsetWidth;

    if(event.target.closest('.carousel__arrow_right')) {
      carouselInner.style.transform = `translateX(${-slidelWidth * (counterSlidePos + 1)}px)`;
      counterSlidePos++;
    } else if(event.target.closest('.carousel__arrow_left')) {
      counterSlidePos--;
      carouselInner.style.transform = `translateX(${-slidelWidth * counterSlidePos}px)`;
    }

    counterSlidePos == 0 ? carouselArrowLeft.style.display = 'none' : carouselArrowLeft.style.display = '';
    counterSlidePos == 3 ? carouselArrowRight.style.display = 'none' : carouselArrowRight.style.display = '';
  }

  carouselArrowLeft.style.display = 'none';
  carousel.addEventListener('click', (event) => carouselMove(event));
}
