weather = {
    1: "stormy",
    2: "rainy",
    3: "sunny",
    4: "scorching"
};

    function giveMeAWeather(){
        result = this.getRandomIntInclusive(0, 4);

        switch(result)
        {
            case 1: return weather[result];
            case 2: return weather[result];
            case 3: return weather[result];
            case 4: return weather[result];
            default: break; 
        }
    }

