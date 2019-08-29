import './hue.scss'
import html from './hue.html'
import { html2Dom } from './mixin'

export default class Hue {
    constructor(props) {
        props = Object.assign({}, Hue.defaultProps, props)
        this.props = props
        this.$el = null
        this.$canvas = null
        this.$slide = null
        this.render()
    }

    render() {
        this.$el = html2Dom(html)
        this.$canvas = this.$el.querySelector('canvas')
        this.$slide = this.$el.querySelector('.slide')
        this.$el.addEventListener('mousedown', this.selectHue.bind(this))
        this.renderColor()
        this.renderSlide(this.props.hsv)
    }

    renderColor() {
        const canvas = this.$canvas
        const width = this.props.width
        const height = this.props.height
        const ctx = canvas.getContext('2d')
        canvas.width = width
        canvas.height = height

        const gradient = ctx.createLinearGradient(0, 0, 0, height)
        gradient.addColorStop(0, '#FF0000') // 红
        gradient.addColorStop(0.17 * 1, '#FF00FF') // 紫
        gradient.addColorStop(0.17 * 2, '#0000FF') // 蓝
        gradient.addColorStop(0.17 * 3, '#00FFFF') // 青
        gradient.addColorStop(0.17 * 4, '#00FF00') // 绿
        gradient.addColorStop(0.17 * 5, '#FFFF00') // 黄
        gradient.addColorStop(1, '#FF0000') // 红
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, width, height)
    }

    renderSlide(hsv) {
        Object.assign(this.$slide.style, {
            top: (1 - hsv.h / 360) * this.props.height - 2 + 'px'
        })
    }

    selectHue(e) {
        const { top: hueTop } = this.$el.getBoundingClientRect()
        const ctx = e.target.getContext('2d')

        const mousemove = e => {
            let y = e.clientY - hueTop

            if (y < 0) {
                y = 0
            }
            if (y > this.props.height) {
                y = this.props.height
            }

            Object.assign(this.$slide.style, {
                top: y - 2 + 'px'
            })
            // 如果用最大值，选择的像素会是空的，空的默认是黑色
            const imgData = ctx.getImageData(
                0,
                Math.min(y, this.props.height - 1),
                1,
                1
            )
            const [r, g, b] = imgData.data
            this.props.selectHue({ r, g, b })
        }

        mousemove(e)

        const mouseup = () => {
            document.removeEventListener('mousemove', mousemove)
            document.removeEventListener('mouseup', mouseup)
        }

        document.addEventListener('mousemove', mousemove)
        document.addEventListener('mouseup', mouseup)
    }
}

Hue.defaultProps = {
    hsv: null,
    width: 0,
    height: 0,
    selectHue: () => {}
}
