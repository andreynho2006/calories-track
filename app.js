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
    // private data: STATE
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
        getItens: function() {
            return data.items;
        },
        logData: function() {
            return data;
        }
    }
})();




// UI Controller
const UICtrl = (function(){

    // public methods
    return {
        // public methods
        populateItemList: function(items) {
            let html = '';

            items.forEach(function(item) {
                html += `<li class="collection-item" id="item-${item.id}">
                            <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                            <a href="#" class="secondary-content">
                            <i class="edit-item fa fa-pencil"></i>
                            </a>
                        </li>`;
            });

            // insert list items
            document.querySelector('#item-list').innerHTML = html;
        }
    }
})();




// App controller
const App = (function(ItemCtrl, UICtrl){


    // return from module
    // public methods
    return {
        init: function() {
            // fetch items from data strcture
            const items = ItemCtrl.getItens();

            // populate list with items
            UICtrl.populateItemList(items);
        }
    }

})(ItemCtrl, UICtrl);

// Initialize  App
App.init();