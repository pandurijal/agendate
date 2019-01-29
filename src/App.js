import React, { Component } from "react";
import BigCalendar from "react-big-calendar";
import Modal from "react-responsive-modal";
import moment from "moment";
import TimePicker from "react-time-picker";
import randomColor from "randomcolor";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "./App.css";

const localizer = BigCalendar.momentLocalizer(moment);

class App extends Component {
  state = {
    events: [
      {
        id: 0,
        title: "Event",
        email: "rara@gmail.com",
        start: new Date(2019, 3, 20),
        end: new Date(2019, 3, 20),
        timeStart: "10:00",
        timeEnd: "11:00"
      },
      {
        id: 1,
        title: "All Day Event very long title",
        email: "rara@gmail.com",
        start: new Date(2019, 3, 20),
        end: new Date(2019, 3, 20),
        timeStart: "10:00",
        timeEnd: "11:00"
      }
    ],
    modalAddEvent: false,
    modalViewEvent: false,
    selectedDate: new Date(),
    selectedEvent: null
  };

  render() {
    return (
      <div className="App">
        <div className="calendar-container">
          <BigCalendar
            selectable
            localizer={localizer}
            events={this.state.events}
            defaultView={BigCalendar.Views.MONTH}
            defaultDate={new Date(2019, 3, 12)}
            scrollToTime={new Date(1970, 1, 1, 6)}
            onSelectEvent={e => this.handleView(e.id)}
            onSelectSlot={this.handleSelect}
            eventPropGetter={this.eventStyleGetter}
          />
        </div>
        <Modal
          center
          open={this.state.modalAddEvent}
          onClose={this.closeModalAddEvent}
        >
          <h2>{this.state.selectedDate.toDateString()}</h2>
          <form onSubmit={this.submitAddEvent} className="add-event">
            <div className="form-wrapper">
              <label>Title Event:</label>
              <input
                type="text"
                name="title"
                placeholder="event name"
                className="input"
              />
            </div>
            <div className="form-wrapper">
              <label>Time Start:</label>
              <div className="input">
                <input type="number" max="23" name="timeStartH" /> :{" "}
                <input type="number" max="59" name="timeStartM" />
              </div>
            </div>
            <div className="form-wrapper">
              <label>Time End:</label>
              <div className="input">
                <input type="number" max="23" name="timeEndH" /> :{" "}
                <input type="number" max="59" name="timeEndM" />
              </div>
            </div>
            <div className="form-wrapper">
              <label>Email Invitees:</label>
              <input
                type="text"
                name="email"
                placeholder="invitee email"
                className="input"
              />
            </div>
            <button>Submit</button>
          </form>
        </Modal>
        <Modal
          center
          open={this.state.modalViewEvent}
          onClose={this.closeModalViewEvent}
        >
          {/* {console.log(this.state.events[this.state.selectedEvent]["email"])} */}
          {this.state.events.map(e => {
            if (this.state.selectedEvent === e.id) {
              return (
                <div key={e.id}>
                  <h2>{e.title}</h2>
                  <p>{e.start.toDateString()}</p>
                  <p>
                    {e.timeStart} - {e.timeEnd}
                  </p>
                  <p>{e.email}</p>
                  <button
                    onClick={() => {
                      this.deleteEvent(e.id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              );
            }
          })}
        </Modal>
      </div>
    );
  }

  componentDidMount() {
    const events = localStorage.getItem("events");
    console.log("get", events);
  }

  eventStyleGetter = () => {
    const backgroundColor = randomColor({ luminosity: "dark" });
    const style = {
      backgroundColor: backgroundColor
    };
    return {
      style: style
    };
  };

  handleSelect = ({ start }) => {
    this.setState({ selectedDate: start }, this.openModalAddEvent);
    // if (title)
    //   this.setState({
    //     events: [
    //       ...this.state.events,
    //       {
    //         start,
    //         end,
    //         title
    //       }
    //     ]
    //   });
  };

  handleView = idEvent => {
    this.setState({ selectedEvent: idEvent }, this.openModalViewEvent);
  };

  submitAddEvent = e => {
    e.preventDefault();
    let event = [];
    event.id = Math.random();
    event.title = e.target.elements.title.value;
    event.email = e.target.elements.email.value;
    event.start = this.state.selectedDate;
    event.end = this.state.selectedDate;
    event.timeStart = `${e.target.elements.timeStartH.value}:${
      e.target.elements.timeStartM.value
    }`;
    event.timeEnd = `${e.target.elements.timeEndH.value}:${
      e.target.elements.timeEndM.value
    }`;
    let events = [...this.state.events, event];
    this.setState({ events }, this.closeModalAddEvent);
    localStorage.setItem("events", JSON.stringify(events));
  };

  deleteEvent = idEvent => {
    const events = this.state.events.filter(e => e.id !== idEvent);
    this.setState({ events }, this.closeModalViewEvent);
  };

  openModalAddEvent = () => {
    this.setState({ modalAddEvent: true });
  };

  closeModalAddEvent = () => {
    this.setState({ modalAddEvent: false });
  };

  openModalViewEvent = () => {
    this.setState({ modalViewEvent: true });
  };

  closeModalViewEvent = () => {
    this.setState({ modalViewEvent: false });
  };
}

export default App;
