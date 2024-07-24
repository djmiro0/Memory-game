import React, { useState, useEffect } from 'react';
import styles from './Card.module.css';

const cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

export default function Card() {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);

  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    const shuffledCards = shuffleArray([...cardValues, ...cardValues]);
    setCards(shuffledCards.map((value, index) => ({ id: index, value })));
    setFlippedCards([]);
    setMatchedCards([]);
  };

  const handleClick = (index) => {
    if (flippedCards.length === 2 || matchedCards.includes(index)) return;

    setFlippedCards([...flippedCards, index]);

    if (flippedCards.length === 1) {
      const firstIndex = flippedCards[0];
      const secondIndex = index;
      if (cards[firstIndex].value === cards[secondIndex].value) {
        setMatchedCards([...matchedCards, firstIndex, secondIndex]);
      }
      setTimeout(() => {
        setFlippedCards([]);
      }, 1000);
    }
  };

  return (
    <div className={styles.container}>
      <button onClick={resetGame} className={styles.resetButton}>Reset</button>
      <div className={styles.cardGrid}>
        {cards.map((card, index) => (
          <div
            key={card.id}
            className={`${styles.div1} ${flippedCards.includes(index) || matchedCards.includes(index) ? styles.clicked : ''} ${matchedCards.includes(index) ? styles.matched : ''}`}
            onClick={() => handleClick(index)}
          >
            {(flippedCards.includes(index) || matchedCards.includes(index)) && card.value}
          </div>
        ))}
      </div>
    </div>
  );
}
