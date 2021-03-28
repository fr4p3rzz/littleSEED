class Property{
    constructor(name, mUnit, value, addValue, speed, cap, color, hasButton, isSet){
        this.name = name;
        this.mUnit = mUnit;
        this.value = value;
        this.addValue = addValue;
        this.speed = speed;
        this.cap = cap;
        this.color = color;
        this.hasButton = hasButton;  
        this.isSet = isSet; 
    }

    create(){
        this.addProperty(this.name, this.mUnit, this.value, this.addValue, this.speed, this.color, this.hasButton, this.isSet);  
    }
    
    addProperty()
    {
        treeVariables[this.name] = {   
                                    mUnit: this.mUnit, 
                                    value: this.value, 
                                    addValue: this.addValue, 
                                    speed: this.speed, 
                                    cap: this.cap,
                                    color: this.color, 
                                    hasButton: this.hasButton,
                                    isSet: this.isSet
                                };          
    }
 
}

