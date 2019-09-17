import { HTTP } from "@ionic-native/http/ngx";

export default function requestJson(
  method: string,
  url: string,
  params: object,
  successCallback,
  failureCallback
) {
  method = method.toUpperCase();

  // let body = null;

  if (method === "GET") {
    url = injectQueryStringParams(url, params);
  } else {
    // body = encodeParams(params);
  }

  HTTP.get(url, {}, {})
    .then(function(result) {
      let res = JSON.parse(result);
      successCallback(res, null);
    })
    .catch(() => {
      failureCallback("Request failed", null);
    });

  // xhr.send(body);
}

function injectQueryStringParams(url: string, params) {
  return url + (url.indexOf("?") === -1 ? "?" : "&") + encodeParams(params);
}

function encodeParams(params) {
  let parts = [];

  for (let key in params) {
    parts.push(encodeURIComponent(key) + "=" + encodeURIComponent(params[key]));
  }

  return parts.join("&");
}
