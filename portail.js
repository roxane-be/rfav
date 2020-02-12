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

		//level_Maps_1 += 1;
		level_Maps_2 += 1;
		levelText.setText('Niveau : ' + level_Maps_1);
		player.x = 500;
		player.y = 1200;
		key_rec=false;

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
