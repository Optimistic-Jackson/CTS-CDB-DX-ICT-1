let fetchData = fetch("https://jsonblob.com/api/jsonBlob/923947078393282560");
fetchData.then(res=>res.text())
.then(d=>myFunction(d));




var myFunction=function(empData){
    const empName = document.getElementById("empName");
    const empID = document.getElementById("empID");
    const empDesg = document.getElementById("empDesg");
    const empDOJ = document.getElementById("empDOJ");
    const empExp = document.getElementById("empExp");
    const empLoc = document.getElementById("empLoc");
    const empTech = document.getElementById("empTech");
    const empImgURL = document.getElementById("empImgURL");

    empData = "[" + empData.substring(1,empData.length-1) +"]";
    empData = JSON.parse(empData);

    console.log(empData);

    const getEmp = (empid) => {
      for (let emp of empData) {
      if (emp.EmpID == empid) return emp;
    }
    return null;
    };

    const ul = document.getElementById("list");
    empData.map((e) => {
    console.log(e);
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(e.Name + " (" + e.EmpID + ")"));
    ul.appendChild(li);
    });

    ul.addEventListener("click", function (e) {
    if (e.target && e.target.nodeName == "LI") {
      const clickedEmpId = parseInt(
      e.target.innerText.split("(")[1].replace(")", "")
    );
    const clickedEmp = getEmp(clickedEmpId);

    empName.innerText = clickedEmp.Name;
    empID.innerText = clickedEmp.EmpID;
    empExp.innerText = clickedEmp.Total_Exp;
    empDOJ.innerText = clickedEmp.DOJ;
    empExp.innerText = clickedEmp["Total Exp"]
    empLoc.innerText = clickedEmp["Work Location"];
    empTech.innerText = clickedEmp.Technologies;
  }

});
}