// Video helpers shared by the hero, the festival galleries and Backstage.
//
// Every site video has an adaptive (HLS) copy at <CDN>/hls/<slug>/hd.m3u8,
// made from the original and offering 720p and 1080p only, so playback always
// starts sharp. Browsers that play HLS themselves (Safari, iPhone, recent
// Chrome) get it, so quality follows the connection; others get the plain MP4.

const CDN = 'https://d18az0o70pr8ah.cloudfront.net';

/** "Rototom 2025.mp4" -> "rototom-2025"; also names the poster in src/assets/posters */
export function videoSlug(url) {
  const base = decodeURIComponent(url.split('/').pop().replace(/\+/g, ' ')).replace(/\.[^.]+$/, '');
  return base.replace(/[^A-Za-z0-9]+/g, '-').replace(/^-|-$/g, '').toLowerCase();
}

export function hlsUrl(url) {
  return `${CDN}/hls/${videoSlug(url)}/hd.m3u8`;
}

/** The adaptive copy if this browser can play it, otherwise the MP4. */
export function bestSource(mp4, hls) {
  const canHls = hls && document.createElement('video').canPlayType('application/vnd.apple.mpegurl');
  return canHls ? hls : mp4;
}
