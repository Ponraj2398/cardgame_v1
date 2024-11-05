import React, { useState, useEffect } from "react";
import Card from "../Components/Card";
import './CardPage.css'
import Button from '@mui/material/Button';
import Swal from 'sweetalert2'

const symbols = ['🍎', '🍌', '🍇', '🍓', '🍍', '🥑', '🍒', '🍉'];

const CardPage = () => {
    const [cards, setCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);
    const [moves, setMoves] = useState(0);
    const [timer, setTimer] = useState(0);
    const [macthFound, setMatchFound] = useState(0);
    const [isGameActive, setIsGameActive] = useState(true);

    useEffect(() => {
        initializeGame();
    }, []);

    useEffect(() => {
        if (isGameActive) {
            const interval = setInterval(() => setTimer(prev => prev + 1), 1000);
            return () => clearInterval(interval);
        }
    }, [isGameActive]);

    const initializeGame = () => {
        const shuffledCards = [...symbols, ...symbols]
            .sort(() => Math.random() - 0.5)
            .map((symbol, index) => ({ id: index, symbol, flipped: false }));
        setCards(shuffledCards);
        setFlippedCards([]);
        setMatchedCards([]);
        setMoves(0);
        setTimer(0);
        setMatchFound(0);
        setIsGameActive(true);
    };

    const handleCardClick = (id) => {
        if (flippedCards.length === 2 || flippedCards.includes(id) || matchedCards.includes(id)) return;

        const newFlippedCards = [...flippedCards, id];
        setFlippedCards(newFlippedCards);

        if (newFlippedCards.length === 2) {
            setMoves(moves + 1);
            const [first, second] = newFlippedCards.map(index => cards[index]);

            if (first.symbol === second.symbol) {
                setMatchedCards([...matchedCards, first.id, second.id]);
                setFlippedCards([]);
                setMatchFound(prev => prev + 1);
                
            } else {
                setTimeout(() => setFlippedCards([]), 1000);
            }

            if (matchedCards.length + 2 === cards.length) {
                setIsGameActive(false);
                // Swal("Game Over!", `You've completed the game in ${moves + 1} moves and ${timer} seconds!`, "success");
                Swal.fire({
                    title: `Game Over!....You've completed the game in ${moves + 1} moves and ${timer} seconds!`,
                    width: 600,
                    padding: "3em",
                    color: "#716add",
                    background: "#fff url(https://sweetalert2.github.io/images/trees.png)",
                    backdrop: `
                      rgba(0,0,123,0.4)
                      url("https://sweetalert2.github.io/images/nyan-cat.gif")
                      left top
                      no-repeat
                    `
                  });
            }
        }
    };

    return (
        <div className="app">
            <h1 className="animate__animated animate__bounceIn">Card Memory Game</h1>
            <div className="game-info animate__animated animate__bounceIn">
                <p>Moves: {moves}</p>
                <p>Matches Found: {macthFound}</p>
                <p>Timer: {timer} seconds</p>
            </div>
            <div className="card-area animate__animated animate__backInUp">
                {cards.map((card, index) => (
                    <Card
                        key={index}
                        id={card.id}
                        className="d-flex justify-content-center "
                        symbol={card.symbol}
                        flipped={flippedCards.includes(card.id) || matchedCards.includes(card.id)}
                        onClick={() => handleCardClick(card.id)}
                    />
                ))}
            </div>
            <div className="mt-3 animate__animated animate__bounceIn">
                <Button variant="outlined" className="restart-button" color="success" onClick={initializeGame}>
                    Restart Game
                </Button>
            </div>
        </div>
    );
};

export default CardPage;