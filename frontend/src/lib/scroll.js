let lenisInstance = null;

export const setLenis = (lenis) => {
    lenisInstance = lenis;
};

export const scrollToId = (id) => {
    const el = document.querySelector(id);
    if (!el) return;
    if (lenisInstance) {
        lenisInstance.scrollTo(el, { offset: -80, duration: 1.4 });
    } else {
        el.scrollIntoView({ behavior: "smooth" });
    }
};
