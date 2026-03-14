# Product Specification — Patient Role (Glunova)

## 1. Role Definition
The Patient is the primary consumer of the Glunova platform. This role focuses on proactive health monitoring, education, and direct consultation with medical experts to manage diabetes risk and maintenance.

## 2. Core Features (Functional Requirements)

### 2.1 Personalized Onboarding
- **Health Profile Setup:** Capture BMI, HbA1c, and medical history.
- **Risk Assessment:** Automated categorization based on user inputs.

### 2.2 AI Vision Scan (NutriScan)
- **Image Analysis:** Capability to upload food photos for nutritional analysis.
- **Health Verdict:** Real-time AI feedback on whether a meal is "Diabetes-Safe."
- **Nutritional Metrics:** Calories, Protein, Carbs, and Fats breakdown.

### 2.3 Interactive Roadmap
- **Dynamic Task List:** Goal-oriented activities (e.g., "Check Blood Sugar", "Morning Walk").
- **Activity Scheduling:** Ability to pick recommended activities and add them to the daily schedule.
- **Gamified Progress:** Milestone tracking and completion visualizers with point systems.

### 2.4 Educational Hub
- **Curated Articles:** Content tailored to user's health profile (e.g., Pregnancy Diabetes, Type 2 Management).
- **Interactive Reading:** Full article view with markdown support.

### 2.6 Real-time Consultation & Booking
- **Doctor Discovery:** Search and filter specialists by name or category.
- **Appointment Booking:** Select available time slots and confirm consultation details.
- **Direct Messaging:** Secure chat interface with specialized doctors.
- **Image Sharing:** Capability to send photos to doctors for better diagnostic context.
- **Payment Integration:** Secure checkout for consultation fees via Mayar (automated redirect or success message).

### 2.7 Profile & History
- **Personal Information:** Edit name, email, and basic profile settings.
- **Transaction History:** List of previous payments and consultation records.

## 3. Interaction Details (Tester Instructions)
- **Navigation:** Test sidebar links, top navigation, and mobile menu transitions.
- **Forms:** Attempt partial submissions, invalid data types (non-numbers in numeric fields), and empty required fields.
- **AI Chat:** Try diverse health questions and verify the floating widget responsiveness.
- **Accessibility:** Ensure buttons have labels and the UI remains usable at different zoom levels.
- **Error Handling:** Verify "Not Found" pages or error states when network/data fails.

## 4. Key Design Constraints
- **Accessibility:** High contrast and clear typography (Sora/DM Sans) for older or visually impaired users.
- **Performance:** Instant feedback on scans and chat message delivery (Fast UI updates).
- **Mobile First:** Optimized experience for smartphone usage.
