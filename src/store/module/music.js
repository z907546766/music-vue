const state = {
    count: 1,
}
const getters = {
    getCout: state => state.count;
}
const actions = {
    add({ commit, state }, a) {
        commit('isAdd', a);
    }
}
const mutations = {
    isAdd(state) {
        count++;
    }
}