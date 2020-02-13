function startGame() {
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
    var game = new Phaser.Game(config);
    var platforms;
    var score = 0;
	var scoreText;
	var level_Maps_1 = 1;
	var level_Maps_2 = 1;
	var levelText;
	var vie = 3;
	var vieText;
	var enemy;
	var enemy_2;
	var player;
	var camera;  
	var teleporter;
	var gate;
	var nbr_star = Math.random() * 20;

	var level_Maps_2 = 1;

	var heart4_verif=false;
	var heart_rec;

	var heart1;
	var heart2;
	var heart3;
	var heart4;

	var Bordeaux_left = false ;

	var key;
	var key_rec =false;


	var game_over;

    function preload ()
    {
    	this.load.image('sky', 'assets/sky.png');
    	this.load.image('fond','assets/fond jvs.jpg');
    	this.load.image('Bordeaux', 'assets/Bordeaux.jpg');
    	this.load.image('Lyon', 'assets/Lyon.jpg');
    	this.load.image('Montpellier', 'assets/Montpellier.jpg');
    	this.load.image('Paris', 'assets/Paris.jpg');
 
		this.load.image('teleporter','assets/portail.png');   // se teleporter       bleu
	    this.load.image('gate','assets/portail_1.png');       // passage de maps     vert 
	    this.load.image('door','assets/portail_2.png');       // monter de niveau    rouge
	    this.load.image('gate_end','assets/portail_3.png');   // terminer le jeu     jaune 


	    this.load.image('ground', 'assets/platform.png');
	    this.load.image('star', 'assets/star.png');
	    this.load.image('bomb', 'assets/bomb.png');
	    this.load.image('heart','assets/heart.png');
	    this.load.image('key', 'assets/key.png');
	    this.load.image('doorLock','assets/door_lock.png');
	    this.load.image('laser', 'assets/laser.png');

	    this.load.image('win','assets/win.png');
	    this.load.image('gameover','assets/gameover.png');		    
	    this.load.spritesheet('dude','assets/dude.png', { frameWidth: 32, frameHeight: 48 });
	    
    }

    function create ()
    {
    	
    	//creation background
		//this.add.image(0, 0, 'sky').setDisplaySize(2970, 2800);
		this.add.image(0, 0, 'Bordeaux').setOrigin(0, 0);
		this.add.image(-5, 1080, 'Lyon').setOrigin(0, 0);
		this.add.image(1920, 1080, 'Montpellier').setOrigin(0, 0);
		this.add.image(1920, 0, 'Paris').setOrigin(0, 0);

		//creation teleporter dans Maps Bordeaux
	/*	teleporter =  this.physics.add.staticGroup();
		teleporter.create(1432, 140, 'teleporter').setScale(0.12).refreshBody();
		teleporter.create(1460, 960, 'teleporter').setScale(0.12).refreshBody();	*/


		
	    platforms = this.physics.add.staticGroup();
	    platforms.create(1918, 2180, 'ground').setDisplaySize(3868, 64).refreshBody();    // sol
	    platforms.create(1918, -27, 'ground').setDisplaySize(3868, 64).refreshBody();    // toit

	    //creation platforms bordeau
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




	  	//creation plateforms Lyon
	  	platforms.create(500, 1300, 'ground').setDisplaySize(500, 18).refreshBody(); 
	  	platforms.create(520, 1600, 'ground').setDisplaySize(1040, 18).refreshBody(); 
	  	platforms.create(840, 1825, 'ground').setDisplaySize(1500, 18).refreshBody(); 
	  	platforms.create(100, 2050, 'ground').setDisplaySize(200, 18).refreshBody(); 
	  	platforms.create(1830, 2050, 'ground').setDisplaySize(170, 18).refreshBody(); 


	  	//creation platforms Paris
	  	platforms.create(2883, 900, 'ground').setDisplaySize(170, 18).refreshBody(); 





	    platforms.create(3844, 1080, 'ground').setDisplaySize(16, 2160).refreshBody();  // bordur droit
	    platforms.create(-8, 1070, 'ground').setDisplaySize(16, 2160).refreshBody();   // bordur gauche
	    

        

        //séparation des 4 Maps
		platforms.create(1920, 1075, 'ground').setDisplaySize(16, 2160).refreshBody(); // verticale   16. 2160 
		platforms.create(1918, 1080, 'ground').setDisplaySize(3768, 16).refreshBody(); // horizontale    3868.16 3768


		gate = this.physics.add.staticGroup();
		gate.create(40, 80, 'teleporter').setScale(0.12).refreshBody().setTint(0xffff00);	//Bordeaux
		gate.create(30, 2100, 'teleporter').setScale(0.12).refreshBody().setTint(0xffff00); //lyon
		gate.create(2883, 609, 'teleporter').setScale(0.12).refreshBody().setTint(0xffff00); //Paris
		gate.create(2883, 2000, 'teleporter').setScale(0.12).refreshBody().setTint(0xffff00); //MontPellier
		
			
		door = this.physics.add.staticGroup();
		door.create(1860,2100, 'door').setScale(0.12).refreshBody();

       /*
		gate_end = this.physics.add.staticGroup();                                       
		gate_end.create(40, 80, 'gate_end').setScale(0.12).refreshBody();
        */

	    //creation player    taille 32px sur x et 48px sur y  
	    player = this.physics.add.sprite(30, 1050, 'dude');    // 30 1050
		//player.setDisplaySize(50,75);
		player.setBounce(0.2);
		player.setCollideWorldBounds(true);
		this.physics.add.collider(player, platforms);
		

		//son animation
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
		/*for (var i = 1; i <= 8; i++) {
			stars = this.physics.add.group();
			stars.create(Math.random()*1900, Math.random()*1000, 'star')

			this.physics.add.collider(stars, platforms);

			this.physics.add.overlap(player, stars, collectStar, null, this);
	
		}*/


	/*	stars = this.physics.add.group({
		    key: 'star',
		    repeat: 1,
		    setXY: { x: 18, y: Math.random() * 50, stepX: Math.random() * 105 }
		});

		stars.children.iterate(function (child) {

		    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

		});*/

		//this.physics.add.collider(stars, platforms);
		//this.physics.add.overlap(player, stars, collectStar, null, this);
	

		//texte score et niveau
		scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });
		levelText = this.add.text(16, 50, 'Niveau: 1', { fontSize: '32px', fill: '#000' });
		
		//creation vie
		heart1 = this.add.image(600, 30, 'heart').setScale(0.1);             
		heart2 = this.add.image(650, 30, 'heart').setScale(0.1);
		heart3 = this.add.image(700, 30, 'heart').setScale(0.1);
		heart4 = this.add.image(5750, 30, 'heart').setScale(0.1);
		
		//this.physics.add.overlap(player, teleporter, teleport, null, this);
		this.physics.add.overlap(player, gate, Passage_Maps, null, this);
		this.physics.add.overlap(player, door, levelplus, null, this);
		//this.physics.add.overlap(player, gate_end, victory, null, this);


		key = this.physics.add.staticGroup();
		key.create(600, 1650, 'key').setScale(0.1).refreshBody();
		this.physics.add.overlap(player, key,  key_get , null, this);


		doorLock = this.physics.add.staticGroup();
	    doorLock.create(1775, 2103, 'ground').setDisplaySize(60,90).refreshBody();
	    doorLock.setTint(0x000000)
	    this.physics.add.collider(player, doorLock, door_lock , null, this);
	    


 		laser = this.physics.add.sprite(100, 1608, 'laser');
	    laser.setDisplaySize(15, 213);
		laser.setBounce(0);
		laser.setCollideWorldBounds(true);	
	    this.physics.add.collider(laser, platforms);

	    
	    //this.physics.add.collider(laser, player);
	    this.physics.add.overlap(player, laser, hitEnemy, null, this);

		camera = this.scene.scene.cameras.main;                    


	}


    function update ()
    {
    	
    	//console.log(player.x);
    	console.log(player.y);
    	cursors = this.input.keyboard.createCursorKeys();
                            
		camera.centerOn(player.x, player.y-100).setSize(1920,1080);        

		heart1.setPosition(player.x + 235, player.y - 520 );
		heart2.setPosition(player.x + 280, player.y - 520 ); 
		heart3.setPosition(player.x + 325, player.y - 520 );
				
		if(heart4_verif==true){
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
		    player.setVelocityX(-250); //-160
		    player.anims.play('left', true);
		}
		else if (cursors.right.isDown)
		{
		    player.setVelocityX(250);  // 160
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

	/*	bombs = this.physics.add.group();
		this.physics.add.collider(bombs, platforms);
		this.physics.add.collider(player, bombs, hitEnemy, null, this);*/


		// creation enemy plateform du haut 
		/*if(level_Maps_1 >= 2){
			if (enemy_2.x <= 540){
				enemy_2.setVelocityX(80);
	   			enemy_2.anims.play('right', true);
			}
			if(enemy_2.x >= 900){
				enemy_2.setVelocityX(-80);
	    		enemy_2.anims.play('left', true);
			}
		}*/




		// creation d'un enemy qui court en bas (sol)
		/*if (level_Maps_1 >= 2){
			if(enemy.x >= 1870){
				enemy.setVelocityX(-100);
			    enemy.anims.play('left', true);
			}	
			else if (enemy.x <= 30){
				enemy.setVelocityX(100);
			    enemy.anims.play('right', true);
			}
		}*/
		
		// star qui suit l'enemy du sol 
	/*	if(level_Maps_1 >=3){
			if(enemy.body.velocity.x  > 0){
				starMove.x = enemy.x - 50;
			}
			if(enemy.body.velocity.x  < 0){
				starMove.x = enemy.x + 50;
			}
		}*/


		//vitesse laser
		if (laser.x <= 100)
		{
			laser.setVelocityX(150)
		}
		if (laser.x >= 1000)
		{
			laser.setVelocityX(-150)
		}

		//taille laser
		if (laser.x >= 200 && laser.x <= 900)
		{
			laser.setDisplaySize(15, 213);
			laser.y=1711;
		}

		else {
			laser.setDisplaySize(15, 50);
			laser.y=1790;
		}
		/*if (  laser.x <= 1000)
		{
			laser.setDisplaySize(15, 50);
			laser.y==1550; 
		}
		if  (laser.x >= 200 && laser.x <= 900){
			
			laser.y==1750; 
		}*/


    }

	
		/*function collectStar (player, star)
	{
	    star.disableBody(true, true);
	    score += 10;
	    scoreText.setText('Score: ' + score);    

	    if (stars.countActive(true) == 0 )
	    {
	        stars.children.iterate(function (child) {

	        	if(child.y > 1050) {
	            	child.enableBody(true, child.x, child.y, true, true);
	        	} 
	        	else {
					child.enableBody(true, Math.random()*1000, Math.random()*800, true, true);	        	}

	        });






	        if(Bordeaux_left==true){
	        	var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
		        var bomb = bombs.create(x, 16, 'bomb');
		        bomb.setBounce(1);
		        bomb.setCollideWorldBounds(true);
		        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
	        }
	      
	        level_Maps_1 += 1;
	        levelText.setText('Niveau : ' + level_Maps_1);	        

	        if(level_Maps_1 == 2){

	        	enemy_2 = this.physics.add.sprite(539, 10, 'dude');
				enemy_2.setBounce(0);
				enemy_2.setCollideWorldBounds(true);
				this.physics.add.collider(enemy_2, platforms);
				enemy_2.setTint(0x353535);
				this.physics.add.collider(player, enemy_2, hitEnemy, null, this);
				this.physics.add.overlap(enemy_2, stars, malusStar, null, this);
				
			}

			if (level_Maps_1 == 2){
				enemy = this.physics.add.sprite(1870, 1050, 'dude');
				enemy.setBounce(0);
				enemy.setCollideWorldBounds(true);
				this.physics.add.collider(enemy, platforms);
				enemy.setTint(0x353535);
				this.physics.add.collider(player, enemy, hitEnemy, null, this);
				this.physics.add.overlap(enemy, stars, malusStar, null, this);
			} 

			if (level_Maps_1 == 3){
				starMove = this.physics.add.sprite(1720, 1050, 'star');
				starMove.setBounce(0);
				starMove.setCollideWorldBounds(true);		
				stars.add(starMove);
			}

		/*	if(level_Maps_1 == 2){
				gate = this.physics.add.staticGroup();
				gate.create(40, 80, 'gate').setScale(0.12).refreshBody().setTint(0xffff00);	//Bordeaux
				gate.create(40, 2100, 'gate').setScale(0.12).refreshBody().setTint(0xffff00); //lyon
				gate.create(2883, 609, 'gate').setScale(0.12).refreshBody().setTint(0xffff00); //Paris
				gate.create(2883, 2000, 'gate').setScale(0.12).refreshBody().setTint(0xffff00); //MontPellier
				this.physics.add.overlap(player, gate, Passage_Maps_2, null, this);
			}*/

			/*if(level_Maps_1 == 6){
				heart_rec = this.physics.add.staticGroup();
				heart_rec.create(700, 500, 'heart').setScale(0.1).refreshBody();
				this.physics.add.overlap(player, heart_rec, heartplus, null, this);
			}
		}
	}
	*/
	
function Passage_Maps (player, gate){
	if(player.x <=45 && player.y <= 75){   // Bordeaux => Lyon
		player.x = 500;
		player.y = 1200;
		Bordeaux_left = true ;
		gate.disableBody(true, true);
	}
	else if (player.x <= 1865 && player.y >= 2050)   //Lyon => Paris
	{
		player.x = 2100;
		player.y = 950;
		gate.disableBody(true, true);
	}
	else if (player.x >= 2870 && player.y <= 570) // Paris => Montpellier 
	{
		player.x = 2100;
		player.y = 1900;
		gate.disableBody(true, true);
	}
	else if (player.x >= 2870 && player.y >= 1990)  // Montpellier => Bordeaux (fin jeu)
	{ 
		player.x = 100;
		player.y = 900;
		gate.disableBody(true, true);
	}
}


function levelplus (player, door){
	if(player.x >=1850 && player.y >= 2095){   //1860,2100

		level_Maps_1 += 1;
		level_Maps_2 += 1;
		levelText.setText('Niveau : ' + level_Maps_1);
		player.x = 500;
		player.y = 1200;
		key_rec=false;

	}
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

	function hitEnemy (p, e)
	{
		vie+=-1;

		if (level_Maps_1 >= 3){
			enemy.x=750;
			enemy.y=1050;	
		}
			
		player.x=100;
		player.y=930;

		if(heart4_verif ==false){
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
		    	if(level_Maps_1>=3){
		    		enemy.anims.play('turn');
		    	}		
		    	gameOver = true;
				game_over = this.add.image(500, 40, 'gameover').setScale(0.75);
				game_over.setPosition(player.x , player.y-250);
		    	var timeout = window.setTimeout(time, 2500);
			}
		}

		if(heart4_verif ==true){
			if (vie==3){
			heart1.setTint(0x000000);
			}
			if (vie==2){
				heart2.setTint(0x000000);
			}
			if (vie==1){
				heart3.setTint(0x000000);
			}
			if (vie==0){
				heart4.setTint(0x000000);
				this.physics.pause();
		   		player.setTint(0xff0000);
		    	player.anims.play('turn');
		    	if(level_Maps_1>=3){
		    		enemy.anims.play('turn');
		    	}		
		    		
		    	gameOver = true;
				game_over = this.add.image(500, 40, 'gameover').setScale(0.75);
				game_over.setPosition(player.x , player.y-250);
		    	var timeout = window.setTimeout(time, 2500);
			}
		}	
	}

}

