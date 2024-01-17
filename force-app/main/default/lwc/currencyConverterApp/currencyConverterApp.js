import { LightningElement } from 'lwc';
import { countryCodeList } from 'c/countryCodeList';
import currencyConverterAssets from '@salesforce/resourceUrl/currencyConverterAssets';

export default class CurrencyConverterApp extends LightningElement {

    currencyImage = currencyConverterAssets + '/currencyConverterAssets/currency.svg';
    countryList = countryCodeList;
    countryFrom = 'USD';
    countryTo = 'INR';
    amount = '';
    result;
    error;
    isConverted = false;

    handleChange(event){
        const {name, value} = event.target;
        console.log("name", name);
        console.log("value", value);
        this[name] = value; //meaning countryFrom and countryTo will be assigned with the new selected value
        this.result = '';
        this.error = '';
    }
    submitHandler(event){
        event.preventDefault();
        this.convert();
        this.isConverted = true;
    }
    async convert(){
        const API_KEY = '57495a8c1de3aa5ac2303a05';
        const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${this.countryFrom}/${this.countryTo}`
        try{
            const data = await fetch(API_URL)
            const jsonData = await data.json()
            console.log(jsonData);
            debugger;
            // this.result = (Number(this.amount) * jsonData.result).toFixed(2)
            this.result = (Number(this.amount) * jsonData.conversion_rate).toFixed(2)
            console.log(this.result)
          } catch(error){
            console.log(error)
            this.error="An error occurred. Please try again..."
          }
    }
    clearHandler(){
        this.countryFrom = 'USD';
        this.countryTo = 'INR';
        this.amount = '';
        this.isConverted = false; 
        this.result = '';
        this.error = '';  
        const input = this.template.querySelector('lightning-input');
        input.reset("");
    }
}