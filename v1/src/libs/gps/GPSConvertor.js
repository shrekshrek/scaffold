(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) :
            (global.GPSConvertor = factory());
}(this, (function () {
    'use strict';

    var pi = Math.PI;
    var a = 6378245.0; //长半轴
    var ee = 0.00669342162296594323; //扁率
    var x_pi = Math.PI * 3000.0 / 180.0;


    function rad(d) {
        return d * pi / 180.0;
    }

    function gps2dis(lat1, lon1, lat2, lon2) {
        var EARTH_RADIUS = 6378.137;
        var radLat1 = rad(lat1);
        var radLat2 = rad(lat2);
        var a = radLat1 - radLat2;
        var b = rad(lon1) - rad(lon2);
        var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
        s = s * EARTH_RADIUS;
        s = Math.floor(s * 1000);
        return s;
    }

    function wgs2bd(lat, lon) {
        var _wgs2gcj = wgs2gcj(lat, lon);
        var _gcj2bd = gcj2bd(_wgs2gcj[0], _wgs2gcj[1]);
        return _gcj2bd;
    }

    function gcj2bd(lat, lon) {
        var x = lon, y = lat;
        var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi);
        var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * x_pi);
        var bd_lon = z * Math.cos(theta) + 0.0065;
        var bd_lat = z * Math.sin(theta) + 0.006;
        return [bd_lat, bd_lon];
    }

    function bd2gcj(lat, lon) {
        var x = lon - 0.0065, y = lat - 0.006;
        var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
        var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
        var gg_lon = z * Math.cos(theta);
        var gg_lat = z * Math.sin(theta);
        return [gg_lat, gg_lon];
    }

    function wgs2gcj(lat, lon) {
        var dLat = transformLat(lon - 105.0, lat - 35.0);
        var dLon = transformLon(lon - 105.0, lat - 35.0);
        var radLat = lat / 180.0 * pi;
        var magic = Math.sin(radLat);
        magic = 1 - ee * magic * magic;
        var sqrtMagic = Math.sqrt(magic);
        dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * pi);
        dLon = (dLon * 180.0) / (a / sqrtMagic * Math.cos(radLat) * pi);
        var mgLat = lat + dLat;
        var mgLon = lon + dLon;
        return [mgLat, mgLon];
    }

    function transformLat(lat, lon) {
        var ret = -100.0 + 2.0 * lat + 3.0 * lon + 0.2 * lon * lon + 0.1 * lat * lon + 0.2 * Math.sqrt(Math.abs(lat));
        ret += (20.0 * Math.sin(6.0 * lat * pi) + 20.0 * Math.sin(2.0 * lat * pi)) * 2.0 / 3.0;
        ret += (20.0 * Math.sin(lon * pi) + 40.0 * Math.sin(lon / 3.0 * pi)) * 2.0 / 3.0;
        ret += (160.0 * Math.sin(lon / 12.0 * pi) + 320 * Math.sin(lon * pi / 30.0)) * 2.0 / 3.0;
        return ret;
    }

    function transformLon(lat, lon) {
        var ret = 300.0 + lat + 2.0 * lon + 0.1 * lat * lat + 0.1 * lat * lon + 0.1 * Math.sqrt(Math.abs(lat));
        ret += (20.0 * Math.sin(6.0 * lat * pi) + 20.0 * Math.sin(2.0 * lat * pi)) * 2.0 / 3.0;
        ret += (20.0 * Math.sin(lat * pi) + 40.0 * Math.sin(lat / 3.0 * pi)) * 2.0 / 3.0;
        ret += (150.0 * Math.sin(lat / 12.0 * pi) + 300.0 * Math.sin(lat / 30.0 * pi)) * 2.0 / 3.0;
        return ret;
    }

    function GPSConvertor() {
        this.wgs2bd = wgs2bd;
        this.gcj2bd = gcj2bd;
        this.bd2gcj = bd2gcj;
        this.wgs2gcj = wgs2gcj;
        this.transformLat = transformLat;
        this.transformLon = transformLon;
        this.gps2dis = gps2dis;
    }

    return GPSConvertor;

})));
