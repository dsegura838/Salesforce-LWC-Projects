import { LightningElement, api, track } from 'lwc';
import getExperiences from '@salesforce/apex/CarExperience.getExperiences';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import {NavigationMixIn} from 'lightning/navigation';

export default class CarExperiences extends LightningElement {

    @api carId;
    @track carExperiences;

    connectedCallback(){
        this.getCarExperiences();
    }

    getCarExperiences(){
        getExperiences({carId : this.carId}).then((experiences)=>{
            this.carExperiences = experiences;
            console.log('Get Experiences worked');
            if(experiences.length <= 0){
                console.log('List is Blank');
            }else{
                console.log(experiences.length);
            }
            
        }).catch((error)=>{
            console.log('error in getCarExperiences');
            this.showToast('ERROR', error.body.message, 'error');
        })
    }

    get hasExperiences(){
        if(this.carExperiences){
            console.log('Experiences found');
            return true;
        }
        console.log('Has Experiences not found');
        return false;
    }

    userClickHandler(event){
        const userId = event.target.getAttribute('data--userid');
        this[NavigationMixIn.Navigate]({
            type: "standard__recordPage",
            attributes:{
                recordId: userId,
                objectApiName: 'User',
                actionName: 'view',
            }
        });
    }

    showToast(title, message, variant){
        const evt = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        });
        this.dispatchEvent(evt);
    }

    
}