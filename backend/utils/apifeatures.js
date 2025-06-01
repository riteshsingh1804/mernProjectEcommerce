class ApiFeature{

    constructor(query,queryStr){
        this.query=query;
        this.queryStr=queryStr;
        // console.log("ap2 constructor1 query");
        // console.log( this.query); 
        
        // console.log("api2 constructoor2 queryStr");
        // console.log(this.queryStr);
    }


    search(){
        const keyword=this.queryStr.keyword
        ?{
                  name:{$regex:this.queryStr.keyword,$options:"i"}
         }
        :{}
        // console.log("api2 search before");
        // console.log(this.query);
         this.query=this.query.find({...keyword});
        // console.log("api2 search after");
        // console.log(this.query);
        return this;
    }

    filter(){
        const queryCopy={...this.queryStr};

        const removeFields=["keyword","page","limit"];
        //removing some fields for category
        removeFields.forEach((key)=>delete queryCopy[key]);


       // console.log(queryCopy);
        //filter for Price and Rating
        let queryStr=JSON.stringify(queryCopy);
        queryStr=queryStr.replace(/\b(gt|gte|lt|lte)\b/g,(key)=>`$${key}`);



        // console.log("api2 filter befor");
        // console.log(this.query);
        this.query=this.query.find(JSON.parse(queryStr));
        // console.log("api2 filter after");
        // console.log(this.query);
        return this;
    }

    pagination(resultsPerPage){

        const currentPage=Number(this.queryStr.page)||1;

        const skipResults=resultsPerPage*(currentPage-1);

        this.query=this.query.limit(resultsPerPage).skip(skipResults);
        return this;



    }
}



module.exports=ApiFeature;









