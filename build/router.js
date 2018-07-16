const axios = require('axios');

// 获取热门推荐详情
const getDiscDetail = function(apiRoutes) {
    apiRoutes.get("/api/getDiscDetail", (req, res) => {
        let url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg';
        axios.get(url, {
            headers: {
                referer: 'https://y.qq.com/'
            },
            params: req.query
        }).then((response) => {
            var ret = JSON.parse(response.data.match(/({.*})\)$/)[1])
            res.json(ret);
        }).catch((err) => {
            console.log(err);
        })
    })
}

module.exports = {
    getDiscDetail
};