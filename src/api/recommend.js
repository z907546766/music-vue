// import jsonp from "@/common/js/jsonp"
import axios from "axios";
import {
    commonParams,
} from "@/api/config"

export function getRecommend() {
    const url = '/api/getRecommend';
    const params = Object.assign(commonParams, {
        platform: 'h5',
        uin: 0,
        needNewCode: 1,
    });
    return axios.get(url, {
        params
    }).then((res) => {
        return Promise.resolve(res.data);
    }, err => {
        return Promise.reject(err);
    });
}