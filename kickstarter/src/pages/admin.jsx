import React from 'react';
import '../css/admin.css'
import MaterialTable from 'material-table';




export default function Admin(){
    const [state, setState] = React.useState({
        columns: [
          { title: 'Name', field: 'name' },
          { title: 'Surname', field: 'surname' },
          { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
          {
            title: 'Birth Place',
            field: 'birthCity',
            lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
          },
        ],
        data: [
          { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
          {
            name: 'Zerya Betül',
            surname: 'Baran',
            birthYear: 2017,
            birthCity: 34,
          },
        ],
      });
    return(
        <div className='admin'>
           <div className='d-flex flex-row admin-dashboard'>
               <div className='box-admin' style={{width:'15%'}}>
                   <div className='isi-dashboard'>LIST USER</div>
                   <div className='isi-dashboard'>LIST PROJECT</div>
                   <div className='isi-dashboard'>LIST PEMBAYARAN</div>
               </div>
               <div className='box-admin' style={{width:'85%', backgroundColor:'#e6faf1', color:'black'}}>
                   asd
               </div>
           </div>
        </div>
    )
}
{/* <MaterialTable
    title="Editable Example"
    columns={state.columns}
    data={state.data}
    editable={{
        onRowAdd: newData =>
        new Promise(resolve => {
            setTimeout(() => {
            resolve();
            setState(prevState => {
                const data = [...prevState.data];
                data.push(newData);
                return { ...prevState, data };
            });
            }, 600);
        }),
        onRowUpdate: (newData, oldData) =>
        new Promise(resolve => {
            setTimeout(() => {
            resolve();
            if (oldData) {
                setState(prevState => {
                const data = [...prevState.data];
                data[data.indexOf(oldData)] = newData;
                return { ...prevState, data };
                });
            }
            }, 600);
        }),
        onRowDelete: oldData =>
        new Promise(resolve => {
            setTimeout(() => {
            resolve();
            setState(prevState => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
            });
            }, 600);
        }),
    }}
/> */}