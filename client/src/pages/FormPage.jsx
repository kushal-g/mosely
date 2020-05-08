import React from 'react'

export default function FormPage() {
    return (
        <div>
            <form action="http://127.0.0.1:5000/" method="post">
                <input type="file" multiple name="file"/>
                <select name="language">
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
                <input type="submit"/>
            </form>
        </div>
    )
}

