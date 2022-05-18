Welcome to easy login and register mern code snippet.
You can install this repo and follow this basic steps and the login and registration part of your web app will be completed and its easy to understand.
You can change the model as per your wish and apply same changes in the client form.

Steps to directly run the project -
Installing the dependencies -

1. Go to client directory of this project in your terminal and type 'npm install'
2. Go to the server directory of this project in your terminal and type 'npm install'
   Connecting the database -
3. For this ,in your server directory create a file with this name specifically - '.env'
   Once you type in .env, a gear image will appear along side the .env file.
   In this .env file you need to add three things, the demo of an .env file is given in the text format
   Copy the entire content and paste it in your .env file and then change the values of ACCESS_TOKEN_SECRET to a string of 50 letters from an online passsword generator.Similarly so it for REFRESH_TOKEN_SECRET and set it to as tring of 100 letters from an online password generator.I am giving a link for easy password generator here.
   https://passwordsgenerator.net/
   Lastly set your connection string of your database from mongodb.An example string is given in the envExample.txt file.

--Steps to get your mongodb connection string (In case one doesn't know)

1. Log in to mongodb
2. Click on create new project - add your project name - click on create project
3. Create new database by clicking on build a database - select he shared database)It will be the free one) - Click on create cluster.
4. Go to Database Access - Click on add new database user.
   Type in username - It will be used in your connection string and set a password.Click add user.
5. Go to Network Access - Click on Add IP address - Click on 'allow access from anywhere' - Click confirm.
6. Go to Databse - Click on Connect - Select 'Connect your application' - Keep in mind the changes it says - Copy the connection string and paste it to next to the 'MONGODB_URL = ' as shown in the envExample file.
   Do the necessary changes like password,username,etc as mentioned during copying the connection string.

You can run the project. Project overview is explained below.

After registering, the data will be stored in database and the jwt refresh_token for the registered id will be stored in cookies.
After successful login, jwt refresh_token for the registered id will be stored in cookies.
This refresh token will be verifed and a new access token will be created and is stored in avariable at client side. (See GlobalState.js).
As it is in the globalstate, it can be passed to whichever component desiring authentication.
The access token is passed to auth middleware where it is verified and the userID can be passed to whomsoever route/controller as request.
In the project, on clicking the details button, it passes the token to the backend route of getting user details.
