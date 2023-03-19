import kaboom from "kaboom";

gameEnd = false;

const main = () => {

	const k = kaboom();
    gameEnd = false;
	
	k.setGravity(2400);
	k.loadSprite("mario", "sprites/player.png");
	k.loadSprite("block", "sprites/block.png");
	k.loadSprite("ground", "sprites/ground.png");
	k.loadSprite("enemy", "sprites/enemy.png");
	k.loadSprite("goal", "sprites/goal.png");
	k.loadSprite("item_block", "sprites/item_block.png");
	k.loadSprite("non_block", "sprites/non_block.png");
	// k.loadSprite("gameover", "sprites/gameover.png");
	

	// + 0 --------------> 1
	//	|
	//	|
	//	|
	//	|
	//	1

	const initGround = () => {
		k.add([
			k.pos(-100, 550),
			k.sprite("ground"),
			k.area(),
			k.scale(100, 10),
			k.body({isStatic: true}),
		]);
		
	};

	const goalXPos = 1200;
	const goal = k.add([
		"goal",
		k.pos(goalXPos - 200, 370),
		k.sprite("goal"),
		k.area(),
		k.scale(5)
	]);

	const initBlock = () => {
	     k.add([
			k.pos(400, 0),
			k.sprite("block"),
			k.area(),
			k.body(),
			k.scale(2)
		 ])
	};

	const initItemBlock = () => {
		k.add([
			k.pos(300, 450),
			k.sprite("item_block"),
			k.area(),
			k.body({isStatic: true}),
			k.scale(3)
		])
	}
	const spawnEnemy = () => {
		k.add([
			"enemy",
			k.pos(600 ,450),
			k.sprite("enemy"),
			k.area(),
			k.body(),
			k.scale(2),
			k.move(k.LEFT, 100),
			k.offscreen({destroy: true}),
		]);
	}

	const onGameOver = () => {
		k.add([
			k.text("gameover"),
		k.pos(k.center()),
	k.color(k.RED),]),
		k.destroy(mario);
		gameEnd = true;
	}

	const onGameClear = () => {
		alert("Game Clear!!");
		k.destroy(mario);
		gameEnd = true;
	}

	initGround();
	spawnEnemy();
	initBlock();
	initItemBlock();
	setInterval(spawnEnemy, 3000);

	const mario = k.add([
		k.pos(30, 450),
		k.sprite("mario"),
		k.area(),
		k.body(),
		k.scale(2),
		k.offscreen({distance: 64}),
	]);

	mario.onCollide("enemy", (enemy, collision) => {
		console.log({enemyPos: enemy.pos.y, marioPos: mario.pos.y});
		if (mario.pos.y + 20 < enemy.pos.y) {
			k.destroy(enemy);
		} else {
			onGameOver();
		}
	});

	mario.onUpdate(() => {
		if (goalXPos - 100 < mario.pos.x  && mario.pos.x < goalXPos + 100) {
			onGameClear();
		}
	})


	k.onKeyPress("space", () => {
		if (mario.isGrounded()) {
			mario.jump(1000);
		}
	});

	k.onKeyDown("d", () => {
		mario.move(300, 0);
	})

	k.onKeyDown("a", () => {
		mario.move(-300, 0);
	})
}

main();

// setInterval(() => {
// 	if (gameEnd){
// 		main()
// 	};
// }, 1000);
