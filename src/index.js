import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newItem: "",
            list: []
        };
    }
    componentDidMount() {
        this.hydrateStateWithLocalStorage();
        window.addEventListener(
            "beforeunload",
            this.saveStateToLocalStorage.bind(this)
        );
    }
    componentWillUnmount() {
        window.removeEventListener(
            "beforeunload",
            this.saveStateToLocalStorage.bind(this)
        );
        this.saveStateToLocalStorage();
    }

    hydrateStateWithLocalStorage() {
        for (let key in this.state) {
            if (localStorage.hasOwnProperty(key)) {
                let value = localStorage.getItem(key);
                try {
                    value = JSON.parse(value);
                    this.setState({ [key]: value });
                } catch (e) {
                    this.setState({ [key]: value });
                }
            }
        }
    }

    saveStateToLocalStorage() {
        for (let key in this.state) {
            localStorage.setItem(key, JSON.stringify(this.state[key]));
        }
    }

    updateInput(key, value) {
        this.setState({ [key]: value });
    }

    addItem() {
        const newItem = {
            id: 1 + Math.random(),
            value: this.state.newItem.slice()
        };
        const list = [...this.state.list];

        list.push(newItem);

        this.setState({
            list,
            newItem: ""
        });
    }

    deleteItem(id) {
        const list = [...this.state.list];
        const updatedList = list.filter(item => item.id !== id);
        this.setState({ list: updatedList });
    }
    render() {
        return (
            <div>
                <h1>SpaceRexx</h1>
                <h3 className="app-title"> Packing List</h3>

                <div className="container">
                    <div>
                    
                        Add an Item:
          <br />
                        <input
                            type="text"
                            placeholder="It's a long trip..."
                            value={this.state.newItem}
                            onChange={e => this.updateInput("newItem", e.target.value)}
                        />
                        <button
                            className="add-btn btn-flat"
                            onClick={() => this.addItem()}
                            disabled={!this.state.newItem.length}
                        >
                            <i>Ruff! </i>
                        </button>
                        <br /> <br />
                        <ul>
                            {this.state.list.map(item => {
                                return (
                                    <li key={item.id}>
                                        {item.value}
                                        <button onClick={() => this.deleteItem(item.id)}>
                                        [x]
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}
ReactDOM.render(<App />, document.getElementById('root'))