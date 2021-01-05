// eslint-disable-next-line no-unused-vars
class SliderCarousel {
    constructor({
        main, // блок слайдера
        wrap, // блок-обертка
        next, // кнопка след. слайд
        prev, // кнопка пред. слайд
        infinity = false,
        position = 0, // смещение слайда
        slidesToShow = 3, // кол-во отбражаемых слайдов
        responsive = []
    }) {

        if (!main || !wrap) {
            console.warn(`sloder-carusel: Необходимо 2 свойства, "main" и "wrap"!`);
        }

        this.main = document.querySelector(main);
        this.wrap = document.querySelector(wrap);
        this.slides = document.querySelector(wrap).children;
        this.next = document.querySelector(next);
        this.prev = document.querySelector(prev);
        this.slidesToShow = slidesToShow;
        this.options = {
            infinity,
            position,
            widthSlide: Math.floor(100 / this.slidesToShow),
            maxPos: this.slides.length - this.slidesToShow
        };
        this.responsive = responsive;
    }

    init() {
        this.addClass();
        this.addStyle();

        if (this.prev && this.next) {
            this.controlSlider();
            console.log(this.prev);
        } else {
            this.addArrows();
            this.controlSlider();
        }
        if (this.responsive) { this.responseInit(); }
    }

    addClass() {
        this.main.classList.add('glo-slider');
        this.wrap.classList.add('glo-slider__wrap');
        // Используем for of т.к. slides - HTMLCollection
        for (const item of this.slides) {
            item.classList.add('glo-slider__item');
        }
    }

    addStyle() {
        let style = document.getElementById('sliderCaruosel-style');
        if (!style) {
            style = document.createElement('style');
            style.id = 'sliderCaruosel-style';
        }
        // !important - директива нужно чтоб точно работало но лучше без нее (разобраться со стилями)
        style.textContent = `
            .glo-slider {
                overflow: hidden !important;
            }

            .glo-slider__wrap {
                display: flex !important;
                transition: transform 0.5s !important;
                will-change: transform !important;
            }

            .glo-slider__item {
                flex: 0 0 ${this.options.widthSlide}% !important;
                align-items: center;
                justify-content: center;
                display: flex !important;
                margin: auto 0 !important;
            }
        `;
        document.head.appendChild(style);
    }

    controlSlider() {
        //т.к. addEventListener транслирует свой this
        // необходимо либо привязать контекст нужного объекта
        // либо вызвать метод через стрелочную функцию
        this.prev.addEventListener('click', this.prevSlider.bind(this));
        this.next.addEventListener('click', () => this.nextSlider());
    }

    prevSlider() {
        if (this.options.infinity || this.options.position > 0) {
            --this.options.position;

            if (this.options.position < 0) {
                this.options.position = this.options.maxPos;
            }
            this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`;
        }
    }

    nextSlider() {
        if (this.options.infinity || this.options.position < this.options.maxPos) {
            ++this.options.position;

            if (this.options.position > this.options.maxPos) {
                this.options.position = 0;
            }
            this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`;
        }
    }

    addArrows() {
        this.prev = document.createElement('button');
        this.next = document.createElement('button');

        this.prev.className = 'glo-slider__prev';
        this.next.className = 'glo-slider__next';

        this.main.appendChild(this.prev);
        this.main.appendChild(this.next);

        const style = document.createElement('style');
        style.textContent = `
            .glo-slider__prev,
            .glo-slider__next {
                margin: 0 10px;
                border: 20px solid transparent;
                background: transparent;
            }

            .glo-slider__prev {
                border-right-color : #19b5fe;
            }
            .glo-slider__next {
                border-left-color : #19b5fe;
            }

            .glo-slider__prev:hover,
            .glo-slider__prev:focus,
            .glo-slider__next:hover,
            .glo-slider__next:focus {
                background: transparent;
                outline: transparent;
            }
        `;
        document.head.appendChild(style);
    }

    responseInit() {
        const slidesToShowDefault = this.slidesToShow,
            allResponse = this.responsive.map(item => item.breakpoint),
            maxResponse = Math.max(...allResponse),
            checkResponse = () => {
                const widthWindow = document.documentElement.clientWidth; // ширина экрана без скроллбара
                if (widthWindow < maxResponse) {
                    for (let i = 0; i < allResponse.length; i++) {
                        if (widthWindow < allResponse[i]) {
                            this.slidesToShow = this.responsive[i].slidesToShow;
                            this.options.widthSlide = Math.floor(100 / this.slidesToShow);
                            this.addStyle();
                        }
                    }
                } else {
                    this.slidesToShow = slidesToShowDefault;
                    this.options.widthSlide = Math.floor(100 / this.slidesToShow);
                    this.addStyle();
                }
            };
        checkResponse();
    }
}
