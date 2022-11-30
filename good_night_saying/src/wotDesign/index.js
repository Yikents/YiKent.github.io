import { Loading,PullRefresh,Lazyload,ImgPreview,Popup,Button,Toast,Upload } from 'wot-design'

const UIComponents = [Loading,PullRefresh,Lazyload,ImgPreview,Popup,Button,Toast,Upload]


const WotUIPlugin = {};

WotUIPlugin.install = function (Vue) {

    UIComponents.forEach(Component => {

        Vue.use(Component)

    })

}

export default WotUIPlugin