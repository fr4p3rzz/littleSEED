var entry
var weatherFeedback;

class DefaultScene extends Phaser.Scene {

    constructor() {
        super("DefaultScene");
    }



    create() 
    {      

        this.input.mouse.capture = true;
        entry = this.add.bitmapText(5, 5, "retro", "You are a newborn sprout.\nGrow like nothing has ever grown", 15);
        weatherFeedback = this.add.bitmapText(innerWidth - 300 , 5, "retro", sunnyFeedback, 15);

        /** Here we initialize all the tree's properties */
        /** name, measure unit, value, addValue, speed, cap, color, hasButton, isSet */
        this.addTreeValue("water", "l", 1, 0, 1 / 100000, 0, "_cyan", false, false);   
        this.addTreeValue("sun_energy", "J", 1, 0, 0.001, 0, "_gold", true, false);   
        this.addTreeValue("leaves", "", 5, 0, 1, 0, "", true, false);    
    }


    update(){
        this.setWeather();
        this.theConditionsLoop();
        this.theValuesLoop();


    }

    /** Loop where all the currently showed counters are updated */
    theValuesLoop()
    {
        let counter = 0;
        for(var key in treeVariables)
        {
            if(treeVariables[key].isSet)
            {
                if(treeVariables[key].value.toFixed(3) <= treeVariables[key].cap)
                {
                    if(treeVariables[key].value.toFixed(3) < treeVariables[key].cap && treeVariables[key].value.toFixed(3) >= 0)
                    {
                        if(treeVariables[key].speed < 0)
                        {
                            if(treeVariables[key].value.toFixed(3) > 0)
                            {
                                treeVariables[key].value += treeVariables[key].speed;
                            }
                        }
                        else
                        {
                            treeVariables[key].value += treeVariables[key].speed;
                        }                      
                    }
                    activeProperties[counter].text = key + ": " + treeVariables[key].value.toFixed(3) + " / " + treeVariables[key].cap + " " + treeVariables[key].mUnit;
                    counter++;
                }
            }          
        }
    }

    theConditionsLoop()
    {
        
        for(var key in treeVariables)
        {
            if(!treeVariables[key].isSet)
            {
                if(this.shouldSet(treeVariables[key].name))
                {
                    this.addActiveProperty( treeVariables[key].name, 
                                            treeVariables[key].value,
                                            treeVariables[key].cap, 
                                            treeVariables[key].mUnit, 
                                            treeVariables[key].addValue,
                                            treeVariables[key].color
                                        );
                    treeVariables[key].isSet = true;
                }
            }
        }
    }

    /** Create and add a new property to treeVariables and initialize his bitmapText and button (if needed)
     *  REMEMBER: value, addValue and speed MUST be 0 or multiples of cap.
     */
    addTreeValue(name, mUnit, cap = 1, value = 0, addValue = cap / 100, speed = 0, color = "", hasButton = false, isSet = false)
    {
        treeVariables[name] = new Property(name, mUnit, value, addValue, speed, cap, color, hasButton, isSet);         
    }

    /** Create, display and save in activeProperties a new bitmapText. Create also his button if needed */
    addActiveProperty(name, value, cap, mUnit, addValue, color= "")
    {
        activeProperties.push(this.add.bitmapText(  treePropertiesStartingWidth, 
                                                    treePropertiesStartingHeight += propertiesSpacing, 
                                                    "retro" + color, 
                                                    name + ": " + value + " / " + cap + " " + mUnit,
                                                    17
                                                ));
                                                
        
        if(treeVariables[name].hasButton)
        {
            buttonCounter++;
            if(buttonCounter == 4)
            {
                buttonRows++
                buttonCounter = 0;
                treeButtonStartingWidth += 220;
                if(buttonRows % 2 == 0)
                {
                    treeButtonStartingHeight = 525;
                }
                else
                {
                    treeButtonStartingHeight = 565;
                }
            }
            if(buttonRows < 8)
            {
                let button = this.add.sprite(  treeButtonStartingWidth, 
                                                treeButtonStartingHeight += buttonSpacing, 
                                                name + '_buttons', 
                                                0
                                            );
                button.setInteractive();
                button.on('pointerdown', () => {
                    treeVariables[name].value += addValue;
                });
                button.on('pointerover', () => {
                    button.setTexture( name + '_buttons', 1);
                });
                button.on('pointerout', () => {
                    button.setTexture( name + '_buttons', 0);
                });
            }

        }
    }

    /**generate an int: if his controls are satisfied a dice is thrown. the result of the dice
     * change the current weather, and with him the amount of water gained by the sprout
     */
    setWeather()
    {
        let changeWeather = getRandomIntInclusive(-999, 999) + (Math.sqrt(Object.keys(treeVariables).length + 2)).toFixed(0);
        if(changeWeather % 2 == 0 && changeWeather >= 700 && changeWeather <= 850)
        {
            let currentWeather = giveMeAWeather();
            switch(currentWeather)
            {
                case "stormy":  
                                weatherFeedback.destroy();     
                                weatherFeedback =this.add.bitmapText(innerWidth - 300 , 5, "retro", stormyFeedback, 15);
                                treeVariables["water"].speed = 0.0005;
                    break;
                case "rainy":   
                                weatherFeedback.destroy();   
                                weatherFeedback = this.add.bitmapText(innerWidth - 300 , 5, "retro", rainyFeedback, 15);
                                treeVariables["water"].speed = 0.0001;
                    break;
                case "sunny":   
                                weatherFeedback.destroy();
                                weatherFeedback = this.add.bitmapText(innerWidth - 300 , 5, "retro", sunnyFeedback, 15);
                                treeVariables["water"].speed = 0;
                    break;
                case "scorching":   
                                    weatherFeedback.destroy();
                                    weatherFeedback = this.add.bitmapText(innerWidth - 300 , 5, "retro", scorchingFeedback, 15);
                                    treeVariables["water"].speed = -0.00025;
                    break;
                default: break;
            }
        }
    }

    shouldSet(name)
    {
        switch(name)
        {
            case "leaves": if(treeVariables["sun_energy"].value >= 0.003){ return true;}
                break;
                default: return true;
        }
    }
}