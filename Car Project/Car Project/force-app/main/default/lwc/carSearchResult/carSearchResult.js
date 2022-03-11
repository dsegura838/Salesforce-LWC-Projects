import { LightningElement, api, wire, track } from 'lwc';
import getCars from '@salesforce/apex/CarSearchResultController.getCars';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class CarSearchResult extends LightningElement {
    @api carTypeId;

    @track cars;
    @track selectedCarId
    
   
    connectedCallback(){
        this.getWiredCars();
    }

    getWiredCars(){
        getCars({carTypeId : this.carTypeId}).then((data)=>{
            this.cars = data;
            console.log(`data found in wiredCars()`);
        }).catch((error)=>{
            this.showToast('ERROR', error.body.message, 'error');
        })
    }

    // @wire(getCars, {carTypeId : '$carTypeId'})
    // wiredCars({data, error}){
    //     if(data){
    //         this.cars = data;
    //         console.log('data = true');
    //     } else if(error){
    //         this.showToast('ERROR', error.body.message, 'error');
    //     }
    // }
    

    
    get carsFound() { 
        
        if(this.cars){

            return true
        }

        console.log('cars not found');
        return false;
         
    }

        
    

    

    showToast(title, message, variant){
        const evt = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        });
        this.dispatchEvent(evt);
    }

    carSelectHandler(event){
        const carId = event.detail;
        this.selectedCarId = carId;
    }

    
    
    
    
}