import App from './app'

const app = new App()
document.getElementById('app').appendChild(app.$el)

if (module.hot) {
    // 实现热更新
    module.hot.accept()
}
