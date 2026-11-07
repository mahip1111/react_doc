# React --- Event Handling

## Beginner-to-Advanced Notes (Interview Preparation)

> **Learning goal:** Understand how React responds to user actions, how
> event handlers work, what the event object contains, how to read input
> values, and how React controls inputs through state. These notes
> combine the complete lesson and the slower, beginner-friendly
> follow-up explanations. Repeated explanations have been merged, while
> unique concepts, analogies, examples, and interview points are
> retained.

------------------------------------------------------------------------

## Table of Contents

1.  [What Is an Event?](#1-what-is-an-event)
2.  [Handling an Event in React](#2-handling-an-event-in-react)
3.  [The Important Difference: `handleClick` vs
    `handleClick()`](#3-the-important-difference-handleclick-vs-handleclick)
4.  [A Simple Real-Life Analogy](#4-a-simple-real-life-analogy)
5.  [Using an Inline Arrow Function](#5-using-an-inline-arrow-function)
6.  [Events and State Updates](#6-events-and-state-updates)
7.  [What Is the Event Object?](#7-what-is-the-event-object)
8.  [`event.target`](#8-eventtarget)
9.  [Input Events and `onChange`](#9-input-events-and-onchange)
10. [`event.target.value`](#10-eventtargetvalue)
11. [Controlled Inputs / Controlled
    Components](#11-controlled-inputs--controlled-components)
12. [Controlled Input: Line-by-Line
    Explanation](#12-controlled-input-line-by-line-explanation)
13. [Why Is It Called Controlled?](#13-why-is-it-called-controlled)
14. [Why Are Controlled Inputs
    Useful?](#14-why-are-controlled-inputs-useful)
15. [Using a Controlled Input in a
    Form](#15-using-a-controlled-input-in-a-form)
16. [Form Submission and `onSubmit`](#16-form-submission-and-onsubmit)
17. [`event.preventDefault()`](#17-eventpreventdefault)
18. [Event Handler Naming
    Convention](#18-event-handler-naming-convention)
19. [Event Propagation and Bubbling](#19-event-propagation-and-bubbling)
20. [`event.stopPropagation()`](#20-eventstoppropagation)
21. [Common Event Handler Patterns](#21-common-event-handler-patterns)
22. [Common Mistakes](#22-common-mistakes)
23. [Interview Questions and
    Answers](#23-interview-questions-and-answers)
24. [Final Mental Models](#24-final-mental-models)
25. [Mini Test and Practice](#25-mini-test-and-practice)
26. [Quick Revision Cheat Sheet](#26-quick-revision-cheat-sheet)

------------------------------------------------------------------------

## 1. What Is an Event?

Browser mein jab user kuch karta hai, usse **event** kehte hain.

Examples:

  User action            Event
  ---------------------- --------------------
  Click a button         Click event
  Type in an input       Input/change event
  Move the mouse         Mouse event
  Submit a form          Submit event
  Press a keyboard key   Keyboard event

Real life:

> Tumne button dabaya → **event hua**.

Think of an event as the browser telling the application:

> "Hey! The user just did something."

## 2. Handling an Event in React

Suppose:

``` jsx
function App() {
  function handleClick() {
    console.log("Button clicked");
  }

  return (
    <button onClick={handleClick}>
      Click Me
    </button>
  );
}
```

Yahan:

``` jsx
onClick={handleClick}
```

ka matlab:

> **"Jab button click ho, `handleClick` function chala dena."**

Let's understand this code slowly.

### Step 1 --- Button

``` jsx
<button>
  Click Me
</button>
```

Screen par button dikhega:

``` text
┌─────────────┐
│  Click Me   │
└─────────────┘
```

### Step 2 --- User button click karta hai

User ne button par click kiya.

``` text
User ne click kiya
        |
        v
      EVENT
```

Is click ko React event handler ke through handle kar sakta hai.

### Step 3 --- Function banate hain

``` jsx
function handleClick() {
  console.log("Button clicked");
}
```

Is function ke andar humne likha:

``` js
console.log("Button clicked");
```

Matlab:

> Jab button click ho, ye kaam karna.

### Step 4 --- `onClick`

``` jsx
<button onClick={handleClick}>
  Click Me
</button>
```

Iska simple meaning:

> **"React, jab is button par click ho, `handleClick` function chala
> dena."**

### Complete flow

``` text
User
  |
  v
Button click karta hai
  |
  v
Click event hota hai
  |
  v
React dekhta hai onClick
  |
  v
handleClick function chalta hai
  |
  v
"Button clicked"
```

## 3. The Important Difference: `handleClick` vs `handleClick()`

Ye dono **same nahi hain**.

### Correct: Pass the function

``` jsx
<button onClick={handleClick}>
  Click Me
</button>
```

Meaning:

> Function ko React ko **de rahe ho**. React baad mein click hone par
> call karega.

In simple terms:

``` text
handleClick
    |
    v
React ko function de diya
    |
    v
User clicks
    |
    v
React function call karta hai
```

### Usually wrong: Call the function immediately

``` jsx
<button onClick={handleClick()}>
  Click Me
</button>
```

Meaning:

> `handleClick()` ko **abhi isi waqt execute kar do**.

The function runs while React is rendering the component, not when the
user clicks. Its return value is then used as the handler, which is
usually not what you intended.

So normally write:

``` jsx
onClick={handleClick}
```

not:

``` jsx
onClick={handleClick()}
```

### A simple analogy

Restaurant mein waiter ko bolo:

> "Jab pizza ready ho, mujhe bula dena."

Tum waiter ko **instruction** de rahe ho.

``` text
handleClick
    |
    v
React ko function de diya
    |
    v
Click hoga
    |
    v
React function call karega
```

But if you say:

> "Abhi mujhe bulao."

That's like calling the function immediately:

``` js
handleClick();
```

Another analogy:

> "Jab main clap karun, room ki light on kar dena."

This is an instruction for later:

``` jsx
onClick={handleClick}
```

But:

> "Abhi light on kar do."

This is immediate execution:

``` js
handleClick();
```

## 4. A Simple Real-Life Analogy

Think of React as someone waiting for an instruction.

``` text
onClick={handleClick}
```

means:

> "When the click happens, run this function."

It does not mean:

> "Run this function right now."

This is the main idea to understand before moving to the event object.

## 5. Using an Inline Arrow Function

You can also write an arrow function directly inside the event handler:

``` jsx
<button
  onClick={() => {
    console.log("Clicked");
  }}
>
  Click
</button>
```

Yahan arrow function React ko di gayi hai.

Click hone par:

``` text
click
  |
  v
() => { ... }
  |
  v
console.log("Clicked")
```

This is useful when you want to write a small piece of logic directly in
the JSX or pass an argument to a handler.

Example:

``` jsx
function App() {
  function handleDelete(id) {
    console.log("Delete user:", id);
  }

  return (
    <button onClick={() => handleDelete(101)}>
      Delete
    </button>
  );
}
```

Here, the arrow function is passed as the handler. When the button is
clicked, it calls `handleDelete(101)`.

## 6. Events and State Updates

You have already seen this pattern:

``` jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      {count}
    </button>
  );
}
```

Flow:

``` text
User clicks
     |
     v
onClick
     |
     v
setCount(count + 1)
     |
     v
state changes
     |
     v
React re-renders
     |
     v
new count appears
```

This is a very important React flow:

> **User action → event handler → state update → re-render → updated
> UI.**

The event handler does not directly change the displayed text. It
requests a state update; React then renders the UI using the new state.

## 7. What Is the Event Object?

Now an interview-level concept.

Suppose:

``` jsx
function App() {
  function handleClick(event) {
    console.log(event);
  }

  return (
    <button onClick={handleClick}>
      Click Me
    </button>
  );
}
```

Ab question:

> Kya React humein ye bhi bata sakta hai ki click ke baare mein
> information kya thi?

**Yes.** React passes an event object to the event handler.

### Super-simple meaning

> **Event object = event ke baare mein information ka packet.**

Tumne button click kiya. Browser/React ke paas information hoti hai,
jaise:

-   Kis element par event hua?
-   Mouse ki position kya thi?
-   Kaunsa event hua?
-   Keyboard event mein kaunsi key press hui?

This information can be accessed through the event object, depending on
the event.

### Understand the parameter

``` jsx
function handleClick(event) {
  console.log(event);
}
```

Here, `event` is a normal JavaScript parameter name. React supplies the
event information when it calls the handler.

You could call it `e` too:

``` jsx
function handleClick(e) {
  console.log(e);
}
```

Both are fine.

Flow:

``` text
User clicks
     |
     v
React invokes handler
     |
     v
handleClick(event)
     |
     v
event ke andar click ki information
```

## 8. `event.target`

Very important.

``` jsx
function App() {
  function handleClick(event) {
    console.log(event.target);
  }

  return (
    <button onClick={handleClick}>
      Click Me
    </button>
  );
}
```

Agar button click karoge, `event.target` generally clicked DOM element
ko represent karega.

Conceptually:

``` text
event
  |
  v
target
  |
  v
jis element par event hua
```

In this example, `event.target` will generally be the button element.

### Super-simple meaning

> **`event.target` = "Maine kis element par event trigger kiya?"**

### Real-life analogy

Imagine tumhare college mein koi bolta hai:

> "Kisi student ne bell bajayi."

Tum poochte ho:

> "Kaunse student ne bell bajayi?"

Event object tumhe information dega.

``` text
event
  |
  v
target
  |
  v
jis element ne event trigger kiya
```

### Small extra distinction: `target` vs `currentTarget`

These two are useful to know:

-   `event.target` is the element where the event originally happened.
-   `event.currentTarget` is the element whose handler is currently
    running.

For a simple button click, they are often the same. They can differ when
an event bubbles from a child to a parent. We will see bubbling later in
these notes.

## 9. Input Events and `onChange`

Ab real React input ki taraf chalte hain.

``` jsx
function App() {
  function handleChange(event) {
    console.log(event.target);
  }

  return (
    <input onChange={handleChange} />
  );
}
```

Tum input mein type karte ho:

``` text
Hello
```

`onChange` handler runs when the input value changes.

Flow:

``` text
User types
    |
    v
onChange
    |
    v
handleChange(event)
    |
    v
event.target
    |
    v
<input> element
```

Because the event happened on the input, `event.target` refers to that
input element.

## 10. `event.target.value`

Ab ek aur step.

Input:

``` jsx
<input onChange={handleChange} />
```

Function:

``` jsx
function handleChange(event) {
  console.log(event.target.value);
}
```

Tum type karte ho:

``` text
H
```

Output:

``` text
H
```

Tum type karte ho:

``` text
He
```

Output:

``` text
He
```

Tum type karte ho:

``` text
Hello
```

Output:

``` text
Hello
```

So:

``` text
event
  |
  v
target
  |
  v
input
  |
  v
value
  |
  v
input ke andar jo current text hai
```

### Super-simple meaning

``` text
event.target
= "Kaunsa element?"

event.target.value
= "Us input element ki current value kya hai?"
```

More precisely, `.value` is useful on form elements such as text inputs
and textareas. It gives the current value of that form control.

### Mini input example

``` jsx
function App() {
  function handleChange(event) {
    console.log(event.target.value);
  }

  return (
    <input onChange={handleChange} />
  );
}
```

If you type `React`, then `event.target.value` gives:

``` text
React
```

## 11. Controlled Inputs / Controlled Components

Ab React ka extremely important concept.

Naam bada hai, concept **bahut simple** hai.

Pehle ek normal input dekho:

``` jsx
function App() {
  return (
    <input />
  );
}
```

Tum input mein likh sakte ho:

``` text
Hello
```

In this simple example, the browser manages the input's current value
internally. React is not explicitly controlling it through a state
variable.

### Ab React ko value sambhalne do

Hum state banayenge:

``` jsx
const [name, setName] = useState("");
```

Now:

``` text
name
 |
 v
React ke paas current value
```

Suppose:

``` text
name = "Manav"
```

React ke state mein `"Manav"` stored hai.

### Complete code

``` jsx
import { useState } from "react";

function App() {
  const [name, setName] = useState("");

  return (
    <div>
      <input
        value={name}
        onChange={(event) => {
          setName(event.target.value);
        }}
      />

      <h1>{name}</h1>
    </div>
  );
}

export default App;
```

This is called a:

# Controlled Component / Controlled Input

> **A controlled input is an input whose value is controlled by React
> state.**

## 12. Controlled Input: Line-by-Line Explanation

Let's understand the code slowly.

### Step 1 --- State

``` jsx
const [name, setName] = useState("");
```

Initially:

``` text
name = ""
```

Matlab input ki value initially empty string hai.

-   `name` = current state value.
-   `setName` = function used to request an update to that state.
-   `useState("")` = initial value is an empty string.

### Step 2 --- `value={name}`

``` jsx
<input value={name} />
```

Iska simple meaning:

> **"Input ki value React ke `name` state se aayegi."**

Initially:

``` text
name = ""
     |
     v
input = ""
```

Agar:

``` text
name = "Manav"
```

toh:

``` text
name
 |
 v
"Manav"
 |
 v
input mein Manav
```

React state is the source of truth for this input's value.

### Step 3 --- User type karta hai

Suppose user types:

``` text
M
```

Then this handler runs:

``` jsx
onChange={(event) => {
  setName(event.target.value);
}}
```

`event.target.value` will be:

``` text
"M"
```

So React calls:

``` js
setName("M");
```

### Step 4 --- State update

Ab state update request hoti hai:

``` text
name = "M"
```

React re-renders the component.

Phir:

``` jsx
value={name}
```

means the input receives the updated value:

``` text
value = "M"
```

Input mein `M` dikhega.

### Full flow

``` text
User types
    |
    v
onChange
    |
    v
event.target.value
    |
    v
setName(...)
    |
    v
name state changes
    |
    v
React re-renders
    |
    v
value={name}
    |
    v
Input updated
```

This is the central controlled-input flow.

## 13. Why Is It Called Controlled?

Because **React input ko control kar raha hai.**

### Normal input (uncontrolled)

``` text
Browser
   |
   v
Input ki value manage karta hai
```

A basic input without a React `value` prop manages its current value in
the DOM.

### Controlled input

``` text
React State
     |
     v
Input ki value
```

React state decides what value the input should display.

So:

> **Controlled input = input ki value React state ke control mein hai.**

### Real-life analogy: Remote-control car

**Normal input:**

``` text
Car ← Remote nahi
```

Car khud chal rahi hai; browser manages the value.

**Controlled input:**

``` text
React State
     |
     v
   Remote
     |
     v
   Input
```

React decide kar raha hai input ki value kya hogi.

## 14. Why Are Controlled Inputs Useful?

Because ab React ko input ki value **pata hai**.

Example:

``` jsx
<h1>{name}</h1>
```

Agar user type kare:

``` text
Manav
```

React ke paas:

``` text
name = "Manav"
```

hai.

So React easily kar sakta hai:

``` jsx
<p>Hello {name}</p>
```

Output:

``` text
Hello Manav
```

Controlled inputs are useful because React can:

-   Display the current input value elsewhere in the UI.
-   Validate input as the user types.
-   Disable or enable a button based on the input.
-   Clear the input after submission.
-   Keep multiple UI elements in sync with the same state.
-   Decide exactly what value is shown in the input.

## 15. Using a Controlled Input in a Form

Example:

``` jsx
import { useState } from "react";

function App() {
  const [email, setEmail] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    console.log(email);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={email}
        onChange={(event) => {
          setEmail(event.target.value);
        }}
      />

      <button type="submit">
        Submit
      </button>
    </form>
  );
}
```

User types:

``` text
manav@gmail.com
```

State:

``` text
email = "manav@gmail.com"
```

Submit:

``` js
console.log(email);
```

gives:

``` text
manav@gmail.com
```

That's why controlled inputs are so useful.

## 16. Form Submission and `onSubmit`

Suppose:

``` jsx
<form onSubmit={handleSubmit}>
```

User form submit karega:

``` text
Submit
  |
  v
onSubmit
  |
  v
handleSubmit
```

Example:

``` jsx
function App() {
  function handleSubmit(event) {
    event.preventDefault();

    console.log("Form submitted");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input />

      <button type="submit">
        Submit
      </button>
    </form>
  );
}
```

When the user submits the form, the `handleSubmit` function runs.

The button's `type="submit"` makes it submit the form.

## 17. `event.preventDefault()`

Browser ka default form behavior hota hai ki form submit hone par page
reload ya navigation ho sakti hai, depending on the form setup.

React apps mein hum often nahi chahte ki normal browser submission se
page reload ho.

So:

``` js
event.preventDefault();
```

means:

> **Browser ka default action rok do.**

Flow:

``` text
Submit
  |
  v
Browser ka default behavior
  |
  v
preventDefault()
  |
  v
Default behavior STOP
  |
  v
React apna submit logic chala sakta hai
```

### Interview question

**Q: `preventDefault()` kyun use karte ho?**

Answer:

> **"It prevents the browser's default behavior for an event. For
> example, in a form submission, it can prevent the page from reloading
> so that React can handle the submission logic itself."**

### Important distinction

-   `preventDefault()` stops the browser's default action.
-   `stopPropagation()` stops the event from continuing to propagate
    through the event tree.

They do different jobs.

## 18. Event Handler Naming Convention

Usually:

``` jsx
function handleClick() {}
function handleChange() {}
function handleSubmit() {}
function handleDelete() {}
```

Convention:

``` text
handle + Event/Action
```

This is not compulsory, but it is a common and readable professional
convention.

Common React event props include:

  React prop       Used for
  ---------------- -------------------------
  `onClick`        Click
  `onChange`       Form value change
  `onSubmit`       Form submission
  `onMouseEnter`   Mouse enters an element
  `onMouseLeave`   Mouse leaves an element
  `onKeyDown`      Key is pressed down
  `onKeyUp`        Key is released

React event prop names use camelCase, such as `onClick`, rather than
lowercase HTML-style `onclick`.

## 19. Event Propagation and Bubbling

Ab ek important interview topic.

Suppose:

``` jsx
<div onClick={() => console.log("DIV")}>
  <button onClick={() => console.log("BUTTON")}>
    Click
  </button>
</div>
```

Tum button click karte ho.

Output generally:

``` text
BUTTON
DIV
```

Why?

Because event **bubble** karta hai parent ki taraf.

### Event bubbling

Imagine:

``` text
DIV
 ^
 |
BUTTON
```

Button click:

``` text
BUTTON
   |
   v
 DIV
```

The event starts at the element where it happened and then propagates
upward through its ancestors. This upward propagation is called:

# Event Bubbling

### Interview-ready answer

**Q: What is event bubbling?**

> **"Event bubbling is when an event triggered on a child element
> propagates upward through its parent elements, allowing their event
> handlers to run as well."**

## 20. `event.stopPropagation()`

Agar tum nahi chahte event parent tak jaaye:

``` jsx
function handleButtonClick(event) {
  event.stopPropagation();
}
```

Example:

``` jsx
<div onClick={() => console.log("DIV")}>
  <button
    onClick={(event) => {
      event.stopPropagation();
      console.log("BUTTON");
    }}
  >
    Click
  </button>
</div>
```

Now output:

``` text
BUTTON
```

Only the button handler runs in this example. The event does not bubble
to the parent `div` handler.

### Interview-ready answer

**Q: How do you stop event bubbling?**

> **"We can call `event.stopPropagation()` inside the event handler."**

### `preventDefault()` vs `stopPropagation()`

  -----------------------------------------------------------------------
  Method                              What it does
  ----------------------------------- -----------------------------------
  `event.preventDefault()`            Prevents the browser's default
                                      action

  `event.stopPropagation()`           Stops the event from propagating to
                                      ancestor handlers
  -----------------------------------------------------------------------

For example:

-   Prevent a form's default page navigation/reload →
    `preventDefault()`.
-   Stop a button click from triggering a parent click handler →
    `stopPropagation()`.

## 21. Common Event Handler Patterns

### Pattern 1 --- Named handler

``` jsx
function App() {
  function handleClick() {
    console.log("Clicked");
  }

  return <button onClick={handleClick}>Click</button>;
}
```

Use this when the handler has enough logic to deserve its own function.

### Pattern 2 --- Inline arrow function

``` jsx
<button onClick={() => console.log("Clicked")}>
  Click
</button>
```

Useful for short logic.

### Pattern 3 --- Pass an argument

``` jsx
function App() {
  function handleDelete(id) {
    console.log("Deleting:", id);
  }

  return (
    <button onClick={() => handleDelete(101)}>
      Delete
    </button>
  );
}
```

### Pattern 4 --- Read an input value

``` jsx
function handleChange(event) {
  console.log(event.target.value);
}
```

### Pattern 5 --- Update state from an event

``` jsx
const [name, setName] = useState("");

<input
  value={name}
  onChange={(event) => setName(event.target.value)}
/>
```

### Pattern 6 --- Handle a form submit

``` jsx
function handleSubmit(event) {
  event.preventDefault();
  console.log("Submitted");
}
```

## 22. Common Mistakes

### Mistake 1: Calling the handler during render

Usually incorrect:

``` jsx
<button onClick={handleClick()}>
  Click
</button>
```

Correct:

``` jsx
<button onClick={handleClick}>
  Click
</button>
```

### Mistake 2: Forgetting to update state in a controlled input

This input has a `value` prop but no change handler:

``` jsx
<input value={name} />
```

If `name` is a state value, the input is effectively read-only unless
you update that state through a handler. For an editable controlled
input, use:

``` jsx
<input
  value={name}
  onChange={(event) => setName(event.target.value)}
/>
```

### Mistake 3: Confusing `target` and `value`

``` jsx
event.target
```

means the element.

``` jsx
event.target.value
```

means the current value of a form element.

### Mistake 4: Forgetting `preventDefault()` in a form handler

If you want to handle submission in React without the browser's normal
form navigation/reload, call:

``` jsx
event.preventDefault();
```

### Mistake 5: Using `stopPropagation()` when you mean `preventDefault()`

They are not interchangeable.

-   `preventDefault()` stops the default browser action.
-   `stopPropagation()` stops propagation to ancestor event handlers.

## 23. Interview Questions and Answers

### Q1. What is an event in React?

> "An event represents an action such as a click, typing in an input, or
> submitting a form. React lets us respond to these actions by attaching
> event handlers like `onClick`, `onChange`, and `onSubmit`."

### Q2. What's the difference between `onClick={handleClick}` and `onClick={handleClick()}`?

> "`onClick={handleClick}` passes the function reference, so React can
> call it when the click happens. `onClick={handleClick()}` calls the
> function immediately while rendering, which is usually not intended."

### Q3. What is an inline event handler?

> "An inline event handler is a function, often an arrow function,
> written directly in JSX as the event handler."

Example:

``` jsx
<button onClick={() => console.log("Clicked")}>
  Click
</button>
```

### Q4. What is the event object?

> "The event object contains information about the event, such as the
> target element and event-specific details. React passes it to the
> event handler."

### Q5. What is `event.target`?

> "`event.target` refers to the DOM element where the event originally
> occurred."

### Q6. What is `event.target.value`?

> "It gives the current value of the target form element, commonly used
> to read what a user typed into an input."

### Q7. What is a controlled component in React?

> **"A controlled component is a form element whose value is controlled
> by React state. The input gets its value from state, and user changes
> update that state through an event handler."**

Example:

``` jsx
<input
  value={name}
  onChange={(e) => setName(e.target.value)}
/>
```

### Q8. Why do we use controlled inputs?

> "Controlled inputs keep the input value in React state. This lets us
> validate the value, use it elsewhere in the UI, enable or disable
> buttons based on it, and control what the input displays."

### Q9. What does `preventDefault()` do?

> "It prevents the browser's default action for an event. For example,
> in a form submission, it can prevent the page from reloading so that
> React can handle the submission logic itself."

### Q10. What is event bubbling?

> "Event bubbling is when an event triggered on a child element
> propagates upward through its parent elements, allowing their event
> handlers to run as well."

### Q11. How do you stop event bubbling?

> "We can call `event.stopPropagation()` inside the event handler."

### Q12. What is the difference between `preventDefault()` and `stopPropagation()`?

> "`preventDefault()` prevents the browser's default action.
> `stopPropagation()` stops the event from continuing to propagate to
> ancestor elements."

## 24. Final Mental Models

### Model 1 --- Basic event flow

Remember this:

``` text
USER ACTION
    |
    v
  EVENT
    |
    v
onClick / onChange / onSubmit
    |
    v
HANDLER FUNCTION
    |
    v
maybe setState()
    |
    v
RE-RENDER
    |
    v
UPDATED UI
```

Example:

``` jsx
<button onClick={handleClick}>
  Click Me
</button>
```

means:

``` text
User clicks
    |
    v
Click event
    |
    v
onClick
    |
    v
handleClick()
    |
    v
Function logic runs
```

### Model 2 --- Event object

``` text
event
  |
  v
target
  |
  v
element where event happened
```

For an input:

``` text
event
  |
  v
target
  |
  v
input element
  |
  v
value
  |
  v
current text in the input
```

### Model 3 --- Controlled input

``` text
                USER
                  |
                  v
              types "A"
                  |
                  v
              onChange
                  |
                  v
       event.target.value
                  |
                  v
            setName("A")
                  |
                  v
          React state changes
                  |
                  v
             re-render
                  |
                  v
            value={name}
                  |
                  v
            INPUT = "A"
```

### Model 4 --- Controlled vs uncontrolled

``` text
Uncontrolled:
Browser/DOM → manages current input value

Controlled:
React state → supplies input value
User change → event handler → updates React state
```

### Golden lines

-   `onClick={handleClick}` = click hone par `handleClick` chalao.
-   `event.target` = jis element par event hua.
-   `event.target.value` = form element ki current value.
-   Controlled input = state controls the input.
-   `preventDefault()` = browser ka default action roko.
-   `stopPropagation()` = event ko parent handlers tak bubble hone se
    roko.

## 25. Mini Test and Practice

Try to answer these before looking at the answers.

### Practice 1 --- When does the function run?

``` jsx
<button onClick={handleClick}>
  Click
</button>
```

Does `handleClick` run immediately or when the button is clicked?

**Answer:** When the button is clicked. React receives the function
reference.

### Practice 2 --- What is wrong here?

``` jsx
<button onClick={handleClick()}>
  Click
</button>
```

**Answer:** The function is called immediately during rendering.
Usually, pass the function reference instead:

``` jsx
<button onClick={handleClick}>
  Click
</button>
```

### Practice 3 --- What is `event.target`?

``` jsx
function handleClick(event) {
  console.log(event.target);
}
```

If this handler is attached to a button and the button itself is
clicked, what does `event.target` refer to?

**Answer:** The button DOM element.

### Practice 4 --- What does `event.target.value` return?

``` jsx
function handleChange(event) {
  console.log(event.target.value);
}
```

If the user has typed `React` into the input, what is printed?

**Answer:**

``` text
React
```

### Practice 5 --- Controlled input flow

What happens when the user types `M` into this input?

``` jsx
const [name, setName] = useState("");

<input
  value={name}
  onChange={(event) => setName(event.target.value)}
/>
```

**Answer:**

1.  The input changes and `onChange` runs.
2.  `event.target.value` is `"M"`.
3.  `setName("M")` requests a state update.
4.  React re-renders.
5.  `value={name}` supplies `"M"` to the input.

### Practice 6 --- Why use `preventDefault()`?

**Answer:** To stop the browser's default action, such as normal form
submission navigation/reload, when React should handle the submission.

### Practice 7 --- Predict the output

``` jsx
<div onClick={() => console.log("DIV")}>
  <button onClick={() => console.log("BUTTON")}>
    Click
  </button>
</div>
```

If the button is clicked, what is the usual output?

**Answer:**

``` text
BUTTON
DIV
```

The event bubbles from the button to the parent `div`.

### Practice 8 --- Stop bubbling

How can you make the previous example log only `BUTTON` when the button
is clicked?

**Answer:**

``` jsx
<div onClick={() => console.log("DIV")}>
  <button
    onClick={(event) => {
      event.stopPropagation();
      console.log("BUTTON");
    }}
  >
    Click
  </button>
</div>
```

### Practice 9 --- Explain a controlled component

Try explaining it in one sentence.

**Expected answer:**

> "A controlled component is a form element whose value is driven by
> React state, and user changes update that state through an event
> handler."

## 26. Quick Revision Cheat Sheet

  -------------------------------------------------------------------------------
  Concept                 Simple meaning          Example
  ----------------------- ----------------------- -------------------------------
  Event                   A user/browser action   Click, typing, submit

  Event handler           Function that responds  `handleClick`
                          to an event             

  `onClick`               Runs a handler when     `onClick={handleClick}`
                          clicked                 

  Function reference      Pass the function for   `onClick={handleClick}`
                          later                   

  Function call           Execute immediately     `handleClick()`

  Inline handler          Function written        `onClick={() => ...}`
                          directly in JSX         

  Event object            Information about the   `function handleClick(event)`
                          event                   

  `event.target`          Element where event     Button or input
                          originated              

  `event.target.value`    Current value of a form `"Hello"`
                          element                 

  Controlled input        Input value comes from  `value={name}`
                          React state             

  `onChange`              Responds to input value `onChange={handleChange}`
                          changes                 

  `onSubmit`              Responds to form        `onSubmit={handleSubmit}`
                          submission              

  `preventDefault()`      Stops the default       Prevent normal form navigation
                          browser action          

  Event bubbling          Event propagates from   Button click reaches parent
                          child to ancestors      

  `stopPropagation()`     Stops propagation to    `event.stopPropagation()`
                          ancestors               

  Re-render               React renders UI using  `setCount(...)`
                          updated state           
  -------------------------------------------------------------------------------

### The most important code patterns

``` jsx
// 1. Named click handler
function handleClick() {
  console.log("Clicked");
}

<button onClick={handleClick}>Click</button>
```

``` jsx
// 2. Inline handler
<button onClick={() => console.log("Clicked")}>
  Click
</button>
```

``` jsx
// 3. Read an input value
function handleChange(event) {
  console.log(event.target.value);
}

<input onChange={handleChange} />
```

``` jsx
// 4. Controlled input
const [name, setName] = useState("");

<input
  value={name}
  onChange={(event) => setName(event.target.value)}
/>
```

``` jsx
// 5. Handle form submission
function handleSubmit(event) {
  event.preventDefault();
  console.log("Form submitted");
}

<form onSubmit={handleSubmit}>
  <button type="submit">Submit</button>
</form>
```

``` jsx
// 6. Stop event bubbling
<button
  onClick={(event) => {
    event.stopPropagation();
    console.log("Button");
  }}
>
  Click
</button>
```

------------------------------------------------------------------------

## Lesson Complete

You have covered **React Event Handling** from beginner to interview
level:

-   What events are
-   `onClick`, `onChange`, and `onSubmit`
-   Passing a function reference vs calling a function
-   Inline arrow functions
-   Updating state from an event
-   The event object
-   `event.target` and `event.target.value`
-   Controlled inputs and why they are useful
-   Form submission and `preventDefault()`
-   Event bubbling and `stopPropagation()`
-   Common mistakes, interview questions, and practice problems

### The core flow to remember

``` text
User action
    |
    v
Event handler
    |
    v
Read event information
    |
    v
Update state if needed
    |
    v
React re-renders
    |
    v
Updated UI
```

**Next topic:** Forms + form submission + multiple inputs. We'll build a
proper React login form and use these concepts together, one step at a
time.
