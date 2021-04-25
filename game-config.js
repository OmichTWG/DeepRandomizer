startGame({
	fps: 60,
	canvas: {
		selector: '#canvas',
		background: '#000'
	},
	deps: {
		sprites: {
			root: 'sprites',
			content: {
				dirt: {
					dirt: animationArray(8, 'dirt', 'png'),
					dirtBack: 'dirt_back.png'
				},
				player: {
					player: 'player.png',
					heartEmpty: 'heart_empty.png',
					heartFull: 'heart_full.png',
					hp: 'hp.png',
					triangle: 'triangle.png'
				},
				weapons: {
					laser: animationArray(1, 'laser', 'png'),
					explosion: 'explosion.png'
				},
				enemies: {
					enemy: 'enemy.png',
					star: 'star.png',
					bullet: animationArray(1, 'bullet', 'png')
				}
			}
		},
		tiles: {
			root: 'tiles',
			content: {}
		},
		scripts: {
			root: 'scripts',
			content: [
				'methods.js',
				'globals.js',
				'effects.js',
				'gui.js'
			]
		},
		objects:{
			root: 'objects',
			content: {
				blocks: [
					'dirt.js'
				],
				control: [
					'generator.js',
					'camera.js',
					'control.js'
				],
				player: [
					'player.js',
					'hp.js',
					'triangle.js'
				],
				weapons: [
					'oneLine.js',
					'laser.js',
					'circleDamage.js',
					'explosion.js'
				],
				enemies: [
					'enemy.js',
					'star.js',
					'bullet.js'
				]
			}
		},
		rooms: {
			root: 'rooms',
			content: {
				"game-room": [
					'game-room.js',
					[
						['', 0]
					]
				]
			}
		},
		sounds: {
			root: 'sounds',
			content: {
				laser: 'laser.wav',
				explosion: 'explosion.wav',
				hurt: 'hurt.wav',
				win: 'win.wav',
				heart: 'heart.wav',
				music: 'music.mp3'
			}
		}
	},
	entryPoint: 'game-room',
	debug: {
		fps: false,
		colliders: false,
	}
});