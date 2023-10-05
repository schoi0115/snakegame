import './App.css';
import React, { useState, useEffect } from 'react';

const getRandomCoordinates = () => {
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  return [x, y]
}

const initialState = {
  food: getRandomCoordinates(),
  speed: 200,
  direction: 'RIGHT',
  snakeDots: [
    [0, 0],
    [2, 0]
  ]
}


function App() {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    setInterval(moveSnake, state.speed);
    checkIfOutOfBorders();
    checkIfCollapsed();
    checkIfEat();
  }, [state]);

  const moveSnake = () => {
    let dots = [...state.snakeDots];
    let head = dots[dots.length - 1];

    switch (state.direction) {
      case 'RIGHT':
        head = [head[0] + 2, head[1]];
        break;
      case 'LEFT':
        head = [head[0] - 2, head[1]];
        break;
      case 'DOWN':
        head = [head[0], head[1] + 2];
        break;
      case 'UP':
        head = [head[0], head[1] - 2];
        break;
      default:

    }
    dots.push(head);
    dots.shift();
    setState({ ...state, snakeDots: dots });
  }

  // ... rest of the game logic
  const checkIfOutOfBorders = () => {
    let head = state.snakeDots[state.snakeDots.length - 1];
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      gameOver();
    }
  }

  const gameOver = () => {
    alert(`Game Over. Snake length is ${state.snakeDots.length}`);
    setState(initialState);
  }
  const checkIfCollapsed = () => {
    let snake = [...state.snakeDots];
    let head = snake[snake.length - 1];
    snake.pop();
    snake.forEach(dot => {
      if (head[0] === dot[0] && head[1] === dot[1]) {
        gameOver();
      }
    })
  }
  const checkIfEat = () => {
    let head = state.snakeDots[state.snakeDots.length - 1];
    let food = state.food;
    if (head[0] === food[0] && head[1] === food[1]) {
      setState({
        ...state,
        food: getRandomCoordinates(),
        snakeDots: [...state.snakeDots, food]
      });
    }
  }
  return (
    <div>
      {/* game board */}
    </div>
  );
}

export default App;
