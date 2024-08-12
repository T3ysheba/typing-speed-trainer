### Typing Speed Trainer

Typing Speed Trainer is a web-based application designed to help users improve their typing speed and accuracy. The application measures your Words Per Minute (WPM) and accuracy by allowing you to type out randomly generated text within a specified time frame. 

### Technologies used

React: Frontend library used for building the user interface.

Redux: State management library to manage the application’s state.

TypeScript: For type safety and better developer experience.

SCSS: For styling components with modular and reusable styles.

### Installation
To set up the project locally, follow these steps:

1.Clone the repository

```git clone https://github.com/your-username/typing-speed-trainer.git```
```cd typing-speed-trainer```

2.Install dependencies:

``` npm install ```

3.Run the application:

``` npm start ```



### Usage
Once the application is running:

Choose the text types (e.g., punctuations, numbers) you want to practice with.

Select your desired time limit.

Start typing as soon as the text appears.

Your WPM and accuracy will be displayed in real-time.

After the session ends, your results will be shown in a modal.

### Key Components
Home.tsx: The main component that orchestrates the typing session.

ResultModal.tsx: A modal that displays the user's WPM and accuracy after the session.

TextDisplay.tsx: Renders the text to be typed with visual feedback on accuracy.

Input.tsx: Custom input component for capturing user typing.


