import {viewportService} from 'services/viewport';
import {gameManager} from 'managers/game';

require('utils/global.styl');

viewportService.setMainContainer(document.querySelector('#game .viewport'));
gameManager.initiate();
