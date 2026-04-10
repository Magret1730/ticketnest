# TicketNest Frontend

TicketNest Frontend is the **React-based user interface** for the TicketNest Event Ticket Booking Application.

It allows users to:
- browse events
- book tickets
- make payments
- manage their bookings

Admins can:
- manage events
- view bookings
- view payments
- view users

---

## Overview

This frontend is built using:

- React (Vite)
- React Router
- Axios
- JavaScript
- CSS / Tailwind (if applicable)

It communicates with the **Spring Boot backend API** to provide a complete full-stack experience.

---

## Features

### Authentication
- User registration
- User login
- Protected routes for authenticated users

---

### Events
- View all events
- View event details
- Display event price, date, and availability

---

### Booking
- Select ticket quantity
- Create booking for an event
- Prevent booking when tickets are unavailable

---

### Payment
- Payment page after booking
- Full payment required (must match total price)
- Error handling for incorrect payment amount
- Success confirmation after valid payment

---

### User Dashboard
- View all bookings
- View all payments

---

### Admin Features
- Create events
- Edit events
- Delete events
- View all bookings
- View all payments
- View all users

---

## Project Structure

```
src/
├── api/            # API calls (axios)
|-- assets/
├── components/     # Reusable components
|-- context/
├── pages/          # Application pages
|-- utils/
├── App.jsx
└── main.jsx
```

## Submission & Team Information

## Team Members
- Member 1: Abiodun Magret Oyedele
- Member 2: Jeff Wolridge

---

## Project Repositories

- **Backend Repository:**  
    ```
        https://github.com/jeffwoolridge/ticketnest-backend
    ```

- **Frontend Repository:**  
  ```
    https://github.com/Magret1730/ticketnest
  ```

> Ensure repositories are public or shared with instructors.

---

## Task Management Board

- **Project Board / Trello / GitHub Projects:**  
  ```
  https://github.com/users/jeffwoolridge/projects/2/views/1
  ```

> Used for sprint planning, task tracking, and collaboration.

---

## Demo Video

- **Demo Video Link:**  
  ```
  Link Here
  ```

---

## Frontend Manual Testing (User Stories)

User stories were used to validate frontend functionality.

### Authentication
- As a user, I can register with valid details  
- As a user, I can log in with correct credentials  
- As a user, I see an error for invalid login and registration  

---

### Events
- As a user, I can view all available events  
- As a user, I can view details of a selected event  

---

### Booking
- As a user, I can select ticket quantity and create a booking  
- As a user, I cannot book more tickets than available  

---

### Payment
- As a user, I can make a payment after booking  
- As a user, payment only succeeds if full amount is entered  
- As a user, I see an error for incorrect payment amount  

---

### Dashboard
- As a user, I can view my bookings  
- As a user, I can view my payments  

---

### Admin
- As an admin, I can create events  
- As an admin, I can edit events  
- As an admin, I can delete events  
- As an admin, I can view bookings
- As an admin, I can view users
- As an admin, I can view payments  

---

## Team Collaboration & Workflow

- Feature branches were created for tasks  
- Pull requests were opened for all changes  
- Code reviews were performed before merging  
- GitHub Projects was used for task tracking  
- Both members contributed actively to frontend and backend  

---

## Personal Reflection

From my perspective, the team worked effectively and maintained clear communication throughout the project.

We:
- Divided tasks based on strengths  
- Collaborated on key features such as booking and payment logic  
- Supported each other
- Maintained a consistent workflow using Git and PR reviews  

---

## Roles
### Abiodun Magret Oyedele Role

I contributed primarily to:

- Backend development (entities, services, business logic)  
- API design and validation  
- Booking and payment flow implementation  
- Frontend integration and debugging  
- Built pages in frontend
- Project structuring and documentation  
- Assisted with completing project board

I also ensured clean coding practices and helped maintain consistency across both repositories.

### Jeff Woolridge Role