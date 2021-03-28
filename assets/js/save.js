function saveGame(treeVariables) {
    document.cookie = treeVariables;
    console.log(document.cookie);
}

function loadGame(treeVariables){
    treeVariables = document.cookie
}