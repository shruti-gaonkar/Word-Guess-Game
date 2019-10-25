var win = 0;

/*function readTextFile(file)
{
    $.ajax(file, function(data) {
        do_something_with(data)
     }, 'text');
}*/

var game = {
    initialiseData: function(){
        this.wordArr = [];
        this.word = '';
        this.noOfLettersInWord  = 0;
        this.guessesLeft = 0;
        this.match_point = 0;
        this.guessedLettersArr = [];
        this.spacePositionArr = [];
    },
    importMovies(){
        //readTextFile('C:/UCLA/homework/Word-Guess-Game/assets/file/movies.txt');
        this.wordArr.push("Cinderella", "Rupentzel", "Beauty and the Beast", "Bambi", "pocahonta", "Mulan");
    },
    getWordAndBlanks : function(){
        this.importMovies();

        /* get the word */
        this.word = this.wordArr[Math.floor(Math.random() * this.wordArr.length)];
        this.word = this.word.toLowerCase();

        /* get no of letters in a word */
        this.noOfLettersInWord = this.word.length;
        
        /* get no of guesses left */
        this.guessesLeft = this.word.length * 2;
        
        /* to display the blanks before word is guessed including spaces*/
        if(this.noOfLettersInWord>0){
            spacePosition = this.word.indexOf(' ');
            while (spacePosition !== -1) {
                this.spacePositionArr.push(spacePosition);
                spacePosition = this.word.indexOf(' ', spacePosition + 1);
            }
            for(var i=0;i<this.noOfLettersInWord;i++){
                if(this.spacePositionArr.includes(i)===true){
                    this.guessedLettersArr.push('**');
                }else{
                    this.guessedLettersArr.push('_');
                }
                
            }
        }
    },
    guessWord: function(key){
        console.log(this.word);
        var position = this.word.indexOf(key);
        //console.log(position);
        while (position !== -1) {
            this.guessedLettersArr.splice(position, 1, key);
            position = this.word.indexOf(key, position + 1);
        }
        if(this.guessedLettersArr.includes("_")===false){
            this.match_point++;
        }else{
            game.guessesLeft--;
        }
    }
}


document.onkeyup = function(){
    var letter = event.key.toLowerCase();
    if((letter && !game.word) || game.guessesLeft==0){
        game.initialiseData();
        game.getWordAndBlanks();
    }else if(game.guessesLeft>0 && letter!=' '){
        game.guessWord(letter);
    }

    if(game.match_point>0){
        game.initialiseData();
        game.getWordAndBlanks();
        win++;
        if(win>0)
        document.getElementById('win_id').textContent = win;
    }
    var guessedLetters = game.guessedLettersArr.toString();
    guessedLetters = guessedLetters.replace(/,/g, ' ');
    document.getElementById('word_id').textContent    = guessedLetters;
    document.getElementById('guesses_id').textContent = game.guessesLeft + " guesses left";
    
}
