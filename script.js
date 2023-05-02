'use strict';

// const slides = document.querySelectorAll('.slide');
// const slider = document.querySelector('.slider');
const slider = document.querySelectorAll('.slider');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const header = document.querySelector('.overall');
const firstNav = document.querySelector('.first-nav');
const secondNav = document.querySelector('.second-nav');
const dotsContainer = document.querySelector('.slider-btn');
const testimonial = document.querySelectorAll('.testimonial-box');
const genTestimonial = document.querySelector('.general-testimonial-box');
const testimonialBtn = document.querySelector('.testimonial-btn');

let curSlide = 0;
let curTSlide = 0;
const maxSlide = slider.length;
let maxTSlide = testimonial.length;

const createDots = function () {
  slider.forEach(function (_, i) {
    dotsContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="h-[15px] w-[15px] dots__dot dots__dot--active rounded-full bg-[#d4d4d4] mt-[5rem]" data-slide="${i}"></button>`
    );
  });
};
const createTestimonialDots = function () {
  testimonial.forEach(function (_, i) {
    testimonialBtn.insertAdjacentHTML(
      'beforeend',
      `<button class="h-[15px] w-[15px] dots__dot--testimonial dots__dot__testimonial--active rounded-full bg-[#d4d4d4] mt-[5rem]" data-slide="${i}"></button>`
    );
  });
};
createTestimonialDots();
createDots();

const activateDot = function (slide) {
  document
    .querySelectorAll('.dots__dot')
    .forEach((dot) => dot.classList.remove('dots__dot--active'));

  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};
const activateTestimonialDot = function (slide) {
  document
    .querySelectorAll('.dots__dot--testimonial')
    .forEach((dot) => dot.classList.remove('dots__dot__testimonial--active'));

  document
    .querySelector(`.dots__dot--testimonial[data-slide="${slide}"]`)
    .classList.add('dots__dot__testimonial--active');
};
activateDot(0);
activateTestimonialDot(0);

const goToSlide = function (slide) {
  slider.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};

const goTotestimonial = function (slide) {
  testimonial.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};
goTotestimonial(0);

goToSlide(0);

const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }

  goToSlide(curSlide);
  activateDot(curSlide);
};

const nextTestimonialSlide = function () {
  if (curTSlide === maxTSlide - 1) {
    curTSlide = 0;
  } else {
    curTSlide++;
  }

  goTotestimonial(curTSlide);
  activateTestimonialDot(curTSlide);
};
nextTestimonialSlide();

const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }
  goToSlide(curSlide);
  activateDot(curSlide);
};
const prevTestimonialSlide = function () {
  if (curTSlide === 0) {
    curTSlide = maxTSlide - 1;
  } else {
    curTSlide--;
  }
  goTotestimonial(curTSlide);
  activateTestimonialDot(curTSlide);
};
prevTestimonialSlide();
//next slide
nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowLeft') prevSlide();
  if (e.key === 'ArrowRight') nextSlide();
});

dotsContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const slide = e.target.dataset.slide;
    goToSlide(slide);
    activateDot(slide);
  }
});

testimonialBtn.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot--testimonial')) {
    const slide = e.target.dataset.slide;
    goTotestimonial(slide);
    activateTestimonialDot(slide);
  }
});

const obsCallback = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    firstNav.classList.add('hidden');
    firstNav.classList.remove('nav');
    secondNav.classList.add('stick');
  } else if (entry.isIntersecting) {
    secondNav.classList.remove('stick');
    firstNav.classList.remove('hidden');
    firstNav.classList.add('nav');
  }
};

const obsOptions = {
  root: null,
  threshold: 0.8,
};

const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(header);
