//version clean du programme

function startGame(playerName) {
	document.querySelector(".content").style.display="none";
	document.querySelector("#menu").style.display="none";
	
var config = {
        type: Phaser.AUTO,
        width: 3840,  //(2* 1920)
        height: 2160,  //(2*1080)
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
console.log(playerName);
	var player_name = playerName;
    var game = new Phaser.Game(config);

    var platforms;

    var score = 0;
	var scoreText;
	var level = 1;
	var levelText;
	var life = 3;

	var enemy;
	var player;
	var camera;  

	var teleporter;
	var gate;

	var heart_4_verif=false;
	var heart_recover_Maps_Bordeaux;

	var heart_1;
	var heart_2;
	var heart_3;
	var heart_4;

	var Bordeaux_exit = false ;


	var game_over;

    function preload ()
    {
   		//fond 
    	this.load.image('Bordeaux', 'assets/Bordeaux.jpg');
    	this.load.image('Lyon', 'assets/Lyon.jpg');
    	this.load.image('Montpellier', 'assets/Montpellier.jpg');
    	this.load.image('Paris', 'assets/Paris.jpg');

 		//different gate 
		this.load.image('teleporter','assets/portail.png');                  // to teleport         blue
	    this.load.image('gate_change_Maps','assets/portail_1.png');          // to change maps     	green 
	    this.load.image('gate_level_up','assets/portail_2.png');             // to level up         red
	    this.load.image('gate_end_game','assets/portail_3.png');             // to finish game      yelloww 

	    //objet game
	    this.load.image('ground', 'assets/platform.png');
	    this.load.image('star', 'assets/star.png');
	    this.load.image('bomb', 'assets/bomb.png');
	    this.load.image('heart','assets/heart.png');
	    
	    //character + affichage text gammeover or win 
	    this.load.image('win','assets/win.png');
	    this.load.image('gameover','assets/gameover.png');		    
	    this.load.spritesheet('dude','assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    }

    function create ()
    {
    	//create  different background
		this.add.image(0, 0, 'Bordeaux').setOrigin(0, 0);
		this.add.image(-5, 1080, 'Lyon').setOrigin(0, 0);
		this.add.image(1920, 1080, 'Montpellier').setOrigin(0, 0);
		this.add.image(1920, 0, 'Paris').setOrigin(0, 0);


		//Bordeaux  platform and teleporter
		//create teleporter in Maps Bordeaux
		teleporter =  this.physics.add.staticGroup();
		teleporter.create(1432, 140, 'teleporter').setScale(0.12).refreshBody();
		teleporter.create(1460, 960, 'teleporter').setScale(0.12).refreshBody();	


		//platforms separation 
		//platforms border
	    platforms = this.physics.add.staticGroup();
	    platforms.create(1918, 2180, 'ground').setDisplaySize(3868, 64).refreshBody();    // ground
	    platforms.create(1918, -27, 'ground').setDisplaySize(3868, 64).refreshBody();    // roof
	    platforms.create(3844, 1080, 'ground').setDisplaySize(16, 2160).refreshBody();  // border right
	    platforms.create(-8, 1070, 'ground').setDisplaySize(16, 2160).refreshBody();   // bordur left

        //separation of 4 Maps
		platforms.create(1920, 1075, 'ground').setDisplaySize(16, 2160).refreshBody(); // vertical  
		platforms.create(1918, 1080, 'ground').setDisplaySize(3868, 16).refreshBody(); // horizontal   



	    //createplatforms Bordeaux
	    platforms.create(170, 160, 'ground').setDisplaySize(340, 18).refreshBody();   // 1
		platforms.create(38, 650, 'ground').setDisplaySize(80, 18).refreshBody();     // 2
		platforms.create(96, 825, 'ground').setDisplaySize(200, 18).refreshBody();    // 3
		platforms.create(190, 475, 'ground').setDisplaySize(100, 18).refreshBody();   // 4
		platforms.create(200, 1005, 'ground').setDisplaySize(200, 18).refreshBody();  // 5
	    platforms.create(363, 427, 'ground').setDisplaySize(45, 18).refreshBody();    // 6
	    platforms.create(487, 865, 'ground').setDisplaySize(200, 18).refreshBody();   // 7
	    platforms.create(567, 300, 'ground').setDisplaySize(50, 18).refreshBody();    // 8
	    platforms.create(825, 300, 'ground').setDisplaySize(250, 18).refreshBody();   // 9
		platforms.create(807, 735, 'ground').setDisplaySize(150, 18).refreshBody();   // 10
	    platforms.create(1150, 220, 'ground').setDisplaySize(100, 18).refreshBody();  // 11
	  	platforms.create(1128, 570, 'ground').setDisplaySize(120, 18).refreshBody();  // 12
	    platforms.create(1150, 820, 'ground').setDisplaySize(150, 18).refreshBody();  // 13
	    platforms.create(1410, 375, 'ground').setDisplaySize(240, 18).refreshBody();  // 14
		platforms.create(1410, 730, 'ground').setDisplaySize(206, 18).refreshBody();  // 15
	    platforms.create(1725, 190, 'ground').setDisplaySize(150, 18).refreshBody();  // 16
	    platforms.create(1690, 480, 'ground').setDisplaySize(100, 18).refreshBody();  // 17
	    platforms.create(1725, 820, 'ground').setDisplaySize(150, 18).refreshBody();  // 18
	    platforms.create(1865, 660, 'ground').setDisplaySize(100, 18).refreshBody();  // 19

	    //create platforms Lyon

	    //create platforms Paris

	    //create platforms Montpellier


	    //create player 
	    player = this.physics.add.sprite(30, 1000, 'dude');    // 30 1050
		player.setDisplaySize(40,56);
		player.setBounce(0.2);
		player.setCollideWorldBounds(true);
		

		//animation player
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



		//create stars 
		stars = this.physics.add.group({
		    key: 'star',
		    repeat: 14,
		    setXY: { x: 30, y: 100, stepX: Math.random() * 110 }
		});

		stars.children.iterate(function (child) {

		    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

		});


		//physics for Bordeaux
		this.physics.add.collider(player, platforms);
		this.physics.add.collider(stars, platforms);
		this.physics.add.overlap(player, stars, collectStar, null, this);
		this.physics.add.overlap(player, teleporter, teleport, null, this);

		//physics for Lyon

		//physics for Paris

		//physic for Montpellier


		//text score and level
		scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '38px', fill: '#00f' });
		levelText = this.add.text(16, 50, 'Niveau: 1', { fontSize: '38px', fill: '#00f' });
		
		//create life player
		heart_1 = this.add.image(600, 30, 'heart').setScale(0.14);             
		heart_2 = this.add.image(650, 30, 'heart').setScale(0.14);
		heart_3 = this.add.image(700, 30, 'heart').setScale(0.14);
		heart_4 = this.add.image(5750, 30, 'heart').setScale(0.14);

		//camera player
		camera = this.scene.scene.cameras.main;                    

		//create bomb
		bombs = this.physics.add.group();
		this.physics.add.collider(bombs, platforms);
		this.physics.add.collider(player, bombs, hitEnemy, null, this);



	}


    function update ()
    {
    	//console.log(player.x);    
    	//console.log(player.y);

    	//recovers keyboards
    	cursors = this.input.keyboard.createCursorKeys();
         

    	//postionnement camera, text score and level, life
		camera.centerOn(player.x, player.y-100).setSize(1920,1080);        

		heart_1.setPosition(player.x + 690, player.y - 580 );
		heart_2.setPosition(player.x + 770, player.y - 580 ); 
		heart_3.setPosition(player.x + 850, player.y - 580 );
				
		if(heart_4_verif==true)
		{
			heart_4.setPosition(player.x + 610, player.y - 580 );
		}

		scoreText.setPosition(player.x - 850, player.y - 580 );
		levelText.setPosition(player.x - 850 , player.y - 530 );      
                            

		//speed player with his animation
		if (cursors.left.isDown)
		{
		    player.setVelocityX(-200); //-160
		    player.anims.play('left', true);
		}
		else if (cursors.right.isDown)
		{
		    player.setVelocityX(200);  // 160
		    player.anims.play('right', true);
		}
		else
		{
		    player.setVelocityX(0);
		    player.anims.play('turn');
		}
		if (cursors.up.isDown && player.body.touching.down)
		{
		    player.setVelocityY(-650); //585
		}



		// create enemy on ground Maps Bordeaux
		if (level >= 3)
		{
			if(enemy.x >= 1870)
			{
				enemy.setVelocityX(-100);
			    enemy.anims.play('left', true);
			}	
			else if (enemy.x <= 30)
			{
				enemy.setVelocityX(100);
			    enemy.anims.play('right', true);
			}
		}
		
		// star following enemy 
		if(level >=4)
		{
			if(enemy.body.velocity.x  > 0)
			{
				starMove.x = enemy.x - 50;
			}
			if(enemy.body.velocity.x  < 0)
			{
				starMove.x = enemy.x + 50;
			}
		}
    }


	
		function collectStar (player, star)
	{
	    star.disableBody(true, true);
	    score += 10;
	    scoreText.setText('Score: ' + score);    

	    if (stars.countActive(true) == 0 )
	    {
	        stars.children.iterate(function (child) 
	        {

	        	if(child.y > 1050) 
	        	{
	            	child.enableBody(true, child.x, child.y, true, true);
	        	} 
	        	else if(child.y < 50) 
	        	{
	            	child.enableBody(true, child.x, child.y, true, true);
	        	} 
	        	else 
	        	{
					child.enableBody(true, Math.random()*1700, Math.random()*900, true, true);	        	
				}

	        });

	        level += 1;
	        levelText.setText('Niveau : ' + level);	

	        //create bomb in Bordeaux
	        if(Bordeaux_exit ==false)
	        {
	        	var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
		        var bomb = bombs.create(x, 16, 'bomb');
		        bomb.setBounce(1);
		        bomb.setCollideWorldBounds(true);
		        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
	        }

	        //create enemy in Maps Bordeaux
			if (level == 3)
			{
				enemy = this.physics.add.sprite(1870, 1050, 'dude');
				enemy.setBounce(0);
				enemy.setCollideWorldBounds(true);
				this.physics.add.collider(enemy, platforms);
				enemy.setTint(0x353535);
				this.physics.add.collider(player, enemy, hitEnemy, null, this);
				this.physics.add.overlap(enemy, stars, malusStar, null, this);
			} 

			//create one star following enemy 
			if (level == 4)
			{
				starMove = this.physics.add.sprite(1720, 1050, 'star');
				starMove.setBounce(0);
				starMove.setCollideWorldBounds(true);		
				stars.add(starMove);
			}

			//create bonus heart Maps Bordeaux 
			if(level == 6)
			{
				heart_recover_Maps_Bordeaux = this.physics.add.staticGroup();
				heart_recover_Maps_Bordeaux.create(700, 500, 'heart').setScale(0.1).refreshBody();
				this.physics.add.overlap(player, hearheart_recover_Maps_Bordeauxt_recover, Bonus_Heart_Maps_Bordeaux, null, this);
			}

			//create gate for the end game
			if(level == 8)
			{
				gate_end_game = this.physics.add.staticGroup();                                       
				gate_end_game.create(40, 80, 'gate_end_game').setScale(0.12).refreshBody();
				this.physics.add.overlap(player, gate_end_game, victory, null, this);
			}
		}
	}

	function teleport (player, teleporter)
	{
		if(player.x >=1425 &&   player.y <= 160)        //teleporter up
		{     
			player.x = 1410;
			player.y = 970;
		}
		else if(player.x >=1425  && player.y >= 950)    // teleporter down 
		{      
			player.x = 1410;
			player.y = 230; 
		}
	}


	function malusStar (enemy, star)   
	{
	    star.disableBody(true, true);
	    score -= 30;
	    scoreText.setText('Score: ' + score);
	    if (stars.countActive(true) == 0 )
	    {
	        stars.children.iterate(function (child) 
	        {

	        	if(child.y > 1050) 
	        	{
	            	child.enableBody(true, child.x, child.y, true, true);
	        	} 
	        	else if(child.y < 50) 
	        	{
	            	child.enableBody(true, child.x, child.y, true, true);
	        	} 
	        	else 
	        	{
					child.enableBody(true, Math.random()*1700, Math.random()*900, true, true);	        	
				}

	        });

	        level += 1;
	        levelText.setText('Niveau : ' + level);	

	         //create bomb in Bordeaux
	        if(Bordeaux_exit ==false)
	        {
	        	var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
		        var bomb = bombs.create(x, 16, 'bomb');
		        bomb.setBounce(1);
		        bomb.setCollideWorldBounds(true);
		        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
	        }

	        //create enemy in Maps Bordeaux
			if (level == 3)
			{
				enemy = this.physics.add.sprite(1870, 1050, 'dude');
				enemy.setBounce(0);
				enemy.setCollideWorldBounds(true);
				this.physics.add.collider(enemy, platforms);
				enemy.setTint(0x353535);
				this.physics.add.collider(player, enemy, hitEnemy, null, this);
				this.physics.add.overlap(enemy, stars, malusStar, null, this);
			} 

			//create one star following enemy 
			if (level == 4)
			{
				starMove = this.physics.add.sprite(1720, 1050, 'star');
				starMove.setBounce(0);
				starMove.setCollideWorldBounds(true);		
				stars.add(starMove);
			}

			//create bonus heart Maps Bordeaux 
			if(level == 6)
			{
				heart_recover_Maps_Bordeaux = this.physics.add.staticGroup();
				heart_recover_Maps_Bordeaux.create(700, 500, 'heart').setScale(0.1).refreshBody();
				this.physics.add.overlap(player, heart_recover_Maps_Bordeaux, Bonus_Heart_Maps_Bordeaux, null, this);
			}

			//create gate for the end game
			if(level == 8)
			{
				gate_end_game = this.physics.add.staticGroup();                                       
				gate_end_game.create(40, 80, 'gate_end_game').setScale(0.12).refreshBody();
				this.physics.add.overlap(player, gate_end_game, victory, null, this);
			}
		}
	}

	function hitEnemy (p, e)
	{
		life+=-1;

		if (level >= 3)
		{
			enemy.x=1870;
			enemy.y=1050;	
		}
			
		player.x=100;
		player.y=930;

		if(heart_4_verif ==false)
		{
			if (life==2)
			{
				heart_1.setTint(0x000000);
			}
			if (life==1)
			{
				heart_2.setTint(0x000000);
			}
			if (life==0)
			{
				heart_3.setTint(0x000000);
				this.physics.pause();
		   		player.setTint(0xff0000);
		    	player.anims.play('turn');
		    	if(level>=3)
		    	{
		    		enemy.anims.play('turn');
		    	}		
		    	gameOver = true;
				game_over = this.add.image(500, 40, 'gameover').setScale(0.75);
				game_over.setPosition(player.x , player.y-250);
		    	var timeout = window.setTimeout(time, 2500);
			}
		}

		if(heart_4_verif ==true){
			if (life==3){
			heart_1.setTint(0x000000);
			}
			if (life==2){
				heart_2.setTint(0x000000);
			}
			if (life==1){
				heart_3.setTint(0x000000);
			}
			if (life==0){
				heart_4.setTint(0x000000);
				this.physics.pause();
		   		player.setTint(0xff0000);
		    	player.anims.play('turn');
		    	if(level>=3){
		    		enemy.anims.play('turn');
		    	}		
		    		
		    	gameOver = true;
				game_over = this.add.image(500, 40, 'gameover').setScale(0.75);
				game_over.setPosition(player.x , player.y-250);
		    	var timeout = window.setTimeout(time, 2500);
			}
		}	
	}





	function Bonus_Heart_Maps_Bordeaux (player, heart_recover_Maps_Bordeaux) 
	{
		heart_recover_Maps_Bordeaux.disableBody(true, true);
		if(life==3){
			heart_4_verif =true;
		}
		else if (life ==2){
			heart_1.setTint(0xffffff)
		}
		else if (life==1){
			heart_2.setTint(0xffffff)
		}
		life+=1;
	}



		function time ()
	{
		fetch("https://api.deming.fr/scoring/7/put/"+player_name+"/"+score).then(function(response) 
		{ 
		   if(response.ok) 
		   {
		   		response.json().then(function(json) 
		   		{
					console.log(json);
					for(j in json) 
					{
						console.log(json[j].score);
		            }
				});
		   }
		});
			game.destroy(true);
		    document.querySelector(".content").style.display="flex";
		    document.querySelector("#menu").style.display="block";
	}



		function victory (player, gate_end_game)  
	{
		if(player.x <=45 && player.y <= 75)      
		{
			this.physics.pause();
		    player.anims.play('turn');
			gameOver = true;
			win = this.add.image(500, 40, 'win').setScale(0.75);
			win.setPosition(player.x , player.y-250);
			var timeout = window.setTimeout(time, 2500);
		}
	}


}