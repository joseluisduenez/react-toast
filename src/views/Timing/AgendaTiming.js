import React, { useState, useEffect } from "react";
import Button from '@material-ui/core/Button';
import { makeStyles } from "@material-ui/core/styles";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
 

 
const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 280,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    editSection: {
        
    }
     
}));


export default function UpdateAgendaSections(props) {
    
    const [sections, setSections] = useState("");
    const [editSection, setEditSection] = useState("");
    const urlSessions = "/timing";

    const loadAgendaSections = () => {
        let usertemp = JSON.parse(localStorage.getItem('TOAST_USER'))
         
        axios.defaults.headers.common["Authorization"] = "Bearer " + usertemp.token
        axios({
            method: 'get',
            url: urlSessions
        })
            .then(function (response) {
               
                let v = JSON.stringify(response.data)
                setSections(JSON.parse(v))
                console.log(response)
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    const parseSection = () => {
        let items = []
        for (let i = 0; i < sections.length; i++) {
            var o = { id: sections[i].id, name: sections[i].agendaSessionDto.name, minimunRange: sections[i].minimunRange, maximumRange: sections[i].maximumRange, intermediateRange: sections[i].intermediateRange }
            items.push(o);
        }
        return items;
    }

    const handleEdit = values => {
        
        console.log("The Values that you wish to edit "+ values.name)
         
        setEditSection ( {
            id : values.id, 
            name: values.name, 
            minimunRange: values.minimunRange,
            maximumRange : values.maximumRange, 
            intermediateRange: values.intermediateRange});
      
    }
    const chandleChange = e => {
        e.persist();
      
        this.setState(prevState => ({
          item: { ...prevState.item,  [e.target.name]: e.target.value }
        }))
        console.log(this.editSection.item.minimunRange);
      }
   
 

      const renderTableData = () => {
        let items = parseSection()
        return items.map((ob, index) => {
            const { id, name, minimunRange, maximumRange, intermediateRange } = ob 
            return (
                <div>
                    <div>
                <TableRow key={id}>
                    <TableCell>{name}</TableCell>
                    <TableCell>{minimunRange}</TableCell>
                    <TableCell>{maximumRange}</TableCell>
                    <TableCell>{intermediateRange}</TableCell>
                    <TableCell align="center">
                        <Button aria-label="edit" onClick={() => handleEdit(ob)}>
                        Edit
                        </Button>
                    </TableCell>
                </TableRow>
                </div>
                <div id="editSection">
                    <form >
                        <h2>{this.editSection.name}</h2>
                        <input type="text" name="name" value={this.editSection.minimunRange} placeholder="Minimun Range" />

                    </form>

                </div>
                </div>
               
            )
        })
    }

    

  
    useEffect(() => {
        if (sections.length === 0)
            loadAgendaSections();
    });
    return (
       
        <TableContainer component = { Paper }>
        <Table  >
            <TableHead>
                <TableRow>
                    <TableCell >Name</TableCell >
                    <TableCell >Minimun Range</TableCell >
                    <TableCell >Maximum Range</TableCell >
                    <TableCell >Intermediate Range</TableCell >
                    <TableCell >Actions</TableCell >
                </TableRow>
            </TableHead>
            <TableBody>
                {renderTableData()}
            </TableBody>
        </Table>
    </TableContainer>
    
      );

}
