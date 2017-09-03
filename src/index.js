import GameComponent from './components/game';

const gameComponent = new GameComponent();
document.querySelector('#game').appendChild(gameComponent.element);

console.log('Done!');
