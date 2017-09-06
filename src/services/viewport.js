import Service from 'framework/service';

/** Deals with main components transitions */
class ViewportService extends Service {
    /**
        Define in which domElement the transitions will happen
        @param {Objet} domElement
    */
    setMainContainer(domElement) {
        this.mainContainer = domElement;
    }

    /**
        Will transition from a domElement to another
        @param {Objet} domElement
    */
    transitionTo(domElement) {
        if (this.previousView) {
            // TODO: hide previous view
        } else {
            this.previousView = domElement;
            this.mainContainer.appendChild(domElement);
        }
    }
}

export let viewportService = new ViewportService();
