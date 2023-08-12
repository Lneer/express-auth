# Application for user authorization

In addition to the authorization functionality, a library for data management in the radis database was tested

## Components and libraries used: 
- typescript
- express
- swagger-ui-express
- redis
- redis-om (beta)
- bcrypt
- jsonwebtoken
- docker / docker-compose

## To launch the application :
- download from the repository with the command
  ```git clone https://github.com/Lneer/express-auth.git```
- in case Windows OS run `Docker Desktop`
- run application from `express-auth` directorywith the command  
  ```npm run project-start ```
- application will run on the `Port 8080`

## EndPoints 

- `/auth/signup` - registration 
- `/auth/signin` - login 
- `/auth/signout` - logout 
- `/auth/refresh` - refresh tokens 

more detailed information about request and response schemas is described in swagger-doc
`localhost:8080/api-docs`
