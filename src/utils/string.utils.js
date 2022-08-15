const countCharInString = (char, phrase) =>  {
    if (typeof(char) !== 'string' || typeof(phrase) !== 'string') return -1
    var amount = 0;
    var position = phrase.indexOf(char);
    while ( position !== -1 ) {
        amount++;
        position = phrase.indexOf( char, position + 1 );
    }

    return amount;
}

export {
    countCharInString
}