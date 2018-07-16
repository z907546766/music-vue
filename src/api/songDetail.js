import axios from "axios";
export function getSongDetail(disstid) {
  const url = '/api/getDiscDetail';
  return axios.get(url, {
      params:{
        type: '1',
        disstid: disstid,
        outCharset: 'utf-8'
      }
  }).then((res) => {
    return Promise.resolve(res.data);
  });
}
