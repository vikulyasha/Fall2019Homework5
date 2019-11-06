const URL = 'https://jsonplaceholder.typicode.com/users';
const xhr = new XMLHttpRequest();
xhr.open('get', URL, true);
xhr.onload = function() {
    const xmlNode = document.getElementsByClassName('xmlHTTP')[0];

    if (this.response.length === 0) {
        renderError(xmlNode);
        return;
    };

    const emailList = JSON.parse(this.response).map(element => {
        return element.email;
    }).sort();

    emailList.forEach(element => {
        render(xmlNode, element);
    });
}
xhr.send();

fetch(URL).then((response) => {
    if (response.ok) {
        response.json().then(json => {
            const fetchNode = document.getElementsByClassName('fetch')[0];
            const usernameList = json.map(element => element.username).sort((a, b) => {
                return a.length - b.length;
            });

            usernameList.forEach(element => {
                render(fetchNode, element);
            });
        });
    } else {
        renderError(fetchNode);
    }
});


function render(parentNode, element) {
    const node = document.createElement('div');
    node.innerHTML = `${element}`;
    parentNode.appendChild(node);
};

function renderError(parentNode) {
    const node = document.createElement('div');
    node.innerHTML = 'Something went wrong, please reload the page';
    parentNode.appendChild(node);
};