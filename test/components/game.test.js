import GameComponent from 'components/game';

describe('A test suite', function() {
   beforeEach(function() { });
   afterEach(function() { });
   it('should create properly', function() {
       const gameComponent = new GameComponent();
       expect(gameComponent).to.exist;
    });
});
