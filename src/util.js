// https://stackoverflow.com/questions/6632530/chunk-split-a-string-in-javascript-without-breaking-words

export function splitIntoLines(input, len) {
  var i;
  var output = [];
  var lineSoFar = "";
  var temp;
  var words = input.split(" ");
  for (i = 0; i < words.length; ) {
    // check if adding this word would exceed the len
    temp = addWordOntoLine(lineSoFar, words[i]);
    if (temp.length > len) {
      if (lineSoFar.length == 0) {
        lineSoFar = temp; // force to put at least one word in each line
        i++; // skip past this word now
      }
      output.push(lineSoFar); // put line into output
      lineSoFar = ""; // init back to empty
    } else {
      lineSoFar = temp; // take the new word
      i++; // skip past this word now
    }
  }
  if (lineSoFar.length > 0) {
    output.push(lineSoFar);
  }
  return output;
}

function addWordOntoLine(line, word) {
  if (line.length != 0) {
    line += " ";
  }
  return (line += word);
}
