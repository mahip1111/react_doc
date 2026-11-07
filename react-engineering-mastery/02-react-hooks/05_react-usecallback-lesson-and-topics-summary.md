# React --- useCallback Complete Notes + Topics Covered

> These notes combine the complete `useCallback` lesson with the React
> topics summary. The `useCallback` explanation is kept detailed and
> beginner-friendly. At the end, there is a concise checklist of the
> other topics already covered.

------------------------------------------------------------------------

# Part 1 --- Understanding `useCallback` Slowly

## 1. First, understand a normal function

``` jsx
function sayHello() {
  console.log("Hello");
}
```

This is a function.

Think of it like this:

``` text
sayHello
   |
   v
 function
```

Now imagine defining this function inside a React component:

``` jsx
function App() {
  function sayHello() {
    console.log("Hello");
  }

  return <button>Click</button>;
}
```

## 2. What happens during a React re-render?

Consider this component:

``` jsx
function App() {
  const [count, setCount] = useState(0);

  function sayHello() {
    console.log("Hello");
  }

  return (
    <button onClick={() => setCount(count + 1)}>
      {count}
    </button>
  );
}
```

Initial render:

``` text
App renders
    |
    v
sayHello function is created
```

Then the user clicks the button:

``` text
count changes
    |
    v
App renders again
    |
    v
sayHello is created again
```

The same thing can happen on later renders too.

## 3. But the function's code is the same. Why is it new?

Good question!

The code is the same:

``` jsx
function sayHello() {
  console.log("Hello");
}
```

But JavaScript creates a new function value when that function
definition runs again during another render. That new function can have
a different **reference**.

### What is a function reference?

A reference is the identity of a particular function value.

Imagine two pens with the same design:

``` text
Pen A ✏️       Pen B ✏️
```

They look the same, but they are two different pens.

Similarly, two functions can have the same code but different
references:

``` jsx
const first = () => console.log("Hello");
const second = () => console.log("Hello");

console.log(first === second); // false
```

So remember:

> Same function code does not necessarily mean the same function
> reference.

## 4. What does `useCallback` do?

``` jsx
const sayHello = useCallback(() => {
  console.log("Hello");
}, []);
```

In very simple words:

> React, remember this function reference. Reuse it between renders
> while its dependencies have not changed.

Conceptually:

### Normal function

``` text
Render 1 → Function A
Render 2 → Function B
Render 3 → Function C
```

### With `useCallback`

``` text
Render 1 → Function A
Render 2 → Function A
Render 3 → Function A
```

This reuse happens while the dependencies remain unchanged and React
retains the cache.

**This is the main idea of `useCallback`.**

## 5. Compare it with `useMemo`

You already learned that `useMemo` remembers a calculated value.

``` jsx
const result = useMemo(() => {
  return 100 * 100;
}, []);
```

The calculation gives:

``` text
Calculation
    |
    v
  10000
    |
    v
Remember the result
```

Now look at `useCallback`:

``` jsx
const sayHello = useCallback(() => {
  console.log("Hello");
}, []);
```

Here React remembers the function reference:

``` text
Function
   |
   v
Remember the function reference
```

  Hook            What does it remember?
  --------------- -----------------------------------
  `useMemo`       The result/value of a calculation
  `useCallback`   The function reference itself

Examples:

``` jsx
const answer = useMemo(() => 10 + 20, []);
// React can reuse the result: 30

const hello = useCallback(() => {
  console.log("Hello");
}, []);
// React can reuse this function reference
```

## 6. Why do we need to remember a function?

Most of the time, we do not need to!

Creating a new function is usually cheap. The need for a stable function
reference becomes important in certain situations --- especially when
passing a function as a prop to an optimized child component.

## 7. Parent and Child example

Look at this code:

``` jsx
function Child({ onClick }) {
  return <button onClick={onClick}>Child button</button>;
}

function Parent() {
  const [count, setCount] = useState(0);

  function handleClick() {
    console.log("Hello");
  }

  return (
    <>
      <Child onClick={handleClick} />

      <button onClick={() => setCount(count + 1)}>
        {count}
      </button>
    </>
  );
}
```

Here:

``` jsx
<Child onClick={handleClick} />
```

The parent is passing its `handleClick` function to the child as a prop.

``` text
Parent
   |
   | handleClick function
   v
 Child
```

## 8. What happens when the parent re-renders?

Suppose the user clicks the count button:

``` text
count changes
    |
    v
Parent renders again
    |
    v
handleClick is created again
    |
    v
Child receives a new onClick reference
```

Even though the function's code is unchanged, its reference can be
different.

This matters when the child is optimized to compare its props.

## 9. Use `useCallback` here

``` jsx
function Parent() {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    console.log("Hello");
  }, []);

  return (
    <>
      <Child onClick={handleClick} />

      <button onClick={() => setCount(count + 1)}>
        {count}
      </button>
    </>
  );
}
```

Now, as long as the dependencies stay the same, React can reuse the same
`handleClick` reference.

``` text
Parent render 1 → Function A
Parent render 2 → Function A
Parent render 3 → Function A
```

The child receives the same function reference.

### Important correction

`useCallback` by itself does **not** prevent the child from rendering.

The child can still render when its parent renders. To let React skip a
child render when its props have not changed, we can use `React.memo`.
We will learn that separately.

## 10. Dependency array

Now consider:

``` jsx
const handleClick = useCallback(() => {
  console.log(count);
}, [count]);
```

The callback uses `count`, so `count` is included in the dependency
array.

The meaning is:

> When `count` changes, React needs a new callback that sees the updated
> value.

Conceptually:

``` text
count = 0
    |
    v
Function A (sees 0)

count = 1
    |
    v
Dependency changed
    |
    v
Function B (sees 1)

count = 1 again
    |
    v
Dependency unchanged
    |
    v
Reuse Function B
```

If you leave out a reactive value that the callback uses, the callback
may keep seeing an old value. This is called a **stale closure**.

## 11. A real-life analogy

Imagine you have a phone number.

Normal approach:

``` text
Write down the number again every time.
```

`useCallback` idea:

``` text
Keep the number saved
       |
       v
If it has not changed
       |
       v
Reuse the same saved number
```

Similarly:

``` text
Function reference
       |
       v
Remember it
       |
       v
Dependencies unchanged
       |
       v
Reuse the same reference
```

## 12. Understand each part of this code

``` jsx
const handleClick = useCallback(() => {
  console.log("Hello");
}, []);
```

### `const handleClick`

This is the variable name that will hold the function.

### `useCallback(...)`

We are asking React to memoize the function reference.

### `() => { console.log("Hello"); }`

This is the actual callback function.

### `[]`

This is the dependency array. It is empty because this callback does not
use any changing reactive value from the component.

React can reuse the callback reference between renders while the
component remains mounted and the cache is retained.

## 13. `useMemo` vs `useCallback` --- final comparison

### `useMemo`

``` jsx
const result = useMemo(() => {
  return expensiveCalculation(number);
}, [number]);
```

Flow:

``` text
Run calculation
      |
      v
Get result
      |
      v
Remember result
```

### `useCallback`

``` jsx
const handleClick = useCallback(() => {
  console.log("Hello");
}, [number]);
```

Flow:

``` text
Function
   |
   v
Remember function reference
```

A useful technical relationship:

``` jsx
useCallback(fn, dependencies)
```

is conceptually similar to:

``` jsx
useMemo(() => fn, dependencies)
```

But `useCallback` makes the intention clearer when you want to memoize a
function.

## 14. Interview answer

**Question: What is the difference between `useMemo` and
`useCallback`?**

You can answer:

> "`useMemo` memoizes the result of a calculation, whereas `useCallback`
> memoizes the function itself. `useCallback` is mainly useful when we
> need a stable function reference, for example when passing a callback
> to an optimized child component."

## 15. Important things to remember

-   `useCallback` remembers a function reference, not the result of
    calling that function.
-   It does not stop the component that defines the callback from
    re-rendering.
-   It does not automatically stop a child from re-rendering.
-   It is useful when a stable function reference matters.
-   Do not wrap every function in `useCallback`; use it when there is a
    reason.
-   Include the reactive values used by the callback in its dependency
    array.

### Final memory trick

``` text
useMemo      = Remember the VALUE / RESULT
useCallback  = Remember the FUNCTION
```

------------------------------------------------------------------------

# Part 2 --- React Topics We Have Covered So Far

This is the quick revision list of the other React topics covered in our
learning journey.

## 1. React Basics

-   What React is
-   What a component is
-   Functional components
-   JSX
-   HTML elements vs React components
-   Component rendering

## 2. Props

-   What props are
-   Passing data from Parent to Child
-   Reading props
-   The special `key` prop
-   Important: `key` is not an ordinary prop that the child can read
    directly

## 3. State --- `useState`

-   What `useState` is
-   Updating state
-   Re-rendering after a state update
-   State vs normal variables
-   Multiple state updates
-   Functional state update:

``` jsx
setCount((prev) => prev + 1);
```

-   Basic understanding of state batching

## 4. Event Handling

-   `onClick`
-   `onChange`
-   `onSubmit`
-   Event object
-   `event.target`
-   `event.preventDefault()`

## 5. Fragments

-   `<>...</>`
-   Why Fragments are used
-   Avoiding unnecessary wrapper elements in the DOM

## 6. `useEffect`

-   What `useEffect` is
-   When an Effect runs
-   Dependency array
-   Empty dependency array:

``` jsx
useEffect(() => {}, []);
```

-   Effects with dependencies:

``` jsx
useEffect(() => {}, [count]);
```

-   Cleanup function
-   Cleaning up `setInterval`
-   Adding and removing event listeners
-   Basic understanding of infinite Effect loops

## 7. Reconciliation

-   How React compares the previous and next rendered results
-   Re-render vs actual DOM update
-   Why keys matter
-   Why stable keys are important in lists

## 8. `useRef`

-   What `useRef` is
-   `.current`
-   Updating a ref does not itself trigger a re-render
-   Accessing DOM elements
-   Input focus example
-   `useState` vs `useRef`

## 9. `useMemo`

-   Memoization
-   Remembering the result of an expensive calculation
-   Dependency array
-   Avoiding unnecessary recalculations
-   Why `useMemo` should not be used unnecessarily

## 10. `useCallback`

-   Memoizing a function reference
-   What a function reference means
-   Dependency array
-   Parent-to-Child callback example
-   `useMemo` vs `useCallback`

------------------------------------------------------------------------

# Part 3 --- Quick Revision Map

``` text
React
|
+-- Basics
|   +-- Components
|   +-- Functional Components
|   +-- JSX
|
+-- Props
|   +-- Parent to Child
|   +-- key
|
+-- State
|   +-- useState
|   +-- Re-render
|   +-- Functional Updates
|
+-- Events
|   +-- onClick
|   +-- onChange
|   +-- onSubmit
|   +-- preventDefault
|
+-- Fragments
|
+-- useEffect
|   +-- Dependencies
|   +-- Cleanup
|
+-- Reconciliation
|   +-- Keys
|
+-- useRef
|
+-- useMemo
|
+-- useCallback
```

## What is next?

The next major topic is **`React.memo`**.

After learning it, we will connect all three:

  Concept         Simple meaning
  --------------- ------------------------------------------------------
  `useMemo`       Remember a value/result
  `useCallback`   Remember a function reference
  `React.memo`    Can skip a child render when its props are unchanged

That will complete the connection between these three important React
optimization concepts.
