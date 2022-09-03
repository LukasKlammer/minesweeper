let fields = [];

function init() {
    fillFields();
    placeBomb();
    render();
}

function render() {
    document.getElementById('game').innerHTML = '';
    for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 10; y++) {
            let field = getField(x,y);
            document.getElementById('game').innerHTML +=/*html*/`
             <div onclick="openField(${x}, ${y})" class="field" id="field(${x},${y})"></div>
            `;
            if (field.revealed) {
                document.getElementById(`field(${x},${y})`).classList.add('field-revealed');
                if(field.number > 0) {
                    document.getElementById(`field(${x},${y})`).classList.add('field-' + field.number);
                }

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
    return fields.find(element => element.x == x && element.y == y) || {number:0};
}

function placeBomb() {
    for (let i = 0; i <= 10; i++) {
        let filteredFields = fields.filter(f => !f.hasBomb);
        let fieldId = Math.floor(Math.random() * filteredFields.length);
        console.log('Eine Bombe sollte bei field Nummer ', fieldId);
        filteredFields[fieldId].hasBomb = true;
        let x = filteredFields[fieldId].x;
        let y = filteredFields[fieldId].y;
        getField(x - 1, y - 1).number++;
        getField(x, y - 1).number++;
        getField(x + 1, y - 1).number++;
        getField(x - 1, y).number++;
        getField(x + 1, y).number++;
        getField(x - 1, y + 1).number++;
        getField(x, y + 1).number++;
        getField(x + 1, y + 1).number++;
    }
    console.log(fields);
}

function bombDetecion() {
    for (let i = 0; i < 100; i++) {
        if (fields[i - 11].hasBomb) {
            fields[i].number++;
        }
        if (fields[i - 10].hasBomb) {
            fields[i].number++;
        }
        if (fields[i - 9].hasBomb) {
            fields[i].number++;
        }
        if (fields[i - 1].hasBomb) {
            fields[i].number++;
        }
        if (fields[i + 1].hasBomb) {
            fields[i].number++;
        }
        if (fields[i + 9].hasBomb) {
            fields[i].number++;
        }
        if (fields[i + 10].hasBomb) {
            fields[i].number++;
        }
        if (fields[i + 11].hasBomb) {
            fields[i].number++;
        }
    }
}