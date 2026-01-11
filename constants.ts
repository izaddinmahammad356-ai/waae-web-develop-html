import { Scene } from './types';

export const SCRIPT_SCENES: Scene[] = [
  {
    id: 1,
    title: "Seensa",
    durationLabel: "0:00–0:10",
    text: "Video kana keessatti, akkamitti HTML irratti video akka kaa'an, faa'iidaa isaa fi fakkeenya adda addaa ni ilaalla.",
    visualType: 'intro',
  },
  {
    id: 2,
    title: "Simple Video Tag",
    durationLabel: "0:10–0:25",
    text: "Tag'n <video> controls, poster, fi source adda addaa qabaachuu danda'a. Browser-oota garaa garaaf MP4, WebM fi Ogg fayyadamna.",
    visualType: 'code',
    visualData: {
      code: `<video controls width="720" poster="poster.jpg">
  <source src="video.mp4" type="video/mp4">
  <source src="video.webm" type="video/webm">
  <track kind="subtitles" src="captions.vtt" default>
  <a href="video.mp4">Video buufadhu</a>
</video>`
    }
  },
  {
    id: 3,
    title: "Responsive Video",
    durationLabel: "0:25–0:40",
    text: "Bilbilaa fi kompiitara irratti video'n akka sirriitti mul'atuuf, CSS fayyadamnee 'aspect ratio' eeguu qabna. Kunis 'padding-top' percentiin shallagama.",
    visualType: 'code',
    visualData: {
      code: `.video-wrap {
  position: relative;
  padding-top: 56.25%; /* 16:9 */
}
.video-wrap video {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
}`
    }
  },
  {
    id: 4,
    title: "YouTube Embed",
    durationLabel: "0:40–0:50",
    text: "Yoo video YouTube irraa fiduu barbaadde, `iframe` tag fayyadamta. Kunis salphaa fi 'responsive' ta'uu danda'a.",
    visualType: 'code',
    visualData: {
      code: `<div class="video-wrap">
  <iframe
    src="https://www.youtube.com/embed/VIDEO_ID"
    allowfullscreen>
  </iframe>
</div>`
    }
  },
  {
    id: 5,
    title: "Captions (VTT)",
    durationLabel: "0:50–1:00",
    text: "Subtitles ykn captions dabalachuuf file `.vtt` fayyadamna. Kunis sa'aatii fi barruu agarsiisu qabata.",
    visualType: 'code',
    visualData: {
      code: `WEBVTT

00:00:00.000 --> 00:00:04.000
Baga nagaan dhuftan.

00:00:04.500 --> 00:00:08.000
Barnoota kanarratti viidiyoon akkana jedhu.`
    }
  },
  {
    id: 6,
    title: "Gorsa Dabalataa",
    durationLabel: "1:00–1:15",
    text: "Autoplay yoo barbaadde 'muted' fi 'playsinline' dabali. Accessibility'f 'aria-label' fi 'track' fayyadami.",
    visualType: 'illustration',
  },
  {
    id: 7,
    title: "Xumura",
    durationLabel: "1:15–1:20",
    text: "Amma video HTML keessaatti akkamitti akka kaa'an baratteetta. Subscribe gochuu hin irraanfatin!",
    visualType: 'outro',
  },
];