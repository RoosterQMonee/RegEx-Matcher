var regexInput = document.getElementById("regex-input");
var textInput = document.getElementById("backdrop");
var matchesPanel = document.getElementById("matches-panel");
var regexError = document.getElementById("regex-error");
var explanationPanel = document.getElementById("explanation-panel");


let hilite = new textHighlight(textInput);


function matchText() {
    var regexInput = document.getElementById("regex-input").value;
    var textInput = document.getElementById("backdrop").value;
    var matchesPanel = document.getElementById("matches-panel");
    var regexError = document.getElementById("regex-error");
    var explanationPanel = document.getElementById("explanation-panel");

    matchesPanel.innerHTML = "";
    regexError.innerHTML = "";

    try {
        var regex = new RegExp(regexInput, 'g');
        var match = textInput.match(regex);

        if (match) {
            hilite.clear();
            displayExplanation(regex, match, explanationPanel);
        } else {
            document.getElementById("backdrop").value = textInput;
            explanationPanel.innerHTML = "";
        }
    } catch (error) {
        regexError.innerHTML = error.message;
    }
}





function applyHighlights(text, regex) {
    return text.replace(regex, match => `<mark>${match}</mark>`);
}

function setHighlightedText(highlightedText) {
    const backdrop = document.getElementById("backdrop");
    backdrop.innerHTML = highlightedText;
}



function displayExplanation(regex, match, explanationPanel) {
    var explanation = [];
    let sens = document.getElementById('sens').value; 
    let word = document.getElementById('word').value; 

    //regex.toString().replace(/\/([gimuy]*)$/, function (_, flags) {
    //    explanation.push(`<b>Flags:</b> ${flags}`);
    //});

    explanation.push(`<br>`);

    var patternChars = Array.from(new Set(regex.source.split('')));
  
    patternChars.forEach(char => {
        switch (char) {
            case '\\':
                explanation.push(`<b>${char}</b>: Escape character`);
                break;
            
            case '^':
                explanation.push(`<b>${char}</b>: Asserts the start of a line`);
                break;
            
            case '$':
                explanation.push(`<b>${char}</b>: Asserts the end of a line`);
                break;
            
            case '.':
                explanation.push(`<b>${char}</b>: Matches any single character`);
                break;
            
            case '*':
                explanation.push(`<b>${char}</b>: Matches 0 or more occurrences of the preceding character`);
                break;
            
            case '-':
                explanation.push(`<b>${char}</b>: Matches all characters in a category (a-z = abcdfeghhijkl...)`);
                break;
            
            case '+':
                explanation.push(`<b>${char}</b>: Matches 1 or more occurrences of the preceding character`);
                break;
            
            case '?':
                explanation.push(`<b>${char}</b>: Matches 0 or 1 occurrence of the preceding character`);
                break;
            
            case '(':
                explanation.push(`<b>${char}</b>: Start of a capturing group`);
                break;
            
            case ')':
                explanation.push(`<b>${char}</b>: End of a capturing group`);
                break;
            
            case '[':
                explanation.push(`<b>${char}</b>: Start of a character class`);
                break;
            
            case ']':
                explanation.push(`<b>${char}</b>: End of a character class`);
                break;
            
            case '{':
                explanation.push(`<b>${char}</b>: Start of a quantifier`);
                break;
            
            case '}':
                explanation.push(`<b>${char}</b>: End of a quantifier`);
                break;
            
            case '|':
                explanation.push(`<b>${char}</b>: Alternation (matches either the pattern on its left or right)`);
                break;

            // TODO: add more
        }
    });

    if (match !== null)
    {
        explanation.push(`<hr>`);
  
        match.forEach((group, index) => {
            explanation.push(`<b>Group ${index}:</b> ${group}`);

            hilite.search(group, sens, word);
        });
    }

    explanationPanel.innerHTML = explanation.join("<br>");
}



let btnPrev = document.getElementById('prev');
let btnNext = document.getElementById('next');

btnPrev.addEventListener('click', hilite.prev);
btnNext.addEventListener('click', hilite.next);
