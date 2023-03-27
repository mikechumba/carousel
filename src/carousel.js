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
    container.appendChild(selector);
  }
}

window.onload = async () => {
  const images = await fetchData();
  renderCarousel(images);
}