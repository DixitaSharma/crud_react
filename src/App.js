
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { useEffect, useState } from 'react';
//import 'bootstrap/dist/js/bootstrap.js';

const getlocalitem=()=>{
  let list= localStorage.getItem('lists');
   console.log(list);
   if(list)
   {
     return JSON.parse(localStorage.getItem('lists'));
     // convert to array
   }
   else{
      return []
   }
 }
;
function App() {
  const [input,setinput]=useState('');
  const[item,setitem]=useState(getlocalitem());
  const[toggle,setoggle]=useState(true);
  const[edititem,setedit]=useState(null);

  
    

  function additem()
  {
    if(!input)
    {
  alert('plz fill the data');
    }
    else if(input && !toggle)
    {
       setitem(
         item.map((ele)=>{
            if(ele.id===edititem)
            // JISPE CLICK KIYA WO ID AAGAYI H
            {
              return{
                ...ele,name:input
              }

            }
            return ele;
         })

       )
       setoggle(true);
        setinput('');
         setedit(null);
    }
    else{
      const allinput={id:new Date().getTime().toString(),name:input}
      // setitem([...item,input]);
      setitem([...item,allinput])
       setinput('')
       
    }
    
  }
  function deleteitem(index)
  {

    const updateditems=item.filter((ele)=>{
        return index!==ele.id;
    });
    setitem(updateditems);

  }
  const  editItem=(id)=>
  {
    let NEWedititem=item.find((elem)=>{
       return elem.id===id;
    })
    console.log(NEWedititem);
    setoggle(false);
    setinput(NEWedititem.name);
    setedit(id);


  }
  useEffect(()=>{
    localStorage.setItem('lists',JSON.stringify(item))
  },[item])
  // all data stores to local storage
  // when we refresh it gets remove from local storage
  // for that need to get item in local storage
  return (
    <div className="App">
    <div class="first">
      <label>Add your List here</label><br/>
      <input type="text" placeholder="Enter your name"
      value={input}
      onChange={(e)=>setinput(e.target.value)}
      
      />
      {
        toggle? <i class="fa fa-plus" onClick={additem}></i>
        :<button1><i class="fa fa-edit" onClick={additem}></i></button1>
        
      }
   
    </div>
    <div class="showItems">
      {item.map((ele)=>{
        return (
        <div key={ele.id} >
           <h3>{ele.name} </h3>
         
<i class="fa fa-trash-o"  style={{color:'red',marginRight:'20px'}} onClick={()=>deleteitem(ele.id)}></i>
           <i class="fa fa-edit" onClick={()=>editItem(ele.id)}></i>
          
        </div>
        );
       
      })}
    </div>
    </div>
  );
}

export default App;
