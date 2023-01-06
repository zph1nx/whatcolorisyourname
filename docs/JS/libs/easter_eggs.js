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
                <(optional) any easter-egg intern function>: (<parameters>) => {},
                exec: () => {
                    <easter-egg code>
                },
                undo: () => {
                    <code that resets all changes made by the "exec" function of this easter-egg>
                }
            }
        */
        "sigi": {
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
        },
        "clown": {
            joke_config: {
                type: {
                    "single": true,
                    "twopart": true
                },
                blacklist: {
                    "nsfw": false,
                    "religious": false,
                    "political": false,
                    "racist": true,
                    "sexist": true,
                    "explicit": true
                }
            },
            get_url_str: () => {
                var url_str = "https://v2.jokeapi.dev/joke/Any";
                const blacklisted_flags = [];
                const joke_types = [];

                for(const [key, value] of Object.entries(Bunny.eggs.clown.joke_config.type)){
                    if(value){
                        joke_types.push(key);
                    }
                }

                for(const [key, value] of Object.entries(Bunny.eggs.clown.joke_config.blacklist)){
                    if(value){
                        blacklisted_flags.push(key);
                    }
                }

                if(blacklisted_flags.length > 0){
                    url_str += "?blacklistFlags=";

                    blacklisted_flags.forEach((e, index) => {
                        url_str += e; 
                        url_str += ((index != (blacklisted_flags.length - 1))? "," : "")
                    });
                }

                if(joke_types.length < 2){
                    if(blacklisted_flags.length > 0){
                        url_str += `&type=${joke_types[0]}`;
                    }
                    else{
                        url_str += `?type=${joke_types[0]}`;
                    }
                }

                return url_str;
            },
            get_joke: () => {
                const url_str = Bunny.eggs.clown.get_url_str();

                (function(){
                    $.getJSON(url_str,{format: "json"})
                        .done(function(joke){
                            var jokeEggContainer = $("<div id=\"joke_egg_container\"></div>");

                            if($(window).width() > 800){
                                $('#colorHexStr').css('margin-top', '5vh');
                                $('#colorHexStr').css('margin-bottom', '10vh');
                            }
                            else {
                                $('#colorHexStr').css('margin-top', '2vh');
                                $('#colorHexStr').css('margin-bottom', '5vh');
                            }
                            
                            $('main').append(jokeEggContainer);

                            if(joke.type === "single"){
                                var joke_text = $('<text class="joke_egg"></text>');
                                joke_text.text(`${joke.joke}`);
                                $('#joke_egg_container').append(joke_text);
                            }
                            else if(joke.type === "twopart") {
                                var joke_setup = $('<text class="joke_egg"></text>');
                                var joke_delivery = $('<text class="joke_egg"></text>');

                                joke_setup.text(`${joke.setup}`);
                                joke_delivery.text(`${joke.delivery}`);

                                $('#joke_egg_container').append(joke_setup, $('<br>'), joke_delivery);
                            }
                        })
                })()
            },
            remove_joke: () => {
                $('#joke_egg_container').remove();
                if($(window).width() > 800){
                    $('#colorHexStr').css('margin-top', '10vh');
                    $('#colorHexStr').css('margin-bottom', '0vh');
                }
                else{
                    $('#colorHexStr').css('margin-top', '3vh');
                    $('#colorHexStr').css('margin-bottom', '0vh');
                }
                
            },
            exec: () => {
                Bunny.eggs.clown.get_joke();
            },
            undo: () => {
                Bunny.eggs.clown.remove_joke();
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
