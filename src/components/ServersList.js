import React, { Component } from 'react';
import ServersCard from "./ServersCard"
import { Grid, Checkbox } from '@material-ui/core';

class ServersList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            servers: [],
            filterString: '',
        }
    }

    componentDidMount() {
        this.fetchServers();
    }

    async fetchServers() {
        try {
            const response = await fetch('/api/servers');
            const result = await response.json();
            this.setState({ servers: result })
        } catch (err) {
            alert(err)
        }
    }

    onStatusChanged(id, serverId) {
        const status = this.state.status;
        console.log(status)
        const index = status.findIndex(p => p.id === serverId)
        console.log(index)
        const statusToUpdate = status[index];
        console.log(statusToUpdate)
        statusToUpdate.status = id;
        this.setState({ status })
    }

    filterStringChanged(e) {
        this.setState({ filterString: e.target.value });
    }

    filterByStatus() {
        const status = this.state.servers.filter(s => s.status === "online");
        this.setState({ servers: status });
    }

    showAllStatus() {
        const originalState = this.state.servers;
        console.log(originalState)
    }

    filterByDate(){
        const filter = this.state.servers;
        console.log(filter)
    }

    render() {
        const filteredServers = this.state.servers.filter(s => s.time.indexOf(this.state.filterString) >= 0); // filtert date

        return (
            <div>
                <button onClick={()=> this.filterByDate()}>click to filter by date</button>
                <h2>Assignment num 3</h2>
                <br />
                <hr />
                <label>Filter by date: </label>
                <input type="text" onChange={(event) => this.filterStringChanged(event)} />
                <div className="divider">
                    <label>click to display "online" status</label>
                    <Checkbox
                        value="checkedA"
                        inputProps={{ 'aria-label': 'Checkbox A' }}
                        onClick={() => this.filterByStatus()}
                    />
                    <label>Original State</label>
                    <Checkbox
                        value="checkedA"
                        inputProps={{ 'aria-label': 'Checkbox A' }}
                        onClick={() => this.showAllStatus()}
                    />
                    <hr />
                </div>
                <Grid container direction="column" alignItems="stretch" spacing={4} xs={12} sm={12} item={true}  >
                    {filteredServers.sort((d1, d2) => d1.time - d2.time).map(s =>
                        <Grid item key={s.id} >
                            <ServersCard server={s} onStatusChanged={(id, serverId) => this.onStatusChanged(id, serverId)} />
                        </Grid>
                    )}
                </Grid>
            </div>
        );
    }
}

export default ServersList;