import { LightningElement, wire, api } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import TECH_SKILLS_FIELD from '@salesforce/schema/Portfolio__c.Technical_Skills__c';
import SOFT_SKILLS_FIELD from '@salesforce/schema/Portfolio__c.Soft_Skills__c';
import SOFTWARE_FIELD from '@salesforce/schema/Portfolio__c.Software_Tools__c';
import METHODOLOGIES_FIELD from '@salesforce/schema/Portfolio__c.Software_Development_Methodologies__c';
export default class PortfolioSkills extends LightningElement {
    @api recordId;
    techSkills = [];
    softSkills = [];
    methodologies = [];
    toolsSkills = [];

    @wire(getRecord, {
        recordId : '$recordId',
        fields : [TECH_SKILLS_FIELD, SOFT_SKILLS_FIELD, SOFTWARE_FIELD, METHODOLOGIES_FIELD]
    })
    skillHandler({data, error}){
        if(data){
            console.log("Skills data",JSON.stringify(data));
            this.formatSkills(data);
        }
        if(error){
            console.error("Skills error", error);
        }
    }

    formatSkills(data){
        const {Soft_Skills__c, Software_Development_Methodologies__c, Software_Tools__c, Technical_Skills__c} = data.fields;
        this.techSkills = Technical_Skills__c ? Technical_Skills__c.value.split(','):[];
        this.softSkills = Soft_Skills__c ? Soft_Skills__c.value.split(','):[];
        this.methodologies = Software_Development_Methodologies__c ? Software_Development_Methodologies__c.value.split(','):[];
        this.toolsSkills = Software_Tools__c ? Software_Tools__c.value.split(','):[];
    }
}