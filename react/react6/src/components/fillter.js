import React, { Component } from 'react';
import { connect } from "react-redux"
import { switch_list } from "../actions"
class Link extends Component {
    render() {
        const { filter, switchlist } = this.props
        return (
            <button href=""
                onClick={(e) => {
                    e.preventDefault()
                    switchlist(filter)
                }
                }
            >{filter}</button>
        )
    }
}
Link = connect(function () {
    return {}
}, function (dispatch) {
    return {
        switchlist: function (newfilter) {
            dispatch(switch_list(newfilter))
        }
    }
})(Link)
class Fillter extends Component {
    render() {
        return (
            <div>
                <Link filter="all"></Link>
                {"  "}
                <Link filter="will"></Link>
                {"  "}
                <Link filter="done"></Link>
            </div>
        )
    }
}
export default Fillter