import React, { Component } from 'react';
import { Switch, TableCell, Table, TableHead, TableRow } from '@material-ui/core';

class ServersCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            servers: [],
        }
    }

    changeStatus() {
        let id = this.props.server.id;
        let status = this.props.server.status;
        console.log(" id:" + id + " status:" + status)
        fetch(`/api/servers/${id}/status`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({ id, status }),
        }).then(() => this.props.onStatusChanged(id, status))
            .catch((err) => console.log(err));
    }

    render() {

        return (
            <div>
                <Table size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell className="rowTable" align="center">ID: {this.props.server.id}</TableCell>
                            <TableCell className="rowTable" align="center">Name: {this.props.server.name}</TableCell>
                            <TableCell className="rowTable" align="center">Ip Adress: {this.props.server.ip}</TableCell>
                            <TableCell className="rowTable" align="center">Company of Servers: {this.props.server.hostingcompany}</TableCell>
                            <TableCell className="rowTable" align="center">Created at: {this.props.server.time}</TableCell>
                            <TableCell className="rowTable" align="left">Status: {this.props.server.status}</TableCell>
                            <TableCell className="rowTable">
                                <div>
                                    <div variant="body2">Status: {this.props.server.status}</div>
                                    <Switch onClick={() => this.changeStatus()}></Switch>
                                </div>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                </Table>
            </div>
        );
    }
}

export default ServersCard;