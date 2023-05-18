import { useState, useEffect } from 'react';
import { getDatabase, ref, set, push, onValue, remove} from "firebase/database";
import './App.css';

function App() {



  let [add,setAdd] = useState("")
  let [sub,setSub] = useState("")
  let [mul,setMul] = useState("")
  let [div,setDiv] = useState("")
  let [error,setError] = useState("")
  let [prev,setPrev] = useState(0)
  let [textArr,setTextArr] = useState([])
  const db = getDatabase();



  let handleAdd = (e) =>{
    setAdd(e.target.value)
  }
  let handleSub= (e) =>{
    setSub(e.target.value)
  }
  let handleMul= (e) =>{
    setMul(e.target.value)
  }
  let handleDel= (e) =>{
    setDiv(e.target.value)
  }
  
  let handleSubmit = ()=>{

    let array =[ ]
    array.push({
      add:add,
      sub:sub,
      mul:mul,
      div:div
    })

    array.map((item)=>{

      if(item.add && !item.sub*1 && !item.mul*1 && !item.div*1){
        let check = /^\S+$/.test(item.add)
        console.log(check)
        if(item.add*1 || item.add*1 === 0){
          let value = item.add*1 + prev*1
          setPrev(value)
          setError("")
          set(push(ref(db, 'logic/')), {
            latestValue : item.add*1,
            preValue : prev*1,
            task: "+",
            results : value
          }).then(()=>{
            console.log("Data Gese")
          })
          


        }else{
          setError("Please Enter a valid Number")
        }

        if(!check){
          setError("Space not allow!")
        }
        setAdd("")
      }
      else if(!item.add*1 && item.sub && !item.mul*1 && !item.div*1){
        let check = /^\S+$/.test(item.sub)
        if(item.sub*1 || item.sub*1 === 0 ){
          let subvalue = prev*1 - item.sub*1
          setPrev(subvalue)
          setError("")
          
          set(push(ref(db, 'logic/')), {
            latestValue : item.sub*1,
            preValue : prev*1,
            task: "-",
            results:subvalue,
          }).then(()=>{
            console.log("Data Gese")
          })


        }else{
          setError("Please Enter a valid Number")
        }

        if(!check){
          setError("Space not allow!")
        }
        setSub("")
      }
      
      else if(!item.add*1 && !item.sub*1 && item.mul && !item.div*1){
        let check = /^\S+$/.test(item.mul)
        if(item.mul*1 || item.mul*1 === 0){
          let mulvalue = prev * item.mul*1
          setPrev(mulvalue)
          setError("")
          set(push(ref(db, 'logic/')), {
            latestValue : item.mul*1,
            preValue : prev*1,
            task: "*",
            results:mulvalue,
          }).then(()=>{
            console.log("Data Gese")
          })

        }else{
          setError("Please Enter a valid Number")
        }

        if(!check){
          setError("Space not allow!")
        }
        setMul("")
      }
      
      else if(item.div && !item.add*1 && !item.sub*1 && !item.mul*1){
        let check = /^\S+$/.test(item.div)
        if(item.div*1 || item.div*1 === 0){
            let value = item.div*1
            if(!value){
              setError("Can't Divided by 0")
            }else{
              let subvalue = prev / item.div*1
              setPrev(subvalue)
              setError("")
              set(push(ref(db, 'logic/')), {
                latestValue : item.div*1,
                preValue : prev*1,
                task: "/",
                results : subvalue
              }).then(()=>{
                console.log("Data Gese")
              })

            }
            setDiv("")
        }else{
          setError("Please Enter a valid Number")
        }

        if(!check){
          setError("Space not allow!")
        }
      }else{
        setError("PLease enter single input")
      }
    })
  }


  useEffect(() => {
    const todoref = ref(db, 'logic/');
    
    
    onValue(todoref, (snapshot) => {
      let arr = []
      snapshot.forEach((item)=>{
        arr.push({...item.val(),id:item.key})
      })
      setTextArr(arr)
    });
  },[])


  let handleDelete = (id) =>{
    remove(ref(db, 'logic/'+id))
    
  }



  return (
    <>
      <div className='w-[1300px] pt-[50px] pb-[50px] mt-9 px-[10px] mb-9 mx-auto font-mono bg-[#ffeee6] flex justify-between'>


        <div className='w-[67%]'>
        <div>
          <h1 className='text-[#ff9b3d] text-center font-extrabold text-[40px]'>Arithmatic Logic Field</h1>
        </div>
          <div className='flex justify-between mt-[40px] w-full'>

            <div className='w-[40%] py-[25px] px-[25px] bg-green-300 rounded-[10px]'>
              <div>
                <h3 className='font-bold text-[26px] text-gray-800 text-center'>Addition</h3>
              </div>
              <input value={add} onChange={handleAdd} className='block w-full mt-[15px] rounded-[10px] py-[15px] text-[20px] px-[20px]'/>
            </div>

            <div className='w-[40%] py-[25px] px-[25px] bg-orange-300 rounded-[10px]'>
              <div>
                <h3 className='font-bold text-[26px] text-center text-gray-800'>Subtraction</h3>
              </div>
              <input value={sub} onChange={handleSub} className='block w-full mt-[15px] rounded-[10px] text-[20px] py-[15px] px-[20px]'/>
            </div>
            
          </div>
          <div className='flex justify-center w-full mt-[40px]'>
            <div className='w-[35%]  py-[50px]  bg-[#eeb1f7] rounded-[10px]'>
              <h2 className='text-center text-[24px] font-medium text-gray-900'>{prev}</h2>
              <h4 className='text-center mt-2 text-[16px] font-normal text-red-600'>{error}</h4>
            </div>
          </div>
          <div className='flex justify-between mt-[40px] w-full'>

            <div className='w-[40%] py-[25px] px-[25px] bg-[#a3c4f0] rounded-[10px]'>
              <div>
                <h3 className='font-bold text-[26px] text-gray-800 text-center'>Multiplication</h3>
              </div>
              <input value={mul} onChange={handleMul} className='block w-full mt-[15px] rounded-[10px] py-[15px] text-[20px] px-[20px]'/>
            </div>
            <div className='flex items-center justify-center'>
              <button onClick={handleSubmit} className='font-normal text-gray-800 text-[20px] hover:text-white h-[48px] w-[140px] bg-red-200 rounded-[10px] duration-200 hover:bg-green-500'>Submit</button>
            </div>

            <div className='w-[40%] py-[25px] px-[25px] bg-[#f8a9eb] rounded-[10px]'>
              <div>
                <h3 className='font-bold text-[26px] text-center text-gray-800'>Dividation</h3>
              </div>
              <input value={div} onChange={handleDel} className='block w-full mt-[15px] rounded-[10px] py-[15px] text-[20px] px-[20px]'/>
            </div>
            
          </div>
        </div>
        <div className='w-[32%]'>
          <div className=' mb-[40px]'>
            <h1 className='text-[#ff9b3d] text-center font-extrabold text-[40px]'>History</h1>
          </div>

          <div className=' bg-[#ffefc1] rounded-[5px] '>
            <ol className='overflow-scroll h-[552px]'>
            {
              textArr.map((item,index)=>(
                index%2===0 ? <li className='bg-[#ffd050] px-[15px] py-[6px] mb-1' key={index}>{index+1}. {item.preValue} { item.task } {item.latestValue} = {item.results} <button className='ml-2 font-normal text-gray-800 text-[12px] hover:text-white h-[24px] w-[60px] bg-orange-400 rounded-[10px] duration-200 hover:bg-green-500'>Edit</button><button onClick={()=>handleDelete(item.id)} className=' ml-2 font-normal text-gray-800 text-[12px] hover:text-white h-[24px] w-[60px] bg-red-400 rounded-[10px] duration-200 hover:bg-green-500'>Delete</button></li> 
                : 
                <li className='bg-[#ffefc1]  px-[15px] py-[6px] mb-1' key={index}>{index+1}. {item.preValue} { item.task } {item.latestValue} = {item.results}  <button className='font-normal ml-2 text-gray-800 text-[12px] hover:text-white h-[24px] w-[60px] bg-orange-400  rounded-[10px] duration-200 hover:bg-green-500'>Edit</button><button onClick={()=>handleDelete(item.id)} className=' ml-2 font-normal text-gray-800 text-[12px] hover:text-white h-[24px] w-[60px] bg-red-400 rounded-[10px] duration-200 hover:bg-green-500'>Delete</button></li>
              ))
            }
            </ol>
          </div>

        </div>
      </div>
    </>
      
  );
}

export default App;
