import fs from 'fs';
//add member
export const addMember =(req,res,next)=>{
    const memberList=JSON.parse(fs.readFileSync('D:/node js course/3rd session/assignment/New folder/DB/models/member.model.json'));
    const rev=JSON.parse(fs.readFileSync('D:/node js course/3rd session/assignment/New folder/DB/models/revenues.model.json'));
    let ress=rev["revenue"];
    let f=true;
    memberList.forEach(element => {
        if(element['id']===req.body['id'] ||element['phone']===req.body['phone'] || element['nationalId']===req.body['nationalId'] ){
            f=false;
        }
    });
    if(f){
        const summ=rev['revenue']+req.body['membership']['cost'];
        rev['revenue']=summ
        fs.writeFileSync('D:/node js course/3rd session/assignment/New folder/DB/models/revenues.model.json',JSON.stringify(rev))
        memberList.push(req.body);
        fs.writeFileSync('D:/node js course/3rd session/assignment/New folder/DB/models/member.model.json',JSON.stringify(memberList))
        res.json({message:memberList});
    }
    else{
        res.json({msg:"member is not unique"})
    }
};


//get all members
export const getall=(req,res,next)=>{
    const TrainerList=JSON.parse(fs.readFileSync('D:/node js course/3rd session/assignment/New folder/DB/models/train.model.json'));
    const memberList=JSON.parse(fs.readFileSync('D:/node js course/3rd session/assignment/New folder/DB/models/member.model.json'));
    let result=[]
    memberList.forEach(m=>{
        const trainId =m["trainerId"];
        m = Object.assign(m,  {trainer:TrainerList.find((e)=>{
            return trainId==e.id;
       })});
       result.push(m)
    })
    res.json({message:result})
}


//get specific member
export const getById=(req,res,next)=>{
    const memberList=JSON.parse(fs.readFileSync('D:/node js course/3rd session/assignment/New folder/DB/models/member.model.json'));
    const id=req.body.id;
    let index = memberList.findIndex((m)=>m.id==id);
    if(index==-1){
        res.json({message:"not found"});
    }
    else{
        
        //mm-dd-yy 3-5-2024
        const currentDate = new Date();
        const fromList =memberList[index]["membership"]["from"].split("-");
        const toList = memberList[index]["membership"]["to"].split("-");
        const from =new Date(fromList[2],parseInt(fromList[1])-1,fromList[0]);
        const to =new Date(toList[2],parseInt(toList[1])-1,toList[0]);
        if((currentDate > from && currentDate < to)){
            res.json({message:memberList[index]});
        }
        else{
            res.json({message:"this member is not allowed to enter the gym"});
        }
    }

}


//put update
export const updateMember=(req,res,next)=>{
    const memberList=JSON.parse(fs.readFileSync('D:/node js course/3rd session/assignment/New folder/DB/models/member.model.json'));
    let listOfKeys=Object.keys(req.body);
    let id=listOfKeys.findIndex(e=>{
        return e=='id'
    });
    
    if(id==-1){
        res.json({msg:"please enter id"});
    }
    else{
        let index = memberList.findIndex((m)=>m.id==req.body['id']);
        if(index==-1){
            res.json({message:"not found"});
        }
        listOfKeys.forEach((membKey,i) => {
            if(i!=id){
                if(membKey=="membership"){
                    let keysOfMembership=Object.keys(req.body["membership"]);
                    keysOfMembership.forEach(e=>{
                        if(e=='cost'){
                            const rev=JSON.parse(fs.readFileSync('D:/node js course/3rd session/assignment/New folder/DB/models/revenues.model.json'));
                            //old value
                            let ress=rev["revenue"];
                            let summ=ress-memberList[index][membKey][e];
                            summ = summ + req.body[membKey][e]
                            rev['revenue']=summ
                            fs.writeFileSync('D:/node js course/3rd session/assignment/New folder/DB/models/revenues.model.json',JSON.stringify(rev))
                            memberList[index][membKey][e]=req.body[membKey][e];
                        }
                        else{
                            memberList[index][membKey][e]=req.body[membKey][e];
                        }
                        
                    })
                }
                else{
                    memberList[index][membKey]=req.body[membKey];
                }
            }
            
        });
        fs.writeFileSync('D:/node js course/3rd session/assignment/New folder/DB/models/member.model.json',JSON.stringify(memberList))
        res.json({msg:memberList});
    }
}


// delete
export const deleteMember=(req,res,next)=>{
    const memberList=JSON.parse(fs.readFileSync('D:/node js course/3rd session/assignment/New folder/DB/models/member.model.json'));
    let memberId=req.body.id;
    let index = memberList.findIndex((m)=>m.id==memberId);
    if(index==-1){
        res.json({msg:"doesn't found"});
    }
    const rev=JSON.parse(fs.readFileSync('D:/node js course/3rd session/assignment/New folder/DB/models/revenues.model.json'));
    //old value
    let ress=rev["revenue"];
    let summ=ress-memberList[index]['membership']['cost']
    rev['revenue']=summ
    fs.writeFileSync('D:/node js course/3rd session/assignment/New folder/DB/models/revenues.model.json',JSON.stringify(rev))
    memberList.splice(index,1);
    fs.writeFileSync('D:/node js course/3rd session/assignment/New folder/DB/models/member.model.json',JSON.stringify(memberList))
    res.json({msg:memberList});
}