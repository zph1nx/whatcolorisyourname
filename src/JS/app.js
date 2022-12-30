$(document).ready(function() {
    const Colors = {
        "a": [255, 229, 0],  // *
        "b": [255, 153, 51],
        "c": [255, 255, 51],
        "d": [247, 170, 19],
        "e": [240, 125, 0],  // *
        "f": [51, 255, 153],
        "g": [51, 255, 255],
        "h": [249, 213, 6],
        "i": [228, 6, 19],   // *
        "j": [232, 78, 14],  // *
        "k": [255, 51, 255],
        "l": [111, 34, 130], // *
        "m": [0, 150, 63],   // *
        "n": [0, 122, 195],  // *
        "o": [1, 155, 165],  // *
        "p": [153, 221, 51],
        "q": [51, 221, 51],
        "r": [200, 5, 127],  // *
        "s": [0, 79, 158],   // *
        "t": [151, 193, 31], // *
        "u": [251, 187, 0],  // *
        "v": [153, 51, 221],
        "w": [221, 51, 221],
        "x": [221, 51, 153],
        "y": [187, 51, 51],
        "z": [187, 153, 51]
    };

    // redefining the Char-Color Property Value as Color Object from RGB-Array (the previous value)
    for (const [key, value] of Object.entries(Colors)) {
        // pushing a 1 to the end of the RGB-Array, to set the alpha-channel as 100%
        value.push(1);
        Colors[key] = $.Color(value);
    }


    // Function to get the HEX-String of the input string
    // @PARAMETER   str         string  "the string thats currently inputted"
    // @RETURN      color_hex   string  "the computed Hex-String of all Char-Colors mixed"
    function getStringColor(str) {
        const color_arr = [];

        for (let c of str) {
            if (Colors.hasOwnProperty(c)) {
                color_arr.push(Colors[c]);
            }
        }

        if(color_arr.length <= 0){
            color_arr.push($.Color([255,255,255,1]));
        }

        const color = Color_mixer.mix(color_arr);

        return color.toHexString();
    }


    // Eventlistener for the string input Field, triggers on input
    $('#strInput').on('input', function() {
        const strInputVal = $('#strInput').val();
        const strColor = (strInputVal.length > 0 ? getStringColor(strInputVal.toLowerCase()) : '#ffffff');

        $('body').css('background-color', strColor);
        $('#colorHexStr').text(strColor.toUpperCase());
    })
});