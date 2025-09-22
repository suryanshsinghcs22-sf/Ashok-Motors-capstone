import { LightningElement, wire, track } from 'lwc';
import getAvailableSlots from '@salesforce/apex/TestDriveController.getAvailableSlots';
import bookTestDrive from '@salesforce/apex/TestDriveController.bookTestDrive';
import { refreshApex } from '@salesforce/apex';

export default class TestDriveBooking extends LightningElement {
    @track slots; // fetched slots
    wiredSlotsResult;

    @wire(getAvailableSlots)
    wiredSlots(result) {
        this.wiredSlotsResult = result;
        if(result.data) this.slots = result.data;
        else if(result.error) console.error(result.error);
    }

    async bookSlot() {
         //const slotId = event.target.dataset.id;

        // For project demo, use placeholder Contact and Vehicle Id (replace dynamically if needed)
        const contactId = '003XXXXXXXXXXXX'; 
        const vehicleId = 'a0BXXXXXXXXXXXX'; 
        const slotDateTime = new Date(); // for demo, set current time or slot time

        try {
            const res = await bookTestDrive({ contactId, vehicleId, slot: slotDateTime });
            console.log(res); // "Booked successfully"
            // Refresh the slots after booking
            await refreshApex(this.wiredSlotsResult);
        } catch(error) {
            console.error(error);
        }
    }
}
