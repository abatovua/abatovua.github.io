(function(){
	//creating Player objects
	var player1 = new Player('.player1');
	var name1;
	do {
		name1 = prompt('Player1 please enter your name');
	} while(!name1)

	player1.playerName = name1;
	player1.heading.innerHTML = player1.playerName;
	
	var player2 = new Player('.player2');
	var name2;
	
	do {
		name2 = prompt('Player2 please enter your name');
	} while(!name2)
	
	player2.playerName = name2;
	player2.heading.innerHTML = player2.playerName;

	document.querySelector('#tip').checked = true;
	console.dir(document.querySelector('input[name="tip"]'));
	
	//dragAndDrop handlers for each player with reference to playerObj in closure		
  	var dragAndDropHandler1 = dragAndDropHandlerWrapper(player1);
  	var dragAndDropHandler2 = dragAndDropHandlerWrapper(player2);

  	//init button handlers
  	var initGameButton1 = initGameButtonWrapper(player1, player2);
  	var initGameButton2 = initGameButtonWrapper(player2, player1);

	//d'n'd init
  	dndInit(player1);
  	dndInit(player2);

  	window.onresize = function() {
  		window.location.reload();
  	};

   	//avoiding html5 d'n'd
	document.ondragstart = function(){
		return false;
	};

	// ships rotating handler
	document.addEventListener('contextmenu', function(e){
		e.preventDefault();
		var elem = e.target;
		
		if(elem.matches('.deck')) {
			elem = elem.parentNode;
			
			if(!elem.dragged) {
				
				if(elem.getAttribute('data-direction') == 1) {
					elem.setAttribute('data-direction', '0');
				} else {
					elem.setAttribute('data-direction', '1');
				}
			}
		}
	});

	//helper function for getting element's coordinates in document
	function getCoords(elem) {
  		var box = elem.getBoundingClientRect();

  		return {
    		top: box.top + pageYOffset,
    		left: box.left + pageXOffset
  		};
	}
	
	//Player constructor
	function Player(selector) {
		this.heading = document.querySelector(selector + ' h2');
		this.main = document.querySelector(selector);
		this.workarea = document.querySelector(selector + ' ' + '.workarea');
		this.shipsViews = {
			'deck1': document.querySelectorAll(selector + ' ' + '.deck1'),
			'deck2': document.querySelectorAll(selector + ' ' + '.deck2'),
			'deck3': document.querySelectorAll(selector + ' ' + '.deck3'),
			'deck4': document.querySelectorAll(selector + ' ' + '.deck4')
		};
		this.preview = document.querySelector(selector + ' ' + '.preparation');
		this.initialize = document.querySelector(selector + ' ' + '.initialize');
		this.button = document.querySelector(selector + ' ' + 'button');
		this.cover = document.querySelector(selector + ' ' + '.cover');
		this.hit = 0;
		this.dataMap = [
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		];

		this.minLeft = getCoords(this.workarea).left;
		this.minTop = getCoords(this.workarea).top;
	}

	Player.prototype.ckeckShipstates = function() {
		var shipStates = 0;
		var ships = ['deck1', 'deck2', 'deck3', 'deck4'];

		for(var key in this.shipsViews) {
			
			if(ships.indexOf(key) >= 0) {
				
				for(var i = 0; i < this.shipsViews[key].length; i++) {
					if(this.shipsViews[key][i].dragged) {
						shipStates += 1;
					}
				}
				
			}
		}
		console.log(shipStates);
		return shipStates === 10;
	};

	Player.prototype.checkHits = function() {
		return this.hit === 20;
	};

	function initGameButtonWrapper(currentPlayer, enemyPlayer) {
		var player = currentPlayer,
			enemy = enemyPlayer;
		return function(e) {
			player.preview.style.display = 'none';
			player.initialize.style.display = 'none';
			
			for(var i = 0; i < player.dataMap.length; i++) {
				for(var j = 0; j < player.dataMap[i].length; j++) {
					if(player.dataMap[i][j] === 1) {
						enemy.workarea.children[i].children[j].classList.add('hit');
					} else {
						enemy.workarea.children[i].children[j].classList.add('miss');
					}
				}
			}

			if(+player.main.classList[0].slice(-1) === 2) {
				player.cover.style.display = 'flex';
				player.cover.style.top = player.minTop + 'px';
				enemy.active = true;
			} else {
				enemy.active = false;
			}

			enemy.workarea.addEventListener('click', function(e){
				var elem;
				var hitted = false;
				if(e.target.classList.contains('cell') && enemy.active) {
					elem = e.target;
				} else {
					return false;
				}
				
				if(elem.classList.contains('hit') && !elem.classList.contains('active')) {
					elem.classList.add('active');
					enemy.hit += 1;
					enemy.active = true;
					hitted = true;
				}

				if(elem.classList.contains('miss')) {
					elem.classList.add('active');
					enemy.active = false;
					player.active = true;
					
					setTimeout(function() {
						player.cover.style.display = 'none';
						enemy.cover.style.display = 'flex';
						enemy.cover.style.top = enemy.minTop + 'px';
					}, 300);

				}

				if(hitted) {
					if(enemy.checkHits()) {
						var winner = document.querySelector('.winner');
						var winnerName = enemy.playerName;
						winner.style.display = 'flex';
						winner.querySelector('h2').innerHTML = winnerName + ' WON!';
					}
				}
				
			});

		}
	}

	//d'n'd handler wrapper
	function dragAndDropHandlerWrapper(playerObj) {
		var player = playerObj;
		return function(e) {
			if(e.which == 1) {
				var current = this,
				coords = getCoords(current),
				shiftX = e.pageX - coords.left,
		  		shiftY = e.pageY - coords.top;

		  		
		  		function moveAt(e) {
		    		current.style.left = e.pageX - shiftX + 'px';
		   			current.style.top = e.pageY - shiftY + 'px';
		  		}

		  		function checkAndAdaptPosition() {
		  			var left = +current.style.left.slice(0, -2),
		  				top = +current.style.top.slice(0, -2),
		  				direction = +current.getAttribute('data-direction'),
		  				decks = current.decks;

		  				current.placed = current.placed || false;

		  			//helper function moving ship to the initial coordinates
		  			function moveToInit() {
		  				current.style.transition = 'all 0.5s linear';
		  				current.style.left = current.initCoords.left + 'px';
		  				current.style.top = current.initCoords.top + 'px';
		  				if(current.dragged) {
		  					current.dragged = false;
		  				}
		  				console.log(current.row + ' ' + current.cell);
		  				removeFromDataMap();
		  				current.placed = false;
		  				
		  				//dataMap control check while removing from data map
		  				for(var key in player.shipsViews) {
		  					for(var i = 0; i < player.shipsViews[key].length; i++) {
		  						if(player.shipsViews[key][i].dragged) {
		  							var left = +player.shipsViews[key][i].style.left.slice(0, -2),
						  				top = +player.shipsViews[key][i].style.top.slice(0, -2),
						  				direction = +player.shipsViews[key][i].getAttribute('data-direction'),
						  				decks = player.shipsViews[key][i].decks;
						  			var r = parseInt((top - player.minTop) / 30);
						  				c = parseInt((left - player.minLeft) / 30);

						  			if(direction === 0) {
						  				for(var j = c; j < c + decks; j++) {
						  					player.dataMap[r][j] = 1;
						  				}

						  			} else {
						  				for(var n = r; n < r + decks; n++) {
						  					player.dataMap[n][c] = 1;
						  				}
						  			}

						  			console.log(left + ' ' + top + ' ' + direction + ' ' + decks + ' ' + r + ' ' + c);

		  						}
		  					}
		  				}

		  				setTimeout(function() {
		  					current.style.transition = '';
		  					current.style.left = '';
		  					current.style.top = '';
		  					current.style.position = 'static';
		  				}, 500);
		  			}

		  			//cheking workarea margins	
		  			var less = (left < (player.minLeft - 15)) || (top < (player.minTop - 15)),
		  				more;

		  			if(direction === 0) {
		  				more = (left + 30 * decks > player.minLeft + 315) || (top + 30 > player.minTop + 315);
		  			} else if(direction === 1) {
		  				more = (left + 30 > player.minLeft + 315) || (top + 30 * decks > player.minTop + 315);
		  			}
		  			
		  			//if not in the worarea box - return to initcoords
		  			if(less || more) {
		  				moveToInit();
		  			} 
		  			//position adaptation logic if ship in the box area
		  			 else {

		  				var adaptedLeft,
		  					adaptedTop,
		  					offsetLeft,
		  					offsetTop;

		  				//rounding offsets according to the nearest cell
		  				if((left - player.minLeft) % 30 >= 15) {
		  					offsetLeft = Math.ceil((left - player.minLeft) / 30);
		  				} else {
		  					offsetLeft = Math.floor((left - player.minLeft) / 30);
		  				}
		  				
		  				if((top - player.minTop) % 30 >= 15) {
		  					offsetTop = Math.ceil((top - player.minTop) / 30);
		  				} else {
		  					offsetTop = Math.floor((top - player.minTop) / 30);
		  				}

		  				//operational position, to be checked
		  				adaptedLeft = (player.minLeft + offsetLeft * 30) + 'px';
		  				adaptedTop = (player.minTop + offsetTop * 30) + 'px';
		  				
		  				//checking and adapting position according to minLeft and minTop collisions
		  				if(+adaptedLeft.slice(0, -2) < player.minLeft) {
		  					adaptedLeft = (+adaptedLeft.slice(0, -2) + 30) + 'px';
		  					offsetLeft += 1;
		  				}

		  				if(+adaptedTop.slice(0, -2) < player.minTop) {
		  					adaptedTop = (+adaptedTop.slice(0, -2) + 30) + 'px';
		  					offsetTop += 1;
		  				}

		  				//checking and adapting position according to maxLeft and maxTop collisions
		  				if(direction === 0 && (+adaptedLeft.slice(0, -2) + decks * 30) > player.minLeft + 300) {
		  					adaptedLeft = (+adaptedLeft.slice(0, -2) - 30) + 'px';
		  					offsetLeft -= 1;
		  				}

		  				if(direction === 1 && (+adaptedLeft.slice(0, -2) + 30) > player.minLeft + 300) {
		  					adaptedLeft = (+adaptedLeft.slice(0, -2) - 30) + 'px';
		  					offsetLeft -= 1;
		  				}

		  				// function removing the ship from dataMap

		  				function removeFromDataMap() {
		  					var i;

		  					if(current.cell >= 0 && current.row >= 0 && current.placed && direction === 0) {
		  						for(i = current.cell; i <= current.cell + decks; i++) {
		  							player.dataMap[current.row][i] = 0;
		  						}

		  						current.cell = null;
		  						current.row = null;

		  					}

		  					if(current.cell >= 0 && current.row >= 0 && current.placed && direction === 1) {
		  						for(i = current.row; i <= current.row + decks; i++) {
		  							player.dataMap[i][current.cell] = 0;
		  						}

		  						current.cell = null;
		  						current.row = null;
		  					}

		  				}

		  				// function setting the ship into player.dataMap

		  				function setToDataMap() {
		  					var controllCounter = 0;
		  					var r;
		  					var c;


		  					//checking cells around
		  					if(direction === 0) {
		  						for(r = current.row - 1; r <= current.row + 1; r += 2) {
		  							for(c = current.cell - 1; c <= current.cell + decks; c++) {
		  								if(player.dataMap[r] && player.dataMap[r][c] && player.dataMap[r][c] === 1) {
		  									controllCounter += 1;
		  								}
		  							}
		  						}

		  						if(player.dataMap[current.row] && player.dataMap[current.row][current.cell - 1] && player.dataMap[current.row][current.cell - 1] === 1) {
		  							controllCounter += 1;
		  						}

		  						if(player.dataMap[current.row] && player.dataMap[current.row][current.cell + decks] && player.dataMap[current.row][current.cell + decks] === 1) {
		  							controllCounter += 1;
		  						}


		  					}

		  					if(direction === 1) {
		  						for(r = current.row - 1; r <= current.row + decks; r++) {
		  							for(c = current.cell - 1; c <= current.cell + 1; c += 2) {
		  								if(player.dataMap[r] && player.dataMap[r][c] && player.dataMap[r][c] === 1) {
		  									controllCounter += 1;
		  								}
		  							}
		  						}

		  						if(player.dataMap[current.row - 1] && player.dataMap[current.row - 1][current.cell] && player.dataMap[current.row - 1][current.cell] === 1) {
		  							controllCounter += 1;
		  						}

		  						if(player.dataMap[current.row + decks] && player.dataMap[current.row + decks][current.cell] && player.dataMap[current.row + decks][current.cell] === 1) {
		  							controllCounter += 1;
		  						}
		  					}

		  					//setting dataMap

		  					if(controllCounter === 0) {
		  						var i;

		  						if(direction === 0) {
		  							for(i = current.cell; i < current.cell + decks; i++) {
		  								player.dataMap[current.row][i] = 1;
		  							}
		  							current.placed = true;
		  						}

		  						if(direction === 1) {
		  							for(i = current.row; i < current.row + decks; i++) {
		  								player.dataMap[i][current.cell] = 1;
		  							}
		  							current.placed = true;
		  							
		  						}



		  					} else {
		  						moveToInit();
		  					}
		  					
		  				}

		  				removeFromDataMap();
		  				current.row = offsetTop;
		  				current.cell = offsetLeft;
						current.style.left = adaptedLeft;
		  				current.style.top = adaptedTop;
		  				current.dragged = true;
		  				setToDataMap();
		  						  				
					}//end-else



		  		}

		  		current.style.position = 'absolute';
		  		moveAt(e);

		  		document.onmousemove = function(e) {
		    		moveAt(e);
		  		};

		  		current.onmouseup = function() {
		    		checkAndAdaptPosition();
		    		
		    		if(player.ckeckShipstates()) {
		    			player.preview.classList.add('disabled');

		    			for(var i = 0; i < player.preview.children.length; i++) {
		    				player.preview.children[i].classList.add('disabled');
		    			}

		    			player.initialize.style.display = 'block';
		    			
		    			if(+player.main.classList[0].slice(-1) === 1) {
		    				player.button.addEventListener('click', initGameButton1);
		    			} else {
		    				player.button.addEventListener('click', initGameButton2);
		    			}

		    		} else {
		    			player.preview.classList.remove('disabled');

		    			for(var i = 0; i < player.preview.children.length; i++) {
		    				player.preview.children[i].classList.remove('disabled');
		    			}

		    			player.initialize.style.display = 'none';
		    			if(+player.main.classList[0].slice(-1) === 1) {
		    				player.button.removeEventListener('click', initGameButton1);
		    			} else {
		    				player.button.removeEventListener('click', initGameButton2);
		    			}
		    		}


		  					var a = '';
		  					for(var h = 0; h < player.dataMap.length; h++) {
		  						a += player.dataMap[h].toString() + '\n';
		  					}
		  					console.log(a);

		  					console.log(current.dragged + ' ' + current.placed);
		  					console.dir(current);
		    		
		    		document.onmousemove = null;
		    		current.onmouseup = null;

		  		};
		  	}
		};
  	}

  	//d'n'd initiation function
	function dndInit(plObj) {  	
	  	var handler;
	  	plObj.main.classList.contains('player1') ? handler = dragAndDropHandler1 : handler = dragAndDropHandler2;

	  	for(var key in plObj.shipsViews) {
	  		for(var i = 0; i < plObj.shipsViews[key].length; i++) {
	  			var currentShip = plObj.shipsViews[key][i];
	  			
	  			currentShip.initCoords = getCoords(currentShip);
	  			currentShip.decks = +currentShip.classList[0].slice(4);
	  			currentShip.dragged = false;
	  			currentShip.addEventListener('mousedown', handler);
	  		} 
	  	}
	}


})();

