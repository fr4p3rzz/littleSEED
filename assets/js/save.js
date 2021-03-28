function saveGame(treeVariables) {
    document.cookie = JSON.stringify(treeVariables);
    console.log(document.cookie);
    console.log(treeVariables);
}

function loadGame(treeVariables){
    treeVariables = JSON.parse(document.cookie)

    console.log(document.cookie);
    console.log(treeVariables);
}
