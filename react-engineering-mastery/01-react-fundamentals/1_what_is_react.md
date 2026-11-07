# 01 — What Exactly Is React? (Complete Beginner to Interview Guide)

> React Fundamentals | Beginner-Friendly Explanation | Real-World Examples | Interview Preparation

**Level:** Absolute Beginner → Interview Ready

---

# 📚 Table of Contents

1. [What Exactly Is React?](#1-what-exactly-is-react)
2. [Why Do We Need React?](#2-why-do-we-need-react)
3. [React Is a JavaScript Library](#3-react-is-a-javascript-library)
4. [What Are Components?](#4-what-are-components)
5. [Component Reusability](#5-component-reusability)
6. [What Are Props?](#6-what-are-props)
7. [What Is Declarative Programming?](#7-what-is-declarative-programming)
8. [What Is State in React?](#8-what-is-state-in-react)
9. [How Does React Update the UI?](#9-how-does-react-update-the-ui)
10. [What Is DOM?](#10-what-is-dom)
11. [What Is Reconciliation?](#11-what-is-reconciliation)
12. [Is React a Programming Language?](#12-is-react-a-programming-language)
13. [What Is JSX?](#13-what-is-jsx)
14. [Why Use React Instead of Vanilla JavaScript?](#14-why-use-react-instead-of-vanilla-javascript)
15. [Important Interview Questions](#15-important-interview-questions)
16. [Complete React Mental Model](#16-complete-react-mental-model)
17. [Quick Revision Notes](#17-quick-revision-notes)
18. [Practice Questions](#18-practice-questions)

---

# 1. What Exactly Is React?

Let's start with a very simple question.

Suppose you open Amazon.

What do you see?

- A navigation bar.
- A search bar.
- Product images.
- Product prices.
- Add to Cart buttons.
- Your shopping cart.
- Login and signup options.

All these things together create the user interface of Amazon.

Now imagine that we want to build a similar website.

We need something that helps us create these interfaces and make them interactive.

This is where React comes in.

### Simple Definition

**React is a JavaScript library used to build user interfaces (UIs), especially interactive web applications.**

Let's understand every word.

- **JavaScript:** The programming language we use to write application logic.
- **Library:** A collection of ready-made functionality that developers can use.
- **User Interface (UI):** Everything a user sees and interacts with on a website.

For example:

<escape>
Website → What the user sees
</escape>

<escape>
React → A tool that helps us build that interface
</escape>

### Real-World Example

Think about an Amazon product page.

When you click the Add to Cart button, the cart count increases.

When you change the product quantity, the total price changes.

When you search for a product, different products appear.

These are interactive UI changes.

React helps us build such interactive interfaces in an organized way.

**Remember:** React is mainly responsible for the UI layer of an application.

---

# 2. Why Do We Need React?

Before understanding React, we should understand what problem it solves.

Let's create a small counter using normal HTML and JavaScript.

### Step 1: Create an HTML Button

```html
<button id="btn">Count: 0</button>
```

This creates a button on the webpage.

Initially, it displays:

```text
Count: 0
```

### Step 2: Write JavaScript

```javascript
let count = 0;

document.getElementById("btn").addEventListener("click", () => {

    count++;

    document.getElementById("btn").innerText = `Count: ${count}`;

});
```

Let's understand this code like a beginner.

**First:**

```javascript
let count = 0;
```

We created a variable to store the current count.

**Second:**

```javascript
document.getElementById("btn")
```

JavaScript finds the HTML button whose ID is `btn`.

Think of it like this:

Imagine you have 100 students in a classroom, and you want to find a student named Rahul.

You search for Rahul and then perform an operation on him.

Similarly, JavaScript searches for a particular HTML element.

**Third:**

```javascript
.addEventListener("click", () => {})
```

This tells JavaScript:

"Whenever someone clicks this button, execute this function."

**Fourth:**

```javascript
count++;
```

Increase the count by one.

**Fifth:**

```javascript
innerText = `Count: ${count}`;
```

Change the text displayed inside the button.

### What Are We Doing Manually?

Every time the user clicks:

1. Store the count.
2. Listen for the click.
3. Increase the count.
4. Find the button again.
5. Change its text.

For a small counter, this is perfectly fine.

But imagine an application like Amazon.

You might have hundreds of interactive elements:

- Product quantities.
- Cart items.
- Search suggestions.
- User notifications.
- Filters.
- Order status.

Managing all these UI updates manually can become complicated.

**This is the problem React helps us manage.**

### How Does React Approach the Same Problem?

Instead of manually finding the button and changing its text, we describe how the button should look based on the current count.

```jsx
import { useState } from "react";

function Counter() {

    const [count, setCount] = useState(0);

    return (
        <button onClick={() => setCount(count + 1)}>
            Count: {count}
        </button>
    );

}
```

Let's understand the difference.

In normal JavaScript:

```javascript
button.innerText = `Count: ${count}`;
```

We manually update the button.

In React:

```javascript
setCount(count + 1);
```

We update the state.

React then handles the necessary UI update.

### The Most Important Idea

In React, we generally don't tell JavaScript:

"Find this element and change its text."

Instead, we tell React:

"When my data changes, this is how my UI should look."

That's the basic idea behind React.

---

# 3. React Is a JavaScript Library

You might have heard these two words:

- Library
- Framework

Let's understand them using a real-world example.

### Imagine You Are Building a House

Suppose you want to build a house.

**Option 1: You have a toolbox.**

Inside it, you have:

- Hammer.
- Screwdriver.
- Measuring tape.
- Drill machine.

You decide which tool to use and when to use it.

This is similar to a library.

A library provides functionality that you can use whenever you need it.

**Option 2: You hire a construction company.**

The company provides:

- A predefined structure.
- A construction process.
- Rules.
- Different workers.
- A complete workflow.

You work within the structure provided by the company.

This is a simplified analogy for a framework.

### So, What Is React?

React is technically a JavaScript library.

Why?

Because React mainly focuses on building user interfaces.

It does not provide every feature required by a complete web application.

For example:

| Requirement | Common Tool |
|---|---|
| Building UI | React |
| Navigation between pages | React Router |
| Server-state management | TanStack Query |
| Global state management | Redux Toolkit |
| Build tooling | Vite |

These tools can work together to build a complete application.

### Library vs Framework

| Library | Framework |
|---|---|
| Provides specific functionality | Provides a broader application structure |
| Developer chooses when to use it | Framework defines more of the application flow |
| Example: React | Example: Angular |

*Note: This is a simplified distinction. Real-world libraries and frameworks can have overlapping characteristics.*

### Interview Question

**Q. Is React a library or a framework?**

**Answer:**

React is technically a JavaScript library because it primarily focuses on the UI layer. It provides functionality for building components and rendering interfaces, while additional tools are commonly used for routing, data fetching and other application-level requirements.

---

# 4. What Are Components?

This is one of the most important concepts in React.

Let's understand it using a real-world website.

Imagine you are looking at an Amazon homepage.

You can divide the entire page into smaller parts:

<escape>
Amazon Website
│
├── Navbar
│   ├── Logo
│   ├── Search Bar
│   └── Cart
│
├── Product Section
│   ├── Product Card
│   ├── Product Card
│   └── Product Card
│
└── Footer
</escape>

Notice something?

Instead of thinking about the entire website as one huge thing, we divide it into smaller sections.

Each section can be developed separately.

These smaller UI building blocks are called **components**.

### Simple Definition

A component is a reusable, independent piece of UI that represents a particular part of an application.

### Let's Create Our First Component

Suppose we want to create a navigation bar.

```jsx
function Navbar() {
    return (
        <nav>
            My Website
        </nav>
    );
}
```

Here:

- `function Navbar()` creates a JavaScript function.
- `return` tells us what this component should display.
- `<nav>` represents the navigation section.

This function is a React component.

Now let's create another component.

```jsx
function Footer() {
    return (
        <footer>
            Copyright 2026
        </footer>
    );
}
```

We have created two components.

### Combining Components

Now suppose we want to display both components on our webpage.

```jsx
function App() {

    return (
        <>
            <Navbar />
            <Footer />
        </>
    );

}
```

Here, `App` is also a component.

It uses two other components:

- Navbar
- Footer

This is called composing components.

### Important Things to Remember

1. React component names should start with a capital letter.
2. Components can contain their own UI and logic.
3. Components can be combined to create bigger interfaces.
4. Components can be reused in different places.

### Why Are Components Useful?

Imagine your entire Amazon website is written in one giant component.

If you want to modify the navbar, you might have to search through thousands of lines of code.

But when your application is divided into components, you can work on the navbar separately.

This improves:

- Code organization.
- Maintainability.
- Reusability.
- Scalability.

**Interview Definition:**

React follows a component-based architecture in which an application is divided into smaller, reusable UI units called components. Components can be composed together to build complex interfaces.

---

# 5. Component Reusability

Now that we understand components, let's understand why they are called reusable.

Imagine you are building a website.

You need 10 buttons that all look similar.

Would you write the same HTML 10 times?

You could, but it creates unnecessary repetition.

Instead, create one component.

```jsx
function Button() {

    return (
        <button>Click Me</button>
    );

}
```

Now use it multiple times.

```jsx
function App() {

    return (
        <>
            <Button />
            <Button />
            <Button />
        </>
    );

}
```

The same component is used three times.

This is called component reusability.

### Real-World Example

Imagine an e-commerce website containing 100 products.

Every product card might contain:

- Product image.
- Product name.
- Product price.
- Add to Cart button.

Instead of creating 100 different components, we can create one reusable ProductCard component.

Then we can use it for different products.

But how do we show different product names and prices?

That's where props come in.

---

# 6. What Are Props?

Let's understand props through a simple real-life example.

Imagine you have a machine.

The machine is the same, but you give it different inputs.

For example:

```text
          Machine
             |
       +-----+-----+
       |           |
    Input A      Input B
       |           |
    Output A     Output B
```

The machine's functionality remains the same.

Only the input changes.

React components work similarly.

A component can receive different data from its parent component.

This data is called **props**.

### Simple Example

```jsx
function User(props) {

    return (
        <h2>Hello {props.name}</h2>
    );

}
```

Here, `User` is our component.

It receives an object called `props`.

Inside that object, we access the `name` property.

Now use the component:

```jsx
function App() {

    return (
        <>
            <User name="Rahul" />
            <User name="Aman" />
            <User name="Manav" />
        </>
    );

}
```

Output:

```text
Hello Rahul
Hello Aman
Hello Manav
```

Notice what happened.

We created one component, but passed three different names.

### What Is Happening Internally?

When we write:

```jsx
<User name="Rahul" />
```

React provides the component with props containing that value.

Conceptually, the component receives:

```javascript
props = {
    name: "Rahul"
};
```

Similarly:

```jsx
<User name="Aman" />
```

The component receives:

```javascript
props = {
    name: "Aman"
};
```

### Shorter Syntax: Destructuring

Instead of writing:

```jsx
function User(props) {
    return <h2>Hello {props.name}</h2>;
}
```

We can write:

```jsx
function User({ name }) {
    return <h2>Hello {name}</h2>;
}
```

Both approaches work.

### Important Properties of Props

1. Props are used to pass data from parent components to child components.
2. Props are read-only from the receiving component's perspective.
3. Different props allow the same component to display different information.

### Interview Question

**Q. What are props in React?**

Props are read-only inputs passed from a parent component to a child component. They allow components to receive dynamic data and become reusable.

### Connection

```text
Components
    |
    v
Reusable UI
    |
    v
Need Different Data
    |
    v
   Props
```

---

# 7. What Is Declarative Programming?

This is an important React interview concept.

Before understanding declarative programming, let's understand its opposite.

### A. Imperative Programming

Imperative programming means telling the computer exactly HOW to perform an operation.

Imagine you want to change the color of a heading.

```javascript
const heading = document.getElementById("heading");

heading.style.color = "red";
heading.innerText = "Hello";
```

We are giving JavaScript specific instructions:

1. Find the heading.
2. Change its color.
3. Change its text.

We are explaining the steps.

This is imperative programming.

### B. Declarative Programming

Declarative programming means describing WHAT result we want.

For example:

```jsx
function App() {

    return (
        <h1 style={{ color: "red" }}>
            Hello
        </h1>
    );

}
```

Here, we describe the UI we want.

React handles the necessary operations.

### Real-World Example: Ordering Food

Imagine you want to eat a pizza.

**Imperative approach:**

You tell the chef:

1. Take a pan.
2. Add oil.
3. Prepare the dough.
4. Add vegetables.
5. Add cheese.
6. Bake it.

You explain every step.

**Declarative approach:**

You simply say:

"I want a vegetable pizza."

You describe the final result, and the chef handles the process.

That's the basic difference.

### Imperative vs Declarative

| Imperative | Declarative |
|---|---|
| Focuses on HOW | Focuses on WHAT |
| Describes individual steps | Describes desired result |
| Manual operations | System handles implementation details |
| Example: DOM manipulation | Example: React UI description |

### Interview Answer

React is declarative because developers describe what the UI should look like for a given state. React determines and applies the necessary updates rather than requiring developers to manually manipulate DOM elements for every change.

---

# 8. What Is State in React?

Now we are reaching one of the most important concepts.

Let's understand state using a real-world example.

Imagine you are using Instagram.

You like a post.

Initially:

```text
Likes: 100
```

After clicking the Like button:

```text
Likes: 101
```

After another user likes the post:

```text
Likes: 102
```

The number of likes changes over time.

This changing information is application data.

In React, data that a component needs to remember and that can change over time is commonly managed using **state**.

### Simple Definition

State is data managed by a React component that can change over time and influence what the component displays.

### Why Do We Need State?

Let's try something.

```jsx
function Counter() {

    let count = 0;

    function increase() {
        count++;
        console.log(count);
    }

    return (
        <button onClick={increase}>
            Count: {count}
        </button>
    );

}
```

You might think this will work.

But there is a problem.

When we click the button:

- `count` increases.
- The console displays the updated value.
- But the button doesn't automatically show the updated count.

Why?

Because changing a normal JavaScript variable does not tell React that the component needs to render again.

We need a mechanism that tells React:

"My data has changed. Please update the UI."

That mechanism is state.

### Introducing useState

React provides a Hook called `useState`.

Example:

```jsx
import { useState } from "react";

function Counter() {

    const [count, setCount] = useState(0);

    return (
        <button onClick={() => setCount(count + 1)}>
            Count: {count}
        </button>
    );

}
```

Let's understand this line carefully.

```javascript
const [count, setCount] = useState(0);
```

It gives us three important things:

| Part | Meaning |
|---|---|
| `useState(0)` | Creates state with initial value 0 |
| `count` | Holds the current state value |
| `setCount` | Updates the state |

When we call:

```javascript
setCount(count + 1);
```

We are telling React to update the state.

React schedules the update and renders the component again with the new value.

### Understand Through a Dry Run

Initially:

```text
count = 0
```

UI:

```text
Count: 0
```

User clicks.

```javascript
setCount(0 + 1);
```

New state:

```text
count = 1
```

React renders the component again.

New UI:

```text
Count: 1
```

User clicks again.

```javascript
setCount(1 + 1);
```

New state:

```text
count = 2
```

New UI:

```text
Count: 2
```

### Normal Variable vs State

| Normal Variable | React State |
|---|---|
| Stores data | Stores data |
| Changing it doesn't trigger React rendering | Updating it schedules a render |
| Useful for ordinary calculations | Useful for data affecting the UI |
| React doesn't track its changes | React manages its updates |

### Important Interview Point

State updates are scheduled. You should not expect the state variable to change immediately inside the same running function.

For example:

```jsx
function handleClick() {

    setCount(count + 1);

    console.log(count);

}
```

The console may show the previous render's value.

This is because each render has its own state snapshot.

We will study this behavior in detail when we cover `useState`.

---

# 9. How Does React Update the UI?

Let's connect the concepts we have studied.

Imagine a counter.

Initially:

```text
State = 0
```

React displays:

```text
Count: 0
```

Now the user clicks the button.

The state changes to:

```text
State = 1
```

React renders the component again.

The new UI description becomes:

```text
Count: 1
```

React then determines which changes are necessary and updates the DOM.

### Complete Flow

```text
User Clicks Button
        |
        v
Event Handler Executes
        |
        v
State Update Requested
        |
        v
React Schedules Rendering
        |
        v
Component Renders Again
        |
        v
New UI Output
        |
        v
Reconciliation
        |
        v
Necessary DOM Updates
        |
        v
Browser Shows Updated UI
```

### One Important Distinction

Rendering and updating the real DOM are not the same thing.

**Rendering:** React calls your component to calculate its next UI output.

**Commit:** React applies the necessary changes to the actual UI environment, such as the browser DOM.

A component can render again even if the resulting DOM does not need to change.

We will study the rendering and commit phases separately.

---

# 10. What Is DOM?

DOM stands for **Document Object Model**.

Let's understand it from the beginning.

Suppose you write this HTML:

```html
<div>
    <h1>Hello</h1>
    <p>Welcome to React</p>
</div>
```

The browser reads this HTML and creates a tree-like representation of the document.

This representation is called the DOM.

### DOM Structure

```text
          div
           |
       +---+---+
       |       |
      h1       p
       |       |
     Hello  Welcome
             to React
```

Think of DOM as a tree where:

- `div` is the parent.
- `h1` and `p` are children.
- Text is contained inside those elements.

JavaScript can interact with these DOM elements.

For example:

```javascript
document.querySelector("h1").innerText = "Hello World";
```

This changes the heading in the real DOM.

### Does React Use the Real DOM?

Yes.

React ultimately updates the real DOM.

But developers generally do not manually find and modify DOM elements for normal React UI updates.

Instead, React manages these updates through its rendering process.

**Important:** React does not completely avoid the real DOM. It helps developers manage DOM updates declaratively.

---

# 11. What Is Reconciliation?

Don't worry if this sounds complicated.

Let's understand it through a simple example.

Imagine you have a document containing:

```text
Name: Rahul
Age: 20
City: Delhi
```

Now you want to change only the city.

New document:

```text
Name: Rahul
Age: 20
City: Mumbai
```

Would you rewrite the entire document?

No.

You only need to change:

```text
Delhi → Mumbai
```

React follows a similar idea when determining the necessary UI updates.

### Example

Previous React output:

```jsx
<>
    <h1>Hello</h1>
    <p>Count: 0</p>
</>
```

New React output:

```jsx
<>
    <h1>Hello</h1>
    <p>Count: 1</p>
</>
```

The heading remains the same.

Only the paragraph's text changes.

React compares the previous and new rendered outputs to determine the necessary updates.

This process is called reconciliation.

### Simple Definition

Reconciliation is the process React uses to compare the previous rendered output with the new output and determine what changes are necessary.

### What Is the Virtual DOM?

You may hear another term: Virtual DOM.

The Virtual DOM is a common way of describing React's in-memory representation of the UI.

React uses its internal element and Fiber structures to manage rendering and updates.

For a beginner, remember:

```text
Previous UI Description
          |
          v
      New UI Description
          |
          v
    React Reconciliation
          |
          v
   Necessary DOM Changes
```

**Important interview distinction:**

- Rendering calculates the new UI.
- Reconciliation determines the necessary changes.
- Commit applies the changes to the actual UI.

React does not necessarily update every DOM element whenever a component renders again.

---

# 12. Is React a Programming Language?

No.

React is not a programming language.

React is a JavaScript library.

We use programming languages such as:

- JavaScript
- TypeScript

to develop React applications.

### Interview Answer

React is not a programming language. It is a JavaScript library used to build user interfaces. We generally write React applications using JavaScript or TypeScript.

---

# 13. What Is JSX?

JSX stands for **JavaScript XML**.

Let's understand why it exists.

Suppose you want to display a heading in React.

You can write:

```jsx
function App() {
    return <h1>Hello React</h1>;
}
```

Notice something?

We are writing HTML-like syntax inside JavaScript.

This syntax is called JSX.

### Why Do We Need JSX?

Imagine writing the same UI without JSX.

```javascript
function App() {

    return React.createElement(
        "h1",
        null,
        "Hello React"
    );

}
```

This works, but writing complex UI using this syntax can become difficult to read.

JSX makes the code easier to understand.

### Important Things to Remember

1. JSX is a syntax extension for JavaScript.
2. It allows us to write HTML-like markup inside JavaScript.
3. JSX is transformed into JavaScript calls that create React elements.
4. JSX is not exactly HTML, even though it looks similar.

### Interview Answer

JSX is a JavaScript syntax extension that allows developers to write HTML-like markup inside JavaScript. It makes React UI code more readable and is transformed into JavaScript that creates React elements.

We will study JSX in a dedicated lesson.

---

# 14. Why Use React Instead of Vanilla JavaScript?

Let's imagine two developers.

Developer A builds a large application using vanilla JavaScript.

Developer B builds the same application using React.

Both can build the application.

So why would someone choose React?

Because React provides an organized approach to building complex user interfaces.

### Main Advantages

**1. Component Reusability**

Create a component once and reuse it in different parts of your application.

**2. Better Code Organization**

Divide large applications into smaller components.

**3. Declarative UI**

Describe the desired UI instead of manually managing every DOM update.

**4. State-Driven Rendering**

React helps synchronize the UI with changing application data.

**5. Ecosystem**

React works with many additional libraries and tools.

**6. Maintainability**

Smaller components are easier to test, understand and modify.

### Interview Answer

React provides a declarative and component-based approach to building user interfaces. It improves code organization and maintainability through reusable components and state-driven rendering. It also provides reconciliation to determine the necessary DOM updates.

---

# 15. Important Interview Questions

### Q1. What is React?

React is a JavaScript library for building user interfaces. It follows a component-based architecture and allows developers to describe the UI based on application state.

### Q2. Is React a library or a framework?

React is technically a JavaScript library because it primarily focuses on the UI layer. Additional libraries are commonly used for routing, data fetching and other application requirements.

### Q3. What are components?

Components are reusable building blocks of a React application. They represent individual parts of the UI.

### Q4. Why do we use components?

Components improve code reusability, organization, maintainability and scalability.

### Q5. What are props?

Props are read-only inputs passed from parent components to child components. They allow components to receive dynamic data.

### Q6. What is declarative programming?

Declarative programming means describing what result we want instead of specifying every individual step required to achieve it.

### Q7. What is state?

State is component-managed data that can change over time and influence the UI. Updating state through its setter schedules a React render.

### Q8. What happens when state changes?

React schedules a render, calls the component to calculate the new UI output, determines the necessary changes and commits the required DOM updates.

### Q9. What is the DOM?

DOM stands for Document Object Model. It is a tree-like representation of an HTML document created by the browser.

### Q10. Does React use the real DOM?

Yes. React ultimately updates the real DOM, but normally manages the updates for developers.

### Q11. What is reconciliation?

Reconciliation is the process of comparing previous and new rendered outputs to determine the necessary UI updates.

### Q12. What is JSX?

JSX is a JavaScript syntax extension that allows developers to write HTML-like markup inside JavaScript.

### Q13. Is React a programming language?

No. React is a JavaScript library, not a programming language.

### Q14. What is the difference between rendering and reconciliation?

Rendering calculates the new UI output by calling components. Reconciliation determines what changes are needed compared with the previous output.

### Q15. Does React update the entire DOM after every render?

No. React determines the necessary changes and applies only the required updates to the DOM.

---

# 16. Complete React Mental Model

Let's connect everything from this lesson.

```text
                    REACT
                      |
              JavaScript Library
                      |
                      v
             Component Architecture
                      |
              +-------+-------+
              |               |
          Components       Reusability
              |               |
              +-------+-------+
                      |
                      v
                    Props
                      |
                      v
               Declarative UI
                      |
                      v
                    State
                      |
                      v
                State Changes
                      |
                      v
                  Rendering
                      |
                      v
                Reconciliation
                      |
                      v
                  DOM Updates
                      |
                      v
                   Browser
```

Remember this connection:

- React is the library.
- Components divide the UI.
- Reusability helps avoid repetition.
- Props provide data to components.
- Declarative programming describes the desired UI.
- State stores changing component data.
- Rendering calculates the new UI.
- Reconciliation determines the necessary changes.
- React commits those changes to the real DOM.

---

# 17. Quick Revision Notes

<small>Use this section when you want to revise the entire lesson in 5–10 minutes before an interview.</small>

## A. One-Line Definitions

| Concept | Quick Definition |
|---|---|
| React | JavaScript library for building UIs |
| Component | Reusable UI building block |
| Props | Read-only data passed to components |
| State | Component-managed changing data |
| JSX | HTML-like syntax inside JavaScript |
| DOM | Tree representation of an HTML document |
| Declarative | Describe WHAT you want |
| Imperative | Describe HOW to do it |
| Rendering | Calculating the component's UI output |
| Reconciliation | Determining necessary UI changes |
| Commit | Applying changes to the actual UI |
| Virtual DOM | In-memory representation of UI |

## B. Important Differences

### Library vs Framework

- Library: Provides specific functionality.
- Framework: Provides a broader structure and controls more of the application flow.

### Imperative vs Declarative

- Imperative: How to achieve something.
- Declarative: What result is required.

### Props vs State

| Props | State |
|---|---|
| Received from parent | Managed by component |
| Read-only to receiving component | Updated using setter |
| Used to pass data | Used to manage changing data |
| Helps component reuse | Helps UI respond to changes |

### Normal Variable vs State

| Normal Variable | State |
|---|---|
| Stores data | Stores data |
| Changes don't trigger React rendering | State updates schedule rendering |
| React doesn't track changes | React manages updates |

## C. Important Code to Remember

**1. Basic Component**

```jsx
function Navbar() {
    return <nav>My Website</nav>;
}
```

**2. Reusing Components**

```jsx
function App() {
    return (
        <>
            <Navbar />
            <Navbar />
        </>
    );
}
```

**3. Passing Props**

```jsx
function User({ name }) {
    return <h2>Hello {name}</h2>;
}

// Usage
<User name="Manav" />
```

**4. Using State**

```jsx
import { useState } from "react";

function Counter() {

    const [count, setCount] = useState(0);

    return (
        <button onClick={() => setCount(count + 1)}>
            Count: {count}
        </button>
    );

}
```

## D. Most Important Interview Answers

**What is React?**

A JavaScript library for building user interfaces using reusable components and state-driven rendering.

**Why React?**

It provides better UI organization, reusability, maintainability and declarative state-driven updates.

**What is reconciliation?**

The process React uses to determine the necessary changes between previous and new rendered outputs.

**Does React use the real DOM?**

Yes. React ultimately updates the real DOM through its rendering and commit process.

**What happens when state changes?**

React schedules a render, calculates the new UI and commits necessary changes.

## E. Remember These 5 Core Ideas

1. React is a JavaScript library, not a programming language.
2. Components are the building blocks of React.
3. Props pass data from parent to child.
4. State represents changing component data.
5. React uses rendering and reconciliation to manage UI updates.

---

# 18. Practice Questions

Don't just read the notes. Try to explain these concepts yourself.

### Conceptual Questions

1. What problem does React solve?
2. Why is React called a library?
3. What is component-based architecture?
4. Why are components reusable?
5. What is the difference between props and state?
6. What is declarative programming?
7. Why don't normal JavaScript variable changes automatically update React UI?
8. What happens after calling a state setter?
9. Does React completely avoid the real DOM?
10. What is reconciliation?
11. What is JSX?
12. What is the difference between rendering and committing?

### Practical Questions

1. Create a Navbar component.
2. Create a reusable ProductCard component.
3. Pass different names to a User component using props.
4. Create a counter using `useState`.
5. Explain how React updates the counter after a button click.

---

# What's Next?

Now we understand what React is, why it exists and how it manages UI at a high level.

Our next lesson will be:

**Lesson 02 — JSX Deep Dive**

We will cover:

1. What exactly is JSX?
2. Why do we need JSX?
3. JSX vs HTML.
4. How JSX works internally.
5. What is `React.createElement()`?
6. How JSX gets converted into JavaScript.
7. JSX rules and important interview questions.

---

*End of Lesson 01 — What Exactly Is React?*

**Suggested filename:** `01-What-Exactly-Is-React.md`

**Revision strategy:** First understand sections 1–14, then prepare interview questions from section 15, and finally use section 17 for quick revision.