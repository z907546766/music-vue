// import jsonp from "@/common/js/jsonp"
import axios from "axios";
import {
    commonParams,
} from "@/api/config"
export function getSingerList() {
    const url = '/api/getSingerList';
    const params = Object.assign(commonParams, {
        channel: 'singer',
        page: 'list',
        key: 'all_all_all',
        pagesize: 100,
        pagenum: 1,
        hostUin: 0,
        needNewCode: 0,
        platform: 'yqq',
    });
    return axios.get(url, {
        params
    }).then((res) => {
        return Promise.resolve(res.data);
    }, err => {
        return Promise.reject(err);
    });
}