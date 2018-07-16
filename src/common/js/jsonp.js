import originJSONP from "jsonp"

export default function jsonp(url, data, opts) {
  url += (url.indexOf("?") < 0 ? "?" : "&") + param(data);
  return new Promise((resolve, reject) => {
    originJSONP(url, opts, (err, data) => {
      if (!err) {
        resolve(data);
      } else {
        reject(err);
      }
    });
  })
}

function param(data) {
  let url = "";
  for (var key in data) {
    if (data.hasOwnProperty(key)) {
      let val = data[key] !== undefined ? data[key] : "";
      url += `&${key}=${encodeURIComponent(val)}`;
    }
  }
  return url ? url.substring(1) : "";
}
