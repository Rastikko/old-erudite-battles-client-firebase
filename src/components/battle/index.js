import Component from 'framework/component';

require('./style.styl');

/** Class that handles login component functionality. */
class BattleComponent extends Component {
    /**
     * Constructor.
     */
    constructor() {
        super({
            template: require('./template.handlebars'),
            className: 'erudite-battles-battle-component', // TODO: we dont need model and change classList
        });
    }
}

export default BattleComponent;
