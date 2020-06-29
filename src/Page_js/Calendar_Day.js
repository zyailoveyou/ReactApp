import React from "react";


class Calendar_Day extends React.Component{
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
               <p>This is the day {this.state.day}</p>
           </div>
       )
    }
}

export default Calendar_Day;
