Perfect. 🔥 Ab hum useEffect par aate hain.

Ye React interviews ka bahut important aur tricky topic hai. Isko hum bilkul zero se start karenge, phir interviewer-level questions tak jayenge.
🚀 React Lesson 6 — useEffect
1. Sabse pehle: useEffect ki zarurat kyun?
React ka main kaam hai:
State/Props
    ↓
UI

For example:
function Counter() {
    const [count, setCount] = useState(0);

    return <h1>{count}</h1>;
}

React ka kaam yahan simple hai:
State change hui → UI update karo.

Lekin kabhi-kabhi humein UI render hone ke baad koi extra kaam karna hota hai.

For example:
- API se data lana
- Browser document title change karna
- Event listener lagana
- Timer start karna
- Subscription setup karna
- External system ke saath synchronize karna
Ye sab side effects ke examples hain.
2. Side Effect kya hota hai?
Super easy:
Side effect = component ke rendering ke bahar koi external kaam karna.

Example:
document.title = "Hello";

React component ke UI ko return karna ek cheez hai.

Browser ka title change karna doosri cheez hai.

Similarly:
fetch("/api/users");

Ye bhi React UI calculate karne ke alawa ek external operation hai.

So:
Rendering
   ↓
"What should the UI look like?"

Side Effect
   ↓
"UI ke bahar kya kaam karna hai?"

3. useEffect kya karta hai?
useEffect ka basic idea:
React ko batata hai ki render ke baad ek side effect perform karna hai.

Syntax:
useEffect(() => {
    // side effect
});

Example:
useEffect(() => {
    document.title = "Hello";
});

4. Basic example
import { useState, useEffect } from "react";

function Counter() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        document.title = `Count: ${count}`;
    });

    return (
        <button onClick={() => setCount(count + 1)}>
            {count}
        </button>
    );
}

Ab flow dekho:
count = 0
   ↓
Render
   ↓
UI shows 0
   ↓
Effect runs
   ↓
document.title = "Count: 0"

Click:
count = 1
   ↓
Render again
   ↓
UI shows 1
   ↓
Effect runs
   ↓
document.title = "Count: 1"

🔥 5. useEffect ka syntax
Usually:
useEffect(() => {
    // effect
}, [dependencies]);

There are three important cases.
Case 1 — No dependency array
useEffect(() => {
    console.log("Effect");
});

Iska matlab:
Every time component renders, effect runs after the render.

Example:
Initial render
    ↓
Effect

State changes
    ↓
Render
    ↓
Effect

State changes
    ↓
Render
    ↓
Effect

So:
useEffect(() => {
    console.log("Hello");
});

runs after every render.
Case 2 — Empty dependency array []
useEffect(() => {
    console.log("Effect");
}, []);

Now the meaning is:
Run the effect after the initial mount.

Simplified mental model:
Component mounts
      ↓
Render
      ↓
Effect runs

Then state changes:
State changes
      ↓
Render
      ↓
Effect doesn't rerun

Interview answer:
"[] means the effect doesn't depend on any reactive values, so it generally runs after the initial mount."

Small nuance: in development with Strict Mode, you may see setup/cleanup behavior happen more than once. We'll cover that separately.
Case 3 — Dependencies
Suppose:
useEffect(() => {
    console.log(count);
}, [count]);

Meaning:
Run the effect when count changes.

Flow:
Initial render
    ↓
Effect runs

count changes
    ↓
Render
    ↓
Effect runs

count doesn't change
    ↓
Render
    ↓
Effect doesn't run because of count

🧠 Easy way to remember dependency array
No array:
useEffect(() => {});

Every render

Empty array:
useEffect(() => {}, []);

Initial mount

[count]:
useEffect(() => {}, [count]);

When count changes

🔥 Interview Question
"What is the dependency array?"
Answer:
"The dependency array tells React which reactive values the effect depends on. React uses those dependencies to determine whether the effect needs to run again after a render."

6. Why do dependencies exist?
Suppose:
useEffect(() => {
    console.log(count);
}, [count]);

React asks:
"Did count change since the previous render?"

If yes:
Run effect

If no:
Don't rerun this effect because of that dependency.

Conceptually:
Previous count = 5
Current count  = 6

Changed?
YES
 ↓
Run effect

7. useEffect and API calls
One common use:
useEffect(() => {
    fetch("/api/users");
}, []);

Why []?

Because we don't want to fetch repeatedly after every render.

We want the request when the component mounts.

But real applications need loading/error handling and often use dedicated data-fetching approaches. We'll study that later.
8. Cleanup function 🔥
This is extremely important.

Suppose you add an event listener:
useEffect(() => {
    window.addEventListener("resize", handleResize);
}, []);

When the component disappears, you should remove the listener.

Otherwise you can create problems such as stale listeners or unnecessary work.

So:
useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
        window.removeEventListener("resize", handleResize);
    };
}, []);

The function:
return () => {
    ...
};

is called the cleanup function.
9. What does cleanup actually mean?
Think:
Setup
  ↓
"Start something"

Cleanup
  ↓
"Stop/remove that thing"

Examples:
addEventListener
      ↓
removeEventListener

setInterval
      ↓
clearInterval

subscription
      ↓
unsubscribe

🔥 Interview Question
"When does the cleanup function run?"
Important answer:

Cleanup generally runs:
1. Before the effect runs again when dependencies changed.
2. When the component is unmounted.
Example:
useEffect(() => {
    console.log("setup");

    return () => {
        console.log("cleanup");
    };
}, [count]);

Suppose:
count = 0

Initial:
setup

Then count becomes 1:
cleanup
↓
setup

Then count becomes 2:
cleanup
↓
setup

When component disappears:
cleanup

🔥 Very Important Interview Question
"Does cleanup run before every render?"
❌ No.

It runs before the next execution of that effect when its dependencies require it, and when the component unmounts.

This distinction is important.
10. useEffect is NOT for everything
This is where many beginners misuse it.

Suppose:
const fullName = firstName + " " + lastName;

Don't do:
useEffect(() => {
    setFullName(firstName + " " + lastName);
}, [firstName, lastName]);

This is unnecessary.

You can simply calculate:
const fullName = firstName + " " + lastName;

Why?

Because fullName is just derived data.

You don't need an effect.
🧠 Important rule
Use useEffect when you're synchronizing React with something outside React's rendering process.

Examples:
API
Browser API
Event listener
Timer
Subscription
External system

Don't automatically think:
"Something changes → useEffect."

That's a common beginner mistake.
🔥 Interview Question
"When should you use useEffect?"
Strong answer:
"useEffect is used to synchronize a component with external systems or perform side effects after rendering, such as interacting with browser APIs, subscriptions, timers, or network-related operations. It shouldn't be used just to calculate derived values that can be computed during rendering."

That's a much stronger answer than:
"useEffect is used for API calls."

API calls are only one example.
11. useEffect doesn't run during rendering
Think:
Render
  ↓
React determines UI
  ↓
DOM commit
  ↓
Effect

This is an important conceptual distinction.

Don't think:
useEffect
↓
before JSX

The effect is scheduled to run after React commits the relevant DOM updates.
🔥 Interview Trap
Interviewer:
"Does useEffect run before the component renders?"

Answer:
No. useEffect runs after rendering/commit, not before the component's render logic.

12. Why can useEffect cause an infinite loop?
Look:
useEffect(() => {
    setCount(count + 1);
});

There is no dependency array.

Flow:
Render
 ↓
Effect
 ↓
setCount
 ↓
State changes
 ↓
Render
 ↓
Effect
 ↓
setCount
 ↓
Render
 ↓
...

💥 Infinite loop.
13. Another common mistake
useEffect(() => {
    setCount(count + 1);
}, [count]);

Still problematic.

Why?
count changes
 ↓
effect runs
 ↓
setCount
 ↓
count changes
 ↓
effect runs
 ↓
setCount
 ↓
...

So dependency arrays don't automatically prevent loops.

You need to understand what the effect is doing.
🔥 FAANG Interview Question
"Can useEffect cause an infinite render loop?"
Yes.

If the effect updates state and that state update causes one of the effect's dependencies to change, the cycle can continue indefinitely.

Example:
useEffect(() => {
    setCount(count + 1);
}, [count]);

Flow:
count changes
    ↓
effect
    ↓
setCount
    ↓
count changes
    ↓
effect
    ↓
...

14. One of the most important useEffect rules
Don't think:
"Dependency array tells React when to run."

A more accurate mental model is:
"The dependency array describes the reactive values used by the effect, allowing React to determine when the effect needs to be synchronized again."

This distinction becomes important at advanced interview levels.
🎯 Your mental model
Remember this diagram:
             COMPONENT
                 |
                 ↓
               RENDER
                 |
                 ↓
           DOM COMMIT
                 |
                 ↓
             useEffect
                 |
        ┌────────┴────────┐
        ↓                 ↓
      Setup            Cleanup
                          |
                          ↓
                  Before next effect
                  or component unmount

🧪 Interview Drill
Try these yourself before looking up answers:
Q1
What is a side effect?
Q2
What is useEffect?
Q3
What happens if there is no dependency array?
useEffect(() => {
    console.log("Hello");
});

Q4
What does [] mean?
useEffect(() => {
    console.log("Hello");
}, []);

Q5
What does [count] mean?
useEffect(() => {
    console.log(count);
}, [count]);

Q6 🔥
When does the cleanup function execute?
Q7 🔥
Why do we need cleanup?
Q8 🔥
Can useEffect cause an infinite loop?
Q9 🔥
Should we use useEffect to calculate derived values?
Q10 🔥
What's the difference between rendering and an effect?
🏆 Interview-ready answer
If the interviewer asks:
"Explain useEffect."

A strong answer is:
"useEffect is a React Hook used to synchronize a component with external systems and perform side effects after React commits the render. It accepts an effect function and optionally a dependency array. React reruns the effect when its dependencies change, and the effect can return a cleanup function that runs before the effect is re-executed or when the component unmounts."

That's a genuinely good interview answer.
🔥 One final thing
Don't memorize only:
[] → once
[count] → when count changes
no array → every render

That's useful for beginners, but for a FAANG-level interview, you need to understand why.

The deeper mental model is:
Render
 ↓
React commits UI
 ↓
Effect synchronizes with external system
 ↓
Dependencies change?
 ↓
Cleanup old synchronization
 ↓
Run new synchronization

And that deeper understanding is what we'll build throughout the course.


---

# 16. Understanding `useEffect` from the Render Level — Why Does It Run Automatically?

This section continues the lesson with the exact confusion that often happens when learning `useEffect`.

## Part 1 — How did `useEffect` run by itself?

Look at this code:

```jsx
function Counter() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        document.title = `Count: ${count}`;
    });

    return (
        <button onClick={() => setCount(count + 1)}>
            {count}
        </button>
    );
}
```

The confusion is:

> "Humne toh sirf `setCount()` call kiya. `useEffect()` ko dobara call hi nahi kiya. Toh effect kaise chal gaya?"

**Answer:** `setCount()` requests a state update. React renders the component again, and React's effect lifecycle runs the effect after the relevant render has been committed.

### Step 1 — When `Counter` runs for the first time

React calls:

```jsx
Counter()
```

Inside the component:

```jsx
const [count, setCount] = useState(0);
```

So:

```text
count = 0
```

Then React reaches:

```jsx
useEffect(() => {
    document.title = `Count: ${count}`;
});
```

You are essentially telling React:

> "React, jab ye render complete ho jaye, ye effect chala dena."

Then this JSX is rendered:

```jsx
<button>0</button>
```

After React commits the UI, the sequence is:

```text
Render
  ↓
DOM commit / UI update
  ↓
useEffect runs
```

So the first time:

```text
Count = 0
Browser title = Count: 0
```

### Step 2 — The user clicks the button

The button is:

```jsx
<button onClick={() => setCount(count + 1)}>
```

Current value:

```text
count = 0
```

So the click calls:

```jsx
setCount(0 + 1);
```

Which means:

```jsx
setCount(1);
```

React receives a state update request and renders `Counter` again.

### Step 3 — `Counter` runs again

This is VERY important.

React renders the component again. In this new render:

```text
count = 1
```

React reaches the `useEffect` call again:

```jsx
useEffect(() => {
    document.title = `Count: ${count}`;
});
```

React registers/schedules the effect for after the render is committed.

Then:

```text
Render
  ↓
DOM commit / UI update
  ↓
useEffect
  ↓
document.title = "Count: 1"
```

### The most important point

**`setCount` does NOT directly call `useEffect`.**

Wrong mental model:

```text
setCount()
   ↓
useEffect()
```

Correct mental model:

```text
setCount()
   ↓
State update requested
   ↓
React re-renders Counter
   ↓
React reaches the useEffect call
   ↓
React schedules the effect according to its dependencies
   ↓
Render/commit completes
   ↓
Effect runs when React's effect lifecycle says it should
```

### A real-life analogy

Imagine a teacher tells you:

> "Har baar jab tum class mein enter karo, attendance dena."

You enter the class:

```text
Enter class
  ↓
Attendance
```

Then you leave and come back:

```text
Enter class
  ↓
Attendance again
```

You don't manually tell the teacher, "Attendance lo." The rule is already set.

Similarly, `useEffect` tells React what effect should be run after a relevant render.

---

# 17. `useEffect` with `[count]` — Is This an Infinite Loop?

Consider:

```jsx
useEffect(() => {
    console.log(count);
}, [count]);
```

The question is:

> "Now tell me, this is the loop rendering toh iska solution kya hai?"

**Important correction: This code by itself is NOT an infinite loop.**

The effect only logs the value:

```text
effect
  ↓
console.log(count)
  ↓
DONE
```

The effect is not changing state. Therefore, it does not request another render.

Flow:

```text
Render
  ↓
Effect
  ↓
console.log
  ↓
END
```

No loop.

## When does an infinite loop happen?

When the effect updates state in a way that causes the effect to run again.

For example:

```jsx
useEffect(() => {
    setCount(count + 1);
}, [count]);
```

Let's dry-run it.

Initial render:

```text
count = 0
```

Effect runs:

```jsx
setCount(1);
```

State changes, so React renders again:

```text
Render
  ↓
count = 1
  ↓
Effect runs
  ↓
setCount(2)
```

Again, state changes:

```text
Render
  ↓
count = 2
  ↓
Effect
  ↓
setCount(3)
```

And it continues:

```text
3 → 4 → 5 → 6 → ...
```

This is an infinite loop.

### Why does it happen?

You created a circle:

```text
count changes
    ↓
effect runs
    ↓
effect changes count
    ↓
count changes
    ↓
effect runs
    ↓
effect changes count
    ↓
(repeats)
```

## So what is the solution?

It depends on why you are changing the state.

### Case 1 — You only want to log `count`

Use:

```jsx
useEffect(() => {
    console.log(count);
}, [count]);
```

This is fine. No state update means no loop from this effect.

### Case 2 — You want to increment `count`

You probably do not need an effect. The user action itself should update the count:

```jsx
<button onClick={() => setCount(count + 1)}>
    {count}
</button>
```

Don't do this:

```jsx
useEffect(() => {
    setCount(count + 1);
}, [count]);
```

That creates the loop described above.

### Case 3 — You want to synchronize the browser title

Use:

```jsx
useEffect(() => {
    document.title = `Count: ${count}`;
}, [count]);
```

Why is this a good use of an effect?

Because you are synchronizing React state with an external browser API:

```text
React state
   ↓
Browser document.title
```

### Case 4 — You want to calculate something

Don't do:

```jsx
useEffect(() => {
    setDouble(count * 2);
}, [count]);
```

Instead:

```jsx
const double = count * 2;
```

Why? `double` is derived data. It can be calculated directly during rendering.

## Very important React principle

Don't think:

> "Whenever something changes, useEffect."

Instead ask:

> "Do I need to synchronize React with something outside React?"

Examples include:

- Browser title
- Browser APIs
- Event listeners
- Timers
- Subscriptions
- External systems

A console log can be useful for learning/debugging, although logging alone usually isn't a reason to structure application logic around an effect.

---

# 18. Cleanup — The Simplest Possible Meaning

Cleanup can feel confusing at first. Let's understand it at a very basic level.

**Cleanup = "jo kaam start kiya tha, usko band/undo karna."**

Think:

```text
START SOMETHING
      ↓
   EFFECT
      ↓
CLEANUP = STOP IT
```

## Part 1 — The `setInterval` example

Look at this code:

```jsx
useEffect(() => {
    const timer = setInterval(() => {
        console.log("Hello");
    }, 1000);

    return () => {
        clearInterval(timer);
    };
}, []);
```

Let's understand it line by line.

### Step 1 — `useEffect`

```jsx
useEffect(() => {

}, []);
```

Simple meaning:

> "React, component render/commit hone ke baad andar wala kaam karna."

### Step 2 — `setInterval`

```jsx
const timer = setInterval(() => {
    console.log("Hello");
}, 1000);
```

`setInterval` is a JavaScript function.

It means:

> "Har 1000 milliseconds ke baad ye kaam repeat karo."

Remember:

```text
1000 milliseconds = 1 second
```

So this runs every second:

```jsx
console.log("Hello");
```

Output:

```text
Hello
Hello
Hello
Hello
Hello
...
```

### Step 3 — What is `timer`?

This line:

```jsx
const timer = setInterval(...);
```

`setInterval` returns an ID/handle for that particular interval.

So, roughly:

```text
setInterval()
     ↓
timer ID / handle
```

We store that ID in:

```jsx
timer
```

Think:

> `timer` = "is particular interval ka ID"

We need this ID later to stop that interval.

### Step 4 — What does `return () => {}` mean?

Look at:

```jsx
return () => {
    clearInterval(timer);
};
```

This is not a value being returned for the component's screen.

When you return a function from the effect callback, React treats that function as the **cleanup function**.

You are telling React:

> "React, jab is effect ko clean karna ho, ye function chala dena."

### Step 5 — `clearInterval(timer)`

```jsx
clearInterval(timer);
```

Meaning:

> "Is timer ko STOP kar do."

Complete story:

```text
Component renders and commits
      ↓
useEffect runs
      ↓
setInterval starts
      ↓
Hello
Hello
Hello
Hello
      ↓
Cleanup runs at the appropriate lifecycle point
      ↓
clearInterval(timer)
      ↓
Timer stops
```

### A real-life analogy — TV

Imagine you turn on a TV:

```text
TV ON
  ↓
TV keeps running
```

When you leave, you turn it off:

```text
TV OFF
```

In this example:

```text
setInterval()
     ↓
TV ON

clearInterval()
     ↓
TV OFF
```

And:

```text
useEffect
     ↓
TV ON karne ka setup

cleanup
     ↓
TV OFF karna
```

## But `[]` is present. When does cleanup run?

Good question.

With an empty dependency array, the effect is not re-run because of changing dependencies. In the normal lifecycle, the cleanup runs when the component unmounts.

Common lifecycle:

```text
Component appears
      ↓
Effect runs
      ↓
Timer starts
      ↓
Component stays
      ↓
Timer keeps running
      ↓
Component disappears
      ↓
Cleanup runs
      ↓
Timer stops
```

## What does "component disappears" mean?

Suppose you use React Router:

```text
Home
About
```

The Home page has a timer.

You navigate:

```text
Home → About
```

The Home component is removed from the UI. This is called **unmounting**.

At that point, React runs the cleanup for the Home component's effect.

Then:

```jsx
clearInterval(timer);
```

stops the timer.

---

# 19. Cleanup — The `resize` Event Listener Example

Now look at:

```jsx
useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
        window.removeEventListener("resize", handleResize);
    };
}, []);
```

First, understand `window`.

In the browser, `window` is the global object representing the browser window.

## Step 1 — `addEventListener`

```jsx
window.addEventListener("resize", handleResize);
```

Simple meaning:

> "Browser window jab resize ho, `handleResize` function chala dena."

For example, when you make the browser bigger:

```text
Window resize
      ↓
handleResize()
```

When you make it smaller:

```text
Window resize
      ↓
handleResize()
```

## Step 2 — What is `handleResize`?

Suppose:

```jsx
function handleResize() {
    console.log("Window resized");
}
```

Then:

```jsx
window.addEventListener("resize", handleResize);
```

means:

> "Browser, jab resize event aaye, `handleResize` ko call kar dena."

### A simple event-listener analogy

Imagine you tell a security guard:

> "Jab bhi koi person gate par aaye, mujhe bata dena."

There are three parts:

- Event: A person arrives.
- Listener: Listen for that event.
- Function: What to do when the event happens.

In the React example:

```text
Event    = resize
Listener = listen for resize
Function = handleResize
```

## Step 3 — Cleanup

Now:

```jsx
return () => {
    window.removeEventListener("resize", handleResize);
};
```

Meaning:

> "Ab resize event ko listen karna band kar do."

Remember:

```text
addEventListener
       ↓
START LISTENING

removeEventListener
       ↓
STOP LISTENING
```

### A real-life analogy — Security guard

You tell a security guard:

> "Jab bhi koi guest aaye mujhe call karna."

That's like `addEventListener`.

Later, you leave the building and tell the guard:

> "Ab mujhe call mat karna."

That's like `removeEventListener`.

That's cleanup.

## Both examples teach the same concept

| Setup / Start | Cleanup / Stop |
|---|---|
| `setInterval()` | `clearInterval()` |
| `addEventListener()` | `removeEventListener()` |
| `subscribe()` | `unsubscribe()` |
| `connect()` | `disconnect()` |

Cleanup does not have one fixed command.

It simply means:

> "Jo external kaam effect ne start kiya tha, usko properly stop/remove karna."

---

# 20. The Biggest Thing About Cleanup

Cleanup is not magic.

It is simply a function:

```jsx
return () => {
    // jo cleanup karna hai
};
```

You tell React:

> "Jab is effect ko clean karna ho, ye function chala dena."

For a timer:

```jsx
return () => {
    clearInterval(timer);
};
```

For an event listener:

```jsx
return () => {
    window.removeEventListener("resize", handleResize);
};
```

Different cleanup code. Same concept.

## Full timer code — line by line

```jsx
useEffect(() => {
    const timer = setInterval(() => {
        console.log("Hello");
    }, 1000);

    return () => {
        clearInterval(timer);
    };
}, []);
```

| Code | Easy meaning |
|---|---|
| `useEffect(() => {` | Render/commit ke baad effect ka setup run karo. |
| `const timer = setInterval(() => {` | A repeating timer start karo. |
| `console.log("Hello");` | Timer ke andar ye kaam karo. |
| `}, 1000);` | Har 1 second mein. |
| `return () => {` | Ye cleanup function hai. |
| `clearInterval(timer);` | Jo timer start kiya tha, usko stop karo. |
| `};` | Cleanup function khatam. |
| `}, []);` | Effect ki dependency array empty hai. |

## Full resize code — line by line

```jsx
useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
        window.removeEventListener("resize", handleResize);
    };
}, []);
```

| Code | Easy meaning |
|---|---|
| `useEffect(() => {` | Render/commit ke baad effect setup run karo. |
| `window.addEventListener("resize", handleResize);` | Browser window resize hone ko listen karo. |
| `return () => {` | Cleanup function. |
| `window.removeEventListener("resize", handleResize);` | Resize event ko listen karna band karo. |
| `};` | Cleanup end. |
| `}, []);` | Empty dependency array. |

---

# 21. How Do You Know When to Run Cleanup?

A very common question is:

> "Mujhe kaise pata chalega ki ab kaam band karna hai?"

**You normally don't decide when React calls cleanup. React manages the timing.**

You write and return the cleanup function. React calls it at the appropriate time.

```jsx
return () => {
    // jo kaam band karna hai
};
```

You are telling React:

> "Jab is effect ko clean karna ho, ye function chala dena."

## A real-life room example

Imagine you enter a room:

```text
Room mein enter
      ↓
Fan ON
```

When you leave:

```text
Room se leave
      ↓
Fan OFF
```

You don't manually check every second whether you should turn off the fan. Leaving the room is the signal.

In React:

```text
Component becomes active
      ↓
Effect runs
      ↓
Timer ON
```

And:

```text
Component is removed
      ↓
Cleanup
      ↓
Timer OFF
```

## Example — Removing a component with state

Suppose your app is:

```jsx
function App() {
    return <Counter />;
}
```

The `Counter` is on the screen.

Now let's add a condition so the user can remove it:

```jsx
function App() {
    const [show, setShow] = useState(true);

    return (
        <>
            <button onClick={() => setShow(false)}>
                Remove Counter
            </button>

            {show && <Counter />}
        </>
    );
}
```

Initially:

```text
show = true
```

So:

```text
Counter exists
     ↓
Effect runs
     ↓
Timer starts
```

Now the user clicks the button:

```text
show = false
```

The condition:

```jsx
{show && <Counter />}
```

no longer renders `Counter`.

React removes the `Counter` component from the UI. This is unmounting.

React then runs the cleanup:

```jsx
return () => {
    clearInterval(timer);
};
```

The timer stops.

## Two important situations when cleanup happens

### 1. The component is being removed

```text
Component
   ↓
REMOVE / UNMOUNT
   ↓
Cleanup
```

Example: navigating from Home to About removes the Home component, so its effect cleanup runs.

### 2. The effect needs to run again because dependencies changed

Suppose:

```jsx
useEffect(() => {
    console.log("Setup");

    return () => {
        console.log("Cleanup");
    };
}, [count]);
```

Initially:

```text
count = 0
```

Effect runs:

```text
Setup
```

Then `count` changes to `1`.

React runs the old cleanup before the new setup:

```text
count changes to 1
      ↓
Cleanup old effect
      ↓
Setup new effect
```

Then `count` changes to `2`:

```text
Cleanup
   ↓
Setup
```

And when the component unmounts:

```text
Component removed
      ↓
Cleanup
```

## Why does React do this?

Imagine an effect creates a connection to an external system:

```text
React component
      ↓
Connected to something
```

Now a dependency changes. Maybe the old connection is no longer the correct one.

So React does:

```text
OLD CONNECTION
      ↓
Cleanup old connection
      ↓
NEW CONNECTION
      ↓
Setup new connection
```

This is why cleanup happens before the next effect setup when dependencies change.

---

# 22. When Is Cleanup Actually Necessary?

Whenever you write an effect, ask yourself:

> "Kya maine effect ke andar koi aisi cheez START ki hai jo baad mein STOP/REMOVE karni padegi?"

If yes, cleanup is likely needed.

Examples:

| Started in the effect | Cleanup |
|---|---|
| `setInterval()` | `clearInterval()` |
| `addEventListener()` | `removeEventListener()` |
| `subscribe()` | `unsubscribe()` |
| `connect()` | `disconnect()` |

## Does every effect need cleanup?

**No!**

For example:

```jsx
useEffect(() => {
    document.title = `Count: ${count}`;
}, [count]);
```

Here, we are simply changing the browser title.

We did not start:

- A timer
- An event listener
- A subscription
- A connection

There is no ongoing resource here that needs to be stopped, so cleanup is not needed for this example.

The rule is:

```text
Effect = setup / start / synchronize

Cleanup = stop / remove / undo
```

---

# 23. Important Interview Questions About Cleanup

## Q1. What is the cleanup function in `useEffect`?

**Answer:**

> "A cleanup function is the function returned from an effect. It is used to undo or stop whatever external work the effect started, such as clearing a timer or removing an event listener. React runs the cleanup before the effect runs again when dependencies change, and when the component unmounts."

## Q2. When does cleanup happen?

**Answer:**

> "React runs the cleanup when the component unmounts, and before the effect runs again when its dependencies change."

## Q3. How do you know what to clean up?

**Answer:**

> "I clean up the external resources or subscriptions that the effect created—for example, clearing an interval that I started or removing an event listener that I added."

## Q4. Does cleanup run before every render?

**Answer:**

**No.**

It runs before the next execution of that effect when its dependencies require it, and when the component unmounts.

## Q5. Does every effect need cleanup?

**No.** Cleanup is needed when the effect sets up an ongoing resource or process that must be stopped, removed, or undone. A simple browser-title update does not need cleanup.

---

# 24. A Very Important Clarification About `[]` and Strict Mode

Earlier, we used the simplified statement:

```text
[] → runs once
```

For interviews, don't blindly say this.

More accurately:

> `[]` means the effect has no declared reactive dependencies, so React does not re-run it because those dependencies changed. In normal production lifecycle, it runs after the initial mount. In development Strict Mode, React may intentionally perform an extra setup/cleanup cycle to help find bugs.

This is why you may sometimes see setup and cleanup happen more than once while developing.

We'll cover Strict Mode separately.

---

# 25. Final Mental Models — Connect Everything

## A. State change and effect

Remember:

```text
STATE CHANGES
      ↓
RENDER
      ↓
DOM COMMIT
      ↓
EFFECT
      ↓
External synchronization / work
```

`setCount()` does not directly call `useEffect`.

Correct distinction:

```text
setCount()
   ↓
Requests a state update
   ↓
Can cause a re-render
   ↓
React follows the effect lifecycle
   ↓
Effect runs after the relevant commit
```

## B. Effect setup and cleanup

```text
             useEffect
                 |
          ┌──────┴──────┐
          ↓             ↓
        Setup         Cleanup
        START          STOP
```

## C. Dependency change

```text
Old effect setup
      ↓
Dependency changes
      ↓
Cleanup old effect
      ↓
Setup new effect
```

## D. Component unmount

```text
Component appears
      ↓
Effect setup
      ↓
Component stays active
      ↓
Component removed
      ↓
Cleanup
```

## E. Infinite loop versus normal effect

A normal logging effect:

```jsx
useEffect(() => {
    console.log(count);
}, [count]);
```

Flow:

```text
count changes
   ↓
render
   ↓
effect
   ↓
console.log
   ↓
DONE
```

No state update, so this effect does not create a render loop by itself.

A state-updating effect:

```jsx
useEffect(() => {
    setCount(count + 1);
}, [count]);
```

Flow:

```text
count changes
   ↓
effect
   ↓
setCount
   ↓
count changes
   ↓
effect
   ↓
setCount
   ↓
(repeats)
```

This can create an infinite loop.

---

# 26. Complete `useEffect` Interview Drill

Try these yourself before looking up answers.

### Basic

1. What is a side effect?
2. What is `useEffect`?
3. Why do we need `useEffect`?
4. What happens if there is no dependency array?
5. What does `[]` mean?
6. What does `[count]` mean?
7. What is the dependency array?
8. Does `useEffect` run before or after the component's render logic?
9. What is the difference between rendering and an effect?

### Intermediate

10. Why does `useEffect` run after calling `setCount()` even though we did not manually call it again?
11. Does `useEffect(() => console.log(count), [count])` create an infinite loop?
12. Can `useEffect` cause an infinite render loop?
13. Why can `setCount(count + 1)` inside an effect with `[count]` cause a loop?
14. Should we use `useEffect` to calculate derived values?
15. When should we use `useEffect`?
16. What is a cleanup function?
17. Why do we need cleanup?
18. Does every effect need cleanup?

### Advanced / Interview-level

19. When does the cleanup function execute?
20. Does cleanup run before every render?
21. What happens to an effect when its dependencies change?
22. Why does React clean up an old effect before setting up the new one?
23. What is the difference between effect setup and cleanup?
24. Why should we remove event listeners?
25. Why should we clear intervals?
26. What does unmounting mean?
27. What happens to a component's effect when the component unmounts?
28. What is the more accurate meaning of an empty dependency array?
29. What extra setup/cleanup behavior may happen in development Strict Mode?

---

# 27. Final Interview-Ready Answers

## "Explain `useEffect`."

> "`useEffect` is a React Hook used to synchronize a component with external systems and perform side effects after React commits the render. It accepts an effect function and optionally a dependency array. React re-runs the effect when its dependencies change, and the effect can return a cleanup function that runs before the effect is re-executed or when the component unmounts."

## "When should you use `useEffect`?"

> "I use `useEffect` when I need to synchronize React with something outside React's rendering process, such as browser APIs, subscriptions, timers, or external systems. I don't use it just to calculate derived values that can be computed during rendering."

## "Why does `useEffect` run after `setCount()`?"

> "`setCount` requests a state update. React can render the component again with the new state. During that render React encounters the effect declaration, and the effect runs according to its dependency rules after the relevant commit. The setter does not directly call the effect."

## "Can `useEffect` cause an infinite loop?"

> "Yes. If an effect updates state, and that state update changes a dependency of the same effect, React can repeatedly render and run the effect."

## "What is cleanup in `useEffect`?"

> "A cleanup function is returned from the effect. It undoes or stops the external work set up by that effect, such as clearing a timer, removing an event listener, or unsubscribing. React runs it before setting up the effect again when dependencies change and when the component unmounts."

## "When does cleanup run?"

> "Cleanup runs before the effect's next setup when its dependencies change, and when the component unmounts. It does not run before every render."

---

# 28. The One-Page Revision Sheet

Keep this quick revision at the end of the lesson.

| Pattern | Easy meaning |
|---|---|
| `useEffect(() => {})` | Effect runs after every commit (when the component commits a render). |
| `useEffect(() => {}, [])` | No reactive dependencies; normally runs after initial mount. |
| `useEffect(() => {}, [count])` | Re-synchronizes when `count` changes. |
| `return () => {}` | Return a cleanup function. |
| `setInterval()` | Start repeating timer. |
| `clearInterval()` | Stop timer. |
| `addEventListener()` | Start listening for an event. |
| `removeEventListener()` | Stop listening for that event. |

### Remember these five rules

1. **Render:** React calculates what the UI should look like.
2. **Effect:** Synchronize with something outside React after the relevant commit.
3. **Dependencies:** Tell React which reactive values the effect uses.
4. **Cleanup:** Undo the previous setup before the next setup when dependencies change, or when the component unmounts.
5. **Avoid unnecessary effects:** Calculate derived values during rendering instead of storing them in extra state and synchronizing them with an effect.

### The most important distinction

```text
STATE UPDATE
    ↓
RE-RENDER
    ↓
COMMIT
    ↓
EFFECT (according to dependencies)
```

```text
EFFECT SETUP
    ↓
External work starts
    ↓
Cleanup at the appropriate lifecycle point
    ↓
External work stops / is removed
```

**Final one-line memory trick:**

> Effect starts or synchronizes something. Cleanup stops, removes, or undoes the setup when React needs to clean it up.

And remember: `useEffect` is not simply "run code whenever something changes." Its deeper purpose is synchronizing a React component with external systems.
