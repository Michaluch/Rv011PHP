sidebar = {}; //sidebar
sidebar.on = false; //false - closed, true - opened

//Open sidebar method
sidebar.turnOn = function(){
    if (!sidebar.on){
        $("#map-canvas").addClass("col-xs-9");
        $("#sb").addClass("col-xs-3");
        $("#sb").show();
        sidebar.on = true;
    }
};

//Close sidebar method
sidebar.turnOff = function(){
    if (sidebar.on){
        $("#map-canvas").removeClass("col-xs-9");
        $("#sb").removeClass("col-xs-3");
        $("#sb").hide();
        sidebar.on = false;
    }
};

//If sidebar opened, than close it. Otherwise open it.
sidebar.reverse = function(){
    sidebar.on ? sidebar.turnOff() : sidebar.turnOn();
} 

$("#sb").hide();

//div-button "close sidebar"
$("#sidebarClose").click(function(){
    sidebar.turnOff();
});

//test buttons
/*
$("#sbOn").click(function(){
    sidebar.turnOn();
});

$("#sbOff").click(function(){
    sidebar.turnOff();
});

$("#sbReverse").click(function(){
    sidebar.reverse();
});
*/
