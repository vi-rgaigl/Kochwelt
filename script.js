let ingredients = [];
setArray('spaghetti', [4, '1 Zwiebel', '1 Zehe Knoblauch', '1 Möhre', '500g Rinderhackfleisch', 'Salz und Pfeffer', '200ml Gemüsebrühe', '70g Tomatenmark', '1 TL Oregano', '400g Tomanten, stückig', '500g Spaghetti']);
setArray('salad', [2, '1 Salatgurke', '1 Paprikaschote, rot', '1 Paprikaschote, grün', '500g Tomaten', '2 Zwiebeln', '200g Schafkäse', 'Oregano', 'ca. 100g Oliven, schwarz', '125g Olivenöl', '1 Zitrone, Saft davon', 'Salz und Pfeffer']);
setArray('pumpkin', [4, '800g Hokkaidokürbis(se), geputzt gewogen','600g Möhre(n), geschält gewogen', '1 Stück Ingwer, ca. 5 cm lang', '1 Zwiebel', '2 EL Butter', '1 L Gemüsebrühe', '500ml Kokosmilch', 'Salz und Pfeffer', 'Sojasauce', '1 Zitrone, Saft davon']);
let content;

function render(page) {
    content = document.getElementById('content');
    if(content) {
        content.setAttribute('w3-include-html', page);
    }
    includeHTML(page);
}


async function includeHTML(page) {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute('w3-include-html');
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
    renderTable(page);
}


function renderTable(page) {
    let id; 
    switch (page) {
        case './content/spaghetti.html': 
            id = 'spaghetti';
        break;
        case './content/salad.html': 
            id ='salad';
        break;
        case './content/pumpkin.html': 
            id ='pumpkin';
        break;
    }
    if(document.getElementById(id)) {
        ingredients = getArray(id);
        showTable(id, ingredients);
    }
}


function changeContent(page) {
    content.removeAttribute('w3-include-html');
    render(page);
}


function setArray(key, array) {
    localStorage.setItem(key, JSON.stringify(array));
}


function getArray(key) {
    return JSON.parse(localStorage.getItem(key));
}


function showTable(id, ingredients) {
    let table = document.getElementById(id);
    table.innerHTML = '';

    for (let i = 1; i < ingredients.length; i++) {
        if (i % 2 == 0) {
            table.innerHTML += `
                <tr>
                    <td>${ingredients[i]}</td>
                </tr>
                `;
        } else {
            table.innerHTML += /*html*/ `
                <tr class="bg-tr">
                    <td>${ingredients[i]}</td>
                </tr>
                `;
        }
    }
}


function calcPortion(id) {

    let ingredients = getArray(id);

    let factor = +document.getElementById('input').value;

    if (factor < 1) {
        alert('Bitte eine Zahl größer 1 eingeben!')
    } else {

        for (let i = 1; i < ingredients.length; i++) {
            let item = ingredients[i];
            let number = item.replace(/[^0-9]/g, "");
            let text = item.replace(/[0-9]/g, "");

            number = (number / ingredients[0]) * factor;

            if (number == 0) {
                ingredients[i] = text;
            } else {
                ingredients[i] = number + text;
            }
        }
        showTable(id, ingredients);
    }
}


function openMenu() {
    document.getElementById('menu-mobile').classList.add('show-mobile-menu');
}


function closeMenu() {
    document.getElementById('menu-mobile').classList.remove('show-mobile-menu');
}


function sendMail(event) {
    event.preventDefault();
    const data = new FormData(event.target);

    fetch("https://formspree.io/f/xoqopyzy", {
        method: "POST",
        body: new FormData(event.target),
        headers: {
            'Accept': 'application/json'
        }
    }).then(() => {
        window.location.href = "./content/success.html";
    }).catch((error) => {
        console.log(error);
    });
}