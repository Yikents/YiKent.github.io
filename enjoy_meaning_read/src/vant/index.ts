import 'vant/es/toast/style'
import {Swipe, SwipeItem,Loading,ShareSheet,Toast,Switch,DatetimePicker,Notify} from 'vant'

const vantComponents: any[] = [Swipe, SwipeItem,Loading,ShareSheet,Toast,Switch,DatetimePicker,Notify]

export default {
    install(Vue: { use: (arg0: any) => void }) {
        vantComponents.forEach(Component => {
            Vue.use(Component)
        })
    }
}