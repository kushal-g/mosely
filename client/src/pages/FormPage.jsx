import React,{useState,useEffect} from 'react'

export default function FormPage() {

    const [files, changeFiles] = useState([])
    const [language, changeLanguage] = useState("")
    const [url, setUrl] = useState("")
    async function getURL(){
        let response = await fetch('http://127.0.0.1:5000/',{
            method:'post',
            headers:{
                'Content-type':'application/json',
            },
            body:JSON.stringify({
                files:files,
                language:language
            })
        })
        let body = await response.json()
        setUrl(body.url);
        
    }
    
    async function input_files(files){

        let filesArray = []
        Object.keys(files).forEach(i => {
            const file = files[i];
            const reader = new FileReader();
            reader.onload = (e) => {
                filesArray.push({
                    fileString:reader.result,
                    fileName: file.name
                })
            }
            reader.readAsBinaryString(file)
        })
        changeFiles(filesArray)
    }
    
    
    
    return (
        <div>
                <input type="file" multiple name="file" onChange={e=>{
                    
                   input_files(e.target.files)
                }}/>
                <select name="language" onChange={e=>changeLanguage(e.target.value)}>
                    <option value="c">C</option>
                    <option value="cc">C++</option>
                    <option value="java">Java</option>
                    <option value="ml">ML</option>
                    <option value="pascal">Pascal</option>
                    <option value="ada">Ada</option>
                    <option value="lisp">Lisp</option>
                    <option value="scheme">Scheme</option>
                    <option value="haskell">Haskell</option>
                    <option value="fortran">FORTRAN</option>
                    <option value="ascii">ASCII</option>
                    <option value="vhdl">VHDL</option>
                    <option value="verilog">Verilog</option>
                    <option value="perl">Perl</option>
                    <option value="matlab">MATLAB</option>
                    <option value="python">Python</option>
                    <option value="mips">MIPS Assembly</option>
                    <option value="spice">Spice</option>
                    <option value="vb">Visual Basic</option>
                    <option value="csharp">C#</option>
                    <option value="modula2">Modula2</option>
                    <option value="a8086">a8086 Assembly</option>
                    <option value="javascript">Javascript</option>
                </select>
                <a href="#" onClick={getURL}>Get Url</a>
                <div>
                    {url && <a href={url}>Check Result</a>}
                </div>
        </div>
    )
}
