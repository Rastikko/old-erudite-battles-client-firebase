import LoginComponent from './components/login';

const loginComponent = new LoginComponent();
document.querySelector('#game').appendChild(loginComponent.element);

console.log('Done!');
