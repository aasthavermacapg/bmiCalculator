public without sharing class NoteTakingController {
    @AuraEnabled
    public static Boolean createNoteRecord(String title, String description){
        try {
            if(!String.isBlank(title)){
                My_Note__c noteRec = new My_Note__c(Name = title, Note_Description__c = description);
                insert noteRec;
                return true;
            }
            return false;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled(cacheable=true)
    public static List<My_Note__c> getNotes(){
        // if( My_Note__c.SObjectType.getDescribe().isAccessible() && Schema.SObjectType.My_Note__c.fields.Id.isAccessible() &&
        //     Schema.SObjectType.My_Note__c.fields.Name.isAccessible() &&
        //     Schema.SObjectType.My_Note__c.fields.Note_Description__c.isAccessible() &&
        //     Schema.SObjectType.My_Note__c.fields.LastModifiedDate.isAccessible()){ //validating crud permissions
            return [SELECT Id, Name, Note_Description__c, LastModifiedDate FROM My_Note__c order by LastModifiedDate desc];
        //}
    }
    @AuraEnabled
    public static Boolean updateNoteRecord(String noteId, String title, String description){
        try {
            // if( My_Note__c.SObjectType.getDescribe().isAccessible() && Schema.SObjectType.My_Note__c.fields.Id.isAccessible() &&
            // Schema.SObjectType.My_Note__c.fields.Name.isAccessible() &&
            // Schema.SObjectType.My_Note__c.fields.Note_Description__c.isAccessible() &&
            // Schema.SObjectType.My_Note__c.fields.LastModifiedDate.isAccessible()){ //validating crud permissions
                if(!String.isBlank(noteId)){
                My_Note__c note = [SELECT Id, Name, Note_Description__c, LastModifiedDate FROM My_Note__c WHERE Id =: noteId];
                note.Name = title;
                note.Note_Description__c = description;
                update note;
                return true;
                }
            // }
            return false;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled
    public static Boolean deleteNoteRecord(String noteId){
        try {
            if(!String.isBlank(noteId)){
                My_Note__c noteRec = new My_Note__c(Id = noteId);
                delete noteRec;
                return true;
            }
            return false;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}