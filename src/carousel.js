import { fetchData } from "./api";

const renderCarousel = (images) => {
  const container = document.querySelector('.carousel');

  images.forEach(({ src, alt }) => {
    const slide = document.createElement('div');
    slide.setAttribute('class', 'slide');
    const img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    slide.appendChild(img)
    container.appendChild(slide)
  })

}

window.onload = async () => {
  const images = await fetchData();
  renderCarousel(images);
}