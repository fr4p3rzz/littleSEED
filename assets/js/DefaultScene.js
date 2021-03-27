var entry;

class DefaultScene extends Phaser.Scene {

    constructor() {
        super("DefaultScene");
    }



    create() 
    {      
        this.input.mouse.capture = true;
        entry = this.add.bitmapText(5, 5, "retro", "You are a newborn sprout.\nGrow like nothing has ever grown", 15);

        this.addTreeValue("height", "m",);   
    }


    update(){
        
   
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
                if(treeVariables[key].value.toFixed(3) < treeVariables[key].cap)
                {
                    treeVariables[key].value += treeVariables[key].speed;    
                }
                activeProperties[counter].text = key + ": " + treeVariables[key].value.toFixed(3) + " / " + treeVariables[key].cap + " " + treeVariables[key].mUnit;
                counter++;
                console.log(treeVariables[key].value.toFixed(3));
            }
        }
    }

    /** Create and add a new property to treeVariables and initialize his bitmapText and button (if needed) */
    addTreeValue(name, mUnit, cap = 0.3, value = 0, addValue = cap / 10, speed = 0, color = "", hasButton = true)
    {
        treeVariables[name] = new Property(name, mUnit, value, addValue, speed, cap, color, hasButton);   
        
        this.addActiveProperty( treeVariables[name].name, 
                                treeVariables[name].value,
                                treeVariables[name].cap, 
                                treeVariables[name].mUnit, 
                                treeVariables[name].addValue);
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

    round(value, decimals) {
        return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
      }
}

    
