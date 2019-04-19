var hearts = 0;
var time = 0;
var havingFun = 0;
var rock = 0;
var totalTime = 0;
var found = 0;
var nutureTask = 0;
var foundPlay = 1;
var foundRockme = 1;




async function gotchiScore() {
	if (hearts >= 2) {
		await speak(buildString('Congratulations, you got', hearts, 'hearts.' ), true);
		if (hearts === 2) {
			await speak(buildString('you understand your robert ball'), true);
		}
		if (hearts === 1) {
			await speak(buildString('need little bot more practise to do it'), true);
		}
	} else {
		await speak(buildString('you just got', hearts, 'hearts.'), true);
		if (hearts === 0) {
			await speak(buildString('go and play more'), true);
		}
	}
}

async function startProgram() {
	setMainLed({ r: 255, g: 0, b: 13 });
	await speak(buildString('You robert ball is sharing feelings with you!!'), false);
	await strobe({ r: 255, g: 16, b: 26 }, 0.05, 45);
	setStabilization(false);
	setBackLed(255);
	for (var _i0 = 0; _i0 < 7; ++_i0) {
		while (!(found === 1)) {
			nutureTask = getRandomInt(1, 7);
			setMainLed({ r: 55, g: 0, b: 255 });
			await order();
			await delay(0.025);
		}
		found = 0;
		if ( foundPlay + foundRockme + 0 === 0) {
			await gotchiScore();
		}
		await delay(0.025);
	}
}


async function play() {
	await speak(buildString('Your ROBERT BALL wants to play. Throw him in the air an catch him'), true);
	time = getElapsedTime();
	while (!(getElapsedTime() - time >= 3)) {
		if (Math.sqrt((getAcceleration().x ** 2) + (getAcceleration().y ** 2) + (getAcceleration().z ** 2)) <= 0.5) {
			await yes();
			havingFun = 1;
		}
		await delay(0.025);
	}
	if (havingFun === 1) {
		await Sound.Personality.LaughNice.play(true);
		hearts = hearts + 1;
		await speak(buildString('Plus one for a total of', hearts, 'hearts'), true);
		await strobe({ r: 255, g: 0, b: 4 }, 0.07, hearts);
	} else {
		await Sound.Personality.Cry.play(true);
		await speak(buildString('You\'ve neglected your creature. You have', hearts, 'hearts'), true);
		await strobe({ r: 255, g: 0, b: 4 }, 0.07, hearts);
	}
	await delay(0.5);
}

async function rockMe() {
	await speak(buildString('Your robert ball wants attention, rock him forward or backward'), true);
	time = getElapsedTime();
	while (!(getElapsedTime() - time >= 3)) {
		if (Math.abs(getOrientation().pitch) >= 45) {
			await yes();
			rock = 1;
		}
		await delay(0.025);
	}
	if (rock === 1) {
		await Sound.Personality.LaughNice.play(true);
		hearts = hearts + 1;
		await speak(buildString('Plus one for a total of', hearts, 'hearts'), true);
		await strobe({ r: 255, g: 0, b: 4 }, 0.07, hearts);
	} else {
		await Sound.Personality.Cry.play(true);
		await speak(buildString('You\'ve neglected your creature. You have', hearts, 'hearts'), true);
		await strobe({ r: 255, g: 0, b: 4 }, 0.07, hearts);
	}
	await delay(0.5);
}

async function order() {
	if (nutureTask === 1) {
		if (foundPlay === 1) {
			foundPlay = 0;
			found = 1;
			await play();
		}
	}
	if (nutureTask === 2) {
		if (foundRockme === 1) {
			foundRockme = 0;
			found = 1;
			await rockMe();
		}
		}
	
}

async function yes() {
	await Sound.Effects.Ding.play(false);
	setMainLed({ r: 0, g: 255, b: 42 });
	await delay(1.5);
	setMainLed({ r: 255, g: 255, b: 255 });
}
