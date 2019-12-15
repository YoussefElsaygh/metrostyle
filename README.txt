"# metrostyle" 
To create metro tile an object fields as follows must be declared
1)var scoperows=3; indicates no of rows 

2)var scopecols=1; //initialize cols ..it will be dynamically increased depending on tiles
3)var scopeimages=[{
    type: 3,  //type 1 square , type 2 rectangle double width in case of horizantal align /double height in case of vertical align  
    align:'vertical', //choose alignment 'vertical'/horizontal
    data: {
        imageSource:"...", //path of image
        imageErrSrc:"...", //in case imageSource is 404
        backgroundStyle: {  //background color of div containing image
            backgroundColor: "#ff805d"
        },
        clickCallback: () => {//call back function on click of image 
            console.log("item clicked ");
        },
        text: {  //label to be appeared on top of image  
            label: "ff805d",
            textStyle: {
                color: "White" 
            }
        }
}]
    
"# metrostyle" 
