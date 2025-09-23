document.addEventListener("DOMContentLoaded", function () {
  const carouselInner = document.querySelector(".carousel-inner");
  const carouselItems = document.querySelectorAll(".carousel-item");
  const indicators = document.querySelectorAll(".carousel-indicator");
  let currentIndex = 0;
  let intervalId;

  function goToSlide(index) {
    currentIndex = index;
    carouselInner.style.transform = `translateX(-${currentIndex * 25}%)`;

    carouselItems.forEach((item, i) => {
      item.classList.toggle("active", i === currentIndex);
    });

    indicators.forEach((indicator, i) => {
      indicator.classList.toggle("active", i === currentIndex);
    });
  }

  function nextSlide() {
    let nextIndex = (currentIndex + 1) % carouselItems.length;
    goToSlide(nextIndex);
  }

  function startAutoSlide() {
    intervalId = setInterval(nextSlide, 4000);
  }

  function stopAutoSlide() {
    clearInterval(intervalId);
  }

  indicators.forEach((indicator) => {
    indicator.addEventListener("click", function () {
      let index = parseInt(this.getAttribute("data-index"));
      goToSlide(index);
      stopAutoSlide();
      startAutoSlide();
    });
  });

  const carousel = document.querySelector(".carousel");
  carousel.addEventListener("mouseenter", stopAutoSlide);
  carousel.addEventListener("mouseleave", startAutoSlide);

  startAutoSlide();
});
