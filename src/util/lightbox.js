// The full-screen photo and film viewer, used by every gallery on the site and
// the front-page hero. It's GLightbox (swipe/pinch on phones, keyboard on
// desktop) with Plyr for the film controls; both are downloaded the first time
// someone opens something, so pages stay light.
//
// Items: { type: 'image' | 'video', href, title?, portrait? }

import glightboxCss from 'glightbox/dist/css/glightbox.min.css?url';
import plyrCss from 'plyr/dist/plyr.css?url';

let ready;

// The stylesheets are added as plain <link>s on first use (the site inlines its
// own CSS, which doesn't work for styles loaded later). They go first in <head>
// so the site's own viewer styles (Lightbox.astro) still win.
function stylesheet(href) {
  return new Promise((resolve) => {
    const link = Object.assign(document.createElement('link'), { rel: 'stylesheet', href });
    link.onload = link.onerror = resolve;
    document.head.prepend(link);
  });
}

/** Start downloading the viewer early (e.g. on touch), so a tap opens it fast. */
export function preload() {
  load();
}

function load() {
  ready ??= Promise.all([
    import('glightbox'),
    import('plyr'),
    stylesheet(glightboxCss),
    stylesheet(plyrCss),
  ]).then(([glightbox, plyr]) => {
    // GLightbox would fetch Plyr from a CDN unless it's already on the page
    window.Plyr = plyr.default;
    return glightbox.default;
  });
  return ready;
}

// Portrait (phone-shot) films: as tall as 72% of the screen, leaving room
// for the caption underneath
function portraitWidth() {
  return `${Math.round(Math.min(window.innerWidth, window.innerHeight * 0.72 * 9 / 16))}px`;
}

/** Open the viewer on `items`, starting at `startAt`; `opener` gets focus back on close. */
export async function openGallery(items, startAt = 0, opener = null) {
  // Note this before anything moves focus
  const fromKeyboard = !!opener?.matches(':focus-visible');
  const GLightbox = await load();
  // The player takes one shape per viewer; a gallery only ever holds one
  // kind of film, so use portrait if its films are portrait
  const portrait = items.some((item) => item.type === 'video' && item.portrait);
  const viewer = GLightbox({
    elements: items.map((item) =>
      item.type === 'video'
        ? { type: 'video', source: 'local', href: item.href, title: item.title || '', width: item.portrait ? portraitWidth() : undefined }
        : { type: 'image', href: item.href, title: item.title || '' }
    ),
    startAt,
    loop: false,
    openEffect: 'fade',
    closeEffect: 'fade',
    slideEffect: 'slide',
    videosWidth: '1100px',
    autoplayVideos: true,
    plyr: {
      config: {
        iconUrl: '/plyr.svg',   // Plyr's icon sprite, copied from node_modules/plyr/dist
        ratio: portrait ? '9:16' : '16:9',
        // Phones and narrow portrait films: just the essentials, so each
        // control can be big enough to use
        controls: portrait || window.matchMedia('(max-width: 767px)').matches
          ? ['play-large', 'play', 'progress', 'current-time', 'mute', 'fullscreen']
          : ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'],
        hideControls: true,
        fullscreen: { enabled: true, iosNative: true },
        // no picture-in-picture: confusing here, and Safari adds its own button otherwise
        pip: false,
      },
    },
  });
  // Films start as soon as they open, phones included (GLightbox skips
  // autoplay on phones). If the browser won't allow sound without another
  // tap, start muted rather than sit still; the mute button shows it.
  const start = (index) => {
    const player = viewer.getSlidePlayerInstance(index);
    if (!player) return;
    // Also hide the browser's own picture-in-picture button
    player.media.disablePictureInPicture = true;
    Promise.resolve(player.play()).catch(() => {
      player.muted = true;
      player.play();
    });
  };
  // The viewer also loads the slides either side in the background; only the
  // one on screen should play
  viewer.on('slide_after_load', ({ slideIndex }) => {
    if (slideIndex === viewer.index) start(slideIndex);
  });
  // Arrowing to another slide: pause every film, then start the new one
  viewer.on('slide_changed', ({ current }) => {
    viewer.getAllPlayers && Object.values(viewer.getAllPlayers()).forEach((p) => p.pause());
    start(current.slideIndex);
  });

  // Lets the styles size portrait films to the screen height (Lightbox.astro),
  // and moves keyboard focus into the viewer so Tab doesn't wander behind it
  viewer.on('open', () => {
    document.querySelector('.glightbox-container .gclose')?.focus();
    document.querySelector('.glightbox-container')?.classList.toggle('is-portrait', portrait);
  });
  viewer.on('close', () => {
    // Keyboard users go back to where they were; mouse/touch users don't need
    // a focus outline left on the photo they clicked
    // (after the viewer's own close, which would otherwise keep its focus)
    setTimeout(() => {
      if (fromKeyboard) opener.focus();
      else document.activeElement?.blur?.();
    }, 0);
    setTimeout(() => viewer.destroy(), 400);
  });
  viewer.open();
}
