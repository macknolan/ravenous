const clientId = 'TK6Xd8EivH4GbLDDtk_y6Q';
const secret = 'JdyvO2bphpCprOcHHXHdOgdLdnLt6FzCVbr12NPUUcKf0KpgRbJYHyYWqHDdCIlS';
const accessToken = ''

const Yelp = {
    getAccessToken(){
        let cors = 'https://cors-anywhere.herokuapp.com/';
        if(accessToken){
            return new Promise(resolve => resolve(accessToken));

        }
        return fetch(`${cors}api.yelp.com/oauth2/token?grant_type=client_credentials&client_id='${clientId}&client_secret='${secret}`, {
            method: 'POST'
        }).then(response => {return response.json()}).then(jsonResponse =>  {this.accessToken = jsonResponse.access_token});
             
    },

    search(term, location, sortBy)  {
        return Yelp.getAccessToken().then(function() {
            return fetch(`https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`, {
                headers:    {authorization:`Bearer ${this.accessToken}`}
            })
        }).then(response => {return response.json()}).then(jsonResponse =>  {
            if(jsonResponse.business){
                console.log(jsonResponse);
                return jsonResponse.business.map(business =>    {return 
                    {
                        id:business.id
                        imageSrc:business.image_url
                        name:business.name
                        address:business.location.address1
                        city:business.location.city
                        state:business.location.state
                        zipCode:business.location.zip_code
                        category:business.categories.title
                        rating:business.rating
                        reviewCount:business.review_count

                }})
        }
    })
    }

};

export default Yelp;