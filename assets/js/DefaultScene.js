var entry;
var scene;
var weatherFeedback;

class DefaultScene extends Phaser.Scene {

    constructor() {
        super("DefaultScene");
    }

    preload()
    {
        scene = this.scene.get("DefaultScene");
        entry = this.add.bitmapText(5, 5, "retro", "You are a newborn sprout.\nGrow like nothing has ever grown", 15);
        weatherFeedback = this.add.bitmapText(innerWidth - 300 , 5, "retro", sunnyFeedback, 15);

        /** Here we initialize all the tree's properties */
        /** name, measure unit, cap, value, addValue, speed, color, hasButton, isSet */

        /**properties initialized by default */
        this.addTreeValue("water", "l", 0, 1, 0, 1 / 100000, 0, "_cyan", false, true);   
        this.addTreeValue("sun_energy", "J", 0, 1, 0, 0.001, 0, "_gold", true, true);   

        /** all other properties */
        this.addTreeValue("leaves", "", {"sun_energy": 0.001}, 5, 0, 1, 0, "", true, false);   

        
    }


    create() 
    {      
        
        this.input.mouse.capture = true; 

        this.addActiveProperty("water", "l", 1, 0, 1 / 100000, "_cyan");   
        this.addActiveProperty("sun_energy", "J", 1, 0, 0.001, "_gold");  

        document.getElementById("localloadbutton").addEventListener("click",  function(){
            
            scene.rebuildActiveProperties();
        });
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
    addTreeValue(name, mUnit, costs, cap = 1, value = 0, addValue = cap / 100, speed = 0, color = "", hasButton = false, isSet = false)
    {
        treeVariables[name] = new Property(name, mUnit, costs, value, addValue, speed, cap, color, hasButton, isSet);         
    }

    /** Create, display and save in activeProperties a new bitmapText. Create also his button if needed */
    addActiveProperty(name, mUnit, cap, value, addValue, color= "")
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
                    this.isActionAffordable(name, addValue);                 
                });
                button.on('pointerover', () => {
                    button.setTexture( name + '_buttons', 1);
                });
                button.on('pointerout', () => {
                    button.setTexture( name + '_buttons', 0);
                });
                
                buttons.push(button);
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
                                weatherFeedback = this.add.bitmapText(innerWidth - 300 , 5, "retro", stormyFeedback, 15);
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
            case "leaves": return this.setWater();

            default: return true;
        }
    }

    rebuildActiveProperties()
    {
        for(let i = 0; i < activeProperties.length; i++)
        {
            activeProperties[i].destroy();
        }

        for(let i = 0; i < buttons.length; i++)
        {
            buttons[i].destroy();
        }
        buttons = [];

        activeProperties = [];
        treePropertiesStartingHeight = 65;
        treePropertiesStartingWidth = 20;
        treeButtonStartingWidth = 180;
        treeButtonStartingHeight = 525;
        propertiesSpacing = 20;
        buttonSpacing = 70;
        buttonCounter = -1;
        buttonRows = 0;

        for(var key in treeVariables)
        {
            if(treeVariables[key].isSet)
            {
                this.addActiveProperty( treeVariables[key].name, 
                    treeVariables[key].value,
                    treeVariables[key].cap, 
                    treeVariables[key].mUnit, 
                    treeVariables[key].addValue,
                    treeVariables[key].color
                );
            }
        }
    }

    isActionAffordable(name, addValue){
        if(treeVariables[name].value < treeVariables[name].cap)
        {
            let canAffort = true;
            if(treeVariables[name].costs != 0)
            {
                for(let key in treeVariables[name].costs)
                {
                    if(treeVariables[key].value >= treeVariables[name].costs[key])
                    {
                        treeVariables[key].value -= treeVariables[name].costs[key];
                    }
                    else
                    {
                        canAffort = false;
                    }
                }
                if(canAffort)
                {
                    treeVariables[name].value += addValue;
                }
            }
            else
            {
                treeVariables[name].value += addValue;
            } 
        }       
    }
 
    /** -------------------------------------------------------- */
    /** Next are functions for setting control of each property */
    /** ------------------------------------------------------ */

    setWater()
    {
        if(treeVariables["sun_energy"].value >= 0.003)
        { 
            return true;
        }
        else
        {
            return false;
        }
    }
}