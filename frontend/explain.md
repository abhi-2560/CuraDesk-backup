# FRONTEND

- installed vite
- installed tailwind
<br>

<h2> before creating project, refer to figma file:

<link>

https://www.figma.com/design/ZLkjwG5ehxNRrC4SUA2WG7/Prescripto---UI-Design?node-id=0-1&p=f&t=EWivlmhi3xkjalVe-0

</link>


</h2>

1. Created frontend folder structure
    - src/(components,pages,context) are created 
    - prescripto assests are pasted in src/assests


2. src/pages edit
    - several pages are created and functions are exported


3. changes in app.jsx
    - all the required pages are imported in app.jsx
    - <Routes> ... </Routes> is created that contains routes to all the pages
  - TIP : while creating .jsx file, write its first letter as capital as export it under same name which is done by default

4. changes in main.jsx
    - react-router-dom is used
    - strict mode is replaced by < browserRouter >

5. Navbar.jsx creation
    - we use imported asset for profile photo in navbar
    - go throught the code once
    - IMP: learn the logic of implementing logout and create account. refer navbar.jsx

6. 