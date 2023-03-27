import { fetchData } from "./api";

let activeSlide = 0;

const renderCarousel = (images) => {
  const container = document.querySelector('.carousel');

  images.forEach(({ src, alt }, i) => {
    const slide = document.createElement('div');
    slide.setAttribute('class', 'slide' + `${i === activeSlide ? ' active' : ''}`);
    const img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    slide.appendChild(img)
    container.appendChild(slide)
  });

  renderImageSelectors((images || []).length)
}

const renderImageSelectors = (count) => {
  const container = document.querySelector('.selectors');
  for (i = 0; i < count; i++) {
    const selector = document.createElement('button');
    selector.setAttribute('data-index', i);
    if (i === activeSlide) {
      selector.setAttribute('class', 'active')
    }
    selector.addEventListener('click', (e) => changeSlide(e.currentTarget.dataset.index));
    container.appendChild(selector);
  }

  navButtonInit(count);
}

const navButtonInit = (count) => {
  const nextBtn = document.querySelector('.main-btn.next');
  const previousBtn = document.querySelector('.main-btn.previous');
  const handleClick = (isNext) => {
    const nextSlide = activeSlide + 1 === count ? 0 : activeSlide + 1;
    const previousSlide = activeSlide === 0 ? count - 1 : activeSlide - 1;
    isNext ? changeSlide(nextSlide) : changeSlide(previousSlide)
  }
  nextBtn.addEventListener('click', () => handleClick(true));
  previousBtn.addEventListener('click', () => handleClick(false));
}


const changeSlide = (index) => {
  const container = document.querySelector('.carousel');

  container.childNodes[activeSlide].setAttribute('class', 'slide')
  container.childNodes[index].setAttribute('class', 'slide active');

  const selectors = document.querySelector('.selectors');

  selectors.childNodes[activeSlide].setAttribute('class', '')
  selectors.childNodes[index].setAttribute('class', 'active');

  activeSlide = index;
}

window.onload = async () => {
  const images = await fetchData();
  renderCarousel(images);
}