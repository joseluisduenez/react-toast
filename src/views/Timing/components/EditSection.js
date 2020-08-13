
import MContext from "../context/AgendaContext";
import React, { useState, useEffect } from "react";
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
function EditSection(props) {

  const [sections, setSections] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
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

    console.log("The Values that you wish to edit " + values.name)
    setSelectedSection(values);

  }

  


  const renderTableData = () => {
    let items = parseSection()
    return items.map((ob, index) => {
      const { id, name, minimunRange, maximumRange, intermediateRange } = ob
      return (

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


      )
    })
  }

  useEffect(() => {
    if (sections.length === 0)
      loadAgendaSections();
  });
  return (
    <div>
      <div>
        <TableContainer component={Paper}>
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
      </div>
      <div>

        
      </div>
    </div>
  );
}
/* return (
   <section>
     <h1>Hi I'm Osman and this is my album of the week:</h1>
     <MContext.Consumer>
       {agenda =>
         agenda && (
           <dl>
             <dt>Title:</dt>
             <dd>{agenda.message}</dd>
             
           </dl>
         )
       }
     </MContext.Consumer>
   </section>
 );
} */

export default EditSection;

