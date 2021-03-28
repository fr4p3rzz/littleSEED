function saveGame(treeVariables) {
    document.cookie = JSON.stringify(treeVariables)
}

function loadGame(){
    treeVariables = JSON.parse(document.cookie)
}

function saveInLocal(treeVariables){
    localStorage.setItem('little_seed_save', JSON.stringify(treeVariables))
}

function loadFromLocal(){
    if(window.localStorage.getItem('little_seed_save')){
        treeVariables = JSON.parse(window.localStorage.getItem('little_seed_save'));
    } else { console.log('NOP') }
}