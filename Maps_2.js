function startGame() {
	document.querySelector(".content").style.display="none";
	document.querySelector("#menu").style.display="none";

var config = {
        type: Phaser.AUTO,
        width: 2000,
        height: 900,
        physics: {
	        default: 'arcade',
	        arcade: {
	            gravity: { y: 900 },
	            debug: false // true met la place de l'objet et sa direction 
	        }
    	},
        scene: {
            preload: preload,
            create: create,
            update: update
        }
    }
    ;

console.log(config);
    var game = new Phaser.Game(config);
    var platforms;
    var score = 0;
	var scoreText;
	var level = 1;
	var levelText;
	var vie = 3;
	var vieText;
	var enemy;
	var enemy_2;
	var player;
	var camera;  
	var teleporter;
	var gate;

	var heart4_verif=false;
	var heart_rec;


	var heart1;
	var heart2;
	var heart3;
	var heart4;

	var game_over;



	var key_rec =false;

    function preload ()
    {
    	this.load.image('sky', 'assets/sky.png');
	    this.load.image('ground', 'assets/platform.png');
	    this.load.image('star', 'assets/star.png');
	    this.load.image('bomb', 'assets/bomb.png');
	    this.load.image('heart','assets/heart.png');
	    this.load.image('teleporter','assets/portail.png');
	    this.load.image('gameover','assets/gameover.png');		    
	    this.load.spritesheet('dude','assets/dude.png', { frameWidth: 32, frameHeight: 48 });

	    this.load.image('key','assets/key_1.png');
	    this.load.image('doorLock','assets/door_lock.png');
	    this.load.image('laser', 'assets/laser.png');		    



    }

    function create ()
    {
    	
    	//creation background
    	this.add.image(1000, 450, 'sky').setDisplaySize(4000, 1500).setTint(0xff0000);
		this.add.image(1000, 450, 'sky').setDisplaySize(2000, 970);
		//creation teleporter
	/*	teleporter =  this.physics.add.staticGroup();
		teleporter.create(700, 110, 'teleporter').setScale(0.12).refreshBody();
		teleporter.create(700, 840, 'teleporter').setScale(0.12).refreshBody();

		gate = this.physics.add.staticGroup();
		gate.create(1860, 440, 'teleporter').setScale(0.12).refreshBody().setTint(0xffff00);	//fin du niveau		
*/
		//creation platforms
	    platforms = this.physics.add.staticGroup();
	    platforms.create(1000, 912, 'ground').setDisplaySize(2032, 64).refreshBody();    // sol
	    platforms.create(1000, -37, 'ground').setDisplaySize(2032, 64).refreshBody();    // toit
	   /* platforms.create(600, 400, 'ground'); // platform en haut
	    platforms.create(115, 230, 'ground').setDisplaySize(230, 32).refreshBody();  // plus haut à gauche, accès unique par le portail
	    platforms.create(720, 220, 'ground');   // la plus haute, platforme enemy2
	    platforms.create(2008, 440, 'ground').setDisplaySize(16, 900).refreshBody();  // bordur    
	    platforms.create(-8, 440, 'ground').setDisplaySize(16, 900).refreshBody();   // bordur

		platforms.create(1700, 740, 'ground').setDisplaySize(300, 32).refreshBody();
		platforms.create(1600, 560, 'ground').setDisplaySize(200, 32).refreshBody();
*/

	    //creation player
	    player = this.physics.add.sprite(100, 850, 'dude');
		player.setBounce(0.2);
		player.setCollideWorldBounds(true);
		this.physics.add.collider(player, platforms);
		

		// animation
		this.anims.create({
		    key: 'left',
		    frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
		    frameRate: 10,
		    repeat: -1
		});

		this.anims.create({
		    key: 'turn',
		    frames: [ { key: 'dude', frame: 4 } ],
		    frameRate: 20
		});

		this.anims.create({
		    key: 'right',
		    frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
		    frameRate: 10,
		    repeat: -1
		});


		// creation des étoiles

		stars = this.physics.add.group({
		    key: 'star',
		    repeat: 16,
		    setXY: { x: 18, y: Math.random() * 50, stepX: 120 }
		});

		stars.children.iterate(function (child) {

		    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

		});

		this.physics.add.collider(stars, platforms);
		this.physics.add.overlap(player, stars, collectStar, null, this);

		//texte score et niveau
		scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#fff' });
		levelText = this.add.text(16, 50, 'Niveau: 1', { fontSize: '32px', fill: '#fff' });

		//creation vie
		heart1 = this.add.image(600, 30, 'heart').setScale(0.1);             
		heart2 = this.add.image(650, 30, 'heart').setScale(0.1);
		heart3 = this.add.image(700, 30, 'heart').setScale(0.1);
		heart4 = this.add.image(750, 30, 'heart').setScale(0.1);


		this.physics.add.overlap(player, teleporter, teleport, null, this);
		this.physics.add.overlap(player, gate, levelplus, null, this);



		key = this.physics.add.staticGroup();
		key.create(400, 700, 'key').setScale(0.2).refreshBody();
		this.physics.add.overlap(player, key,  key_get , null, this);


		doorLock = this.physics.add.staticGroup();
	    doorLock.create(500, 825, 'doorLock').setDisplaySize(115,220).refreshBody();
	    this.physics.add.collider(player, doorLock, door_lock , null, this);
	    this.physics.add.collider(stars, doorLock);



		laser = this.physics.add.sprite(400, 800, 'laser');
		laser.setBounce(0);
		laser.setCollideWorldBounds(true);	
	    this.physics.add.collider(laser, platforms);
	    //this.physics.add.collider(laser, player);
	    this.physics.add.overlap(player, laser, hitEnemy, null, this);





		camera = this.scene.scene.cameras.main;                      

	}

	function door_lock (player, doorLock)
	{
		if(key_rec==true)
		{
			doorLock.disableBody(true, true);
		}
	}


	function key_get (player, key)
	{
		key.disableBody(true, true);
		//doorLock.destroy(true,true);
		key_rec =true;
		key_poster = this.add.image(750, 30, 'key').setScale(0.1);
	        

	}


    function update ()
    {
    	
    	cursors = this.input.keyboard.createCursorKeys();

		camera.centerOn(player.x, player.y-200).setSize(800,700);

		heart1.setPosition(player.x + 235, player.y - 520 );
		heart2.setPosition(player.x + 280, player.y - 520 ); 
		heart3.setPosition(player.x + 325, player.y - 520 );
				

		if(heart4_verif==true)
		{
			heart4.setPosition(player.x + 370, player.y - 520 );
		}

		if (key_rec == true)
	    {
	        key_poster.setPosition (player.x +325 , player.y - 400);
	    }

		scoreText.setPosition(player.x - 380, player.y - 530 );
		levelText.setPosition(player.x - 380 , player.y - 490 );        

		if (cursors.left.isDown)
		{
		    player.setVelocityX(-160);
		    player.anims.play('left', true);
		}
		else if (cursors.right.isDown)
		{
		    player.setVelocityX(160);
		    player.anims.play('right', true);
		}
		else
		{
		    player.setVelocityX(0);
		    player.anims.play('turn');
		}
		if (cursors.up.isDown && player.body.touching.down)
		{
		    player.setVelocityY(-585);
		}

		bombs = this.physics.add.group();
		this.physics.add.collider(bombs, platforms);
		this.physics.add.collider(player, bombs, hitEnemy, null, this);

		if (laser.x <= 400)
		{
			laser.setVelocityX(100)
		}
		if (laser.x >= 600)
		{
			laser.setVelocityX(-100)
		}



		
    }

		function collectStar (player, star)
	{
	    star.disableBody(true, true);
	    score += 10;
	    scoreText.setText('Score: ' + score);
	    

	    if (stars.countActive(true) == 0 )
	    {
	        stars.children.iterate(function (child) {

	        	if(child.y > 500) {
	            	child.enableBody(true, child.x, child.y, true, true);
	        	} 
	        	else {
	            	child.enableBody(true, Math.random()*1000, Math.random()*800, true, true);
	        	}

	        });

	        if(level <= 7){
	        	var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
		        var bomb = bombs.create(x, 16, 'bomb');
		        bomb.setBounce(1);
		        bomb.setCollideWorldBounds(true);
		        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
	        }

	        level += 1;
	        levelText.setText('Niveau : ' + level);



		}

	}
	
	
	function hitEnemy (p, e)
	{
			vie+=-1;
			if (level >= 3){
				enemy.x=750;
				enemy.y=1050;	
			}
			
			player.x=100;
			player.y=850;
			if (vie==2){
				heart1.setTint(0x000000);
			}
			if (vie==1){
				heart2.setTint(0x000000);
			}
			if (vie==0){
				heart3.setTint(0x000000);
				this.physics.pause();
	   			player.setTint(0xff0000);
	    		player.anims.play('turn');
	    		if(level > 2){
	    		enemy.anims.play('turn');

	    		}

	    		gameOver = true;
				game_over = this.add.image(500, 40, 'gameover').setScale(0.75).setTint(0xff0000);
				game_over.setPosition(player.x , player.y-250);
	    		var timeout = window.setTimeout(time, 2500);
			}
	}

	function time ()
	{
		game.destroy(true);
	    document.querySelector(".content").style.display="flex";
	    document.querySelector("#menu").style.display="block";
	}


	function teleport (player, teleporter)
	{
			
			if(player.x >=698 && player.y >=836){
				player.x = 645;
				player.y = 150;
			}
			else if(player.x <=708 && player.y <= 100){
				player.x = 755;
				player.y = 842;
			}
	}

	function levelplus (){
		if(player.x >=1850 && player.y <= 450){
			level += 1;
			levelText.setText('Niveau : ' + level);
			player.x = 100;
			player.y = 850;
		}
	}

	function heartplus (player, heart) {
		heart.disableBody(true, true);
		heart4_verif =true;
		vie+=1;
	}

}