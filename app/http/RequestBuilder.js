'use strict'

const REUQEST_URL = 'http://test.cqdpyy.ucmed.cn/api/exec/1.htm';
const APP_KEY = 'ZW5sNWVWOWhibVJ5YjJsaw==';
const REQUEST_TIME = new Date().getTime();

const toQueryString = function (obj) {
    return obj ? Object.keys(obj).sort().map(function (key) {
        var val = obj[key];
        if (Array.isArray(val)) {
            return val.sort().map(function (val2) {
                return encodeURIComponent(key) + '=' + encodeURIComponent(val2);
            }).join('&');
        }
        return encodeURIComponent(key) + '=' + encodeURIComponent(val);
    }).join('&') : '';
}

let data = {"D":"ffffffff-88ac-cfac-ffff-ffffb7e805c5","T":"1","V":"1.0.0","type":1};

const RequestBuilder = function(params){
  Object.assign(data,params);
  console.log(data);
  return fetch(REUQEST_URL,{
    method:'POST',
    headers:{
      'Accept': 'application/xml',
      'K': APP_KEY,
      'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      'Time': REQUEST_TIME
    },
    body:toQueryString({
      'requestData':JSON.stringify(data)
    })
  }).then(response => response.json());
}

export { RequestBuilder as default }
