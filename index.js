const score = document.querySelector('.score');
        const remain = document.querySelector('.remain');
        const startScreen = document.querySelector('.startScreen');
        const instruction = document.querySelector('.instruction'); 
        const gameArea = document.querySelector('.gameArea');
        const distance = document.querySelector('.distance');

        // console.log(gameArea);

        startScreen.addEventListener('click', start);

        let player ={speed: 5, score: 0, remain: 30000000000000, distance: 0};

        let keys = {ArrowUp: false, ArrowDown: false, ArrowLeft: false , ArrowRight: false}

        document.addEventListener('keydown', keyDown);
        document.addEventListener('keyup', keyUp);

        function keyDown(e){
            e.preventDefault();
            keys[e.key] = true;
        }

        function keyUp(e){
            e.preventDefault();
            keys[e.key] = false;
        }

// coolision function
        function isCollide(a,b){
            aRect  =a.getBoundingClientRect();
            bRect = b.getBoundingClientRect();

            return !((aRect.top>bRect.bottom) || (aRect.bottom<bRect.top) || (aRect.right<bRect.left) || (aRect.left>bRect.right))

        }



// function for move Lines
        function moveLines(){
            let lines = document.querySelectorAll('.lines');
            lines.forEach(function(item){
                if(item.y >=700){
                    item.y-=750;
                }
                item.y += player.speed;
                item.style.top = item.y + "px";
            })
        }

//  fucntion for end game if we have no fuel
        function endGame(){
            player.start = false;
            startScreen.classList.remove('hide');
            startScreen.innerHTML = "Game Over<br> Your final score is "+ player.score
+ "<br> Press here to restart the game"        }

        // function for move pumps
        function moveEnemy(car){
            let enemy = document.querySelectorAll('.enemy');
            enemy.forEach(function(item){
                if(isCollide(car,item)){
                    console.log("Boom Hit");
                    endGame();
                }
                if(item.y >=750){
                    item.y= -300;
                    item.style.left = Math.floor(Math.random()* 350) + "px";
                }
                item.y += player.speed;
                item.style.top = item.y + "px";
            })
        }


        // function for starting the game
        function gamePlay(){
            let car = document.querySelector('.car');
            let road = gameArea.getBoundingClientRect();


            if(player.start){

                moveLines();     
                moveEnemy(car);   
                if(keys.ArrowUp && player.y > (road.top+70)){player.y-=player.speed}
                if(keys.ArrowDown && player.y < (road.bottom -70)) {player.y+=player.speed}
                if(keys.ArrowLeft && player.x>0){player.x-=player.speed}
                if(keys.ArrowRight && player.x < (road.width-50)){player.x+=player.speed}
                car.style.top = player.y + "px";    
                car.style.left = player.x  + "px";

            window.requestAnimationFrame(gamePlay);
            // console.log(player.score++);
                player.score++;
                let ps  = player.score -1;
                score.innerText ="Score: "+ps;
                player.remain--;
                let fuel = player.remain; 
                player.distance++;
                remain.innerText = "Fuel Remainig: "+ fuel;
            distance.innerText = "Distance covered: "+ player.distance;
            }
        }


        function start(){
            // gameArea.classList.remove('hide');
            startScreen.classList.add('hide');
            instruction.classList.add('hide');
            gameArea.innerHTML ="";

            player.start = true;
            player.score = 0;
            window.requestAnimationFrame(gamePlay);

// function for creating 5 lines 
            for(x=0;x<5;x++){
                let moveLines = document.createElement('div');
                moveLines.setAttribute('class','lines');
                moveLines.y = (x*150);
                moveLines.style.top = moveLines.y + "px";
                gameArea.appendChild(moveLines);
            }

            let car = document.createElement('div');
            
            
            car.setAttribute('class','car');
            car.innerText = 'Hey, Car is here';
            gameArea.appendChild(car);

            player.x = car.offsetLeft;
            player.y = car.offsetTop;

            // function for creating pumps
            for(x=0;x<3;x++){
                let enemyCar = document.createElement('div');
                enemyCar.setAttribute('class','enemy');
                enemyCar.y = ((x+1)* 350)* -1;
                enemyCar.style.top = enemyCar.y + "px";
                enemyCar.style.background = 'blue';
                enemyCar.style.top = Math.floor(Math.random()) + "px";
                gameArea.appendChild(enemyCar);
            }

        }
