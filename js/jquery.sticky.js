// Vanilla Sticky JS
document.addEventListener("DOMContentLoaded", () => {

  class StickyElement {
    constructor(el, options = {}) {
      this.el = el;
      this.options = Object.assign({
        topSpacing: 0,
        className: 'is-sticky',
        wrapperClassName: 'sticky-wrapper',
        getWidthFrom: null,
        widthFromWrapper: true,
        responsiveWidth: false
      }, options);

      this.wrapper = document.createElement('div');
      this.wrapper.className = this.options.wrapperClassName;
      this.el.parentNode.insertBefore(this.wrapper, this.el);
      this.wrapper.appendChild(this.el);

      this.el.style.width = this.getWidth() + 'px';
      this.wrapper.style.height = this.el.offsetHeight + 'px';

      this.currentTop = null;

      this.update = this.update.bind(this);
      this.resize = this.resize.bind(this);

      window.addEventListener('scroll', this.update);
      window.addEventListener('resize', this.resize);

      // initial position
      this.update();
    }

    getWidth() {
      if (this.options.getWidthFrom) {
        const source = document.querySelector(this.options.getWidthFrom);
        return source ? source.offsetWidth : this.el.offsetWidth;
      } else if (this.options.widthFromWrapper) {
        return this.wrapper.offsetWidth;
      } else {
        return this.el.offsetWidth;
      }
    }

    update() {
      const scrollTop = window.scrollY;
      const wrapperTop = this.wrapper.getBoundingClientRect().top + window.scrollY;
      let newTop = this.options.topSpacing;

      if (scrollTop > wrapperTop - this.options.topSpacing) {
        // stick
        if (this.currentTop !== newTop) {
          this.el.style.position = 'fixed';
          this.el.style.top = newTop + 'px';
          this.el.style.width = this.getWidth() + 'px';
          this.wrapper.classList.add(this.options.className);
          this.currentTop = newTop;
        }
      } else {
        // unstick
        if (this.currentTop !== null) {
          this.el.style.position = '';
          this.el.style.top = '';
          this.el.style.width = '';
          this.wrapper.classList.remove(this.options.className);
          this.currentTop = null;
        }
      }
    }

    resize() {
      if (this.currentTop !== null || this.options.responsiveWidth) {
        this.el.style.width = this.getWidth() + 'px';
      }
      this.wrapper.style.height = this.el.offsetHeight + 'px';
    }
  }

  // initialize all sticky elements
  document.querySelectorAll('.sticky').forEach(el => {
    const topSpacing = parseInt(el.dataset.top || 0);
    new StickyElement(el, { topSpacing });
  });

});
