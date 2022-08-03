// for another browser which do not support forEach
if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
        thisArg = thisArg || window;
        for (let i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
        }
    };
}

const dropdown = document.querySelectorAll('.dropdown');
dropdown.forEach(dropdownWrapper => {

    const selectBtn = dropdownWrapper.querySelector('.dropdown-button');
    const dropdownList = dropdownWrapper.querySelector('.dropdown-list');
    const dropdownItems = dropdownList.querySelectorAll('.dropdown-item');
    const inputHidden = dropdownWrapper.querySelector('.dropdown-input-hidden');
    const selectArrow = dropdownWrapper.querySelector('.icon');

    selectBtn.addEventListener('click', () => {
        dropdownList.classList.toggle('dropdown-list-visible');
        selectArrow.classList.toggle('active');
    });

    dropdownItems.forEach((item, index) => {
        item.addEventListener('click', event => {
            // hide click on dropdown-list for document.addEventListeners
            event.stopPropagation();
            selectBtn.innerText = item.innerText;
            inputHidden.value = item.dataset.value;
            dropdownList.classList.remove('dropdown-list-visible');
            selectArrow.classList.remove('active');
        })
    })

    // close dropdown outside
    document.addEventListener('click', event => {
        if (event.target !== selectBtn) {
            dropdownList.classList.remove('dropdown-list-visible');
            selectArrow.classList.remove('active');
        }
    })

    document.addEventListener('keydown', event => {
        if (event.key === 'Tab' || event.key === 'Escape') {
            dropdownList.classList.remove('dropdown-list-visible');
            selectArrow.classList.remove('active');
        }
    })

})
