import './box.scss'
import html from './box.html'
import { html2Dom } from './mixin'

export default class Box {
    constructor(props) {
        props = Object.assign({}, Box.defaultProps, props)
        this.props = props
        this.$el = null
        this.$input = null
        this.render()
    }

    render() {
        this.$el = html2Dom(html)
        this.$el.querySelector('span').innerText = this.props.name
        this.$input = this.$el.querySelector('input')
        this.$input.value = this.props.color
        this.$input.addEventListener('input', this.inputColor.bind(this))
    }

    renderColor(color) {
        this.$input.value = color
    }

    inputColor(e) {
        this.props.inputColor(e.target.value)
    }
}

Box.defaultProps = {
    name: '',
    color: '',
    inputColor: () => {}
}
