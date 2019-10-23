var game = {
    wordArr : [],
    word: '',
    noOfLettersInWord : 0,
    guessesLeft : 0,
    guessedLettersArr : [],
    spacePositionArr : [],
    wins : 0,
    initialiseWordData : function(){
        this.wordArr.push("Cinderella", "Rupentzel", "Beauty and the Beast");

        this.word = this.wordArr[Math.floor(Math.random() * this.wordArr.length)];
        this.word = this.word.toLowerCase();

        this.noOfLettersInWord = this.word.length;
        
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
        
    }
}




document.onkeyup = function(){
    var letter = event.key.toLowerCase();
    if(letter && !game.word){
        game.initialiseWordData();
    }


    var guessedLetters = game.guessedLettersArr.toString();
    //guessedLetters = guessedLetters.replace(/ /g, '   ');
    guessedLetters = guessedLetters.replace(/,/g, ' ');
    document.getElementById('word_id').textContent    = guessedLetters;
}

