const fs = require("fs");

const randomIntRange = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getRandomChunk = (texte, chunkSize) => {
    const texteLength = texte.length;
    const where = randomIntRange(0, texteLength - chunkSize - 1);
    let final = "";
    for(let i = where; i < where + chunkSize; i++) {
        final += texte[i] + " ";
    }
    return final;
}

exports.lorem = (chars, callback) => {
    fs.readFile('./assets/textes.txt', (err, data) => {
        if(err) throw new Error(err.message);
        const poeme = data.toString().replace(/(\r\n|\n|\r)/gm," ").split(" ");
        let texte = "";
        do {
            const chunk = getRandomChunk(poeme, randomIntRange(5, 10));

            if(texte.length + chunk.length <= chars) {
                texte += chunk;
            }
            else {
                const remaining = chars - texte.length;
                for(let i = 0; i < remaining; i++) {
                    texte += chunk[i];
                }
            }
        } while(texte.length < chars);

        // console.log("LIGNE FINALE" + texte)
        callback(texte);
    })
}
