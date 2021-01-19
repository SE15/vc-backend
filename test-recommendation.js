const Recommendation = require('./services/user/recommendation.js');

async function submitRecommendation(user_id,description) {
    //temp data
    this.recommended_by = 11;
    let recommended_by= this.recommended_by
    let check_validation=null;

    check_validation = await Recommendation.checkValidations(user_id,recommended_by);

    if (check_validation){
        
        let recommendation = new Recommendation({user_id: user_id, recommended_by: this.recommended_by,description:description});
        return await recommendation.saveToDatabase();
        //return recommendation;
    }else{
        return "Already Recommended";
    }   
    
}

async function showRecommendation() {
    //temp data
    this.user_id = 1;

        
        let recommendation = new Recommendation({user_id: this.user_id});
        return await recommendation.getInformation();
        
    
}


//submitRecommendation(1,'recommnded').then(result => console.log('Recommendation Added: ', result));
//showRecommendation().then(result=>console.log('Recommendation Records: ',result))