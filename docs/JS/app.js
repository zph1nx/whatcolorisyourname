const siteUrl = ((`${window.location.href}`.match(/^http(s)?\:\/\/(localhost|127\.0\.0\.1).*$/)) ? 'http://127.0.0.1:5500/docs' : `${window.location.href}`);
const colorsJsonUrl = `${siteUrl}/data/colors.data.json`;
const Colors = {};


function set_color_amp(hpVal, layers) {


    return pAmp;
}


$.getJSON(colorsJsonUrl, { format: 'json' }).done((colorsJSON) => {
    const colorAmp = {};

    if (colorsJSON.ampHp == colorsJSON.priorityLayers) {
        for (i = 1, val = colorsJSON.ampHp; i <= colorsJSON.priorityLayers; i++, val--) {
            colorAmp[i.toString()] = val;
        }
    } else {
        for (i = 1, prev_val = (colorsJSON.ampHp == 0 || colorsJSON.ampHp < colorsJSON.priorityLayers ? (colorsJSON.priorityLayers * 2) : colorsJSON.ampHp); i <= colorsJSON.priorityLayers; i++, prev_val = (prev_val > 1 ? Math.floor(prev_val / 2) : 1)) {
            colorAmp[i.toString()] = prev_val;
        }
    }

    // redefining the Char-Color Property Value as Color Object from RGB-Array (the previous value)
    for (const [key, value] of Object.entries(colorsJSON.chars)) {
        // pushing a 1 to the end of the RGB-Array, to set the alpha-channel as 100%
        value.color.push(1);

        const color_amp_arr = [];
        const rgbaColor = $.Color(value.color);

        for (let i = 0; i < colorAmp[value.priority.toString()]; i++) {
            color_amp_arr.push(rgbaColor);
        }

        Colors[key] = color_amp_arr;
    }
})


$(document).ready(function() {
    // Function to get the HEX-String of the input string
    // @PARAMETER   str         string  "the string thats currently inputted"
    // @RETURN      color_hex   string  "the computed Hex-String of all Char-Colors mixed"
    function getStringColor(str) {
        var color_arr = [];
        for (let c of str) {
            if (Colors.hasOwnProperty(c)) {
                color_arr = color_arr.concat(Colors[c]);
            }
        }

        if (color_arr.length <= 0) {
            color_arr.push($.Color([255, 255, 255, 1]));
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

        if (Bunny.is_egg(strInputVal)) {
            Bunny.do_egg();
        } else {
            if (Bunny.prev_egg !== "") {
                Bunny.undo_egg(Bunny.prev_egg);
            }
        }
    })
});