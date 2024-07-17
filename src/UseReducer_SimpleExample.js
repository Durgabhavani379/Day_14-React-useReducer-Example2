import React,{useReducer} from 'react';

const reducer=(state,action)=>{
    if(action.type==="DELETE_PERSON"){
    const newPerson=state.data.filter((eachPerson)=>{
        return eachPerson.id!==action.payload;
    })
     
return {
  ...state,
  data:newPerson,
  length:state.length-1,
}
}
}

const UseReducer_SimpleExample = () => {
  const initialState={
  data:[
    {
      id:"eygyegfe",
      firstname:"durga",
      email:"vdurgabhavani379@gmail.com"
    },
    {
       id:"eygyegfe1",
      firstname:"durga1",
      email:"vdurgabhavani379@gmail.com"
      
    }
    
  ],
 length:2
  }
  const handleState=(id)=>{
     console.log(id);
     dispatch({
        type:"DELETE_PERSON",
        payload:id
      }
     )
  }
  
 const [state,dispatch] = useReducer(reducer,initialState);
  return (
    <div>
       <h1>Count length:{state.length}</h1>
     {
      state.data.map((eachObj)=>{
        const{id,firstname,email} = eachObj;
          return <div key={id}>
              
            <h1>{firstname}</h1>
            <h2>{email}</h2>
            <button onClick={()=>{
             handleState(id);
            }}>delete</button>
            
          </div>
      })
     }
    </div>
  );
};

export default UseReducer_SimpleExample;