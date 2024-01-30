import { LightningElement, wire, api } from 'lwc';
import { getRelatedListRecords } from 'lightning/uiRelatedListApi';
const COLUMNS = [
    { label: 'Education', fieldName: 'Education' },
    { label: 'Institution Name', fieldName: 'InstitutionName'},
    { label: 'Passing Year', fieldName: 'PassingYear' }
];
export default class PortfolioEducation extends LightningElement {
    @api recordId;
    tableData = [];
    columns = COLUMNS;
    @wire(getRelatedListRecords,{
        parentRecordId:'$recordId',
        relatedListId:'Educations__r',
        fields:['Education__c.Institution_Name__c', 'Education__c.Passing_Year__c', 'Education__c.Title__c'], 
        sortBy:['Education__c.Passing_Year__c']
    })
    educationHandler({data,error}){
        if(data){
            console.log("Education data", JSON.stringify(data));
            this.formatData(data);
        }
        if(error){
            console.error(error);
        }
    }
    formatData(data){
        this.tableData = [...data.records].reverse().map(item=>{
            let Id = item.id;
            const {Institution_Name__c, Passing_Year__c, Title__c} = item.fields;
            let Education = Title__c.value;
            let InstitutionName = Institution_Name__c.value;
            let PassingYear = Passing_Year__c.value;
            return {
                Id, Education, InstitutionName, PassingYear
            }
        })
        console.log("this.tableData", JSON.stringify(this.tableData));
    }
}