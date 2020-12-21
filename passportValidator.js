function fieldExtractor(fieldName) {
    switch (fieldName) {
        case 'hcl':
            return RegExp('(?:hcl\:)((\#)([0-9a-f]{6}))');
        case 'byr':
            return RegExp('(?:byr\:)((19[2-9][0-9])|(200[0-2]))');
        case 'iyr':
            return RegExp('(?:iyr\:)((201[0-9])|(2020))');
        case 'eyr':
            return RegExp('(?:eyr\:)((202[0-9])|(2030))');
        case 'hgt':
            return RegExp('(?:hgt)((?:\:)1([5-8][0-9]|9[0-3])cm)|((?:hgt)(?:\:)(59|6[0-9]|7[0-6])in)');
        case 'ecl':
            return RegExp('(?:ecl\:)(amb|blu|brn|gry|grn|hzl|oth)');
        case 'pid':
            return RegExp('(?:pid\:)([0-9]{9})([^0-9]*)');
    }
}

function passportValidator() {
    const fs = require('fs');
    let passportArray = fs.readFileSync('./passportDetails.txt').toString().split("\n\n");

    let validPassports = 0;
    
    passportArray.forEach(function(passport) {
        if (
            fieldExtractor('byr').test(passport) &&
            fieldExtractor('iyr').test(passport) &&
            fieldExtractor('eyr').test(passport) &&
            fieldExtractor('hgt').test(passport) && 
            fieldExtractor('hcl').test(passport) &&
            fieldExtractor('ecl').test(passport) &&
            fieldExtractor('pid').test(passport)
        ) {
            validPassports++;
        }
    })

    let result = `Number of Valid Passports: ${validPassports}\n`;

    fs.appendFileSync('scriptOutput.txt', result, function(err) {
        if (err) throw err;
        console.log('Saved!');
    });
    return validPassports;
}

passportValidator();