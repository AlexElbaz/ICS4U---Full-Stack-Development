let itemLister = document.querySelector('#header-title span');
itemLister.style.display = 'inline-block';
//console.log(itemLister.style);


function addListItem() {
    let items = document.querySelector('#items');
    let newItem = document.createElement('li');
    newItem.classList.add('list-group-item');
    let text = document.querySelector('#newItemValue');
    let textNode = document.createTextNode(text.value);
    text.value = '';
    newItem.appendChild(textNode);
    items.appendChild(newItem);
        // Can use item prepend to put new item at beginning of list.
}

let itemList = [];