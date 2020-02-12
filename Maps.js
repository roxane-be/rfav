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
	var vie = 3;
	var vieText;
	var enemy;
	var enemy_2;
	var player;
	var camera;  
	var teleporter;
	var gate;
	var nbr_star = Math.random() * 20;

	var heart4_verif=false;
	var heart_rec;

	var heart1;
	var heart2;
	var heart3;
	var heart4;

	var Bordeaux_left = false ;

	var key;

	var game_over;

    function preload ()
    {
   		//fond 
    	this.load.image('Bordeaux', 'assets/Bordeaux.jpg');
    	this.load.image('Lyon', 'assets/Lyon.jpg');
    	this.load.image('Montpellier', 'assets/Montpellier.jpg');
    	this.load.image('Paris', 'assets/Paris.jpg');

 		//different portail 
		this.load.image('teleporter','assets/portail.png');   // se teleporter       bleu
	    this.load.image('gate','assets/portail_1.png');       // passage de maps     vert 
	    this.load.image('door','assets/portail_2.png');       // monter de niveau    rouge
	    this.load.image('gate_end','assets/portail_3.png');   // terminer le jeu     jaune 

	    //objet jeu
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
    	//creation des différents background
		this.add.image(0, 0, 'Bordeaux').setOrigin(0, 0);
		this.add.image(-5, 1080, 'Lyon').setOrigin(0, 0);
		this.add.image(1920, 1080, 'Montpellier').setOrigin(0, 0);
		this.add.image(1920, 0, 'Paris').setOrigin(0, 0);


		//Bordeaux  platform and teleporter
		//creation teleporter dans Maps Bordeaux
		teleporter =  this.physics.add.staticGroup();
		teleporter.create(1432, 140, 'teleporter').setScale(0.12).refreshBody();
		teleporter.create(1460, 960, 'teleporter').setScale(0.12).refreshBody();	


		//platforms de séparation 
		//platforms de cadre
	    platforms = this.physics.add.staticGroup();
	    platforms.create(1918, 2180, 'ground').setDisplaySize(3868, 64).refreshBody();    // sol
	    platforms.create(1918, -27, 'ground').setDisplaySize(3868, 64).refreshBody();    // toit
	    platforms.create(3844, 1080, 'ground').setDisplaySize(16, 2160).refreshBody();  // bordur droit
	    platforms.create(-8, 1070, 'ground').setDisplaySize(16, 2160).refreshBody();   // bordur gauche

        //séparation des 4 Maps
		platforms.create(1920, 1075, 'ground').setDisplaySize(16, 2160).refreshBody(); // verticale   16. 2160 
		platforms.create(1918, 1080, 'ground').setDisplaySize(3868, 16).refreshBody(); // horizontale    3868.16 3768



	    //creation platforms Bordeaux
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

	    //creation platforms Lyon

	    //creation platforms Paris

	    //creation platforms Montpellier


	    //creation player    taille 32px sur x et 48px sur y  
	    player = this.physics.add.sprite(30, 1000, 'dude');    // 30 1050
		player.setDisplaySize(40,56);
		player.setBounce(0.2);
		player.setCollideWorldBounds(true);
		

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



		// creation des stars 
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


		//texte score et niveau
		scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '38px', fill: '#00f' });
		levelText = this.add.text(16, 50, 'Niveau: 1', { fontSize: '38px', fill: '#00f' });
		
		//creation vie
		heart1 = this.add.image(600, 30, 'heart').setScale(0.14);             
		heart2 = this.add.image(650, 30, 'heart').setScale(0.14);
		heart3 = this.add.image(700, 30, 'heart').setScale(0.14);
		heart4 = this.add.image(5750, 30, 'heart').setScale(0.14);


		camera = this.scene.scene.cameras.main;                    

	
		bombs = this.physics.add.group();
		this.physics.add.collider(bombs, platforms);
		this.physics.add.collider(player, bombs, hitEnemy, null, this);



	}


    function update ()
    {
    	//console.log(player.x);    
    	//console.log(player.y);
    	cursors = this.input.keyboard.createCursorKeys();
                            
		camera.centerOn(player.x, player.y-100).setSize(1920,1080);        

		heart1.setPosition(player.x + 690, player.y - 580 );
		heart2.setPosition(player.x + 770, player.y - 580 ); 
		heart3.setPosition(player.x + 850, player.y - 580 );
				
		if(heart4_verif==true)
		{
			heart4.setPosition(player.x + 610, player.y - 580 );
		}

		scoreText.setPosition(player.x - 850, player.y - 580 );
		levelText.setPosition(player.x - 850 , player.y - 530 );      
                            

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



		// creation d'un enemy qui sur le sol
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
		
		// star qui suit l'enemy du sol 
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

function heartplus (player, heart_rec) 
	{
		heart_rec.disableBody(true, true);
		if(vie==3){
			heart4_verif =true;
		}
		else if (vie ==2){
			heart1.setTint(0xffffff)
		}
		else if (vie==1){
			heart2.setTint(0xffffff)
		}
		vie+=1;
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

	        //creation bomb dans Bordeaux
	        if(Bordeaux_left==false)
	        {
	        	var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
		        var bomb = bombs.create(x, 16, 'bomb');
		        bomb.setBounce(1);
		        bomb.setCollideWorldBounds(true);
		        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
	        }

	        //creation d'un enemy Bordeaux
			if (level == 3)
			{
				enemy = this.physics.add.sprite(1870, 1050, 'dude');
				enemy.setBounce(0);
				enemy.setCollideWorldBounds(true);
				this.physics.add.collider(enemy, platforms);
				enemy.setTint(0x353535);
				this.physics.add.collider(player, enemy, hitEnemy, null, this);
				this.physics.add.overlap(enemy, stars, malusStar, null, this);
				//this.physics.add.overlap(enemy, stars, collectStar, null, this);
			} 

			//creation d'une étoile qui suit l'enemi Bordeaux
			if (level == 4)
			{
				starMove = this.physics.add.sprite(1720, 1050, 'star');
				starMove.setBounce(0);
				starMove.setCollideWorldBounds(true);		
				stars.add(starMove);
			}

			//creation d'un coeur supplémentaire
			if(level == 3)
			{
				heart_rec = this.physics.add.staticGroup();
				heart_rec.create(700, 500, 'heart').setScale(0.1).refreshBody();
				this.physics.add.overlap(player, heart_rec, /*vie, heart4_verif, heart1, heart2,*/ heartplus, null, this);
			}

			//creation d'un portail pour la fin du jeu 
			if(level == 2)
			{
				gate_end = this.physics.add.staticGroup();                                       
				gate_end.create(40, 80, 'gate_end').setScale(0.12).refreshBody();
				this.physics.add.overlap(player, gate_end, victory, null, this);
			}
		}
	}
		function time ()
	{
		fetch("https://api.deming.fr/scoring/7/put/"+player_name+"/"+score).then(function(response) { 
   if(response.ok) {
   		response.json().then(function(json) {
			console.log(json);
			for(j in json) {
				console.log(json[j].score);
            }
	});
   }
});
		game.destroy(true);
	    document.querySelector(".content").style.display="flex";
	    document.querySelector("#menu").style.display="block";
	}





	function malusStar (enemy, star)   // perte de score lorsque l'enemy touche une étoile     // meme function que collect star 
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

	        //creation bomb dans Bordeaux
	        if(Bordeaux_left==false)
	        {
	        	var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
		        var bomb = bombs.create(x, 16, 'bomb');
		        bomb.setBounce(1);
		        bomb.setCollideWorldBounds(true);
		        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
	        }

	        //creation d'un enemy Bordeaux
			if (level == 3)
			{
				enemy = this.physics.add.sprite(1870, 1050, 'dude');
				enemy.setBounce(0);
				enemy.setCollideWorldBounds(true);
				this.physics.add.collider(enemy, platforms);
				enemy.setTint(0x353535);
				this.physics.add.collider(player, enemy, hitEnemy, null, this);
				this.physics.add.overlap(enemy, stars, malusStar, null, this);
				//this.physics.add.overlap(enemy, stars, collectStar, null, this);
			} 

			//creation d'une étoile qui suit l'enemi Bordeaux
			if (level == 4)
			{
				starMove = this.physics.add.sprite(1720, 1050, 'star');
				starMove.setBounce(0);
				starMove.setCollideWorldBounds(true);		
				stars.add(starMove);
			}

			//creation d'un coeur supplémentaire
			if(level == 3)
			{
				heart_rec = this.physics.add.staticGroup();
				heart_rec.create(700, 500, 'heart').setScale(0.1).refreshBody();
				this.physics.add.overlap(player, heart_rec, heartplus, null, this);
			}

			//creation d'un portail pour la fin du jeu 
			if(level == 8)
			{
				gate_end = this.physics.add.staticGroup();                                       
				gate_end.create(40, 80, 'gate_end').setScale(0.12).refreshBody();
				this.physics.add.overlap(player, gate_end, victory, null, this);
			}
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
		    	if(level>=3){
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

function teleport (player, teleporter)
	{
		if(player.x >=1425 &&   player.y <= 160)        //teleporter en haut 
		{     
			player.x = 1410;
			player.y = 970;
		}
		else if(player.x >=1425  && player.y >= 950)    // teleporter en bas 
		{      
			player.x = 1410;
			player.y = 230; 
		}
	}
		function victory (player, gate_end)      //actuellement placé sur Bordeaux
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