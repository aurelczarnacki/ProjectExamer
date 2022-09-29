# Examer

[![image.png](https://i.postimg.cc/9F0Q0t8p/image.png)](https://postimg.cc/56cVkvMY)

## About the project

Examer is an examination web app. The inspiration for the project came from my girlfriend job, teaching in post-secondary school. The app main target was to make creating and grading exams simplest as possible.

The application called Examer is a web-based e-learning system designed to create, request and conduct single-choice knowledge tests. It aims to increase the simplicity and efficiency of conducting knowledge tests for a group of users in a remote environment.

## How does it work

### Explanation
Users are divided into 2 roles:
Standard users, assigned at registration, can only use entrance codes given by teachers, to join and solve exams.

Teachers, role given by administrator, can create and edit new exams which are visible only for creator, add new questions, and check scores made by users in specified exams.

Each exam gets unique, random generated code after creation, which serves as an entrance key for users. 
Each exam can have unlimited questions.


### Technologies

the application is divided into two projects:

Controllers and Models were developed in .NET 6.0 using the Entity Framework

The client was created in React.js using axios, React-router and MUI
