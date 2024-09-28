<p><a target="_blank" href="https://app.eraser.io/workspace/wH909V76gldZvLJ2wu0G" id="edit-in-eraser-github-link"><img alt="Edit in Eraser" src="https://firebasestorage.googleapis.com/v0/b/second-petal-295822.appspot.com/o/images%2Fgithub%2FOpen%20in%20Eraser.svg?alt=media&amp;token=968381c8-a7e7-472a-8ed6-4a6626da5501"></a></p>

1. User upload image
2. Send buffer to Cloudinary
3. Cloudinary returns an image URL 
4. Send image URL to Azure Cognitive Service (Image Analysis)
5. Azure returns to the client, the object type, brand and model
6. Send this data to Dataiku pre-trained model 
7. Dataiku pre-trained model returns the value estimated of the object
8. The user is informed of the data of the object (type, brand, model, estimated value) 
9. The user can change the data (if data wrong)
10. Data sent again to Dataiku which will reestimate the object
11. The user can enter more metadata like the dimension of the object
12. The user accepts the User policy of the app and the estimated value
13. The data is sent to the article micro-service which does a type validation, checks the JWT validity 
14. The article micro-service sends data to the database (MongoDB)



<!-- eraser-additional-content -->
## Diagrams
<!-- eraser-additional-files -->
<a href="/UMLs/ad-creation-sequence-Object Data Processing and Estimation-1.eraserdiagram" data-element-id="0KlojEo345mW8zXV30yMz"><img src="/.eraser/wH909V76gldZvLJ2wu0G___Ik9umQOMUFhqdFIAZGOKv4xvRUO2___---diagram----73cc4505f10fe0559734ec0b35d65a36-Object-Data-Processing-and-Estimation.png" alt="" data-element-id="0KlojEo345mW8zXV30yMz" /></a>
<!-- end-eraser-additional-files -->
<!-- end-eraser-additional-content -->
<!--- Eraser file: https://app.eraser.io/workspace/wH909V76gldZvLJ2wu0G --->