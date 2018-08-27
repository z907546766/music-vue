const axios = require('axios');
const sendAxios = function(url, req, res, headers = {}) {
    axios.get(url, {
        headers: Object.assign({
            referer: 'https://y.qq.com',
        }, headers),
        params: req.query
    }).then((response) => {
        res.json(response.data);
    }).catch((err) => {
        console.log(err);
    })
}

// 首页
const getRecommend = function(apiRoutes) {
    apiRoutes.get("/api/getRecommend", (req, res) => {
        let url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';
        sendAxios(url, req, res);
    })
}

// 歌手
const getSingerList = function(apiRoutes) {
    apiRoutes.get("/api/getSingerList", (req, res) => {
        let url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg';
        sendAxios(url, req, res);
    })
}

// 歌手详情
const getDiscDetail = function(apiRoutes) {
    apiRoutes.get("/api/getDiscDetail", (req, res) => {
        let url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg';
        sendAxios(url, req, res);
    })
}

// 热门歌单详情
const getHotDetail = function(apiRoutes) {
    apiRoutes.get("/api/getHotDetail", (req, res) => {
        let url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg';
        sendAxios(url, req, res);
    })
}

module.exports = {
    getSingerList,
    getRecommend,
    getDiscDetail,
    getHotDetail,
};