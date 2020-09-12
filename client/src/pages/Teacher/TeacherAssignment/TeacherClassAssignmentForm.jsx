import React,{useState} from "react"
import "../../../components/DropDown/Dropdown.css"
import DropDown from "../../../components/DropDown/Dropdown"


function TeacherClassAssignmentForm(props){
    
    const [assignmentName,setAssignmentName]=useState("")
    const [assignmentDueDate,setAssignmentDueDate]=useState("");
    const [assignmentLanguage,setAssignmentLanguage]=useState("java");
    const [assignmentDescription,setAssignmentDescription]=useState("");
    const [assignmentDocument,setAssignmentDocument]=useState("");

    var assignmentLanguageList=[
        {label:"C",value: "c"},
        {label:"C++",value:"cc"},
        {label:"Java",value:"java"},
        {label:"ML",value:"ml"},
        {label:"Pascal",value:"pascal"},
        {label:"ADA",value:"ada"},
        {label:"Lisp",value:"lisp"},
        {label:"Scheme",value:"scheme"},
        {label:"Haskell",value:"haskell"},
        {label:"Fortran",value:"fortran"},
        {label:"ASCII",value:"ascii"},
        {label:"VHDL",value:"vhdl"},
        {label:"Verilog",value:"verilog"},
        {label:"PERL",value:"perl"},
        {label:"MatLab",value:"matlab"},
        {label:"Python",value:"python"},
        {label:"MIPS",value:"mips"},
        {label:"Prolog",value:"prolog"},
        {label:"Spice",value:"spice"},
        {label:"VB",value:"vb"},
        {label:"CSharp",value:"csharp"},
        {label:"Modula2",value:"modula2"},
        {label:"A8086",value:"a8086"},
        {label:"Javascript",value:"javascript"},
        {label:"PLSQL",value:"plsql"}]
 
        function CreateClassAssignment(event){
            const form=new FormData();
            form.append("courseId",props.uniqueCourseId)
            form.append("classId",props.classId)
            form.append("name",assignmentName)
            form.append("dueDate",Date.now())
            form.append("description",assignmentDescription)
            form.append("language",assignmentLanguage)
            form.append("attachment",assignmentDocument)
         
              event.preventDefault();
              props.user.getIdToken()
          .then(token=>{
              fetch(`${process.env.REACT_APP_URL}/teacher/course/class/assignment/create`,{
                  method:"post",
                  headers:{
                      "Authorization" : `Bearer ${token}`,
                  },
                  body:form
              })
              .then(response=>response.json())
              .then(body => {console.log(body);
              props.offModal();
              props.ViewClassAssignment();
                })
          }) 
      
      }

return <div className="classForm">
<div className="classForm_background" onClick={props.offModal}></div>
<div className="classForm_content">
<h2>
<p>Create CLass Assignment</p></h2>
<form onSubmit={CreateClassAssignment}>
        <input placeholder="Assignment Name" onChange={event=>setAssignmentName(event.target.value)} value={assignmentName} type="text"/>
        <DropDown list={assignmentLanguageList} onChange={setAssignmentLanguage} value={assignmentLanguage} />
        <input placeholder="Assignment Due Date: " onChange={event=>setAssignmentDueDate(event.target.value)} value={assignmentDueDate} type="date"/>
        <textarea rows="10" placeholder="Assignment Description" onChange={event=>setAssignmentDescription(event.target.value)} value={assignmentDescription} />
        <input placeholder="Assignment Document" onChange={event=>setAssignmentDocument(event.target.files[0])}  type="file"/>
        <button type="Submit">Submit</button>
    </form>
</div>
    
</div>
}
export default TeacherClassAssignmentForm;