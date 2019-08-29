import './alpha.scss'
import html from './alpha.html'
import { html2Dom, createAlphaSquare, createLinearGradient } from './mixin'

export default class Alpha {
    constructor(props) {
        props = Object.assign({}, Alpha.defaultProps, props)
        this.props = props
        this.render()
    }

    render() {
        this.$el = html2Dom(html)
        this.$canvas = this.$el.querySelector('canvas')
        this.$slide = this.$el.querySelector('.slide')
        this.$el.addEventListener('mousedown', this.selectAlpha.bind(this))
        this.renderColor(this.props.rgba)
        this.renderSlide(this.props.rgba)
    }

    renderColor(rgba) {
        const canvas = this.$canvas
        const width = this.props.width
        const height = this.props.height
        const { r, g, b } = rgba
        const color = `rgb(${r}, ${g}, ${b})`
        const canvasSquare = createAlphaSquare(5)

        const ctx = canvas.getContext('2d')
        canvas.width = width
        canvas.height = height

        ctx.fillStyle = ctx.createPattern(canvasSquare, 'repeat')
        ctx.fillRect(0, 0, width, height)

        createLinearGradient(
            'p',
            ctx,
            width,
            height,
            'rgba(255,255,255,0)',
            color
        )
    }

    renderSlide(rgba) {
        Object.assign(this.$slide.style, {
            top: rgba.a * this.props.height - 2 + 'px'
        })
    }

    selectAlpha(e) {
        const { top: hueTop } = this.$el.getBoundingClientRect()

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
            let a = parseFloat((y / this.props.height).toFixed(2))
            this.props.selectAlpha(a)
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

Alpha.defaultProps = {
    rgba: null,
    width: 0,
    height: 0,
    selectAlpha: () => {}
}
