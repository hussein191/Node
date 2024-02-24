import React, { useState } from "react";
import  ReactDOM  from "react-dom/client";
import "./index.css";

function App(){
  const [titel,SetTitel] = useState("")
  const [text,SetText] = useState("")

  function Titel(e){
    SetTitel(e.target.value)
  }

  function Text(e){
    SetText(e.target.value)
  }
  
  function ClearForm(){
    SetTitel("")
    SetText("")
  }

  function AddValueNote(TitelNote,TextNote){
    SetTitel(TitelNote)
    SetText(TextNote)
  }
  
  return(
    <div className="bodApp">
      <AllNote ontitel={titel} ontext={text} onClearForm={ClearForm} onAddValueNote={AddValueNote} />
      <Form onTitel={Titel} onText={Text} titel={titel} text={text}/>
    </div>
  )
}

function AllNote({ontitel,ontext,onClearForm,onAddValueNote}){
  const [Nodes,SetNodes] = useState([])
  const [IDNote ,SetIdNote] = useState(null)
  const [TypeNode , SetTyoeNode] = useState("input")

  function AddNotes(){
    if(ontitel && ontext){
      if(IDNote){
        SetNodes(Nodes.map(e =>e.id===IDNote?{...e,ontext:ontext,ontitel:ontitel}:e))
        onClearForm()
        SetIdNote(null)
      }else{
        const item ={ontitel,ontext,state:false,id:Date.now()}
        SetNodes((Nodes)=>[...Nodes,item])
        onClearForm()
      }
    }
  }

  function CompleteNote(id){
    SetNodes(Nodes.map(e=> e.id===id?{...e,state:!e.state} : e))
  }

  function DeletNote(id){
    SetNodes(Nodes.filter(e => e.id !== id))
  }

  function EditNote(id){
    Nodes.map(e => e.id === id?  onAddValueNote(e.ontitel,e.ontext)  : "")
    SetIdNote(id)
  }
  
  function ShowNote(e){
    SetTyoeNode(e.target.value)
  }
  return(
    <div className="AllNote">
      <AddNote onAddNotes={AddNotes} />
      <BodyNote onNodes={Nodes} onType={TypeNode} onCompleteNote={CompleteNote} onDeletNote={DeletNote} onEditNote={EditNote}/>
      <Footer onNodes={Nodes} onShowNote={ShowNote}/>
    </div>
  )
}

function AddNote({onAddNotes}){
  return(
    <div className="AddNote" onClick={onAddNotes}>Add Note</div>
  )
}

function BodyNote({onNodes,onType,onCompleteNote,onDeletNote,onEditNote}){
  let seeNode;
  if(onType === "input") seeNode = onNodes
  if(onType === "complete") seeNode = onNodes.filter(e =>e.state)
  if(onType === "incomplete") seeNode = onNodes.filter(e => !e.state)
  return(
    <div className="BodyNote">
      {
        seeNode.map(e =>(
          <div key={e.id} className="NotE"
          style={e.state === true?{opacity:0.3}:{}}>
            <div className="bodyTitel">
              <h2 onClick={()=>onEditNote(e.id)}>{e.ontitel}</h2>
              <div className="bodyIcons">
                <p onClick={()=>onDeletNote(e.id)}>✖</p>
                <input type="checkbox" onClick={()=>onCompleteNote(e.id)} value={e.state} />
              </div>
            </div>
            <p>{e.ontext}</p>
            <Time />
          </div>
        ))
      }
    </div>
  )
}

function Time(){
  const day = new Date()
  const year = day.getFullYear()
  const month = day.getMonth()+1
  const days = day.getDate()

  return(
    <div className="time">
      {`${days}:${month}:${year} at ${new Date().getHours()}:${new Date().getMinutes()}`}
    </div>
  )
}

function Form({onText,onTitel,titel,text}){
  return(
    <form>
      <input type="text" className="titelNote" placeholder="Enter a title.." value={titel} onChange={onTitel} />
      <textarea type="text" value={text} onChange={onText} />
    </form>
  )
}

function Footer({onNodes,onShowNote}){
  return(
    <div className="Footer">
      {
        onNodes.length > 0 && 
        (<div>
            <button value={"input"} onClick={onShowNote}>All</button>
            <button value={"complete"} onClick={onShowNote}>complete</button>
            <button value={"incomplete"} onClick={onShowNote}>incomplete</button>
        </div>)
      }
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />)