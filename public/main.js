
function deleteJob(id){
    console.log('id');
    const result =  confirm("Are you sure you want to delete this job ?");
    if(result){
      fetch("/delete/"+id,{
         method: "POST"
      }).then(res =>{
         if(res.ok){
            window.location.href = "/jobs";
         }
      })
    }
 }

 function updateJob(id){
   console.log('id');
   const result =  confirm("Are you sure you want to update this job ?");
   if(result){
     fetch("/update/"+id,{
        method: "POST"
     }).then(res =>{
        if(res.ok){
           window.location.href = "/jobs";
        }
     })
   }
}