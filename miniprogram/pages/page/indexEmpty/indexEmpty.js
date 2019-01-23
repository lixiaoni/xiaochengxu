const loginApp = getApp();
import API from '../../../utils/api.js';
const app = getApp();

Component({
  properties: {
    innerText: {
      type: String
    }
  },
  data: {
    globalData: app.globalData,
  },
  methods: {
    returnMall(){
      app.navigate.toMall()
    }
  }
})
