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
        this.addTreeValue("water", "l", 1, 0, 1 / 100000, 0, "_cyan", false);   
        this.addTreeValue("sun_energy", "J", 1, 0, 0.001, 0, "_gold", true);     
        console.log(activeProperties);
    }


    update(){
        this.setWeather();
        this.theValuesLoop();
    }

    /** Loop where all the currently showed counters are updated */
    theValuesLoop()
    {
        let counter = 0;
        for(var key in treeVariables)
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

    /** Create and add a new property to treeVariables and initialize his bitmapText and button (if needed)
     *  REMEMBER: value, addValue and speed MUST be multiples of cap.
     */
    addTreeValue(name, mUnit, cap = 0.3, value = 0, addValue = cap / 100, speed = 0, color = "", hasButton = true)
    {
        treeVariables[name] = new Property(name, mUnit, value, addValue, speed, cap, color, hasButton);   
        
        this.addActiveProperty( treeVariables[name].name, 
                                treeVariables[name].value,
                                treeVariables[name].cap, 
                                treeVariables[name].mUnit, 
                                treeVariables[name].addValue,
                                treeVariables[name].color);
    }

    /** Create, display and save in activeProperties a new bitmapText. Create also his button if needed */
    addActiveProperty(name, value, cap, mUnit, addValue, color= "")
    {
        activeProperties.push(this.add.bitmapText(  treePropertiesStartingWidth, 
                                                    treePropertiesStartingHeight += propertiesSpacing, 
                                                    "retro" + color, 
                                                    name + ": " + value + " / " + cap + " " + mUnit,
                                                     15
                                                ));
                                                
        
        if(treeVariables[name].hasButton)
        {
            this.button = this.add.sprite(300, 400, name + '_buttons', 0);
                this.button.setInteractive();
                this.button.on('pointerdown', () => {
                    treeVariables[name].value += addValue;
                });
            this.button.on('pointerover', () => {
                this.button.setTexture( name + '_buttons', 1);
            });
            this.button.on('pointerout', () => {
                this.button.setTexture( name + '_buttons', 0);
            });
        }
    }

    setWeather()
    {
        let changeWeather = getRandomIntInclusive(-999, 999) + (Object.keys(treeVariables).length / 7).toFixed(0);
        if(changeWeather % 2 == 0 && changeWeather > 700 && changeWeather < 850)
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
        
}

    
