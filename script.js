let fields = [];

function init() {
    fillFields();
    render();
    placeBomb();
}

function render() {
    document.getElementById('game').innerHTML = '';
    for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 10; y++) {
            document.getElementById('game').innerHTML +=/*html*/`
             <div onclick="openField(${x}, ${y})" class="field" id="field(${x},${y})"></div>
            `;
            let field = getField(x, y);
            if (field.revealed) {
                document.getElementById(`field(${x},${y})`).classList.add('field-revealed');
                if (field.hasBomb) {
                    document.getElementById(`field(${x},${y})`).classList.add('field-bomb');
                }
            }
        }
    }
}

function fillFields() {
    for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 10; y++) {
            fields.push({
                x, // x: x abkürzen mit x 
                y,
                hasBomb: false,
                revealed: false,
                number: 0,
                flag: false,
            });
        }
    }
}

function openField(x, y) {
    let field = getField(x, y);
    console.log(field);
    field.revealed = true;
    render();
}

function getField(x, y) {
    return fields.find(element => element.x == x && element.y == y);
}

function placeBomb() {
    for (let i = 0; i <= 10; i++) {
        let fieldId = Math.floor(Math.random() * 100);
        console.log('Eine Bombe sollte bei field Nummer ', fieldId);
        fields[fieldId].hasBomb = true;
    }
    console.log(fields);
}