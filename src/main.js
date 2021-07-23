import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//  按需引入vant
import { 
  NavBar, Tab, Tabs, Tabbar, TabbarItem, List, Image, Lazyload, Swipe, SwipeItem, 
  Icon, Sticky, Cell, Col, Row, Collapse, CollapseItem, Sidebar, SidebarItem,
  Card, Grid, GridItem, Toast, Skeleton, Tag, Divider, ActionBar, ActionBarIcon, 
  ActionBarButton, Form, Field, Button, Notify, SwipeCell, Stepper, Radio, RadioGroup,
  SubmitBar, Checkbox, CheckboxGroup, NumberKeyboard, AddressList, AddressEdit,
  Picker, Cascader, Popup, Switch, Area, Dialog, ContactCard, PullRefresh,
  Uploader,
 } from 'vant'

createApp(App)
.use(store)
.use(router)
.use(NavBar).use(Tab).use(Tabs).use(Tabbar).use(TabbarItem)
.use(List).use(Image).use(Lazyload, { lazyComponent: true, loading: require('./assets/images/lazyload.png') }).
use(Swipe).use(SwipeItem).use(Icon).use(Sticky).use(Cell)
.use(Col).use(Row).use(Collapse).use(CollapseItem).use(Sidebar)
.use(SidebarItem).use(Card).use(Grid).use(GridItem).use(Toast)
.use(Skeleton).use(Tag).use(Divider).use(ActionBar).use(ActionBarIcon)
.use(ActionBarButton).use(Form).use(Field).use(Button).use(Notify)
.use(SwipeCell).use(Stepper).use(Radio).use(RadioGroup).use(SubmitBar)
.use(Checkbox).use(CheckboxGroup).use(NumberKeyboard).use(AddressList)
.use(AddressEdit).use(Picker).use(Cascader).use(Popup).use(Switch).use(Area)
.use(Dialog).use(ContactCard).use(PullRefresh).use(Uploader)
.mount('#app')

// ios 禁止放大页面
window.onload = () => {
  document.addEventListener('touchstart', function(e) {
    if (e.touches.length > 1) {
      e.preventDefault()
    }
  })
  document.addEventListener('gesturestart', function(e) {
    e.preventDefault()
  })
}