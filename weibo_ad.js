const path1 = "/interface/sdk/sdkad.php";
const path2 = "/wbapplua/wbpullad.lua";

const hostname = $request.hostname;
let responseBody = $response.body;

if (hostname.indexOf(path1) != -1) {
    let re = /\{.*\}/;
    responseBody = responseBody.match(re);
    var obj = JSON.parse(responseBody);
    if (obj.background_delay_display_time) obj.background_delay_display_time = 60*60*24*365;
    if (obj.show_push_splash_ad) obj.show_push_splash_ad = false;
    if (obj.ads) obj.ads = [];
    responseBody = JSON.stringify(obj) + 'OK';
}

if (hostname.indexOf(path2) != -1) {
    var obj = JSON.parse(responseBody);
    if (obj.cached_ad && obj.cached_ad.ads) obj.cached_ad.ads = [];
    responseBody = JSON.stringify(obj);
}

$done({responseBody});
