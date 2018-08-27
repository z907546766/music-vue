export default {
    state: {
        count: 1,
    },
    getters: {
        getCount: state => state.count

    },
    actions: {
        add(context, a) {
            context.commit('isAdd', a);
            context.commit('isDis', a);
        }
    },
    mutations: {
        isAdd(state, a) {
            state.count++;
        },
        isDis(state, a) {
            state.count -= 2;
        }
    }
}