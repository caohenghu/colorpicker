import { html2Dom, createLinearGradient } from './mixin'
import './saturation.scss'
import html from './saturation.html'

export default class Saturation {
    constructor(props) {
        props = Object.assign({}, Saturation.defaultProps, props)
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
        this.$el.addEventListener('mousedown', this.selectSaturation.bind(this))
        this.renderColor(this.props.color)
        this.renderSlide(this.props.hsv)
    }

    renderColor(color) {
        const canvas = this.$canvas
        const size = this.props.size
        const ctx = canvas.getContext('2d')
        canvas.width = size
        canvas.height = size

        ctx.fillStyle = color
        ctx.fillRect(0, 0, size, size)

        createLinearGradient(
            'l',
            ctx,
            size,
            size,
            '#FFFFFF',
            'rgba(255,255,255,0)'
        )
        createLinearGradient('p', ctx, size, size, 'rgba(0,0,0,0)', '#000000')
    }
    renderSlide(hsv) {
        Object.assign(this.$slide.style, {
            left: hsv.s * this.props.size - 5 + 'px',
            top: (1 - hsv.v) * this.props.size - 5 + 'px'
        })
    }
    selectSaturation(e) {
        const {
            top: saturationTop,
            left: saturationLeft
        } = this.$el.getBoundingClientRect()
        const ctx = e.target.getContext('2d')

        const mousemove = e => {
            let x = e.clientX - saturationLeft
            let y = e.clientY - saturationTop

            if (x < 0) {
                x = 0
            }
            if (y < 0) {
                y = 0
            }
            if (x > this.props.size) {
                x = this.props.size
            }
            if (y > this.props.size) {
                y = this.props.size
            }

            // 不通过监听数据变化来修改dom，否则当颜色为#ffffff时，slide会跑到左下角
            Object.assign(this.$slide.style, {
                left: x - 5 + 'px',
                top: y - 5 + 'px'
            })
            // 如果用最大值，选择的像素会是空的，空的默认是黑色
            const imgData = ctx.getImageData(
                Math.min(x, this.props.size - 1),
                Math.min(y, this.props.size - 1),
                1,
                1
            )
            const [r, g, b] = imgData.data
            this.props.selectSaturation({ r, g, b })
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

Saturation.defaultProps = {
    color: '',
    hsv: {},
    size: 0,
    selectSaturation: () => {}
}
