
// if submission has been done and retrieval has also happened once
// instead of fetching all data again we will push new data to table
// and post the submitted data to mongodb separately
// check if submission done
let submitcheck = 0;
// variable t hold the newly added log json input
let jsonInput
// check if any change has been done to log json input in that case add it to table
let jsonchange = 0;
// check if data been retrived atleast once only then add new logs else 
// add new log records and retrieve all the data
let firstretrieve = 0;


// function to submit log inputs in json format to mongodb
document.getElementById('jsonForm').addEventListener('submit', function (e) {
    e.preventDefault();
    //submission has been done
    submitcheck=1;
    // Get the JSON array from the textarea
    jsonInput = document.getElementById('jsonInput').value;
    document.getElementById('jsonInput').value="";

    try {
        // Parse the input to validate if it's a valid JSON array
        const jsonArray = JSON.parse(jsonInput);
        jsonchange = 1;
        // Make a POST request to the specified endpoint
        fetch('http://localhost:3000/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonArray)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Response from server:', data);
            // Handle the response as needed
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle errors if any
        });

    } catch (error) {
        console.error('Invalid JSON array:', error);
        // Handle invalid JSON input
    }
    
    // if a new submisssion is done add it to table immediately
    if(jsonchange == 1 && firstretrieve ==1)
    {
        convert()
    }

});

// variable to hold table data
let Data



async function convert(table){
    let data;
    if(submitcheck == 0 || firstretrieve == 0)
    {
        document.getElementById("tbody").innerHTML = "";
        const records = await fetch('http://localhost:3000/fetch/all');
        //const tablebody = table.querySelector('tbody');
        data = await records.json();
        firstretrieve = 1;
    }
    else if(jsonchange == 1 )
    {
        

        try {
            // Parse the input to validate if it's a valid JSON array
            const jsonArray = JSON.parse(jsonInput);

            data =jsonArray;
            jsonchange = 0;
            console.log(data);
            
    
        } catch (error) {
            console.error('Invalid JSON array:', error);
            // Handle invalid JSON input
        }
    }

    

    //clear 
    
    const tablebody = document.getElementById('tbody');
    // table creation
    for(let i=0;i<data.length;i++)
    {
        const obj = Object.values(data[i]);
        
        let tr=document.createElement("tr")
        let td1=document.createElement("td")
        let td2=document.createElement("td")
        let td3=document.createElement("td")
        let td4=document.createElement("td")
        let td5=document.createElement("td")
        let td6=document.createElement("td")
        let td7=document.createElement("td")
        let td8=document.createElement("td")
        td1.innerText=data[i].level;
        td2.innerText=data[i].message;
        td3.innerText=data[i].resourceId;
        td4.innerText=data[i].timestamp;
        td5.innerText=data[i].traceId;
        td6.innerText=data[i].spanId;
        td7.innerText=data[i].commit;
        td8.innerText=data[i].metadata;
        tr.appendChild(td1)
        tr.appendChild(td2)
        tr.appendChild(td3)
        tr.appendChild(td4)
        tr.appendChild(td5)
        tr.appendChild(td6)
        tr.appendChild(td7)
        tr.appendChild(td8)
        tablebody.appendChild(tr) // appending each row into the table one by one
        
    }
    

}


// search bar implementation searches across all rows and columns
function myFunction() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("logtable");
    tr = table.getElementsByTagName("tr");
    for (i = 1; i < tr.length; i++) {
        // td = tr[i].getElementsByTagName("td")[0];
        alltags = tr[i].getElementsByTagName("td");
        isFound = false;
        for(j=0; j< alltags.length; j++) {
          td = alltags[j];
          if (td) {
              txtValue = td.textContent || td.innerText;
              if (txtValue.toUpperCase().indexOf(filter) > -1) {
                  tr[i].style.display = "";
                  j = alltags.length;
                  isFound = true;
              }
            }       
          }
          if(!isFound && tr[i].className !== "header") {
            tr[i].style.display = "none";
          }
        }
    }


const searchFun = () =>{

    // getting values entered by the user
    let filterlevel = document.getElementById("mylevel").value.toUpperCase();
    let filtermessage = document.getElementById("mymessage").value.toUpperCase();
    let filterresourceId = document.getElementById("myresourceId").value.toUpperCase();
    let filtertimestamp = document.getElementById("mytimestamp").value.toUpperCase();
    let filtertraceId = document.getElementById("mytraceId").value.toUpperCase();
    let filterspanId = document.getElementById("myspanId").value.toUpperCase();
    let filtercommit = document.getElementById("mycommit").value.toUpperCase();
    let filtermetadata = document.getElementById("mymetadata").value.toUpperCase();


    let myTable = document.getElementById("logtable");

    let tr = myTable.getElementsByTagName('tr');

        for(var i =1;i<tr.length;i++)
        {
            // getting values from each column in table in a row
            let tdlevel = tr[i].getElementsByTagName('td')[0].innerText;
            let tdmessage = tr[i].getElementsByTagName('td')[1].innerText;
            let tdresourceId = tr[i].getElementsByTagName('td')[2].innerText;
            let tdtimestamp = tr[i].getElementsByTagName('td')[3].innerText; 
            let tdtraceId = tr[i].getElementsByTagName('td')[4].innerText;
            let tdspanId = tr[i].getElementsByTagName('td')[5].innerText;
            let tdcommit = tr[i].getElementsByTagName('td')[6].innerText;
            let tdmetadata = tr[i].getElementsByTagName('td')[7].innerText;

            if(1){
                

                if( tdlevel.toUpperCase().indexOf(filterlevel) > -1 && 
                    tdmessage.toUpperCase().indexOf(filtermessage) > -1 &&
                    tdresourceId.toUpperCase().indexOf(filterresourceId) > -1 &&
                    tdtimestamp.toUpperCase().indexOf(filtertimestamp) > -1 && 
                    tdtraceId.toUpperCase().indexOf(filtertraceId) > -1 && 
                    tdspanId.toUpperCase().indexOf(filterspanId) > -1 && 
                    tdcommit.toUpperCase().indexOf(filtercommit) > -1 && 
                    tdmetadata.toUpperCase().indexOf(filtermetadata) > -1  
                ){
                    tr[i].style.display="";
                }else{
                    tr[i].style.display= "none";
                }
            }
        }

    
}

// to keep the values in times intact after submission
sub.addEventListener('click',function(event){
    event.preventDefault();
})


// function to filter out times
const searchtime =()=>{
    fromtime=new Date(document.getElementById("time1").value);
    totime=new Date(document.getElementById("time2").value);
    console.log(fromtime)

    let filtertimestamp =Date.parse( document.getElementById("mytimestamp").value);
    let myTable = document.getElementById("logtable");

    let tr = myTable.getElementsByTagName('tr');
    for(var i =1;i<tr.length;i++)
    {   let tdlevel =new Date( tr[i].getElementsByTagName('td')[3].innerText);
        x=new Date("2023-09-17T08:00:00Z")
        console.log(tdlevel >= x)
        
        if(1){
        
            if( tdlevel <= totime && tdlevel >= fromtime ){
                tr[i].style.display="";
            }else{
                tr[i].style.display= "none";
            }
        }
    }

    

}


//function to clear the time fields
const reload = () => {
    console.log("ok")
    document.getElementById("time1").value="";
    document.getElementById("time2").value="";
    let myTable = document.getElementById("logtable");

    let tr = myTable.getElementsByTagName('tr');

    for(var i =1;i<tr.length;i++)
    {
        tr[i].style.display="";
    }
}

