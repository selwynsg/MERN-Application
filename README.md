Application Solution in solving students being afraid to ask Professors Questions.

Simply put, this application is a prototype of a program that can be integrated into canvas where a Professor will be able to see all the questions asked by a student during a lecture. Furthermore, they will be able to see an After Report of the student's questions and what slide/time they asked the questions during the lecture. Lastly, the Professor will be able to select past lectures and view the After Report of that day. 

This Application uses a React.js Front-End, Express.js Back-End, Node.js, and MongoDB as the database. 

Authentication and Cookies have also been implemented. (For now a Professor will simply be anyone who has @northeastern.edu in their name. Will be changed later but for demo and purposes...)

Uses web-socket io for communication between Student and Professor in the live view(Professor Page).

To run the application, follow these steps:

- For Front-End:
- run these commands in the terminal. 
- cd client
- cd apifrontend
- npm start

For Back-End:
run these commands in the terminal.
cd server
npm run devStart

Lastly, if you want some student data, download the CSV file and import it into your mongodb.
If you do not give a student a name, it will default to Anonymous. 
