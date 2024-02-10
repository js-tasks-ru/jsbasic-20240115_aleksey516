function initCarousel() {
  const carousel = document.querySelector('.carousel');
  const slidelWidth = document.querySelector('.carousel__slide').offsetWidth;
  const carouselInner = document.querySelector('.carousel__inner');

  const carouselArrowRight = document.querySelector('.carousel__arrow_right');
  const carouselArrowLeft = document.querySelector('.carousel__arrow_left');

  let counterSlidePos = 0;
  
  function carouselMove(event) {
    if(event.target.closest('DIV') == carouselArrowRight) {
      carouselInner.style.transform = `translateX(${-slidelWidth * (counterSlidePos + 1)}px)`;
      counterSlidePos++;
    } else if(event.target.closest('DIV') == carouselArrowLeft){
      counterSlidePos--;
      carouselInner.style.transform = `translateX(${-slidelWidth * counterSlidePos}px)`;
    }
    counterSlidePos == 0 ? carouselArrowLeft.style.display = 'none' : carouselArrowLeft.style.display = '';
    counterSlidePos == 3 ? carouselArrowRight.style.display = 'none' : carouselArrowRight.style.display = '';
  }

  carouselArrowLeft.style.display = 'none';
  carousel.addEventListener('click', (event) => carouselMove(event));
}
