import { createAlphaSquare } from './mixin'

export default class Preview {
    constructor(props) {
        props = Object.assign(Preview.defaultProps, props)
        this.props = props
        this.$el = null
        this.render()
    }

    render() {
        this.$el = document.createElement('canvas')
        this.renderColor(this.props.color)
    }

    renderColor(color) {
        const canvas = this.$el
        const width = this.props.width
        const height = this.props.height
        const canvasSquare = createAlphaSquare(5)

        const ctx = canvas.getContext('2d')
        canvas.width = width
        canvas.height = height

        ctx.fillStyle = ctx.createPattern(canvasSquare, 'repeat')
        ctx.fillRect(0, 0, width, height)

        ctx.fillStyle = color
        ctx.fillRect(0, 0, width, height)
    }
}

Preview.defaultProps = {
    color: '',
    width: 0,
    height: 0
}
