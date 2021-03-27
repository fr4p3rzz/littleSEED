class Property{
    constructor(name, mUnit, value, addValue, speed, cap, color, hasButton){
        this.name = name;
        this.mUnit = mUnit;
        this.value = value;
        this.addValue = addValue;
        this.speed = speed;
        this.cap = cap;
        this.color = color;
        this.hasButton = hasButton;   
    }

    create(){
        this.addProperty(this.name, this.mUnit, this.value, this.addValue, this.speed, this.color, this.hasButton);  
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
                                    hasButton: this.hasButton
                                };          
    }
 
}

