import React from "react";

class Vacation_Day extends React.Component{

    constructor(props) {
        super(props);
        this.state = {day:props.day}
    }
    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <div className='dayzone'>
                <p>This is the day Vacation {this.state.day}</p>
            </div>
        )
    }

}

export default Vacation_Day;
