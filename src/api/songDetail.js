import axios from "axios";
import {
    commonParams,
} from "@/api/config"
export function getSongDetail(sendData) {
    let url = '',
        data = {};
    if (sendData.singermid) {
        url = '/api/getDiscDetail'; //排行榜详情
        data = Object.assign({
            order: 'listen',
            from: 'h5',
        }, sendData);
    } else {
        url = '/api/getHotDetail'; //首页详情
        data = Object.assign({
            new_format: 1,
            pic: 500,
            type: 1,
            json: 1,
            utf8: 1,
            onlysong: 0,
            picmid: 1,
            nosign: 1,
        }, sendData);
    }
    let params = Object.assign(commonParams, {
        platform: 'h5page',
        needNewCode: 1,
        format: 'json'
    }, data);
    return axios.get(url, {
        params
    }).then((res) => {
        return Promise.resolve(res.data);
    }, err => {
        return Promise.reject(err);
    });
}