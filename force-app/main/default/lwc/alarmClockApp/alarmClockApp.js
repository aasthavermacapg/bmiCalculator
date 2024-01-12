import { LightningElement } from 'lwc';
import AlarmClockAssets from '@salesforce/resourceUrl/AlarmClockAssets';

export default class AlarmClockApp extends LightningElement {

    clockImage = AlarmClockAssets + '/AlarmClockAssets/clock.png';
    ringtone = new Audio(AlarmClockAssets + '/AlarmClockAssets/Clocksound.mp3');
    currentTime = '';
    hours = [];
    minutes = [];
    meridiems = ['AM', 'PM'];
    alarmTime;
    isAlarmSet = false;
    hourSelected;
    minuteSelected;
    meridiemSelected;
    isAlarmTriggered = false;

    get ifFieldNotSelected(){ //for disabling the set alarm button when any property is not selected
        return !(this.hourSelected && this.minuteSelected && this.meridiemSelected);
    }
    get shakeImage(){
        return this.isAlarmTriggered ?'shake' : '';
    }

    connectedCallback(){ //on load of the page
        this.currentTimeHandler();
        this.createHoursOptions();
        this.createMinutesOptions();
    }
    currentTimeHandler(){
        setInterval(()=>{ //current time logic

            let dateTime = new Date();
            let hour = dateTime.getHours(); //getHours returns the hour (0 to 23) of a date
            let min = dateTime.getMinutes();
            let sec = dateTime.getSeconds();
            let ampm = "AM";
            if(hour == 0){
                hour = 12;
            }
            else if (hour === 12) {
                ampm = "PM";
            }
            else if(hour >= 12){
                hour = hour - 12;
                ampm = "PM";
            }
            hour = hour < 10 ? "0" + hour : hour;
            min = min < 10 ? "0" + min : min;
            sec = sec < 10 ? "0" + sec : sec;

            this.currentTime = `${hour}:${min}:${sec} ${ampm}`;
            if(this.alarmTime === `${hour}:${min} ${ampm}`){ //alarm logic and we are running it here because it'll check every minute since it's running each minute
                console.log('Alarm Triggered');
                this.isAlarmTriggered = true;
                this.ringtone.play();
                this.ringtone.loop = true;
            }

        }, 1000) //we want to run this logic each second
    }
    createHoursOptions(){
        for(let i = 0; i <= 12 ; i++){
            let val = i < 10 ? "0" + i : i;
            this.hours.push(val) 
        }
    }
    createMinutesOptions(){
        for(let i = 0; i <= 59 ; i++){
            let val = i < 10 ? "0" + i : i;
            this.minutes.push(val) 
        }
    }
    optionHandler(event){ //custom event - passing of data from child to parent
        const {label, value} = event.detail
        if(label === "Hour(s)"){
            this.hourSelected = value
        }
        else if(label === "Minute(s)"){
            this.minuteSelected = value
        }
        else if(label === "AM/PM"){
            this.meridiemSelected = value
        }
        else{}
        // console.log("this.hourSelected", this.hourSelected);
        // console.log("this.minuteSelected", this.minuteSelected);
        // console.log("this.meridiemSelected", this.meridiemSelected);
    }
    setAlarmHandler(){ //setting alarm logic but half of the logic is in currentTimeHandler
        this.alarmTime = `${this.hourSelected}:${this.minuteSelected} ${this.meridiemSelected}`;
        this.isAlarmSet = true;
    }
    clearAlarmHandler(){
        this.isAlarmSet = false;
        this.alarmTime = '';
        this.isAlarmTriggered = false;
        this.ringtone.pause();
        const elements = this.template.querySelectorAll('c-clock-dropdown'); //this returns node of array
        Array.from(elements).forEach(element => { //converting to array and passing empty value to rest in child method
            element.reset("")
        });
    }
}