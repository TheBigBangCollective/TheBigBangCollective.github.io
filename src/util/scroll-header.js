export function doScroll() {
	const header = document.querySelector('.header-fixed');
	const title = document.querySelector('.bb-title');
	if (window.scrollY > 10) {
		header.classList.add('header-scrolled');
		title.classList.add('bb-title-scrolled');
	} else {
		header.classList.remove('header-scrolled');
		title.classList.remove('bb-title-scrolled');
	}
}

export function initScrollHeader() {
    // At most once per frame, however fast scroll events arrive
    let queued = false;
    window.addEventListener('scroll', () => {
        if (queued) return;
        queued = true;
        requestAnimationFrame(() => { doScroll(); queued = false; });
    }, { passive: true });
	doScroll();
}