//  Storage Controller


// Item Controller
const ItemCtrl = (function(){
    // item constructor
    const Item = function(id, name, calories) {
        this.id = id;
        this.name = name;
        this.calories = calories;
    }

    // data strcture
    // private data
    const data = {
        items: [
            {id: 0, name: 'Steak Dinner', calories: 1200},
            {id: 1, name: 'Cookie', calories: 400},
            {id: 2, name: 'Eggs', calories: 300}
        ],
        currentItem: null,
        totalCalories: 0
    }

    // return from controller
    // public methods
    return {
        logData: function() {
            return data;
        }
    }
})();




// UI Controller
const UICtrl = (function(){

    // public methods
    return {

    }
})();




// App controller
const App = (function(ItemCtrl, UICtrl){


    // return from module
    // public methods
    return {
        init: function() {
            console.log('Initializing app.....');
        }
    }

})(ItemCtrl, UICtrl);

// Initialize  App
App.init();