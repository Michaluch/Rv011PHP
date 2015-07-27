define(
    [
        'jquery',
    ],
    function($){
        var sidebar = {}; //sidebar
        sidebar.on = false; //false - closed, true - opened
        sidebar.onCloseOnce = null;
        //Open sidebar method
        sidebar.turnOn = function(){
            if (!sidebar.on){
                $("#map-canvas").addClass("col-xs-9");
                $("#sb").addClass("col-xs-3");
                $("#sb").show();
                sidebar.on = true;
            }
            //TODO: fix reopening process
            else {
                if (typeof this.onCloseOnce === 'function'){
                    this.onCloseOnce();
                }
            }
        };
        //Close sidebar method
        sidebar.turnOff = function(){
            if (sidebar.on){
                $("#map-canvas").removeClass("col-xs-9");
                $("#sb").removeClass("col-xs-3");
                $("#sb").hide();
                sidebar.on = false;
                if (typeof this.onCloseOnce === 'function'){
                    this.onCloseOnce();
                }
            }
        };
        //If sidebar opened, than close it. Otherwise open it.
        sidebar.reverse = function(){
            sidebar.on ? sidebar.turnOff() : sidebar.turnOn();
        };
        
        /**
         * Function setOnCloseOnce() - Initialize callback function when sidebar is closes.
         *
         * @param {function} callback - callback function
         */
        sidebar.setOnCloseOnce = function(callback_func){
            this.onCloseOnce = function(){
                callback_func();
                this.onCloseOnce = null;
            };
        }
        
        //div-button "close sidebar"
        $("#sidebarClose").click(function(){
            sidebar.turnOff();
        });

        $("#sb").hide();
        
        return sidebar;
    }
);




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
