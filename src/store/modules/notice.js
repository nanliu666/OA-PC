const notice = {
  state: {
    noticeDetailVuex: ''
  },
  mutations: {
    SET_NOTICE: (state, data) => {
      state.noticeDetailVuex = data
    }
  }
}
export default notice
