

























	var key_rec =false;



	function time ()
	{
		game.destroy(true);
	    document.querySelector(".content").style.display="flex";
	    document.querySelector("#menu").style.display="block";
	}




	function heartplus (player, heart) 
	{
		heart.disableBody(true, true);
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

	function malusStar (enemy, star)
	{
	    star.disableBody(true, true);
	    score += -30;
	    scoreText.setText('Score: ' + score);
	}


function malusStar (enemy, star, score,scoreText)   // perte de score lorsque l'enemy touche une étoile     // meme function que collect star 
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
			if(level == 6)
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