Absolutely. Now we are at one of the **most important React topics for interviews: State and `useState`**. 🔥

Don't worry—I’ll build it from zero and then take it to tricky interviewer questions.

# 🚀 React Lesson 5 — State & `useState`

## 1. First: What is State?

Super simple:

> **State is data that belongs to a component and can change over time.**

For example, a counter:

```
Count = 0
```

User clicks:

```
Count = 1
```

Clicks again:

```
Count = 2
```

The value is changing.

That changing data is **state**.

---

# 2. Why do we need state?

Imagine:

```
function Counter() {
    let count = 0;

    function handleClick() {
        count++;
    }

    return (
        <button onClick={handleClick}>
            Count: {count}
        </button>
    );
}
```

You might think:

> "When `count` becomes 1, the UI should show 1."

But React doesn't work like that.

Changing a normal JavaScript variable:

```
count++;
```

doesn't tell React:

> "Hey React, please update my UI."

That's why we have **state**.

---

# 3. `useState`

React gives us a Hook called:

```
useState
```

Example:

```
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

This is extremely important code.

Let's break it down **piece by piece**.

---

# 4. What does this mean?

```
const [count, setCount] = useState(0);
```

Think:

```
useState(0)
     ↓
React gives us
     ↓
[current value, function to update it]
```

So:

```
count
```

means:

> Current state value.

And:

```
setCount
```

means:

> Function used to request a state update.

And:

```
0
```

means:

> Initial value.

---

# 5. Super simple analogy

Imagine a box:

```
┌─────────────┐
│      0      │
└─────────────┘
```

`count` lets you **look at the value**:

```
count
```

`setCount` lets you **request changing the value**:

```
setCount(1)
```

So:

```
count
 ↓
"What's inside the box?"

setCount()
 ↓
"Please change what's inside the box."
```

---

# 6. What happens when we click?

We have:

```
<button onClick={() => setCount(count + 1)}>
    Count: {count}
</button>
```

Initially:

```
count = 0
```

UI:

```
Count: 0
```

User clicks.

We call:

```
setCount(1)
```

React schedules the state update.

Then React renders the component again with:

```
count = 1
```

UI becomes:

```
Count: 1
```

Then another click:

```
setCount(2)
```

UI:

```
Count: 2
```

---

# 🧠 The most important mental model

Remember:

```
State changes
     ↓
React schedules an update
     ↓
Component renders again
     ↓
React calculates required UI changes
     ↓
DOM gets updated
```

This is the basic state → UI relationship.

---

# 7. State is component-specific

Suppose:

```
function MyButton() {
    const [count, setCount] = useState(0);

    return (
        <button onClick={() => setCount(count + 1)}>
            {count}
        </button>
    );
}
```

And:

```
function App() {
    return (
        <>
            <MyButton />
            <MyButton />
        </>
    );
}
```

You'll get:

```
Button 1 → 0
Button 2 → 0
```

Click Button 1:

```
Button 1 → 1
Button 2 → 0
```

Click Button 1 again:

```
Button 1 → 2
Button 2 → 0
```

Why?

Because **each component instance has its own state**.

This is an excellent interview concept.

---

# 🔥 Interview Question

### "Is state shared between component instances?"

Normally, no.

Each instance gets its own state.

```
MyButton #1
   ↓
count = 2

MyButton #2
   ↓
count = 0
```

They're independent.

---

# 8. State can store different types

State isn't only numbers.

### String

```
const [name, setName] = useState("");
```

### Boolean

```
const [isOpen, setIsOpen] = useState(false);
```

### Array

```
const [items, setItems] = useState([]);
```

### Object

```
const [user, setUser] = useState({
    name: "Manav",
    age: 21
});
```

So state can hold almost any JavaScript value.

---

# 9. Don't directly modify state

Suppose:

```
const [count, setCount] = useState(0);
```

Don't do:

```
count = count + 1;
```

❌

Instead:

```
setCount(count + 1);
```

Why?

Because React needs the state update to go through its update mechanism.

Think:

```
❌ count = 5

"React, I changed something but you don't know."

✅ setCount(5)

"React, please update the state."
```

---

# 🔥 Interview Question

### "Why can't we directly modify state?"

Strong answer:

> **"State should be updated through the setter returned by `useState`. The setter tells React that an update has been requested, allowing React to schedule a new render and update the UI accordingly."**

---

# 10. The setter doesn't immediately change the current variable

🔥🔥 **Very important interview question.**

Look:

```
function Counter() {
    const [count, setCount] = useState(0);

    function handleClick() {
        setCount(count + 1);

        console.log(count);
    }

    return <button onClick={handleClick}>Click</button>;
}
```

What do you think `console.log(count)` prints?

If the current render has:

```
count = 0
```

it prints:

```
0
```

Not `1`.

Why?

Because calling:

```
setCount(count + 1);
```

requests a state update. It doesn't mutate the `count` variable from the current render.

This is one of the most important React mental models.

---

# 11. Think in "renders"

Suppose first render:

```
count = 0
```

React gives this render its own `count` value.

When you call:

```
setCount(1)
```

you're essentially saying:

> "React, I want the next render to have count = 1."

Then React renders again:

```
Second render:

count = 1
```

So think:

```
Render #1
count = 0

       ↓ setCount(1)

Render #2
count = 1

       ↓ setCount(2)

Render #3
count = 2
```

This mental model will help you enormously with advanced React questions.

---

# 🔥 12. The famous `+3` question

Interviewer may show:

```
function Counter() {
    const [count, setCount] = useState(0);

    function handleClick() {
        setCount(count + 1);
        setCount(count + 1);
        setCount(count + 1);
    }

    return <button onClick={handleClick}>{count}</button>;
}
```

And ask:

> **"What happens when I click the button?"**

Many beginners say:

```
3
```

❌ Usually wrong.

The result is:

```
1
```

Why?

Because all three updates are based on the same `count` from the current render.

If:

```
count = 0
```

then all three effectively request:

```
setCount(1)
setCount(1)
setCount(1)
```

So the final result is:

```
1
```

---

# 13. How do we actually increase it by 3?

Use a **functional state update**:

```
function handleClick() {
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
}
```

Now:

```
First update:
0 → 1

Second:
1 → 2

Third:
2 → 3
```

Final:

```
3
```

🔥 This is a **very common interview question**.

---

# 14. What is `prev`?

Here:

```
setCount(prev => prev + 1);
```

`prev` means:

> **The previous/latest state value that React provides to this update.**

So:

```
prev = 0
     ↓
prev + 1
     ↓
1
```

Next update:

```
prev = 1
     ↓
prev + 1
     ↓
2
```

And so on.

The name doesn't matter.

You could write:

```
setCount(previousCount => previousCount + 1);
```

Same thing.

---

# 🔥 Interview Question

### "When should you use functional state updates?"

Answer:

> **"When the new state depends on the previous state, especially when multiple updates may be queued together, I use the functional form such as `setCount(prev => prev + 1)`."**

Excellent interview answer.

---

# 15. State and objects

Suppose:

```
const [user, setUser] = useState({
    name: "Manav",
    age: 21
});
```

Don't do:

```
user.age = 22;
```

❌

Instead:

```
setUser({
    ...user,
    age: 22
});
```

Why?

Because we're creating a new object instead of mutating the existing state object.

You'll learn **immutability** deeply later.

---

# 16. State and arrays

Suppose:

```
const [items, setItems] = useState([]);
```

Don't directly mutate:

```
items.push("Apple");
```

Instead:

```
setItems([...items, "Apple"]);
```

Again:

```
Old array
   ↓
create new array
   ↓
set state
```

---

# 🔥 Props vs State

This is a classic interview question.

| Props                                 | State                                              |
| ------------------------------------- | -------------------------------------------------- |
| Passed into component                 | Managed by component                               |
| Comes from parent                     | Usually local to component                         |
| Read-only from receiver's perspective | Updated through setter/appropriate state mechanism |
| Used to pass information              | Used for changing information                      |
| Parent → child data flow              | Component's changing data                          |

Example:

```
<User name="Manav" />
```

`name` → prop.

```
const [count, setCount] = useState(0);
```

`count` → state.

---

# 🔥 The most important difference

Think:

```
PROPS
Parent says:
"Here is some data for you."

STATE
Component says:
"I need to remember this changing data."
```

---

# 17. Does every variable need to be state?

**No!**

This is a good interview follow-up.

Don't do:

```
const [name, setName] = useState("Manav");
```

if `name` never needs to change.

You can simply use:

```
const name = "Manav";
```

Use state when a value needs to participate in React's update/rendering behavior.

---

# 🔥 Interview Question

### "When should you use state?"

Answer:

> **"I use state when a value can change over time and that change should cause the component's UI or behavior to update."**

---

# 18. State is not necessarily global

Beginners sometimes think:

> "React state means global data."

No.

You can have:

```
Local state
   ↓
inside one component
```

Or state can be shared through patterns such as:

```
Parent state
Context
State management library
Server-state tools
```

We'll study all of these later.

---

# 🧠 Complete mental model

This is what I want permanently in your head:

```
                COMPONENT
                    |
                    ↓
                  STATE
                    |
             useState(...)
                    |
                    ↓
              UI uses state
                    |
                    ↓
               User action
                    |
                    ↓
               setState(...)
                    |
                    ↓
          React schedules update
                    |
                    ↓
              New render
                    |
                    ↓
        UI reflects new state
```

---

# 🔥 FAANG Interview Drill

You should eventually be able to answer these confidently:

### Basic

1. What is state?
2. What is `useState`?
3. What does `useState(0)` return?
4. What is the purpose of the setter?
5. Can state store objects and arrays?

### Intermediate

6. Why shouldn't we directly mutate state?
7. Does changing a normal variable cause a React render?
8. What happens when state changes?
9. Is state shared between component instances?
10. Props vs state?

### Advanced 🔥

11. Why doesn't `setState` immediately change the current state variable?
12. Why does `setCount(count + 1)` three times often result in only `+1`?
13. Why does the functional updater solve that?
14. When should you use a functional updater?
15. Why should objects/arrays in state be treated immutably?
16. What exactly happens after calling a state setter?
17. Does calling a state setter always mean the DOM immediately changes?
18. Why does React batch state updates?

---

# 🏆 Your interview-ready answer

If the interviewer asks:

### "What is `useState`?"

Say:

> **"`useState` is a React Hook that lets a functional component hold state. It returns the current state value and a setter function. When we call the setter, React schedules an update and the component can render again with the updated state."**

If they ask:

### "Why use functional updates?"

Say:

> **"When the next state depends on the previous state, I use the functional updater form, such as `setCount(prev => prev + 1)`. This ensures each update is calculated from the latest state value, which is especially important when multiple updates are queued or batched."**

And if they ask:

### "Why can't you do `count++`?"

Say:

> **"Because directly changing a local state variable doesn't notify React about the update. The setter returned by `useState` is used to request the state update so React can schedule a new render."**

---

## 🎯 One challenge for you

Before we move ahead, try to answer this interviewer question **without looking at the explanation**:

```
function Counter() {
    const [count, setCount] = useState(0);

    function handleClick() {
        setCount(count + 1);
        setCount(count + 1);
        setCount(count + 1);
    }

    return <button onClick={handleClick}>{count}</button>;
}
```

**Question:**

> "When I click the button once, what will `count` become, WHY will it become that value, and how would you modify the code so it becomes `3`?"

This is exactly the kind of question we'll use to train you for interviews.


---

# 19. Important Interview Correction — Why Does `+3` Sometimes Become `+1`?

This section adds an important interview-level clarification to the `useState` lesson.

## First, remember the result

Consider this code:

```jsx
function Counter() {
    const [count, setCount] = useState(0);

    function handleClick() {
        setCount(count + 1);
        setCount(count + 1);
        setCount(count + 1);
    }

    return <button onClick={handleClick}>{count}</button>;
}
```

When you click the button once, the final value becomes:

```text
1
```

The result is correct, but be careful about how you explain the reason.

## The common incorrect explanation

> "The count becomes 1 because React renders only once."

This is not the best explanation. React may batch the updates, but **batching itself is not the fundamental reason the result is 1**.

## The actual reason — all three calls use the same render's value

Suppose the current render has:

```text
count = 0
```

All three lines read that same `count` value from the current render:

```jsx
setCount(count + 1);
setCount(count + 1);
setCount(count + 1);
```

So each line calculates:

```text
0 + 1 = 1
```

React effectively receives:

```jsx
setCount(1);
setCount(1);
setCount(1);
```

Therefore, the final state is:

```text
1
```

### Visual dry run

```text
Current render:
count = 0
    |
    |-- First call:  count + 1 = 1
    |-- Second call: count + 1 = 1
    |-- Third call:  count + 1 = 1
    |
    v
All three calls request the value 1
    |
    v
Final state = 1
```

## The correct solution — functional state updater

When the next state depends on the previous state, use the functional updater:

```jsx
function handleClick() {
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
}
```

Here, React processes the updater functions in sequence. Each updater receives the result of the previous update.

### Step-by-step dry run

```text
Initial state:
count = 0

Update 1:
prev = 0
0 + 1 = 1

Update 2:
prev = 1
1 + 1 = 2

Update 3:
prev = 2
2 + 1 = 3

Final state:
count = 3
```

### Visual mental model

```text
Functional updater:

prev = 0  ->  1
prev = 1  ->  2
prev = 2  ->  3

Final = 3
```

## Interview-ready answer

**Question:** "Why do three `setCount(count + 1)` calls result in 1?"

A strong answer:

> "Because all three updates read the same `count` value from the current render. If `count` is 0, all three calls effectively request `setCount(1)`. React may batch these updates, but batching itself is not the fundamental reason for the result. When the next state depends on the previous state, we should use the functional updater."

Then show:

```jsx
setCount(prev => prev + 1);
```

## One final mental model to remember

```text
Direct value updates:

count = 0
   |
Current render
   |
count + 1 = 1
count + 1 = 1
count + 1 = 1
   |
Final = 1
```

```text
Functional updates:

prev = 0  ->  1
prev = 1  ->  2
prev = 2  ->  3
   |
Final = 3
```

**The key idea:** React state is tied to renders. The `count` variable in a particular render is that render's value; it is not a normal mutable JavaScript variable that changes immediately when you call the setter.

## Quick revision

- `setCount(count + 1)` calculates the next value using the `count` from the current render.
- Repeating that call three times does not automatically add three.
- If the current `count` is `0`, all three calls calculate `1`.
- `setCount(prev => prev + 1)` uses the previous/latest state supplied to each updater.
- Three functional updates take `0 -> 1 -> 2 -> 3`.
- React batching may group updates, but do not explain the `+1` result merely by saying "React renders once."
