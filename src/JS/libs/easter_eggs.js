const Bunny = { // "Bunny" b.c. the Easter Bunny is the Easter-Egg Manager (XD)
    prev_egg: "",
    egg_executed: false,
    forget_egg: () => {
        Bunny.prev_egg = ""
        Bunny.egg_executed = false;
    },
    remember_egg: (egg_str) => {
        Bunny.prev_egg = egg_str;
    },
    eggs: {
        /* 
            HOW TO DEFINE EASTER-EGGS:
            "<easter-egg string>": {
                exec: () => {
                    <easter-egg code>
                },
                undo: () => {
                    <code that resets all changes made by the "exec" function of this easter-egg>
                }
            }
        */
        "reverse": {
            exec: () => {
                $('header').css('color', '#ffffff');
                $('#strInput').css('color', '#ffffff');
                $('#strInput:focus').css('color', '#ffffff');
                $('::placeholder').css('color', 'rgb(60,60,60)');
                $('#colorHexStr').css('color', '#ffffff');
                $('#developerCollabTagline').css('color', 'rgb(231,231,231)');
                $('a').css('color', '#ffffff');
                $('#developerCollabText').css('color', '#ffffff');
                $('#appVersionText').css('color', '#ffffff');
                $('html').css('background-color', '#000000');
                $('body').css('background-color', '#000000');
                $('#colorHexStr').text("#000000");
            },
            undo: () => {
                $('header').css('color', '#000000');
                $('#strInput').css('color', '#000000');
                $('#strInput:focus').css('color', '#000000');
                $('::placeholder').css('color', '#c0c0c0');
                $('#colorHexStr').css('color', '#000000');
                $('#developerCollabTagline').css('color', 'rgb(55, 55, 55)');
                $('a').css('color', '#000000');
                $('#developerCollabText').css('color', '#000000');
                $('#appVersionText').css('color', '#000000');
                $('html').css('background-color', '#ffffff');
                $('body').css('background-color', '#ffffff');
                $('#colorHexStr').text("#FFFFFF");
            } 
        }
    },
    do_egg: (egg_str = Bunny.prev_egg) => {
        if(!Bunny.egg_executed){
            const egg_obj = Bunny.eggs[egg_str];
            egg_obj.exec();
            Bunny.egg_executed = true;
        }
    },
    undo_egg: (egg_str) => {
        if(Bunny.egg_executed){
            const egg_obj = Bunny.eggs[egg_str];
            egg_obj.undo();
        }

        Bunny.forget_egg();
    },
    is_egg: (str) => {
        str = str.toLowerCase();
        const str_is_egg = Bunny.eggs.hasOwnProperty(str);

        if(str_is_egg){
            if(str !== Bunny.prev_egg && Bunny.prev_egg !== ""){
                Bunny.undo_egg(Bunny.prev_egg);
            }

            Bunny.remember_egg(str);
        }
        else {
            if(Bunny.prev_egg !== ""){
                Bunny.undo_egg(Bunny.prev_egg);
            }
        }

        return str_is_egg
    }
}
