(() => {
    if (!window.app) {
        window.app = {};
    }

    if (!('modules' in window.app)) {
        window.app.modules = {};
    }

    if ('aside' in app.modules) {
        return;
    }

    /**
     * Creates a new Aside class.
     * @class
     */
    const Aside = function() {
        const self = this;

        /**
         * Get options for module
         */
        self.getOptions = () => {
            self.container = document.querySelector('.aside');
            self.wrapper = document.querySelector('.aside__wrapper');
            self.openBtn = document.querySelector('.aside_trigger');
            self.closeBtn = document.querySelector('.aside__close');
            self.startPosition = 0;
            self.currentPosition = 0;
            self.isGestureStarted = false;
        };

        /**
         * Add events listeners
         */
        self.setupListener = () => {
            self.container.addEventListener('click',  self.containerClick);

            self.openBtn.addEventListener('click', self.open);
            self.closeBtn.addEventListener('click', self.close);

            self.wrapper.addEventListener('pointerdown', self.onPointerDown);
            self.wrapper.addEventListener('pointermove', self.onPointerMove);
            self.wrapper.addEventListener('pointerup', self.onPointerUp);
        };

        /**
         * Close aside if click outside of aside
         * @param {Object} event
         */
        self.containerClick = event => {
            if (event.target === self.container) {
                self.close();
            }
        };

        /**
         * Open aside
         */
        self.open = () => {
            self.container.classList.add('aside_state_open');
        };

        /**
         * Close aside
         */
        self.close = () => {
            self.container.classList.remove('aside_state_open');
        };

        /**
         * Start drag gesture
         * @param {Object} event
         */
        self.onPointerDown = event => {
            self.currentPosition = self.startPosition = event.pageX;
            self.isGestureStarted = true;

            self.wrapper.setPointerCapture(event.pointerId);

            self.removeTransition();
        };

        /**
         * Move draggable element
         * @param {Object} event
         */
        self.onPointerMove = event => {
            if (!self.isGestureStarted) {
                return;
            }

            self.currentPosition = event.pageX;
            self.updatePosition();
        };

        /**
         * Stop drag
         * @param {Object} event
         */
        self.onPointerUp = event => {
            self.currentPosition = event.pageX;
            self.isGestureStarted = false;

            self.wrapper.releasePointerCapture(event.pointerId);

            self.addTransition();
            self.resetPosition();

            if (self.currentPosition - self.startPosition < -50) {

                self.close();

            } else {

                self.open();

            }
        };

        /**
         * Update wrapper translateX value
         */
        self.updatePosition = () => {
            requestAnimationFrame(() => {
                const diff = Math.min(10, self.currentPosition - self.startPosition);

                self.wrapper.style.transform = 'translateX(' + diff + 'px)';
            });
        };

        /**
         * Remove wrapper translateX value
         */
        self.resetPosition = () => {
            requestAnimationFrame(() => {
                self.wrapper.style.transform = '';
            });
        };

        /**
         * Add transition to aside
         */
        self.addTransition = () => {
            self.container.classList.add('aside_state_transition');
        };

        /**
         * Remove transition
         */
        self.removeTransition = () => {
            self.container.classList.remove('aside_state_transition');
        };

        /**
         * Init module
         */
        self.init = () => {
            self.getOptions();
            self.setupListener();
        };
    };

    window.app.modules.aside = new Aside();
})();
