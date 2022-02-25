import React ,{ useEffect,useState } from 'react'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add'
import Remove from '@material-ui/icons/Remove'

export default function ShopCart(props){
    const [value,setValue] = useState(props.value)

    useEffect(function(){
        setValue(props.value)
    },[props.value])

    const handleMinus = () => {
        var v = value
        v--
        setValue(v)
        props.onChange(v)
    }
    const handlePlus = () => {
        var v = value
        v++
        setValue(v)
        props.onChange(v) 
    }

    return(
        <div>
            {value==0?
            <li onClick={()=>handlePlus()} style={{listStyle:'none',display: 'block',background: '#50526e',color: '#fff',padding: 20,textAlign: 'center',marginTop: 5,fontFamily: 'Helvetica', fontSize: 16,letterSpacing: 1,cursor: 'pointer'}}>
            Add to Cart
        </li>:
            <div style={{display:'flex',justifyContent:'center',alignItems:'center',padding: 12,}}>
                <div>
                <Fab size="small" color="secondary" aria-label="add" style={{background: '#50526e',color: '#fff'}}
                    onClick={()=>handleMinus()}>
                    <Remove />
                </Fab>
                </div>
                <div style={{marginInline:20,fontSize:24}}>
                    {value}
                </div>
                <div>
                <Fab size="small" color="secondary" aria-label="remove" style={{background: '#50526e',color: '#fff'}}
                    onClick={()=>handlePlus()}>
                    <AddIcon />
                </Fab>
                </div>

            </div>}
        </div>
    )
}