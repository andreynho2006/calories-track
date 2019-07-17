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
        getItemById: function(id) {
            let found = null;
            //loopthrough the items
            data.items.forEach(function(item) {
                if(item.id === id) {
                    found = item;
                }
            });
            return found;
        },
        updateItem: function(name, calories) {
            // calories to number
            cal = parseInt(calories);

            let found = null;

            data.items.forEach(function(item) {
                if(item.id === data.currentItem.id) {
                    item.name = name;
                    item.calories = cal;
                    found = item;
                }
            });

            return found;

        },
        getCurrentItem: function() {
            return data.currentItem;

        },
        setCurrentItem: function(item) {
            data.currentItem = item;
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
        listItems: '#item-list li',
        addBtn: '.add-btn',
        updateBtn: '.update-btn',
        deleteBtn: '.delete-btn',
        backBtn: '.back-btn',
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
        updateListItem: function(item) {
            let listItems = document.querySelectorAll(UISelectors.listItems);

            // turn Node list into Array
            listItems = Array.from(listItems);

            listItems.forEach(function(itemItem) {
                const itemID = itemItem.getAttribute('id');

                if(itemID === `item-${item.id}`) {
                    document.querySelector(`#${itemID}`).innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                    <a href="#" class="secondary-content">
                    <i class="edit-item fa fa-pencil"></i>
                    </a>`;
                }
            });
        },
        clearInput: function() {
            document.querySelector(UISelectors.itemNameInput).value = '';
            document.querySelector(UISelectors.itemCaloriesInput).value = '';
        },
        addItemToForm: function() {
            document.querySelector(UISelectors.itemNameInput).value =  ItemCtrl.getCurrentItem().name;
            document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;
            UICtrl.showEditState();
        },
        hideList: function() {
            document.querySelector(UISelectors.itemList).style.display = 'none';
        },
        showTotalCalories(totalCalories) {
            document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
        },
        clearEditState: function() {
            UICtrl.clearInput();
            document.querySelector(UISelectors.updateBtn).style.display = 'none';
            document.querySelector(UISelectors.deleteBtn).style.display = 'none';
            document.querySelector(UISelectors.backBtn).style.display = 'none';
            document.querySelector(UISelectors.addBtn).style.display = 'inline';
        },
        showEditState: function() {
            document.querySelector(UISelectors.updateBtn).style.display = 'inline';
            document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
            document.querySelector(UISelectors.backBtn).style.display = 'inline';
            document.querySelector(UISelectors.addBtn).style.display = 'none';
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

        // disable submit on enter
        document.addEventListener('keypress', function(e) {
            if(e.keyCode === 13 || e.which === 13) {
                e.preventDefault()
                return false;
            }
        })

        // edit icon click event
        document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);

        // update item event
        document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);
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

    // click edit item
    const itemEditClick = function(e) {
        if(e.target.classList.contains('edit-item')) {
            // get list item id (item-0, item-1)
            const listId = e.target.parentNode.parentNode.id;
            //break into an array
            const listIdArray = listId.split('-');
            //get the actual ID
            const id = parseInt(listIdArray[1]);
            // get item
            const itemToEdit = ItemCtrl.getItemById(id);
            // set current item
            ItemCtrl.setCurrentItem(itemToEdit);

            // add item to form
            UICtrl.addItemToForm();
        }

        e.preventDefault();
    }

    //update item submit
    const itemUpdateSubmit = function(e) {
        // get item input
        const input = UICtrl.getItemInput();

        //update item
        const updatedItem = ItemCtrl.updateItem(input.name, input.calories);

        // update UI
        UICtrl.updateListItem(updatedItem);

        //get total calories
        const totalCalories = ItemCtrl.getTotalCalories();

        // add totalCalories to UI
        UICtrl.showTotalCalories(totalCalories);

        UICtrl.clearEditState();

        e.preventDefault()
    }

    // return from module
    // public methods
    return {
        init: function() {
            //clear edit state / set initial state
            UICtrl.clearEditState()
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