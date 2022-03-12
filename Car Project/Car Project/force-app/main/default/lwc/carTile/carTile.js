import { LightningElement,api, wire, track } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import {fireEvent} from 'c/pubsub';

export default class CarTile extends LightningElement {
    @api car;
    @api carSelectedId;
    
    @wire(CurrentPageReference) pageRef;

    handleCarSelect(event){
        //prevents url default behavior (redirecting)
        event.preventDefault();
        console.log('Car in tile: '+this.car.Id);
        //let carId = this.car.Id;
        console.log('In Car Tile '+this.car.Id);

        const carSelect = new CustomEvent('carselect', {detail: this.car.Id});
        this.dispatchEvent(carSelect);

        fireEvent(this.pageRef, 'carSelect', this.car);
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