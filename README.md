# Getting the Project to Run
To run the project turn on server first, then turn on the client. 
Steps Below

### Turn on Server
To turn on server:
- cd into the top level project directory. 
/CBOE/Backend    
- setup a virtual environment [resource](https://python.land/virtual-environments/virtualenv).
- run: python3 -m venv venv
- Then we must activte the virutal environment. Window run: venv\Scripts\activate.bat   or   ./venv/bin/activate
 Mac or Linux run: source myvenv/bin/activate   
- install requirements  run: python -m pip install -r requirements.txt
-cd into backend
/CBOE/Backend/backend
- start the server  run: python manage.py runserver


### Turn on Client
- open another terminal, keep the server terminal running
- You must have Node.js and npm installed

- in terminal, navigate to directory: /CBOE/Frontend
- run: npm install
- run: npm start

The Client and Server should now be running


### Note on the Implementation
- The goal for this project was to build the closest description of the spec without making assumption
- I used the Django Rest Framework to build the backend API
- For this implementation I chose to omit using a database and, because of time constraint, simply used a variable to store the symbols needed
  for persistence. This decison was also made because there was no mention of users in the spec it is best practice not to make 
  assumptions. I also chose not to do session server side because it is out of scope for this take home assignment.
- Error handling on Frontend is done at all the calls to the API with .catch() menthod on axios.
- Error handling in Backend is done when making API calls to CBOE API


## What would I change if I was building this for Production
- I would include a database and would store users and their credentials.
- I would create a session on the backend and store the auth access_token in the 
  Db session. Alteratively I would store an encripted acceess_token in httponly cookie
  and have that sent with every request to the backend in the headers. 
- I would hide the access key and secret, needed to retriev auth token, in AWS Secret Manager 
  or something similar or even in an .env file
- I would use a .env file
- I would have tests both for Frontend and Backend
- I would add some tests both for Frontend and Backend



