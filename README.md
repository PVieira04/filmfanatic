# MasterMaths

[This project](https://pvieira04.github.io/mastermaths/) is now live on Github Pages.

FilmFanatic is a site where users can play a quiz game which is all about film.

![Responsiveness Showcase via amiresponsive.co.uk]()

## [Contents](#contents)

* [User Experience (UX)](#user-experience-ux)
  * [Key Project Goals](#key-project-goals)
  * [Target Audience](#target-audience)
  * [User Goals](#user-goals)
  * [User Story](#user-story)
* [Planning](#planning)
  * [Strategy](#strategy)
  * [Scope](#scope)
  * [Structure](#structure)
  * [Skeleton](#skeleton)
  * [Surface](#surface)
  * [Review with Mentor](#review-with-mentor)
* [Technology](#technology)
  * [Languages](#languages)
* [Design](#design)
  * [Colour Scheme](#colour-scheme)
  * [Typography](#typography)
  * [Accessibility](#accessibility)
  * [Imagery](#imagery)
  * [Wireframes](#wireframes)
* [Features](#features)
  * [The Landing Page](#the-landing-page)
  * [Features Left to Implement](#features-left-to-implement)
* [Testing](#testing)
* [Deployment](#deployment)
* [Credits](#credits)
  * [Content](#content)
  * [Media](#media)

## User Experience (UX)

### Key Project Goals
1. Create a functional quiz which has five static questions.
2. Create a JSON file which contains quiz questions & allow JS to pull them.
3. Change JSON file to contain only film information and make questions in real time.
4. Randomise questions being asked.
5. Increase number of films stored in JSON.
6. Connect to an API to pull film information from instead.

### Target Audience

- All demographics. 

### User Goals

- Wants to play a quiz based on film knowledge

### User Story

- User lands on website and reads the welcome message. User understands the rules of the game and so clicks on the start game button. They answer the first question and get immediate feedback on whether the answer is correct or not. They click on the button to bring up the next question and continue this process until answering the fifth and final question. Upon answering, user reads the feedback and then clicks on the button to show results.

## Planning
In this section, I outline the initial planning stages for this project.

### Strategy



---
| **Opportunity / Problem** | **Importance** | **Viability / Feasibility** | **Difficulty** |
|-----------------------------|:-:|:-:|:-:|
| Ask question using a uniform template | 5 | 5 | 1 |
| Generate 4 answers, 1 being correct, 3 being incorrect | 5 | 5 | 2 |
| Next question replaces the answered question | 5 | 5 | 1 |
| Ensure no repeating of questions | 5 | 5 | 1 |
| Score tracker | 5 | 5 | 1 |
| Welcome message | 5 | 5 | 1 |
| Ask questions using a range of different templates | 5 | 5 | 2 |
| Animations for correct answers | 4 | 5 | 2 |
| Allow user to select decade of movies involved in quiz | 4 | 5 | 3 |
| Pull question information from an API | 1 | 2 | 5 |
| Create a leaderboard | 2 | 3 | 4 |
---

Sum of Importance = 46
Sum of Viability = 50

Viability >= Importance so therefore, I could implement all features.

### Scope

- Taking into account the difficulty of each potential feature, I will be leaving out the last three features in my Minimum Viable Project. I will code my project with the aim of adding these features at a later date.

The following features are my scope for this project:
- Ask question using a uniform template	
- Generate 4 answers, 1 being correct, 3 being incorrect	
- Next question replaces the answered question	
- Ensure no repeating of questions	
- Score tracker	
- Welcome message	
- Ask questions using a range of different templates	
- Animations for correct answers	

### Structure

This will be the flow of how the user will navigate the website:

1. Welcome message + instructions + start game button
2. Question one
3. Question two
4. Question three
5. Question four
6. Question five
7. Results

### Skeleton

For My skeleton, I wanted to have the layout for 5 different sections:
1. Welcome message + instructions + start game button
2. Question display - unanswered
3. Question display - answered correctly with message and next question button
4. Question display - answered incorrectly with message and display results button
5. Results

### Surface

- I want this site to be bright, with lots of colour and images. I want typography which also reflects that.
- Key word: Bubbly. I want my text to be bubbly and fun.

### Review with Mentor

- Since this is a front-end project, it would be unwise to use an API. This is becasue any API keys that I include are not protected and anyone could end up using the keys for themselves.
- This means I will be unable to achieve the sixth project goal.
- However, I will be able to simulate an API call and show that it works as a proof of concept.

## Technology

### Languages

- HTML5 - The latest version of HTML. Allows content to be placed on the website.
- CSS3 - The latest version of CSS. Allows for custom styling of HTML elements.
- JavaScript - The latest version of vanilla JavaScript. Allows for extensive interactability with the user.

## Design

### __Colour Scheme__

- 

These are the results of the [contrast checker](https://webaim.org/resources/contrastchecker/):

![]()

#### Other Checks on Used Combinations

[]()

### __Typography__

- 

### __Accessibility__

- 

### __Imagery__

- 

### __Wireframes__

  ### Landing Page Mockups
  ![Landing Page Mockup - Desktop Version]()

  [Landing Page Mockup - Tablet Version]()

  [Landing Page Mockup - Mobile Version]()

## Features

### The Landing Page

  - 

![Landing Page - Desktop]()

### Features Left to Implement

- With regards to the initial scope of the project, all features have been implemented.
- However, additional features can be implemented at another stage.

### Future Features

- In order to achieve the original sixth project goal of using an API, a back end can be built to support the fully functioning front end. This will allow the safe use of an API where a key is needed.
- For the option selection function in JavaScript, a more intelligent system of selecting options can be implemented. For example, if a year is given as the answer, the code will generate three random year which are close but not the same as the target year. That way, if a film was released in 1977, an option of 2021 would not come up.
- Add different kinds of questions regarding awards received from different institutions such as the Oscars, Golden Globes etc.
- Add a functionality for users to select how many questions they wish to answer.

## Testing 

Please refer to the [TESTING.md]() file.

## Deployment

The site was deployed to GitHub pages. The steps to deploy are as follows: 
  - In the GitHub repository, navigate to the Settings tab .
  - Under the "Code and automation" section, click on "Pages"
  - Under "Build and Deployment", select the option "Deploy from a branch" for "Source", and for "Branch", select "main".

[This is the live website](https://pvieira04.github.io/filmfanatic/)

## Credits 

### Content 

- 

### Media

- 