import { LightningElement, wire, api } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import PortfolioAssets from '@salesforce/resourceUrl/PortfolioAssets';
import SF_CERT_FIELD from '@salesforce/schema/Portfolio__c.Salesforce_Certifications__c';
import OTHER_CERT_FIELD from '@salesforce/schema/Portfolio__C.Other_Certifications__c';
export default class PortfolioCertifications extends LightningElement {
    @api recordId;
    sfCertsList = [];
    //otherCertsList = [];
    certLogo = `${PortfolioAssets}/PortfolioAssets/cert_logo.png`;
    @wire(getRecord,{
        recordId:'$recordId',
        fields:[SF_CERT_FIELD, OTHER_CERT_FIELD]
    })
    certHandler({data,error}){
        if(data){
            console.log("certHandler Data", JSON.stringify(data));
            this.formatData(data);
        }
        if(error){
            console.error(error);
        }
    }
    formatData(data){
        const {Salesforce_Certifications__c} = data.fields;
        // const {Salesforce_Certifications__c, Other_Certifications__c} = data.fields;
        this.sfCertsList = Salesforce_Certifications__c ? Salesforce_Certifications__c.value.split(';').map(item=>{
            return `Salesforce Certified ${item}`
        }):[];
        //this.otherCertsList = Other_Certifications__c ? Other_Certifications__c.value.split(','):[];
    }
}