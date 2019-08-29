import './sucker.scss'
import html from './sucker.html'
import imgSucker from '../img/sucker.png'
import { html2Dom } from './mixin'

export default class Sucker {
    constructor(props) {
        props = Object.assign({}, Sucker.defaultProps, props)
        this.props = props
        this.$el = null
        this.$svgSucker = null
        this.$svgLoading = null
        this.keydownHandler = this.keydownHandler.bind(this)
        this.mousemoveHandler = this.mousemoveHandler.bind(this)
        this.isOpenSucker = false // 是否处于吸管状态
        this.suckerPreview = null // 吸管旁边的预览颜色dom
        this.render()
    }

    render() {
        this.$el = html2Dom(html)
        this.$svgSucker = this.$el.children[0]
        this.$svgLoading = this.$el.children[1]
        this.$svgLoading.style.display = 'none'
        this.$svgSucker.addEventListener('click', this.openSucker.bind(this))
    }

    canvasLoaded(options) {
        this.props.suckerCanvas = options.suckerCanvas
        this.props.suckerArea = options.suckerArea
        this.suckColor(options.suckerCanvas)
        options.suckerCanvas.style.cursor = `url(${imgSucker}) 0 32, default`
        this.$svgSucker.style.display = ''
        this.$svgLoading.style.display = 'none'
        this.$svgSucker.classList.add('active')
    }

    openSucker() {
        if (!this.isOpenSucker) {
            this.isOpenSucker = true
            this.props.openSucker(true)
            this.$svgSucker.style.display = 'none'
            this.$svgLoading.style.display = ''
            document.addEventListener('keydown', this.keydownHandler)
        } else {
            // 和按下esc键的处理逻辑一样
            this.keydownHandler({ keyCode: 27 })
        }
    }

    keydownHandler(e) {
        // esc
        if (e.keyCode === 27) {
            this.isOpenSucker = false
            this.props.openSucker(false)
            this.$svgSucker.classList.remove('active')
            this.$svgSucker.style.display = ''
            this.$svgLoading.style.display = 'none'
            document.removeEventListener('keydown', this.keydownHandler)
            document.removeEventListener('mousemove', this.mousemoveHandler)
            this.suckerPreview && this.suckerPreview.remove()
        }
    }

    mousemoveHandler(e) {
        const { clientX, clientY } = e
        const {
            top: domTop,
            left: domLeft,
            width,
            height
        } = this.props.suckerCanvas.getBoundingClientRect()
        const x = clientX - domLeft
        const y = clientY - domTop
        const ctx = this.props.suckerCanvas.getContext('2d')
        const imgData = ctx.getImageData(
            Math.min(x, width - 1),
            Math.min(y, height - 1),
            1,
            1
        )
        let [r, g, b, a] = imgData.data
        a = parseFloat((a / 255).toFixed(2))
        const style = this.suckerPreview.style
        Object.assign(style, {
            position: 'absolute',
            left: clientX + 20 + 'px',
            top: clientY - 36 + 'px',
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            border: '2px solid #fff',
            boxShadow: '0 0 8px 0 rgba(0, 0, 0, 0.16)',
            background: `rgba(${r}, ${g}, ${b}, ${a})`,
            zIndex: 95 // 吸管的小圆圈预览色的层级不能超过颜色选择器
        })
        if (
            clientX >= this.props.suckerArea[0] &&
            clientY >= this.props.suckerArea[1] &&
            clientX <= this.props.suckerArea[2] &&
            clientY <= this.props.suckerArea[3]
        ) {
            style.display = ''
        } else {
            style.display = 'none'
        }
    }

    suckColor(dom) {
        if (dom && dom.tagName !== 'CANVAS') {
            return
        }

        this.suckerPreview = document.createElement('div')
        document.body.appendChild(this.suckerPreview)
        document.addEventListener('mousemove', this.mousemoveHandler)
        dom.addEventListener('click', e => {
            const { clientX, clientY } = e
            const { top, left, width, height } = dom.getBoundingClientRect()
            const x = clientX - left
            const y = clientY - top
            const ctx = dom.getContext('2d')
            const imgData = ctx.getImageData(
                Math.min(x, width - 1),
                Math.min(y, height - 1),
                1,
                1
            )
            let [r, g, b, a] = imgData.data
            a = parseFloat((a / 255).toFixed(2))
            this.props.selectSucker({ r, g, b, a })
        })
    }
}

Sucker.defaultProps = {
    suckerCanvas: null,
    suckerArea: [],
    openSucker: () => {},
    selectSucker: () => {}
}
