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
            self.openBtn = document.querySelector('.aside_trigger');
            self.closeBtn = document.querySelector('.aside__close');
        };

        /**
         * Add events listeners
         */
        self.setupListener = () => {
            self.openBtn.addEventListener('pointerdown', self.open);
            self.closeBtn.addEventListener('pointerdown', self.close);
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
         * Add transition to aside
         */
        self.addTransition = () => {

        };

        /**
         * Remove transition
         */
        self.removeTransition = () => {

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
