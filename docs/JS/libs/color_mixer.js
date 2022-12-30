/*!
 * Color_mixer for substractive color mixing
 * requires jQuery and jQuery color
 */

Color_mixer = function(){};

Color_mixer.toCymk = function(color){
  cyan    = 255 - color._rgba[0];
  magenta = 255 - color._rgba[1];
  yellow  = 255 - color._rgba[2];
  black   = Math.min(cyan, magenta, yellow);
  cyan    = ((cyan - black) / (255 - black));
  magenta = ((magenta - black) / (255 - black));
  yellow  = ((yellow  - black) / (255 - black));

  return {c:cyan,m:magenta,y:yellow,k:black/255,a:color._rgba[3]};
}

Color_mixer.toRgba = function(color){
  color.c = color.c;
  color.m = color.m;
  color.y = color.y;
  color.k = color.k;
  R = color.c * (1.0 - color.k) + color.k;
  G = color.m * (1.0 - color.k) + color.k;
  B = color.y * (1.0 - color.k) + color.k;
  R = Math.round((1.0 - R) * 255.0 + 0.5);
  G = Math.round((1.0 - G) * 255.0 + 0.5);
  B = Math.round((1.0 - B) * 255.0 + 0.5);
  color = $.Color(R,G,B,color.a);
  return color;
}

Color_mixer.mix = function(color_arr){
  var color = {c:0,m:0,y:0,k:0,a:0};

  color_arr.forEach((e, index) => {
    color_arr[index] = Color_mixer.toCymk(e);
    e = color_arr[index];
    color.c += e.c;
    color.m += e.m;
    color.y += e.y;
    color.k += e.k;
    color.a += e.a;
  })

  color.c /= color_arr.length;
  color.m /= color_arr.length;
  color.y /= color_arr.length;
  color.k /= color_arr.length;
  color.a /= color_arr.length;

  color = Color_mixer.toRgba(color);

  return color;
}
