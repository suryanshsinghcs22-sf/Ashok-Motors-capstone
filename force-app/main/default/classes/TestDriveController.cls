public with sharing class TestDriveController {
    @AuraEnabled(cacheable=true)
    public static List<Test_Drive_c__c> getAvailableSlots(){
        return [SELECT Id, Contact__c, Vehicle__c, Scheduled_DateTime__c FROM Test_Drive_c__c WHERE Status__c='Scheduled'];
    }

    @AuraEnabled
    public static String bookTestDrive(Id contactId, Id vehicleId, DateTime slot){
        Test_Drive_c__c td = new Test_Drive_c__c(
            Contact__c=contactId,
            Vehicle__c=vehicleId,
            Scheduled_DateTime__c=slot,
            Status__c='Scheduled'
        );
        insert td;
        return 'Booked successfully';
    }
}