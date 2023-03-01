export default {
    namespaced: true,
    state: {
        loginWrapShow: false, //登录窗口开关
        loginStatus: false,//登录状态
    },
    actions: {
    },
    mutations: {
        //控制登录窗口展示隐藏的开关
        async loginWrapOnOff(state, loginSwitch) {
            state.loginWrapShow = await loginSwitch
        },
        async loginStatusOnOff(state, loginStatus) {
            state.loginStatus = await loginStatus
            console.log(' state.loginStatus', state.loginStatus)
        }
        //   //更换搜索项
        //   tagSelect(state, tag) {
        //     for (let key in state.tagSwitch) {
        //       if (key != tag) {
        //         state.tagSwitch[key] = false;
        //       }
        //     }
        //     state.tagSwitch[tag] = true;
        //     // console.log('state.tagSwitch----------------', state.tagSwitch)
        //   },
    }
}