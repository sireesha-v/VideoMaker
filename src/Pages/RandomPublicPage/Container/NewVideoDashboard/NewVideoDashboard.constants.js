export const RENDER_OUTPUT = 'RENDER_OUTPUT';
export const RENDER_OUTPUT_STATUS = 'RENDER_OUTPUT_STATUS';

export const dummy = {
	timeline: {
		tracks: [
			{
				clips: [
					{
						"asset": {
							"type": "image",
							"src": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg"
						},
						"start": 0,
						"length": 4
					}, {
						"asset": {
							"type": "video",
							"src": "http://techslides.com/demos/sample-videos/small.mp4",
							"trim": 2
						},
						"start": 4,
						"length": 6
					}, {
						"asset": {
							"type": "audio",
							"src": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
						},
						"start": 6,
						"length": 10
					}
				]
			}
		]
	},
	"output": {
		"format": "mp4",
		"resolution": "sd"
	}
}
