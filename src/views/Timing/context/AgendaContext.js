import React, { createContext } from "react";

import { getMessage } from "../service/AgendaContext";

const MContext = createContext({
  message: "Pop Food"
});

class MContextProvider extends React.Component {
  state = {
    agenda: "Agenda"
  };

  componentDidMount() {
    getMessage().then(res => {
      this.setState({ agenda: res.data });
    });
  }

  render() {
    const { children } = this.props;

    return (
      <MContext.Provider value={this.state.agenda}>
        {children}
      </MContext.Provider>
    );
  }
}

export default MContext;
export { MContextProvider };
