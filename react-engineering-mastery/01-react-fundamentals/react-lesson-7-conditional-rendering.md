# React Lesson 7 --- Conditional Rendering

## Beginner-to-Advanced Notes (Interview Preparation)

> **Goal:** Understand how React decides which UI to show, starting from
> the basics and moving toward common interview traps and practical
> patterns.

------------------------------------------------------------------------

## Table of Contents

1.  [What is Conditional Rendering?](#1-what-is-conditional-rendering)
2.  [The Basic Example](#2-the-basic-example)
3.  [Using `if` Statements](#3-using-if-statements)
4.  [The Ternary Operator](#4-the-ternary-operator)
5.  [Conditional Rendering with `&&`](#5-conditional-rendering-with-)
6.  [Why `&&` Works](#6-why--works)
7.  [Ternary vs `&&`](#7-ternary-vs-)
8.  [The Important `0 && ...` Interview
    Trap](#8-the-important-0--interview-trap)
9.  [Correctly Checking a Number Before Using
    `&&`](#9-correctly-checking-a-number-before-using-)
10. [Rendering Nothing with `null`](#10-rendering-nothing-with-null)
11. [Early Returns](#11-early-returns)
12. [Why Early Returns Are Useful](#12-why-early-returns-are-useful)
13. [Handling Multiple UI States](#13-handling-multiple-ui-states)
14. [Avoiding Unnecessarily Nested
    Ternaries](#14-avoiding-unnecessarily-nested-ternaries)
15. [Conditional Rendering Is
    JavaScript](#15-conditional-rendering-is-javascript)
16. [Conditional Rendering Does Not Mean
    Hiding](#16-conditional-rendering-does-not-mean-hiding)
17. [Conditional Rendering vs CSS
    Hiding](#17-conditional-rendering-vs-css-hiding)
18. [Component Mounting, Unmounting, and
    State](#18-component-mounting-unmounting-and-state)
19. [Practical Example: Login UI](#19-practical-example-login-ui)
20. [Practical Example: Loading, Error, and
    Success](#20-practical-example-loading-error-and-success)
21. [Common Mistakes](#21-common-mistakes)
22. [Interview Questions](#22-interview-questions)
23. [Interview-Ready Answers](#23-interview-ready-answers)
24. [Final Mental Model](#24-final-mental-model)
25. [Quick Revision Cheat Sheet](#25-quick-revision-cheat-sheet)
26. [Practice Questions](#26-practice-questions)

------------------------------------------------------------------------

## 1. What is Conditional Rendering?

Super simple:

> **Condition ke according different UI dikhana = Conditional
> Rendering.**

Real-life example:

-   Agar baarish ho rahi hai → Umbrella dikhao.
-   Agar baarish nahi ho rahi hai → Umbrella mat dikhao.

React mein bhi hum condition ke according decide karte hain ki user ko
kya dikhana hai.

For example:

``` jsx
if (isLoggedIn) {
  // user wala UI
}
```

The condition might depend on:

-   Whether a user is logged in.
-   Whether data is still loading.
-   Whether an error occurred.
-   Whether a shopping cart has items.
-   Whether a menu should be visible.
-   Whether a user has permission to see a feature.

**Important:** Conditional rendering is not a special React-only `if`
feature. It uses normal JavaScript logic to decide what JSX is returned.

## 2. The Basic Example

Suppose we have a variable called `isLoggedIn`.

``` jsx
function App() {
  const isLoggedIn = true;

  if (isLoggedIn) {
    return <h1>Welcome Manav</h1>;
  }

  return <h1>Please login</h1>;
}
```

If:

``` js
isLoggedIn = true;
```

Output:

``` text
Welcome Manav
```

If:

``` js
isLoggedIn = false;
```

Output:

``` text
Please login
```

That's conditional rendering.

### Understand the flow

``` text
             isLoggedIn?
              /      \
           true      false
            |          |
       Welcome       Please
        Manav         login
```

The component returns one UI or the other.

## 3. Using `if` Statements

Inside a component, you can use a normal JavaScript `if` statement.

``` jsx
function User({ isLoggedIn }) {
  if (!isLoggedIn) {
    return <h1>Please login</h1>;
  }

  return <h1>Welcome!</h1>;
}
```

Let's understand it:

1.  `isLoggedIn` is received through props.
2.  `!isLoggedIn` means "is the user NOT logged in?"
3.  If that condition is true, the component returns `Please login`.
4.  Otherwise, execution reaches the final return and displays
    `Welcome!`.

Flow:

``` text
isLoggedIn?
   |
   ├── false → Please login
   |
   └── true  → Welcome
```

This is often the clearest approach when the UI logic is more
complicated.

**Remember:** You can use `if` statements in the JavaScript part of a
component, but you cannot directly place a regular `if` statement inside
JSX braces as though it were an expression.

For example, this is not valid JSX:

``` jsx
// Not valid:
return (
  <div>
    {if (isLoggedIn) {
      <h1>Welcome</h1>
    }}
  </div>
);
```

Instead, calculate the result before the `return`, or use a ternary or
`&&` expression inside JSX.

## 4. The Ternary Operator

If the condition is small, the ternary operator is useful.

General syntax:

``` js
condition ? trueValue : falseValue
```

Example:

``` jsx
function App() {
  const isLoggedIn = true;

  return (
    <h1>
      {isLoggedIn ? "Welcome" : "Please login"}
    </h1>
  );
}
```

Meaning:

``` text
isLoggedIn ?
     |
     ├── true  → "Welcome"
     |
     └── false → "Please login"
```

### Real-life example

Question:

> Are you 18 or older?

``` text
age >= 18 ?
     |
     ├── Yes → Adult
     └── No  → Minor
```

JavaScript:

``` jsx
{age >= 18 ? "Adult" : "Minor"}
```

### Ternary can return JSX too

``` jsx
{isLoggedIn ? <Dashboard /> : <Login />}
```

-   If `isLoggedIn` is true, React receives `<Dashboard />`.
-   If `isLoggedIn` is false, React receives `<Login />`.

Use a ternary when you have two possible outcomes and both outcomes
matter.

## 5. Conditional Rendering with `&&`

This is extremely common in React.

Suppose:

> Agar user logged in hai, tab Logout button dikhao.

``` jsx
{isLoggedIn && <button>Logout</button>}
```

Meaning:

``` text
isLoggedIn = true
       |
       v
<button>Logout</button>
```

If:

``` js
isLoggedIn = false;
```

then the expression evaluates to `false`, and React does not display
`false` as visible UI.

So:

``` jsx
{isLoggedIn && <button>Logout</button>}
```

means:

-   `true` → show the Logout button.
-   `false` → show nothing for this expression.

## 6. Why `&&` Works

This is a JavaScript rule.

``` js
true && "Hello"
```

evaluates to:

``` text
"Hello"
```

But:

``` js
false && "Hello"
```

evaluates to:

``` text
false
```

The `&&` operator evaluates from left to right:

-   If the left side is falsy, JavaScript returns that left-side value.
-   If the left side is truthy, JavaScript evaluates and returns the
    right-side value.

React does not render boolean values (`true` and `false`) as visible
text. That's why this pattern works:

``` jsx
{isLoggedIn && <button>Logout</button>}
```

When `isLoggedIn` is true, the right side---the button---is returned.
When it is false, the result is false, which React does not display.

## 7. Ternary vs `&&`

### Ternary

Use when you have **two possible UI outcomes**.

``` jsx
{isLoggedIn ? <Dashboard /> : <Login />}
```

Meaning:

``` text
True  → Dashboard
False → Login
```

### `&&`

Use when you only want:

> **Show this if the condition is true.**

``` jsx
{isLoggedIn && <LogoutButton />}
```

Meaning:

``` text
True → show
False → nothing
```

### Quick comparison

  Situation                           Use
  ----------------------------------- ---------------------------------
  Show A when true and B when false   Ternary
  Show something only when true       `&&`
  Several complex branches            `if` statements / early returns
  Render no UI in a branch            `null`

## 8. The Important `0 && ...` Interview Trap

Look at this:

``` jsx
const count = 0;

return (
  <div>
    {count && <h1>You have items</h1>}
  </div>
);
```

Many beginners think:

> "Nothing will show."

But JavaScript evaluates:

``` js
0 && <h1>...</h1>
```

as:

``` text
0
```

Why?

Because `0` is falsy. With `&&`, JavaScript returns the first falsy
operand rather than automatically returning the boolean `false`.

And React **can render the number `0`**.

So you might see:

``` text
0
```

on the screen.

This is a common React interview trap.

## 9. Correctly Checking a Number Before Using `&&`

If you want to check whether `count` is greater than zero, write:

``` jsx
{count > 0 && <h1>You have items</h1>}
```

Now if:

``` js
count = 0;
```

the condition becomes:

``` js
0 > 0
```

which evaluates to:

``` js
false
```

React does not display that boolean value.

**Rule:** When the left side of `&&` is a number, make the condition
explicit if you intend to check whether the number is positive.

Other safe examples:

``` jsx
{items.length > 0 && <ItemList items={items} />}
{unreadMessages > 0 && <p>You have unread messages.</p>}
```

## 10. Rendering Nothing with `null`

`null` means render nothing in that position.

Example:

``` jsx
function Message({ show }) {
  if (!show) {
    return null;
  }

  return <h1>Hello</h1>;
}
```

If:

``` js
show = false;
```

the component renders:

``` text
nothing
```

`null` is commonly used when you want a component to render no UI.

### Important distinction

Returning `null` does not mean the component function does not exist.
The component can still be part of the React component tree, but it
returns no visible UI. This is different from a parent conditionally
removing the component from its rendered tree.

## 11. Early Returns

This is very common in professional React code.

Compare:

``` jsx
function Dashboard({ user }) {
  if (user) {
    return <h1>Welcome {user.name}</h1>;
  } else {
    return <h1>Loading...</h1>;
  }
}
```

You can write the same logic more directly:

``` jsx
function Dashboard({ user }) {
  if (!user) {
    return <h1>Loading...</h1>;
  }

  return <h1>Welcome {user.name}</h1>;
}
```

This is called an **early return**.

Mental model:

``` text
Invalid condition?
     |
     v
Return early
     |
     v
Stop executing this component function

Otherwise
     |
     v
Render normal UI
```

An early return handles a special case first, before the main UI.

## 12. Why Early Returns Are Useful

Imagine:

``` jsx
function Profile({ user }) {
  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}
```

You don't have to wrap everything inside:

``` js
if (user) {
  // all the profile UI
}
```

The code becomes cleaner and easier to read.

Early returns are especially useful for:

-   Loading states.
-   Error states.
-   Missing data.
-   Authentication checks.
-   Permission checks.
-   Empty or invalid input.

## 13. Handling Multiple UI States

Suppose your screen has three possible states:

1.  Loading
2.  Error
3.  Success

You can do:

``` jsx
function App({ loading, error, data }) {
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Something went wrong.</p>;
  }

  return <p>{data.name}</p>;
}
```

This is much easier to understand than one giant nested ternary.

### Understand the order

``` text
Is loading?
   |
   ├── Yes → Show Loading
   |
   └── No
        |
        v
     Is there an error?
        |
        ├── Yes → Show Error
        |
        └── No → Show Success UI
```

**Practical note:** This simplified example assumes that when loading is
false and there is no error, `data` exists. In a real application, you
may also need to handle missing or empty data.

## 14. Avoiding Unnecessarily Nested Ternaries

Don't do this unnecessarily:

``` jsx
return (
  loading
    ? <Loading />
    : error
      ? <Error />
      : data
        ? <Dashboard />
        : null
);
```

It is technically possible, but as conditions increase, nested ternaries
become difficult to read.

Interview answer:

> **"For simple two-way conditions, ternaries are concise. For multiple
> or complex conditions, early returns or clearer conditional logic are
> generally easier to maintain."**

## 15. Conditional Rendering Is JavaScript

This is important.

React doesn't have some magical `if` mechanism for conditional
rendering.

You are using normal JavaScript:

``` js
if
? :
&&
||
return
```

to decide what JSX should be returned.

For example:

``` jsx
{isLoggedIn && <Dashboard />}
```

is JavaScript logic inside JSX.

The curly braces `{}` let you place a JavaScript expression inside JSX.

### Expression vs statement

This distinction helps explain why ternaries and `&&` work inside JSX:

-   A **JavaScript expression** produces a value. Examples:
    `condition ? A : B`, `condition && A`, `user.name`.
-   A **JavaScript statement** performs an action or controls execution.
    Examples: `if (...) { ... }`, `return ...`, `const x = ...`.

JSX curly braces expect an expression, not a normal `if` statement.

## 16. Conditional Rendering Does Not Mean Hiding

Suppose:

``` jsx
{isLoggedIn && <Dashboard />}
```

and:

``` js
isLoggedIn = false;
```

React isn't necessarily creating:

``` html
<Dashboard style="display:none">
```

Instead, that JSX isn't included in the rendered output for that
condition.

Think:

``` text
Condition true
→ element included in React output

Condition false
→ element not included
```

This distinction matters when comparing conditional rendering with CSS
hiding.

## 17. Conditional Rendering vs CSS Hiding

### Conditional rendering

``` jsx
{show && <Menu />}
```

If `show` is false, the `Menu` component is not included at that
position in the rendered tree.

### CSS hiding

``` css
.menu {
  display: none;
}
```

The element can still exist in the DOM, but it isn't visually displayed.

### Comparison

  -----------------------------------------------------------------------
  Conditional rendering               CSS `display: none`
  ----------------------------------- -----------------------------------
  The element is omitted from the     The element can remain in the DOM
  rendered tree for that condition    

  A component may unmount when        The component remains mounted if
  removed                             only its CSS is changed

  Useful when UI should not be        Useful when the element should
  present at all                      remain present but not be visible
  -----------------------------------------------------------------------

**Important:** CSS visibility choices have different behavior. For
example, `visibility: hidden` hides an element visually but generally
preserves its layout space, while `display: none` removes it from
layout.

## 18. Component Mounting, Unmounting, and State

This connects conditional rendering to React component lifecycle and
state preservation.

Consider:

``` jsx
function App() {
  const [show, setShow] = useState(true);

  return (
    <div>
      <button onClick={() => setShow(!show)}>
        Toggle
      </button>

      {show && <Counter />}
    </div>
  );
}
```

If `show` becomes false:

-   `<Counter />` is removed from the rendered tree.
-   The `Counter` component unmounts.
-   Its local state is not preserved as an active mounted instance.

If it becomes true again:

-   React mounts a new `Counter` instance at that position.
-   Its local state starts from its initial state again.

This is why the interview question matters:

> Does a component remain mounted when its JSX is conditionally removed?

**Answer:** No. When a component is removed from the rendered tree, it
unmounts. If it is later added again, it mounts again, and its local
state is initialized again.

### A subtle but important distinction

Compare these two approaches:

**A. Conditionally remove the component**

``` jsx
{show && <Counter />}
```

When `show` is false, `Counter` unmounts.

**B. Keep the component rendered but hide it with CSS**

``` jsx
<div style={{ display: show ? "block" : "none" }}>
  <Counter />
</div>
```

Here, `Counter` remains mounted because it is still in the React tree.
Its state is preserved while it is hidden.

This is a useful practical distinction when deciding whether hidden UI
should retain its state.

## 19. Practical Example: Login UI

Let's combine the concepts:

``` jsx
function App() {
  const isLoggedIn = true;

  return (
    <div>
      <h1>My App</h1>

      {isLoggedIn ? (
        <>
          <p>Welcome back!</p>
          <button>Logout</button>
        </>
      ) : (
        <>
          <p>Please log in to continue.</p>
          <button>Login</button>
        </>
      )}
    </div>
  );
}
```

What is happening?

1.  The heading is always rendered.
2.  The ternary checks `isLoggedIn`.
3.  If true, the welcome message and Logout button are shown.
4.  If false, the login message and Login button are shown.
5.  The fragments `<>...</>` group multiple JSX elements without adding
    an extra DOM element.

## 20. Practical Example: Loading, Error, and Success

A common real-world screen has different states depending on an API
request.

``` jsx
function UserProfile({ loading, error, user }) {
  if (loading) {
    return <p>Loading user...</p>;
  }

  if (error) {
    return <p>Could not load the user.</p>;
  }

  if (!user) {
    return <p>No user found.</p>;
  }

  return (
    <section>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </section>
  );
}
```

This example adds a missing-data check to the basic
loading/error/success pattern.

The component returns early for each special state. Only when none of
those conditions applies does it render the profile.

## 21. Common Mistakes

### Mistake 1: Using `&&` when the left side can be zero

Potentially problematic:

``` jsx
{items.length && <ItemList items={items} />}
```

If `items.length` is `0`, React may display `0`.

Better:

``` jsx
{items.length > 0 && <ItemList items={items} />}
```

### Mistake 2: Using a ternary when there is no alternative UI

This works:

``` jsx
{isLoggedIn ? <LogoutButton /> : null}
```

But if the false case should simply render nothing, this is shorter:

``` jsx
{isLoggedIn && <LogoutButton />}
```

Both can be correct. Choose the one that communicates the intent most
clearly.

### Mistake 3: Writing deeply nested ternaries

Nested ternaries can make code hard to read. Prefer early returns when
there are several states.

### Mistake 4: Assuming CSS hiding unmounts a component

`display: none` hides an element visually; it does not by itself remove
the component from the React tree.

### Mistake 5: Accessing data before checking that it exists

Potentially unsafe:

``` jsx
function Profile({ user }) {
  return <h1>{user.name}</h1>;
}
```

If `user` is `null` or `undefined`, accessing `user.name` causes an
error.

Safer:

``` jsx
function Profile({ user }) {
  if (!user) {
    return <p>Loading...</p>;
  }

  return <h1>{user.name}</h1>;
}
```

## 22. Interview Questions

### Basic

1.  What is conditional rendering?
2.  How do you use `if` in React?
3.  What is a ternary operator?
4.  How does `&&` conditional rendering work?
5.  What does returning `null` do?

### Intermediate

6.  When would you use ternary vs `&&`?
7.  What is an early return?
8.  Can you use normal JavaScript conditions in JSX?
9.  How do you handle loading/error/success UI?

### Tricky

10. What happens with `0 && <Component />`?
11. Why can `&&` accidentally render `0`?
12. What's the difference between conditional rendering and
    `display: none`?
13. Why can deeply nested ternaries be problematic?
14. Does a component remain mounted when its JSX is conditionally
    removed?
15. What happens to its state when it is removed and later mounted
    again?

That last question connects directly to **component lifecycle and state
preservation**, which are important React topics.

## 23. Interview-Ready Answers

### Q1. What is conditional rendering in React?

> **"Conditional rendering means deciding what UI should be rendered
> based on some condition. React can use normal JavaScript constructs
> such as `if`, ternary operators, and logical operators like `&&` to
> conditionally return or include JSX."**

### Q2. When would you use `&&` instead of a ternary?

> **"I use `&&` when I only need to render something when a condition is
> true and don't need an alternative UI. If I need different UI for both
> true and false cases, I use a ternary or an `if` statement."**

### Q3. What is an early return?

> "An early return handles a special condition at the beginning of a
> component and returns the corresponding UI immediately. It keeps the
> main rendering logic less nested and easier to read."

### Q4. What happens with `0 && <Component />`?

> "In JavaScript, `0` is falsy, so the `&&` expression evaluates to `0`.
> React renders numbers, including zero, as text. Therefore, zero may
> appear on the screen. I would use an explicit check such as
> `count > 0 && <Component />`."

### Q5. What is the difference between conditional rendering and CSS hiding?

> "Conditional rendering can remove a component from the rendered tree,
> which causes it to unmount. CSS hiding such as `display: none` only
> hides the element visually; the component can remain mounted, so its
> state is preserved."

### Q6. What happens to local state after a component is removed and mounted again?

> "When a component is removed from the rendered tree, it unmounts. If
> it is later mounted again as a new instance, its local state is
> initialized again rather than continuing from the old unmounted
> instance."

## 24. Final Mental Model

``` text
             CONDITION
                 |
          ┌──────┴──────┐
          |             |
         TRUE         FALSE
          |             |
       Show UI      Other UI
                    OR nothing
```

Example:

``` jsx
{isLoggedIn && <Dashboard />}
```

means:

``` text
Logged in?
   |
   ├── YES → Dashboard
   └── NO  → Nothing
```

And:

``` jsx
{isLoggedIn ? <Dashboard /> : <Login />}
```

means:

``` text
Logged in?
   |
   ├── YES → Dashboard
   └── NO  → Login
```

## 25. Quick Revision Cheat Sheet

  -----------------------------------------------------------------------------------
  Concept                 Meaning                 Example
  ----------------------- ----------------------- -----------------------------------
  Conditional rendering   UI depends on a         Different UI for logged-in users
                          condition               

  `if`                    Choose a branch in      `if (!user) return ...`
                          JavaScript              

  Ternary                 Choose between two      `{ok ? <A /> : <B />}`
                          expressions             

  `&&`                    Render the right side   `{show && <Menu />}`
                          only when the left side 
                          is truthy               

  `null`                  Render no UI for that   `if (!show) return null`
                          result                  

  Early return            Handle a case before    `if (loading) return <Loading />`
                          the main return         

  `0 && ...`              Can evaluate to `0`,    `{count > 0 && <Items />}`
                          which React displays    

  Conditional removal     Component can unmount   `{show && <Counter />}`

  CSS hiding              Component can stay      `display: none`
                          mounted                 
  -----------------------------------------------------------------------------------

### The three patterns to remember

``` jsx
// 1. Choose between two outcomes
{condition ? <A /> : <B />}

// 2. Show something only when true
{condition && <A />}

// 3. Handle a special case early
if (!condition) {
  return <Fallback />;
}
```

## 26. Practice Questions

Try to answer these before looking at the explanations.

### Practice 1

What will be displayed?

``` jsx
function App() {
  const isLoggedIn = false;

  return (
    <div>
      {isLoggedIn ? <h1>Welcome</h1> : <h1>Login first</h1>}
    </div>
  );
}
```

**Answer:** `Login first`.

### Practice 2

What will be displayed?

``` jsx
function App() {
  const count = 0;

  return <div>{count && <p>Items available</p>}</div>;
}
```

**Answer:** `0`, because the expression evaluates to zero and React
renders it.

### Practice 3

Fix the previous example so that nothing appears when the count is zero.

**Answer:**

``` jsx
{count > 0 && <p>Items available</p>}
```

### Practice 4

When would you choose an early return over a ternary?

**Answer:** When there are multiple states or special cases---such as
loading, error, missing data, or permissions---and early returns make
the component easier to read.

### Practice 5

What happens to a `Counter`'s local state here when `show` becomes false
and then true again?

``` jsx
{show && <Counter />}
```

**Answer:** The Counter unmounts when `show` is false. When it is shown
again, it mounts again and its local state starts from its initial
value.

------------------------------------------------------------------------

## Lesson Complete

You have covered Conditional Rendering from beginner to interview level:

-   `if` statements
-   Ternary operator
-   `&&` operator
-   The `0 && ...` trap
-   `null`
-   Early returns
-   Loading, error, and success states
-   Conditional rendering vs CSS hiding
-   Mounting, unmounting, and state preservation
-   Practical examples and interview questions

**Next major topic: Lists + Keys.** This is another important React
interview topic, especially why React needs keys, why array indexes can
be dangerous as keys, and how reconciliation uses keys.
