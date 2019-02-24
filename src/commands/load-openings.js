const fs = require('fs');
const LineByLineReader = require('line-by-line');
const pgnParser = require('pgn-parser');

const quotesRegex = /(?<=\")(.*?)(?=\")/;

function parseOpening(openingArr) {
  const opening = {};
  opening.ecoCode = openingArr[0].match(quotesRegex)[0];
  opening.white = openingArr[1].match(quotesRegex)[0];

  if (openingArr.length === 4) 
    opening.black = openingArr[2].match(quotesRegex)[0];
  
  opening.name = opening.white + (opening.black ? ', ' + opening.black : '');
  opening.moves = openingArr[openingArr.length -1];
  opening.rawPgn = openingArr.slice(1).join('\n');
  return opening;
}

function main() {
  pgnParser((err, parser) => {
    const lr = new LineByLineReader(__dirname + '/../../data/eco.pgn');
    
    let openingArr = [];
    let addingMoves = false;
    
    lr.on('line', (line) => {
      lr.pause();
      
      if (line) {
        if (addingMoves)
          openingArr[openingArr.length-1] += line
        else
          openingArr.push(line);
      }
      
      if (line.indexOf('1. ') > -1)
        addingMoves = true;

      if (addingMoves && line.length === 0) {
        const opening = parseOpening(openingArr);
        
        // TODO upsert opening to DB
        console.log(opening)
        // _______________________
        
        openingArr = [];
        addingMoves = false;                        
      }
      lr.resume();
    });    
  });
}

main();

