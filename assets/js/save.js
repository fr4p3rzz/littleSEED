function saveGame(treeVariables) {
    document.cookie = JSON.stringify(treeVariables)
}

function loadGame(){
    treeVariables = JSON.parse(document.cookie)
}

function saveInLocal(treeVariables){
    window.localStorage.setItem('little_seed_save', JSON.stringify(treeVariables))
}

function loadFromLocal(){
    if(localStorage.getItem('little_seed_save')){
        treeVariables = JSON.parse(localStorage.getItem("little_seed_save"));
        console.log(window.localStorage);
    } else { console.log('NOP') }
}