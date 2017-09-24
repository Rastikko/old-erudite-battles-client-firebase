import Component from 'framework/component';

require('./style.styl');

/** Class that handles login component functionality. */
class LobbyComponent extends Component {
    /**
     * Constructor.
     */
    constructor() {
        super({
            template: require('./template.handlebars'),
            className: 'erudite-battles-lobby-component',
        });
    }
}

export default LobbyComponent;
