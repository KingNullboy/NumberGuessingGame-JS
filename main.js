const { randint, input } = require("@kingnullboy/easyjs");
const fs = require("node:fs");

console.log("KingNullboy's JavaScript Number Guessing Game");

while (true) {
	const num = randint(1, 100);
	let guess = -1;

	if (!fs.existsSync("save.txt") || fs.statSync("save.txt").size == 0) {
		fs.writeFileSync("save.txt", "0,0");
	}
	let [plays, wins] = fs.readFileSync("save.txt", "utf8").split(",").map(Number);
	plays++;

	console.log(`You have played this game ${plays-1} time${plays-1 == 1 ? '' : 's'}, and won it ${wins} of those times for a total win rate of ${wins/Math.max(1,plays-1)*100}%.`)

	while (num != guess) {
		guess = Number(input("What is your guess of the secret number? (1-100)\n> "));

		if (!Number.isInteger(guess)) {
			console.log("Buddy, that's not a number. Defaulting to 50.");
			guess = 50;
		}

		if (guess < 1 || guess > 100) {
			console.log("That's not a number between 1 and 100. Can't you read?");
		} else if (guess > num) {
			console.log("That number is greater than the secret number.");
		} else if (guess < num) {
			console.log("That number is less than the secret number.");
		} else if (guess == num) {
			console.log("You win!");
			wins++;
			break;
		}
	}

	fs.writeFileSync("save.txt", `${plays},${wins}`);

	let again;
	while (true) {
		const again = input("Play again? (Y/n)\n> ");
		console.log(typeof again, again);
		if (!(again.toLowerCase().startsWith("y") || again.toLowerCase().startsWith("n"))) {
			console.log("That doesn't start with yes or no. Can't you read?");
			continue;
		}
		break;
	}
	if (again.toLowerCase().startsWith("y")) {
		continue;
	} else {
		break;
	}
}