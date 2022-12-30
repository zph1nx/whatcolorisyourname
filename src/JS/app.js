$(document).ready(function() {
    const Colors = {
        a: [255, 229, 0],  // *
        b: [255, 153, 51],
        c: [255, 255, 51],
        d: [247, 170, 19],
        e: [240, 125, 0],  // *
        f: [51, 255, 153],
        g: [51, 255, 255],
        h: [249, 213, 6],
        i: [228, 6, 19],   // *
        j: [232, 78, 14],  // *
        k: [255, 51, 255],
        l: [111, 34, 130], // *
        m: [0, 150, 63],   // *
        n: [0, 122, 195],  // *
        o: [1, 155, 165],  // *
        p: [153, 221, 51],
        q: [51, 221, 51],
        r: [200, 5, 127],  // *
        s: [0, 79, 158],   // *
        t: [151, 193, 31], // *
        u: [251, 187, 0],  // *
        v: [153, 51, 221],
        w: [221, 51, 221],
        x: [221, 51, 153],
        y: [187, 51, 51],
        z: [187, 153, 51]
    };

    function mixRGB_evenly(color_arr) {
        var r = 0;
        var g = 0;
        var b = 0;

        color_arr.forEach((e) => {
            r += e[0];
            g += e[1];
            b += e[2];
        });

        return [Math.ceil(r / color_arr.length), Math.ceil(g / color_arr.length), Math.ceil(b / color_arr.length)];
    }

    function rgbToHex(rgb) {
        const r = rgb[0].toString(16).padStart(2, '0');
        const g = rgb[1].toString(16).padStart(2, '0');
        const b = rgb[2].toString(16).padStart(2, '0');

        return `#${r}${g}${b}`;
    }

    function getStringColor(str) {
        const color_arr = [];

        for (let c of str) {
            if (Colors.hasOwnProperty(c)) {
                color_arr.push(Colors[c]);
            }
        }

        const color_hex = rgbToHex(mixRGB_evenly(color_arr));

        return color_hex;
    }

    $('#strInput').on('input', function() {
        const strInputVal = $('#strInput').val();
        const strColor = (strInputVal.length > 0 ? getStringColor(strInputVal.toLowerCase()) : '#ffffff');

        $('body').css('background-color', strColor);
        $('#colorHexStr').text(strColor.toUpperCase());
    })
});