window.onload = function() {
    const element = document.getElementById("element");
    const grid = document.getElementById("grid");
    const free = document.getElementById("free");

    element.onpointerdown = (event) => {
        const newElement = element.cloneNode();
        newElement.classList.add("new-element");
        newElement.classList.remove("element");
        newElement.style.backgroundColor = getRandomColor();
        document.body.append(newElement);
        changeElementPosition(event.pageX, event.pageY);
        document.addEventListener('pointermove', changeCursorPosition);
        newElement.onpointerup = (event) => {
            document.removeEventListener('pointermove', changeCursorPosition);
            if (isEntered(event.pageX, event.pageY, grid)) {
                newElement.onpointerup = null;
                newElement.remove();
                newElement.style.position = 'static';
                grid.append(newElement);
            } else if (isEntered(event.pageX, event.pageY, free)) {
                newElement.onpointerup = null;
                newElement.remove();
                free.append(newElement);
                changeElementPosition(event.pageX - free.offsetLeft, event.pageY - free.offsetTop);
            } else {
                newElement.onpointerup = null;
                newElement.remove();
            }
        };

        function changeElementPosition(pageX, pageY) {
            newElement.style.left = pageX - newElement.offsetWidth / 2 + 'px';
            newElement.style.top = pageY - newElement.offsetHeight / 2 + 'px';
        }

        function changeCursorPosition(event) {
            changeElementPosition(event.pageX, event.pageY);
        }
    };
}

function getRandomColor(){
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function isEntered(x, y, element){
    if (y >= element.offsetTop && y <= (element.offsetTop + element.clientHeight) && x >= element.offsetLeft && x <= (element.offsetLeft + element.clientWidth)) 
    {
        return true;
    } else {
        return false;
    }
}

