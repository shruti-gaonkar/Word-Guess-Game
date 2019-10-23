var game = {
    wordArr : [],
    word: '',
    noOfLettersInWord : 0,
    guessesLeft : 0,
    guessedLettersArr : [],
    spacePositionArr : [],
    wins : 0,
    initialiseWordData : function(){
        //this.wordArr.push("Cinderella", "Rupentzel", "Beauty and the Beast");
        this.wordArr.push("Beauty and the Beast");
        console.log(this.wordArr);
        this.word = this.wordArr[Math.floor(Math.random() * this.wordArr.length)];
        this.word = this.word.toLowerCase();
        this.noOfLettersInWord = this.word.length;
        console.log(this.word);
        this.guessesLeft = this.word.length * 2;
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
        game.guessesLeft--;
    }
}




document.onkeyup = function(){
    var letter = event.key.toLowerCase();
    if(letter && !game.word){
        game.initialiseWordData();
    }else if(game.guessesLeft>0 && letter!=' '){
        game.guessWord(letter);
    }


    var guessedLetters = game.guessedLettersArr.toString();
    //guessedLetters = guessedLetters.replace(/ /g, '   ');
    guessedLetters = guessedLetters.replace(/,/g, ' ');
    document.getElementById('word_id').textContent    = guessedLetters;
    document.getElementById('guesses_id').textContent = game.guessesLeft + " guesses left";
}

