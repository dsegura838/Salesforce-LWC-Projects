import { LightningElement,api, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import {fireEvent} from 'c/pubsub';

export default class CarTile extends LightningElement {
    @api car;
    @api carSelectedId;

    @wire(CurrentPageReference) pageRef;

    handleCarSelect(event){
        //prevents url default behavior (redirecting)
        event.preventDefault();

        const carId = this.car.Id;

        const carSelect = new CustomEvent('carselect', {detail:carId});
        this.dispatchEvent(carSelect);

        fireEvent(this.pageRef, 'carSelect', this.car.Id);
    }

    get isCarSelected(){
        if(this.car.Id === this.carSelectedId){
           
            //passing css classes
            return "tile selected";
        }
        
        //returning a css class
        return "tile";
    }
}