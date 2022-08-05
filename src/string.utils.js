const countCharInString = (char, phrase) =>  {
    var amount = 0;
    var position = phrase.indexOf( char);
    while ( position !== -1 ) {
        amount++;
        position = phrase.indexOf( char, position + 1 );
    }

    return amount;
}

export {
    countCharInString
}