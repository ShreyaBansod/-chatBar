# Running the Application Locally

To run this application on your local machine, follow these steps:


## Installation

 Clone the repo and install the dependencies.

```bash
   git clone https://github.com/ShreyaBansod/-chatBar.git
``````
```bash   
   npm install 
``````
Create a .env file in server directory and add the appropriate env variables to use the application.            

***Essential Variables***

PORT=4000
DB_CONNECT=
JWT_SECRET=
JWT_EXPIRE=
COOKIE_EXPIRE=
EMAIL_HOST=
EMAIL_PASSWORD=

_fill each filed with your info respectively_

## Run on local machine
```bash
   npm run dev

## Testing on Postman

User can only acess the tasks after logging in.

### Register User

 Open http://localhost:4000/api/v1/register and take the fields 
 ```bash
   {
     "name":,
     "email":,
     "password":
    }
``````
as json ***post*** request 

###  Login User

 Open http://localhost:4000/api/v1/login and take the fields 
 
 ```bash
   {
     "email":,
     "password":
    }
``````
as json ***post*** request 

### Run Socket io

 Open http://localhost:4000/chat on socket.io in postman and ask the bot any question you want!!Make sure to listen event on tcp_messages.All the conversations between the bot and user are saved in the db.
 
 ```bash
     message:what if i want to schedule an appointment
     tcp_message:Sure, I can help you with that. May I know the time you'd like to schedule the appointment for?
``````
 


