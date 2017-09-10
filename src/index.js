import {viewport} from 'services/viewport';
import {database} from 'services/database';
import {auth} from 'services/auth';
import {gameManager} from 'managers/game';

require('utils/global.styl');

viewport.setMainContainer(document.querySelector('#game .viewport'));
database.init();
gameManager.init();
auth.init();
