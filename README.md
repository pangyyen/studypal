# Studypal: NUS Study Partner Finder Platform

## Motivation

Many students find studying alone challenging, lacking motivation, accountability, and different perspectives on course material. Especially for new university students or those with busy schedules, finding a compatible study partner is difficult. Our platform addresses this by connecting students with compatible study partners based on academic interests, availability, and study preferences, aiming to enhance academic performance through shared knowledge and collaborative learning.

## Aim

We aim to facilitate the connection between students seeking study partners who share similar academic interests, schedules, and study preferences. By fostering collaboration, students can achieve a deeper understanding of their studies, leading to improved academic performance.

## User Stories

- **University Student**: Wants to find a study partner with similar courses and schedules for exam preparation and material review.
- **Remote Student**: Seeks connections with peers in the same field for engagement and relationship building.
- **Struggling Student**: Looks for a study partner with a strong grasp of difficult course material for assistance in understanding key concepts.
- **Research-focused Student**: Desires a study partner with shared research interests and relevant skills for project collaboration.

## Scope

The platform is designed to enhance the academic experience for NUS students, offering tools and features for:
- Creating and discovering study sessions.
- Accessing a centralized repository for module resources.
- Organizing module-specific chat groups.
- Managing study sessions, dates, and deadlines through a calendar feature.
- Potential future enhancements include gamification, communication tools, and a feedback system.

## Primary Features

### 1. User Profile Creation
- **Sign Up and Login**: Supported by Firebase authentication. Additional sign-in methods (Gmail, Canvas, NUS) to be explored.
- **Profile Information**: After login, users fill in details (username, major, modules, etc.) using Firestore database. Future enhancements may include study styles, attention span, and academic strengths for a refined recommendation system.

### 2. Social (Connecting with Users)
- **Profile Viewing and Friend Requests**: Users can view profiles, exchange contact details, and manage friend lists.
- **Sort/Filter and Layout Customisation**: Features for sorting by column, filtering entries, adjusting row compactness, and exporting tables.

### 3. Studying Jios
- **Session Initiation and Joining**: Users can start and join study sessions, specifying details like date/time, venue, and capacity.
- **Matching Preferences & Algorithm**: Recommendations based on past session history and future filters implementation.

### 4. Modules Pages
- **Module-specific Information**: Enrolled modules show study sessions, shared files, Telegram chats, and general discussions, fostering module-specific collaboration.

### 5. Calendar
- **Event Management and Integration**: Centralized tool for tracking study sessions and important dates, with integration options for external calendars.

### 6. Community for Each Module
- **Resource Sharing and Discussion**: Users can share files, join Telegram chats, and participate in discussions, enhancing module-specific learning.

### Backend Data Processing
- **NUSmods Data Collection**: Custom Python scripts for scraping and processing data for module pages.
- **Directory Structure Generation**: For shared files and Telegram chats, organized into a Firebase-compatible format.

### Light/Dark Mode
- **Theme Preference**: Users can toggle between light and dark modes, implemented using Material-UI for enhanced usability.

## Development Notes

- The project leverages Firebase for authentication and data storage, with Material-UI for the front-end design.
- Custom Python scripts are used for backend data processing and integration with Firebase.
- The platform is under continuous development, with future milestones focusing on request/accept functionality for study sessions, additional authentication methods, and user interface improvements.
