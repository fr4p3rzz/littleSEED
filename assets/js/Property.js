class Property{
    constructor(name, mUnit, value = 0, addValue = 1, speed = 0, color = "", hasButton = true){
        this.name = name;
        this.mUnit = mUnit;
        this.value = value;
        this.addValue = addValue;
        this.speed = speed;
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
                                    color: this.color, 
                                    hasButton: this.hasButton
                                };          
    }
 
}

