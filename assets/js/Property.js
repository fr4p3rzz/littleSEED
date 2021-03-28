class Property{
    constructor(name, mUnit, costs, value, addValue, speed, cap, color, hasButton, isSet){
        this.name = name;
        this.mUnit = mUnit;
        this.value = value;
        this.addValue = addValue;
        this.speed = speed;
        this.cap = cap;
        this.color = color;
        this.hasButton = hasButton;  
        this.isSet = isSet;
        this.costs = costs; 
    }

    create(){
        this.addProperty(this.name, this.mUnit, this.costs, this.value, this.addValue, this.speed, this.color, this.hasButton, this.isSet);  
    }
    
    addProperty()
    {
        treeVariables[this.name] = {   
                                    mUnit: this.mUnit,
                                    costs: this.costs, 
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

