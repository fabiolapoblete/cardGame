let activeCard; //skapar en tom variabel
let cardDeck = createDeck();
let drawnCard = drawCard();
let score = 0;
let attempts = 3;
setCard(drawnCard);

function createDeck() {
    // 4 suits 13 valörer
    let cardDeck = [];
    let suits = ['&spades;', '&hearts;', '&clubs;', '&diams;'];
    // loopa över symbolerna
    for (let i = 0; i < suits.length; i++) {
        // för varje symbol skall vi skapa 13 kort
        // det gör vi via ännu en loop
        for (let j = 2; j < 15; j++) {
            //skapar kort-objekt
            // där vi lägger in symbol och värde
            let card = {
                suite: suits[i],
                value: j,
                color: getColor(suits[i]),
                displayValue: getValue(j)
            };
            // för varje nytt kort bör vi pusha in det i vår lokala deck-array
            cardDeck.push(card);
        }
    }
    // logik för färg på suite
    function getColor(suite) {
        if (suite == '&hearts;' || suite == '&diams;') {
            return 'red';
        } else {
            return 'black';
        }
    }

        // logik för valör på kort (A, J, D, M) 
    function getValue(value) {
        if (value < 11) {
            return value;
        } else if (value == 11) {
            return 'J';        
        } else if (value == 12) {
            return "D";
        } else if (value == 13) {
            return "K";
        } else if (value == 14) {
            return "A";
        }
    };
    
    // returnerar hela decket när funktionen är färdig
    return cardDeck;
};

function drawCard() {
    let random = Math.floor(Math.random()* cardDeck.length);
    let drawnCard = cardDeck[random];
    activeCard = drawnCard;
    cardDeck.splice(random, 1);
    cardsLeft();
    return drawnCard;
}

function setCard(card) {
    let el = document.createElement('article'); //skapar en article under setion placeholder.
    el.classList.add('card'); //ger klassen card

    //för varje kort lägger den in värden från korten.
    el.innerHTML = ` 
        <section class="front">
            <header>
                <span class="${card.color}">${card.suite}</span>
                <span>${card.displayValue}</span>
            </header>
            <section class="${card.color}">${card.suite}</section>
            <footer>
                <span class="${card.color}">${card.suite}</span>
                <span>${card.displayValue}</span>
            </footer>
        </section>
        <section class="back"></section>
    `;
    console.log(el);
    document.querySelector('.placeholder').appendChild(el);
};

//uppdatera antal kort som är kvar
function cardsLeft() {
    let deckCount = cardDeck.length;
    document.querySelector(".left").innerHTML = 
    `${deckCount} kort kvar`;
}

function lower() {
    let previousCard = activeCard;
    let newCard = drawCard();
    setCard(newCard);

    if (newCard.value < previousCard.value) {
        updateScore();
    } else {
        updateAttempts();
    }
}

function equal() {
    let previousCard = activeCard; //previousCard har local scope
    let newCard = drawCard();
    setCard(newCard); //visar kortet vi har dragit

    if (newCard.value == previousCard.value) {
        updateScore();
    } else {
        updateAttempts();
    }
}   

function higher() {
    let previousCard = activeCard; //previousCard har local scope
    let newCard = drawCard();
    setCard(newCard); //visar kortet vi har dragit

    if (newCard.value > previousCard.value) {
        updateScore();
    } else {
        updateAttempts();
    } 
}

document.querySelector('#lower').addEventListener('click', lower);
document.querySelector('#equal').addEventListener('click', equal);
document.querySelector('#higher').addEventListener('click', higher);


function updateScore() {
    let newScore = score + 100;
    score = newScore;
    document.querySelector('.score').innerHTML = score;
};

function updateAttempts() {
    attempts = attempts - 1;
    document.querySelector('.attempts').innerHTML = attempts;

    if (attempts == 0) {
        gameOver()
    };
};

function gameOver() {
    //måste hitta den och lägga på klassen show
    document.querySelector('#gameover').classList.add('show');
    let retryBtn = document.querySelector(".retry");
    retryBtn.addEventListener('click', () => {
        location.reload();
    });

}






