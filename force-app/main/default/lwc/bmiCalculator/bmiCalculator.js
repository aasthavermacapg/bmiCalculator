import { LightningElement } from 'lwc';

export default class BmiCalculator extends LightningElement {
    height = '';
    weight = '';
    bmiValue = '';
    result = '';

    inputHandler(event){
        const {name, value} = event.target;
        //this[name] = value; OR
        if(name === "height"){
            this.height = value;
        }
        if(name === "weight"){
            this.weight = value;
        }
    }
    submitHandler(event){
        event.preventDefault();
        console.log("Weight", this.weight);
        console.log("Height", this.height);
        this.calculate();
    }
    calculate(){
        //BMI = weight in Kg / (height in m) * (height in m)
        let height = Number(this.height)/100;
        let bmi = Number(this.weight)/(height*height);
        //console.log("BMI : ", bmi);
        this.bmiValue = Number(bmi.toFixed(2)); //toFixed converts a number to string and rounds the string to a specified number of decimals.

        if(this.bmiValue < 18.5){
            this.result = "Underweight";
        }
        else if(this.bmiValue >= 18.5 && this.bmiValue < 25){
            this.result = "Healthy";
        }
        else if(this.bmiValue >= 25 && this.bmiValue < 30){
            this.result = "Overweight";
        }
        else{
            this.result = "Obese";
        }

        console.log("BMI :", this.bmiValue);
        console.log("Result :", this.result);
    }
    reCalculate(){
    this.height = '';
    this.weight = '';
    this.bmiValue = '';
    this.result = '';
    }
}