import { LightningElement, wire, api } from 'lwc';
import { getRelatedListRecords } from 'lightning/uiRelatedListApi';
export default class PortfolioWorkExperience extends LightningElement {
    @api recordId;
    workExperienceList = [];
    @wire(getRelatedListRecords, {
        parentRecordId:'$recordId',
        relatedListId:'Work_Experiences__r',
        fields:['Work_Experience__c.Job_Start_Date__c',
        'Work_Experience__c.Job_End_Date__c',
        'Work_Experience__c.Role__c',
        'Work_Experience__c.Company_Name__c',
        'Work_Experience__c.Work_Location__c',
        'Work_Experience__c.Job_Description__c',
        'Work_Experience__c.Is_Current__c'
    ]
    })
    workExperienceHandler({data, error}){
        if(data){
            console.log("Work Experience data", JSON.stringify(data));
            this.formatExperience(data);
        }
        if(error){
            console.error(error);
        }
    }
    formatExperience(data){
        this.workExperienceList = [...data.records].reverse().map(item=>{
            let id = item.id;
            const {Job_Start_Date__c, Job_End_Date__c, Role__c, Company_Name__c, Work_Location__c, Job_Description__c, Is_Current__c } = item.fields;
            let JobStartDate = this.getValue(Job_Start_Date__c);
            let JobEndDate = this.getValue(Job_End_Date__c);
            let Role = this.getValue(Role__c);
            let CompanyName = this.getValue(Company_Name__c);
            let WorkLocation = this.getValue(Work_Location__c);
            let JobDescription = this.getValue(Job_Description__c);
            let IsCurrent = this.getValue(Is_Current__c);

            return {id, JobStartDate, JobEndDate, Role, CompanyName, WorkLocation, JobDescription, IsCurrent }; 
        })
        console.log("workExperienceList", JSON.stringify(this.workExperienceList));
    }
    getValue(data){
        return data && (data.displayValue || data.value);
    }
}