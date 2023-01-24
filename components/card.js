import { useState } from 'react'
import { useEffect } from "react";
import axios from  '../plugins/axios';
import Button from '../components/button'
import UpdateDayModal from '../components/updateDayModal'

export default function Card({days = [],schedule ,onDeleteDay}) {
    const [selectDay,SetSelectDay]= useState(null)
    const [showUpdate, SetShowUpdate]=useState(false)

    function toggleUpdateModal(day) {
        SetSelectDay(day)
        SetShowUpdate(true)
        console.log(day, showUpdate, 1)
        document.getElementById('modal3')&&document.getElementById('modal3').classList.remove('hidden')
    }
    function hiddenModel(){
        SetShowUpdate(false)
        console.log(showUpdate, 2)
        document.getElementById('modal3')&&document.getElementById('modal3').classList.add('hidden')

    }

    return (
        <>
                <div className="table w-full ">
                    <div className="table-header-group ">
                        <div className="table-row">
                        <div className="table-cell text-left ">Day</div>
                        <div className="table-cell text-left ">Time From</div>
                        <div className="table-cell text-left ">Time To</div>
                        <div className="table-cell text-left ">Action</div>
                        </div>
                    </div>
                    <div className="table-row-group">
                    {days.map(day => (
                        <div key={day.id+"table-row"} className="table-row">
                        <div className="table-cell ">{day.name} </div>
                        <div className="table-cell ">{day.time_from}</div>
                        <div className="table-cell ">{day.time_to}</div>
                        <div className="table-cell ">
                            <Button  onClick={()=>onDeleteDay(day.id,schedule.id)}>delete</Button>
                            <Button  onClick={()=>toggleUpdateModal(day)}>Update</Button>                      
                        </div>

                        </div>
                    ))}
                    
                    </div>
                </div>
            
            
                <UpdateDayModal  showUpdate={showUpdate} onToggleModal={hiddenModel} schedule={schedule} day={selectDay}/> 
                
                
       
        </>
       
    )
}
