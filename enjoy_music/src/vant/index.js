import {Tab, Tabs,Swipe, SwipeItem,ShareSheet,Loading,Toast,Popover,NavBar, Icon,Popup,Overlay,Divider,Skeleton,Lazyload, Sidebar,SidebarItem,Checkbox, CheckboxGroup ,Image as VanImage, Switch, cell, Stepper, Grid, GridItem, Dialog} from 'vant'

const vantComponents = [Tab, Tabs,Swipe, SwipeItem,ShareSheet,Loading,Toast,Popover,NavBar, Icon,Popup,Overlay,Divider, Skeleton,Lazyload, Sidebar,SidebarItem,Checkbox, CheckboxGroup,VanImage, Switch, cell, Stepper, Grid, GridItem, Dialog]

export default {
    install(Vue) {
        vantComponents.forEach(Component => {
            Vue.use(Component)
        })
    }
}