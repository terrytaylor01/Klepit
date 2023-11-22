# Klepit: A Reddit-Clone Portfolio Project

## Project Overview
This project is a clone of the Reddit homepage, demonstrating my skills in front-end web development. The application is built with React and TailwindCSS, and initialized using Vite. It features a list of posts in rows, with the ability to expand text posts to see the body text, and image posts to preview the image. 

## Deployment
[Find the live deployment here](https://klepit.pages.dev/)

## Key Features
- **Post Creation**: Users can create a new post by clicking the "Create Post" button, which directs them to a new page hosting a form. This form allows users to choose between an image post or a text post, fill in the relevant data, and submit it, serving it to the site.
- **User Authentication**: The site includes user authentication functionality. Users must sign in (via a form modal that appears when the "Sign In" button is clicked) before they can create or vote on a post.
- **Post Filtering**: Users can filter posts by "Latest" or "Most Popular", which is dynamically passed on a SQL `.order` query using state.

## Technologies Used
- **Frontend**: The site is built with HTML, CSS and JS. React as the main framework and styled with TailwindCSS.
- **Backend**: The posts are stored and retrieved using queries to Supabase's SQL database. User authentication is also implemented using Supabase.
- **Deployment/Hosting**: The site is deployed and hosted using Cloudflare Pages.

## Reflection
This project was a great opportunity for me to showcase my skills in front-end development, particularly with React and TailwindCSS. The challenge of replicating the functionality of Reddit's homepage allowed me to demonstrate my proficiency in creating intuitive and responsive user interfaces. It also demonstrates my capabilities emulating a large scale commercial product. 

The implementation of user authentication and post filtering features required a deep understanding of how to integrate front-end technologies with back-end services, a skill that is crucial for any front-end developer. Working with the user session to determine what is shown / what functions are available to the user was engaging. Similarly working with React Context to handle the Sign In modal throughout the entire application was a great exercise for React's inherit functionalities.

Moreover, the use of TailwindCSS for styling allowed me to create a visually appealing design that enhances the user experience. This project reflects my commitment to creating applications that are not only functional but also aesthetically pleasing.

Overall, this project underscores my ability to create complex web applications using modern technologies, and my dedication to continuous learning and improvement in the field of front-end development. I am excited to bring these skills and mindset to future projects and potential roles.

## Screenshots
Please refer to the screenshots provided for a visual representation of the site.
![Home Page](https://imgur.com/izNf08U.png)
![Login Modal](https://imgur.com/uFgXN8R.jpg)
![Create Post Page](https://imgur.com/S4i7LcV.jpg)


