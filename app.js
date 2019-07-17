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
            // {id: 0, name: 'Steak Dinner', calories: 1200},
            // {id: 1, name: 'Cookie', calories: 400},
            // {id: 2, name: 'Eggs', calories: 300}
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
        addItem: function(name, calories) {
            // create id
            let ID;
            if(data.items.length > 0) {
                ID = data.items[data.items.length -1].id + 1;
            } else {
                ID = 0;
            }

            // calories to number
            const cal = parseInt(calories);

            // create new Item
            newItem = new Item(ID, name, cal);

            // add to items array
            data.items.push(newItem);

            return newItem;
        },
        getTotalCalories: function() {
            let total = 0;

            // loo through items and get calories
            data.items.forEach(function(item) {
                total += item.calories;
            })

            // set totalcalories
            data.totalCalories = total;

            // return total
            return data.totalCalories;
        },
        logData: function() {
            return data;
        }
    }
})();




// UI Controller
const UICtrl = (function(){

    const UISelectors = {
        itemList: '#item-list',
        addBtn: '.add-btn',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories',
        totalCalories: '.total-calories',
    }

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
            document.querySelector(UISelectors.itemList).innerHTML = html;
        },
        getItemInput: function() {
            return {
                name: document.querySelector(UISelectors.itemNameInput).value,
                calories:document.querySelector(UISelectors.itemCaloriesInput).value
            }
        },
        addListItem: function(item) {
            //show the list
            document.querySelector(UISelectors.itemList).style.display = 'block';
            // create <li> element
            const li = document.createElement('li');
            //add class
            li.className = 'collection-item';
            // add id
            li.id = `item-${item.id}`;

            //add HTML
            li.innerHTML = `
                <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                <a href="#" class="secondary-content">
                <i class="edit-item fa fa-pencil"></i>
                </a>
            `;

            // insert item
            document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);
        },
        clearInput: function() {
            document.querySelector(UISelectors.itemNameInput).value = '';
            document.querySelector(UISelectors.itemCaloriesInput).value = '';
        },
        hideList: function() {
            document.querySelector(UISelectors.itemList).style.display = 'none';
        },
        showTotalCalories(totalCalories) {
            document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
        },
        // get selectors to use in App
        getSelectors: function() {
            return UISelectors;
        }
    }
})();




// App controller
const App = (function(ItemCtrl, UICtrl){
    // Load event listeners
    const loadEventListeners = function() {
        // get UI Selectors
        const UISelectors = UICtrl.getSelectors();

        // add item event
        document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);
    }

    // add item submit
    const itemAddSubmit = function(e) {
        // get form input from UI controller
        const input = UICtrl.getItemInput();

        // check for name and calories input
        if(input.name !== '' && input.calories !== '') {
            // add item
            const newItem = ItemCtrl.addItem(input.name, input.calories);

            // add item to UI list
            UICtrl.addListItem(newItem);

            //get total calories
            const totalCalories = ItemCtrl.getTotalCalories();

            // add totalCalories to UI
            UICtrl.showTotalCalories(totalCalories);

            // clear input fields
            UICtrl.clearInput();
        }

        e.preventDefault();
    }

    // return from module
    // public methods
    return {
        init: function() {
            // fetch items from data strcture
            const items = ItemCtrl.getItens();

            // check if any items
            if(items.length === 0){
                UICtrl.hideList();
            }else {
                // populate list with items
                UICtrl.populateItemList(items);
            }

            //get total calories
            const totalCalories = ItemCtrl.getTotalCalories();

            // add totalCalories to UI
            UICtrl.showTotalCalories(totalCalories);

            //load event listeners
            loadEventListeners();
        }
    }

})(ItemCtrl, UICtrl);

// Initialize  App
App.init();