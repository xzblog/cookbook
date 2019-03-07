/*
 * 设置页面的标题
 * @Author: Magical
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'


export default class DocumentTitle extends Component {

    static propTypes = {
        title: PropTypes.string.isRequired
    };

    setTitle() {
        const { title } = this.props;
        document.title = title
    }
    componentWillMount() {
        this.setTitle()
    }
    componentDidUpdate() {
        this.setTitle()
    }
    render() {
        return React.Children.only(this.props.children)

    }
}
