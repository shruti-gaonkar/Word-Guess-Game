var win = 0;
var wordArr = [];
wordArr.push("cinderella", "rupentzel", "beauty and the beast", "bambi", "pocahonta", "mulan");

/*function readTextFile(file)
{
    $.ajax(file, function(data) {
        do_something_with(data)
     }, 'text');
}*/

var game = {
    initialiseData: function(){
        this.word = '';
        this.noOfLettersInWord  = 0;
        this.guessesLeft = 0;
        this.match_point = 0;
        this.guessedAllLetters = '';
        this.guessedLettersArr = [];
        this.spacePositionArr = [];
    },
    importMovies(){
        //readTextFile('C:/UCLA/homework/Word-Guess-Game/assets/file/movies.txt');
        //wordArr.push("cinderella", "rupentzel", "beauty and the beast", "bambi", "pocahonta", "mulan");
        //this.wordArr.push("Bambi");
    },
    getWordAndBlanks : function(){
        //this.importMovies();

        /* get the word */
        var word_position = Math.floor(Math.random() * wordArr.length);
        this.word = wordArr[word_position];
        this.word = this.word.toLowerCase();

        /* remove the word displayed in the game from the global array 
        so that it is not played again */
        console.log(wordArr.splice(word_position, 1));

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
                    this.guessedLettersArr.push("&nbsp;");
                }else{
                    this.guessedLettersArr.push('_');
                }
                
            }
        }
    },
    guessWord: function(key){
        //console.log(this.word);
        // is key was already pressed then dont show it again
        if(this.guessedAllLetters.indexOf(key) === -1) this.guessedAllLetters += key + ' ';

        var position = this.word.indexOf(key);
        //console.log(position);
        // if the guessed letter occurs multiple times the replace all blank positions
        // with that letter
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
        /* get new word and reset variables when page loads or after no guesses left 
        or after guessing word correctly  */
        game.initialiseData();
        game.getWordAndBlanks();
    }else if(game.guessesLeft>0 && letter!=' '){
        game.guessWord(letter);
    }
    
    if(game.match_point>0){
        // image name is stored without spaces
        var image_name = game.guessedLettersArr.join('');
        game.initialiseData();
        game.getWordAndBlanks();
        win++;
        if(win>0) document.getElementById('win_id').textContent = win;
    }

    /* letters are displayed with spaces */
    document.getElementById('word_id').innerHTML                    = game.guessedLettersArr.join(' ');
    document.getElementById('guesses_id').textContent               = game.guessesLeft + " guesses left";
    document.getElementById('guessed_all_letters_id').textContent   = game.guessedAllLetters;
    
    /* to display image after correct guess */
    if(image_name){
        document.getElementById("banner_id").src = "assets/images/" +  image_name +  ".jpg";
    }
}
