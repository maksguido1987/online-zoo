// функция открывания селектов на странице видео
function selectInVideoPage() {
  const selectZoos = document.querySelector('.zoos__video-select-wrapper');
  const selectZoos960 = document.querySelector('.zoos__video-select-wrapper-960');

  if (selectZoos) {
    selectZoos.addEventListener('click', (e) => {
      const targetSelect = e.target.closest('.zoos__video-select');
      if (!targetSelect) return;
      if (targetSelect.classList.contains('select-video__open')) {
        targetSelect.classList.remove('select-video__open')
      } else {
        targetSelect.classList.add('select-video__open');
      }
    });
  }
  if (selectZoos960) {
    selectZoos960.addEventListener('click', (e) => {
      const targetSelect = e.target.closest('.zoos__video-select');
      if (!targetSelect) return;
      if (targetSelect.classList.contains('select-video__open')) {
        targetSelect.classList.remove('select-video__open')
      } else {
        targetSelect.classList.add('select-video__open');
      }
    });
  }
}
selectInVideoPage();

//функция бургер меню
function openBurger() {
  const headerMenu = document.querySelector('.header__menu');
  const headerBurger = document.querySelector('.icon-menu');
  headerBurger.addEventListener('click', () => {
    headerMenu.classList.toggle('show-burger');
    headerBurger.classList.toggle('open-burger');
  });
}
openBurger();

// функция выдвижения сайдбара
function openSidebar() {
  const btnOpenSidebar = document.querySelector(".zoos__video-big-open-sidebar");
  const sidebar = document.querySelector(".sidebar");
  if (btnOpenSidebar) {
    btnOpenSidebar.addEventListener("click", (event) => {
      event.stopPropagation();
      btnOpenSidebar.classList.toggle("open-sidebar");
      sidebar.classList.toggle("sidebar-open");
    });
  }
}
openSidebar();


// функция адаптивного слайдера
/**
 * 
function sliderPetsInZoo() {
  let position = 0;
  // начальная позиция первого слайдера
  let slidesToShow = 4;
  // сколько слайдов показывать
  if (document.documentElement.clientWidth <= 1190) {
    slidesToShow = 3;
  }
  if (document.documentElement.clientWidth <= 550) {
    slidesToShow = 2;
  }
  const slidesToScroll = 1;
  // сколько слайдов прокручивать

  const wrapper = document.querySelector(".slider-pets__wrapper");
  const track = document.querySelector(".slider-pets__track");
  const items = document.querySelectorAll(".slider-pets__column");
  const itemsLength = items.length;
  const next = document.querySelector(".slider-pets__next");
  const prev = document.querySelector(".slider-pets__prev");

  const itemWidth = track.clientWidth / slidesToShow;
  // ширина слайда
  const movePosition = slidesToScroll * itemWidth;
  // ширина, на сколько нужно продвинуть

  items.forEach((item) => {
    item.style.maxWidth = `${itemWidth}px`;
  });

  prev.onclick = () => {
    const itemsLeft = Math.abs(position) / itemWidth;
    // вычисляем, сколько от текущей позиции осталось items
    position +=
      itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;
    // если осталось меньше items, чем на экране, сдвигаем на ширину этих items
    setPosition();
  };

  next.onclick = () => {
    const itemsLeft =
      itemsLength - (Math.abs(position) + slidesToShow * itemWidth) / itemWidth;
    // вычисляем, сколько от текущей позиции осталось items
    position -=
      itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;
    // если осталось меньше items, чем на экране, сдвигаем на ширину этих items
    setPosition();
  };

  const setPosition = () => {
    track.style.transform = `translateX(${position}px)`;
    checkBtn();
  };
  // функция трансформы

  const checkBtn = () => {
    prev.disabled = position === 0;
    next.disabled = position <= -(itemsLength - slidesToShow) * itemWidth;
    // если позиция меньше или равно, чем смещение всего трэка
  };
  // функция проверки, активна ли кнопка

  checkBtn();
};
  // если на главной странице, запускаем функцию
if (document.querySelector('body').classList.contains('home')) {
  sliderPetsInZoo();
};
 */


// функция бесконечного слайдера
function infinitySliderPetsInZoo() {

  // коллекция слайдов
  const items = document.querySelectorAll('.slider-pets__wrapper');
  // текущий элемент
  let currentItem = 0;
  // флаг
  let isEnabled = true;

  function changeCurrentItem(n) {
    currentItem = (n + items.length) % items.length;
  };

  // добавляет класс анимации
  function hideItem(direction) {
    isEnabled = false;
    items[currentItem].classList.add(direction);
    items[currentItem].addEventListener('animationend', function () {
      this.classList.remove('slider-pets__wrapper-show', direction);
    });
  };

  // удаляет класс анимации
  function showItem(direction) {
    items[currentItem].classList.add('slider-pets__wrapper-next', direction);
    items[currentItem].addEventListener('animationend', function () {
      this.classList.remove('slider-pets__wrapper-next', direction);
      this.classList.add('slider-pets__wrapper-show');
      isEnabled = true;
    });
  };

  // создает новый индекс при нажатии назад
  function previousItem(n) {
    hideItem('to-right');
    changeCurrentItem(n - 1);
    showItem('from-left');
  };

  // создает новый индекс при нажатии вперед
  function nextItem(n) {
    hideItem('to-left');
    changeCurrentItem(n + 1);
    showItem('from-right');
  };

  // событие клик на prev
  document.querySelector('.slider-pets__prev').addEventListener('click', function () {
    if (isEnabled) {
      previousItem(currentItem);
    };
  });

  // событие клик на next
  document.querySelector('.slider-pets__next').addEventListener('click', function () {
    if (isEnabled) {
      nextItem(currentItem);
    };
  });

};
if (document.querySelector('body').classList.contains('home')) {
  infinitySliderPetsInZoo();
}

// функция запуска видео
function playVideo() {
  window.addEventListener('DOMContentLoaded', () => {
    const videoActive = document.querySelector('.video-active');
    const smallVideos = document.querySelectorAll('.zoos__video-small');

    videoActive.addEventListener('click', () => {
        if (videoActive.classList.contains('play')) {
          return;
        }
        videoActive.classList.add('play');
        let srcVideo = videoActive.dataset.video;
        videoActive.insertAdjacentHTML('afterbegin', `<iframe src="${srcVideo}?autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`);
    });

    smallVideos.forEach(video => {
      video.onclick = () => {

        let attrVideoSmall = video.getAttribute('data-video');
        let attrVideoActive = videoActive.getAttribute('data-video');
        let bgSmallVideo = window.getComputedStyle(video).backgroundImage;
        let bgActiveVideo = window.getComputedStyle(videoActive).backgroundImage;

        if (videoActive.classList.contains('play')) {

          document.querySelector('.video-active iframe').remove();
          videoActive.classList.remove('play');

        }

        video.removeAttribute('data-video');
        video.setAttribute('data-video', attrVideoActive);
        videoActive.removeAttribute('data-video');
        videoActive.setAttribute('data-video', attrVideoSmall);
        
        video.style.backgroundImage = 'none';
        video.style.backgroundImage = bgActiveVideo;
        videoActive.style.backgroundImage = 'none';
        videoActive.style.backgroundImage = bgSmallVideo;
      }
    })

  });
}
if (document.querySelector('.zoos__video-small')) {
  playVideo();
}

// open popups
function openPopups() {
  const body = document.querySelector('body');

  const popupFeedback = document.querySelector('.popup__feedback');
  const popupDonate = document.querySelector('.popup__donate');
  const popupCreditCart = document.querySelector('.popup__credit-cart');

  const btnFeedbackTestimonials = document.querySelector('.btn-testimonials');
  const btnDonateFooterTop = document.querySelector('.top-footer__btn');
  const btnDonateFooterBottom = document.querySelector('.bottom-footer__btn');
  const btnDonate = document.querySelector('.form-donat__btn');
  const btnDonateSidebar = document.querySelector('.sidebar__link-pay');
  const linkTestimonailsFooter = document.querySelector('.link-testimonials');

  const closePopup = document.querySelectorAll('.popup-close');

  // отзывы
  if (btnFeedbackTestimonials && popupFeedback) {
    btnFeedbackTestimonials.onclick = (e) => {
      popupFeedback.classList.add('popup__feedback-open');
      body.classList.add('lock');
      if (popupFeedback.classList.contains('popup__feedback-open')) {
        popupFeedback.onclick = (e) => {
          e.stopPropagation();
          if (e.target.classList.contains('popup')) {
            popupFeedback.classList.remove('popup__feedback-open');
            body.classList.remove('lock');
          } else {
            return;
          }
        }
      }
    };
  }
  // донат
  function popupDonateOpen(buttonPopup) {
    buttonPopup.onclick = () => {
      popupDonate.classList.add('popup__donate-open');
      body.classList.add('lock');
      if (popupDonate.classList.contains('popup__donate-open')) {
        popupDonate.onclick = (e) => {
          e.stopPropagation();
          if (e.target.classList.contains('popup')) {
            popupDonate.classList.remove('popup__donate-open');
            body.classList.remove('lock');
          } else {
            return;
          }
        }
      }
    }
  }
  if (btnDonateFooterTop) {
    popupDonateOpen(btnDonateFooterTop);
  };
  if (btnDonateFooterBottom) {
    popupDonateOpen(btnDonateFooterBottom);
  };
  if (btnDonateSidebar) {
    popupDonateOpen(btnDonateSidebar);
  };

  const popupDonatForm = document.querySelector('.popup__donat-form');
  const popupDonateFormAnimal = document.querySelector('.popup__donat-select');
  const popupDonateFormPrise = document.querySelector('.popup__donat-input-wrap > input');
  const arrowPopupSelect = document.querySelector('.arrow-popup');

  popupDonateFormAnimal.onclick = () => {
    arrowPopupSelect.classList.toggle('arrow-popup-open');
  }
  btnDonate.disabled = true;
  popupDonateFormPrise.onkeypress = () => {
    if (popupDonateFormPrise.value.length === 4) {
      return false;
    }
  };
  popupDonatForm.addEventListener('input', () => {
    if (popupDonateFormPrise.value.length > 0 && popupDonateFormAnimal.value.length > 1)  {
      btnDonate.disabled = false;
    }
  });

    btnDonate.onclick = (e) => {
      e.preventDefault();
      body.classList.add('lock');
      popupDonate.classList.remove('popup__donate-open');
      popupCreditCart.classList.add('popup__credit-cart-open');
      
      const cartPopupNumberCart = document.querySelector('.credit-cart-num-input');
      const cartPopupNumberMonth = document.querySelector('.credit-cart-date-month');
      const cartPopupNumberYear = document.querySelector('.credit-cart-date-year');
      const cartPopupNumberCvc = document.querySelector('.credit-cart-cvc-num');
      cartPopupNumberCart.onkeypress = () => {
        if (cartPopupNumberCart.value.length === 16) {
          return false;
        }
      };
      cartPopupNumberMonth.onkeypress = () => {
        if (cartPopupNumberMonth.value.length === 2) {
          return false;
        }
      };
      cartPopupNumberYear.onkeypress = () => {
        if (cartPopupNumberYear.value.length === 2) {
          return false;
        }
      };
      cartPopupNumberCvc.onkeypress = () => {
        if (cartPopupNumberCvc.value.length === 3) {
          return false;
        }
      };

      if (popupCreditCart.classList.contains('popup__credit-cart-open')) {
        popupCreditCart.onclick = (e) => {
          e.stopPropagation();
          if (e.target.classList.contains('popup')) {
            popupCreditCart.classList.remove('popup__credit-cart-open');
            body.classList.remove('lock');
          } else {
            return;
          }
        };
      };
    };

  // футер ссылка на отзывы
  linkTestimonailsFooter.onclick = () => {
    popupFeedback.classList.add('popup__feedback-open');
    body.classList.add('lock');
    if (popupFeedback.classList.contains('popup__feedback-open')) {
      popupFeedback.onclick = (e) => {
        e.stopPropagation();
        if (e.target.classList.contains('popup')) {
          popupFeedback.classList.remove('popup__feedback-open');
          body.classList.remove('lock');
        } else {
          return;
        }
      }
    }
  }
  // закрытие попапов
  closePopup.forEach(el => {
    el.addEventListener('click', () => {
      popupFeedback.classList.remove('popup__feedback-open');
      popupDonate.classList.remove('popup__donate-open');
      popupCreditCart.classList.remove('popup__credit-cart-open');
      body.classList.remove('lock');
    });
  });
};
openPopups();

// caorusel hot it works
function caoruselHotItWorks() {
  const carouselList = document.querySelector('.carousel-section__body');
  const carouselItems = document.querySelectorAll('.carousel-section__item');
  const elems = Array.from(carouselItems);

  carouselList.addEventListener('click', function (event) {
    let newActive = event.target;
    update(newActive);
  });

  const update = function(newActive) {
    const newActivePos = newActive.dataset.pos;

    const current = elems.find((elem) => elem.dataset.pos == 0);
    const prev = elems.find((elem) => elem.dataset.pos == -1);
    const next = elems.find((elem) => elem.dataset.pos == 1);
    const first = elems.find((elem) => elem.dataset.pos == -2);
    const last = elems.find((elem) => elem.dataset.pos == 2);
    
    [current, prev, next, first, last].forEach(item => {
      var itemPos = item.dataset.pos;

      item.dataset.pos = getPos(itemPos, newActivePos)
    });
  };

  const getPos = function (current, active) { const diff = current - active;
    if (active == -2) {
      if (Math.abs(current - active) > 2 && Math.abs(current - active) < 4) {
        return -current - 1;
      } else if (Math.abs(current - active) > 3) {
        return -current + 1;
      }
    } else if (Math.abs(active) >= 2) {
      if (Math.abs(current - active) > 2 && Math.abs(current - active) < 4) {
        return -current + 1;
      } else if (Math.abs(current - active) > 3) {
        return -current - 1;
      }
    } else {
      if (Math.abs(current - active) > 2) {     return -current;
      } 
    }
    return diff;
    };
};
if (document.querySelector('body').classList.contains('home')) {
  caoruselHotItWorks();
};


// d-and-d map
function dragMap() {

  const imgMap = document.querySelector('.map__wrapper');
  const imgWrapper = document.querySelector('.section__map-wrapper');
  const wrapper = document.querySelector('.section__map');
  const header = document.querySelector('.header');
  const footer = document.querySelector('.footer');
  const btnMinusScaleMap = document.querySelector('.map-zoom-minus');
  const btnPlusScaleMap = document.querySelector('.map-zoom-plus');

  let count = 1;

  let topPosition = 0;
  let leftPosition = 0;

  function calculateCoords(e, elem) {
    let box = elem.getBoundingClientRect();
    topPosition = (e.pageY - box.top - pageYOffset);
    // e.pageY - расстояние от места клика до верху document
    // box.top - расстояние верхнего края элемента до верхнего края document
    leftPosition = (e.pageX - box.left);
  };

  function moveAt(e) {
    imgWrapper.style.left = e.pageX - leftPosition - wrapper.offsetLeft + 'px';
    if (e.pageX >= imgWrapper.offsetWidth) {
      stopDrag();
    } else if (e.pageX <= 0) {
      stopDrag();
    };
    imgWrapper.style.top = e.pageY - wrapper.offsetTop - topPosition + document.body.scrollTop + 'px';
  };

  function stopDrag() {
    document.removeEventListener('mousemove', moveAt);
    imgMap.removeEventListener('mouseup', stopDrag);
  }

  imgMap.addEventListener('mousedown', (e) => {
    if (imgMap.width <= (imgWrapper.offsetWidth + 18)) {
      return;
    };
    calculateCoords(e, imgWrapper);
    // moveAt(e);
    document.addEventListener('mousemove', moveAt);
    imgMap.addEventListener('mouseup', stopDrag);
  });

  header.addEventListener('mouseover', stopDrag);
  footer.addEventListener('mouseover', stopDrag);

  imgMap.ondragstart = function() {
    return false;
  };

  btnPlusScaleMap.addEventListener('click', () => {
    if (count >= 2) return;
    count += 0.2;
    imgMap.style.transform = `scale(${count})`;
  });
  btnMinusScaleMap.addEventListener('click', () => {
    if (count <= 1) return;
    count -= 0.2;
    imgMap.style.transform = `scale(${count})`;
  });

};
if (document.querySelector('.section__map')) {
  dragMap();
};



