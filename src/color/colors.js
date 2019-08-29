import './colors.scss'
import li from './colorsLi.html'
import { html2Dom, createAlphaSquare } from './mixin'

export default class Colors {
    constructor(props) {
        props = Object.assign({}, Colors.defaultProps, props)
        this.props = props
        this.$el = null
        this.$default = null
        this.$history = null
        this.imgAlphaBase64 = createAlphaSquare(4).toDataURL()
        this.colorsHistory =
            JSON.parse(localStorage.getItem(this.props.colorsHistoryKey)) || []
        this.render()
    }

    render() {
        this.$el = document.createElement('div')
        this.$default = document.createElement('ul')
        this.$history = document.createElement('ul')
        this.$default.className = 'colors default'
        this.$history.className = 'colors history'
        this.$el.appendChild(this.$default)
        this.$el.appendChild(this.$history)
        this.renderDefault()
        this.renderHistory()
    }

    renderDefault() {
        this.props.colorsDefault.forEach(item => {
            this.$default.appendChild(this.getLi(item))
        })
    }

    renderHistory() {
        this.$history.innerHTML = ''
        this.colorsHistory.forEach(item => {
            this.$history.appendChild(this.getLi(item))
        })
        this.$history.style.display = this.colorsHistory.length ? '' : 'none'
    }

    getLi(item) {
        const $li = html2Dom(li)
        $li.addEventListener('click', this.selectColor.bind(this, item))
        $li.querySelector(
            '.alpha'
        ).style.background = `url(${this.imgAlphaBase64})`
        $li.querySelector('.color').style.background = item
        return $li
    }

    selectColor(color) {
        this.props.selectColor(color)
    }

    setColorsHistory(color) {
        if (!color) {
            return
        }
        const colors = this.colorsHistory
        const index = colors.indexOf(color)
        if (index >= 0) {
            colors.splice(index, 1)
        }
        if (colors.length >= 8) {
            colors.length = 7
        }
        colors.unshift(color)
        this.colorsHistory = colors
        localStorage.setItem(
            this.props.colorsHistoryKey,
            JSON.stringify(colors)
        )
        this.renderHistory()
    }
}

Colors.defaultProps = {
    colorsDefault: [],
    colorsHistoryKey: '',
    selectColor: () => {},
    getCurrentColor: () => {}
}
