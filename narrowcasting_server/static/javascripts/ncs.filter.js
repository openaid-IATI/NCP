angular.module('ncs').filter('cut', function () {
    return function (value, wordwise, max, tail) {
        if (!value) return '';

        max = parseInt(max, 10);
        if (!max) return value;
        if (value.length <= max) return value;

        value = value.substr(0, max);
        if (wordwise) {
            var lastspace = value.lastIndexOf(' ');
            if (lastspace != -1) {
                value = value.substr(0, lastspace);
            }
        }

        return value + (tail || ' …');
    };
}).filter('iaticurrency', function(numberFilter){

    return function(input, curSymbol, decPlaces, thouSep, decSep) {
      var curSymbol = curSymbol || "$";
      var decPlaces = decPlaces || 0;
      var thouSep = thouSep || ",";
      var decSep = decSep || ".";

      // Check for invalid inputs
      var out = isNaN(input) || input === '' || input === null ? 0.0 : input;

      //Deal with the minus (negative numbers)
      var minus = input < 0;
      out = Math.abs(out);
      out = numberFilter(out, decPlaces);

      // Replace the thousand and decimal separators.  
      // This is a two step process to avoid overlaps between the two
      if(thouSep != ",") out = out.replace(/\,/g, "T");
      if(decSep != ".") out = out.replace(/\./g, "D");
      out = out.replace(/T/g, thouSep);
      out = out.replace(/D/g, decSep);

      // Add the minus and the symbol
      if(minus){
        return "-" + curSymbol + out;
      }else{
        return curSymbol + out;
      }
    }
});
