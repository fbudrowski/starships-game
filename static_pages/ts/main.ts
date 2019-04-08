function toggleWindow(window : HTMLElement){
    let windows = document.getElementsByClassName("change-window");
    let i = 0;
    if (window.style.display != "block"){
        for (i=0; i < windows.length; i++){
            (<HTMLElement>windows[i]).style.display = "none";
        }
        window.style.display = "block";
    }
    else{
        for (i=0; i < windows.length; i++){
            (<HTMLElement>windows[i]).style.display = "none";
        }
        window.style.display = "none";
    }
}function toggleWindowFromChild(window : HTMLElement){
    alert("Toggling window");
    let windows = parent.document.getElementsByClassName("change-window");
    alert("Found " + windows);
    let i = 0;
    if (window.style.display != "block"){
        for (i=0; i < windows.length; i++){
            (<HTMLElement>windows[i]).style.display = "none";
        }
        window.style.display = "block";
    }
    else{
        for (i=0; i < windows.length; i++){
            (<HTMLElement>windows[i]).style.display = "none";
        }
        window.style.display = "none";
    }
}