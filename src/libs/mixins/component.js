/**
 *@author       谢辉
 *@date         2018/11/22 19:55
 *@Copyright    天源迪科信息技术股份有限公司
 *@Description  组件混入
 */
export default {
  //note 获取祖先page-template组件实例
  inject:['template'],
  props: {
    //note 绑定数据参数,默认$root,绑定fullModel,可自行设定绑定参数,
    //比如设置 second则绑定fullModel.second对象
    model: {
      type: [String, Object],
      default: '$root',
    },
  },
  computed: {
    //为了兼容
    fullModel(){
      return this.template.tplData.fullModel;
    },
    //note 获取真实的绑定数据
    realModel() {
      if (typeof(this.model) === 'string') {
        if (this.model === '$root') {
          return this.template.tplData.fullModel;
        }
        let params = this.model.split('.');
        let result = this.template.tplData.fullModel;
        while (params.length > 0) {
          result = result[params.shift()];
        }
        return result;
      } else if (typeof(this.model) === 'object') {
        return this.model;
      }
      return {};
    }
  }
};
