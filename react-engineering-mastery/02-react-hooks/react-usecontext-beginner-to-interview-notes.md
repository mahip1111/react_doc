# React `useContext` --- Beginner to Interview Level Notes

> These notes explain `useContext` from absolute basics to
> interview-level understanding. Nothing from the original lesson has
> been intentionally removed. The examples and explanations are kept,
> and extra beginner-friendly clarifications are added so each part
> connects naturally.

------------------------------------------------------------------------

# 1. First understand the problem: Prop Drilling

Before learning `useContext`, let's understand the problem it helps
solve.

Imagine we have three components:

``` jsx
function App() {
  const user = "Manav";

  return <Dashboard user={user} />;
}

function Dashboard({ user }) {
  return <Profile user={user} />;
}

function Profile({ user }) {
  return <h1>Hello {user}</h1>;
}
```

Let's understand what is happening.

-   `App` has the user information.
-   `Profile` needs that user information.
-   `Dashboard` is sitting in the middle.
-   `Dashboard` does not actually need the user information for its own
    work.
-   But we still have to pass `user` through `Dashboard` so that
    `Profile` can receive it.

The data travels like this:

``` text
App
 |
 | user
 v
Dashboard
 |
 | user
 v
Profile
```

`Profile` needs `user`, but `Dashboard` is only passing it along.

This is called **prop drilling**.

## Interview definition

> Prop drilling is the process of passing data through intermediate
> components that don't need the data themselves, just so a deeply
> nested component can receive it.

### Easy real-life analogy

Imagine you are sitting in the last row of a classroom and need a pen
from the teacher.

Instead of giving the pen directly to you, the teacher passes it through
every student sitting between you and the teacher.

Those students are only passing the pen along. They do not need it
themselves.

That is similar to prop drilling.

------------------------------------------------------------------------

# 2. How does Context API help?

Context API gives us another way to share a value with components in a
component tree.

Instead of passing the same prop through every middle component, we
create a **Context**.

Think of Context as a common access point for a group of components.

``` text
             Context
          /     |      \
       App   Dashboard  Profile
                         |
                         v
                        user
```

The important idea:

> A component inside the matching Provider can read the context value
> directly, even if the value was not passed to it through props.

So we no longer need this chain:

``` text
App
 |
 | user
 v
Dashboard
 |
 | user
 v
Profile
```

`Profile` can read the value from Context itself.

------------------------------------------------------------------------

# 3. The three important things

When using Context, remember these three steps:

``` text
createContext()
      |
      v
   Provider
      |
      v
 useContext()
```

Let's understand each one slowly:

1.  `createContext()` --- creates the Context object.
2.  `Provider` --- supplies a value to components below it in the tree.
3.  `useContext()` --- reads that value from a component.

------------------------------------------------------------------------

# 4. Step one: `createContext()`

First, import `createContext` from React:

``` jsx
import { createContext } from "react";

const UserContext = createContext();
```

What did we do?

-   `createContext()` creates a Context object.
-   We stored that object in a variable called `UserContext`.
-   This does not yet mean that we have supplied the actual user value.

Think of it like creating a channel through which components can access
user data.

``` text
createContext()
      |
      v
 UserContext
      |
      v
Context channel created
```

You can also give `createContext` a default value:

``` jsx
const UserContext = createContext("Guest");
```

That default value is used by a consumer when it has no matching
Provider above it in the component tree. If you call `createContext()`
without an argument, the default value is `undefined`.

------------------------------------------------------------------------

# 5. Step two: Provider

Creating the Context is not enough. We also need to provide a value.

``` jsx
<UserContext.Provider value="Manav">
  <Dashboard />
</UserContext.Provider>
```

Let's break it down:

-   `UserContext.Provider` is the Provider for this Context.
-   `value="Manav"` is the value being supplied.
-   `Dashboard` is placed inside the Provider.
-   Components rendered underneath `Dashboard` can also access this
    value, as long as they are within this Provider's subtree.

In simple words:

> Every component inside this Provider can access the value `"Manav"`
> through this Context.

Diagram:

``` text
UserContext.Provider
        |
        | value = "Manav"
        v
    Dashboard
        |
        v
     Profile
```

**Important:** The Provider does not automatically pass the value as a
normal prop. A descendant reads it using `useContext`.

------------------------------------------------------------------------

# 6. Step three: `useContext()`

Now `Profile` can directly access the value.

``` jsx
import { useContext } from "react";

function Profile() {
  const user = useContext(UserContext);

  return <h1>Hello {user}</h1>;
}
```

Understand this line:

``` jsx
const user = useContext(UserContext);
```

It means:

> Find the nearest matching `UserContext` Provider above this component
> and read the value supplied by it.

So `Profile` does not need to receive `user` through props.

We do not need:

``` jsx
<Dashboard user={user} />
```

And we do not need:

``` jsx
<Profile user={user} />
```

Instead, `Profile` reads the Context directly.

------------------------------------------------------------------------

# 7. Complete working example

Let's put all three steps together.

``` jsx
import { createContext, useContext } from "react";

// Step 1: Create Context
const UserContext = createContext();

function App() {
  const user = "Manav";

  // Step 2: Provide the value
  return (
    <UserContext.Provider value={user}>
      <Dashboard />
    </UserContext.Provider>
  );
}

function Dashboard() {
  return <Profile />;
}

function Profile() {
  // Step 3: Read the value
  const user = useContext(UserContext);

  return <h1>Hello {user}</h1>;
}

export default App;
```

## Understand the complete flow

### Step 1

``` jsx
const UserContext = createContext();
```

We create the Context object.

### Step 2

``` jsx
<UserContext.Provider value={user}>
  <Dashboard />
</UserContext.Provider>
```

We provide the user value to the component tree below the Provider.

### Step 3

``` jsx
const user = useContext(UserContext);
```

`Profile` reads the value from the nearest matching Provider above it.

The component tree is:

``` text
App
 |
 | provides user = "Manav"
 v
UserContext.Provider
 |
 v
Dashboard
 |
 v
Profile
 |
 | useContext(UserContext)
 v
user = "Manav"
 |
 v
<h1>Hello Manav</h1>
```

Notice something important:

`Dashboard` does not know anything about `user`.

Yet `Profile` gets it.

**That is the main benefit of Context.**

------------------------------------------------------------------------

# 8. Very important: Which components can access a Provider?

The Provider defines which part of the component tree can access its
value.

Example:

``` jsx
<UserContext.Provider value="Manav">
  <Dashboard />
</UserContext.Provider>

<Footer />
```

Only components inside the Provider's subtree can read the value from
that Provider.

``` text
UserContext.Provider
|
+-- Dashboard          can access
|   |
|   +-- Profile        can access
|   |
|   +-- Settings       can access
|
Footer                 outside this Provider
                       cannot access its value
```

A component outside the Provider cannot access that Provider's value.

It may receive the Context's default value instead, if one was supplied
when calling `createContext`.

**Important detail:** If there are multiple Providers for the same
Context, `useContext` reads the value from the nearest matching Provider
above the component.

------------------------------------------------------------------------

# 9. Context does not automatically mean global state

This is a very common interview question.

**Interviewer:**

"Is Context API a global state management solution?"

A good answer:

> Context provides a way to share values across a component tree without
> passing props manually. It can be used for global-like state, but
> Context itself is not a complete state management solution.

Let's understand the difference.

Context is commonly useful for sharing values such as:

-   Theme --- light or dark mode.
-   Authentication/user information.
-   Language --- English, Hindi, etc.
-   Configuration --- app-wide settings.

For more complicated application state, libraries such as Redux or
Zustand may be more appropriate.

Context can carry state if you provide state through it:

``` jsx
const [count, setCount] = useState(0);

<CountContext.Provider value={{ count, setCount }}>
  <App />
</CountContext.Provider>
```

But Context itself does not provide all the extra structure and tools
that a dedicated state-management library may provide.

------------------------------------------------------------------------

# 10. Context vs Props

Let's compare them.

## Props

With props, data is explicitly passed from one component to another:

``` text
Parent
  |
  v
Child
  |
  v
Grandchild
```

Example:

``` jsx
<Child user={user} />
```

The child receives the value through its props.

## Context

With Context, a descendant can read the value directly:

``` text
        Context
       /   |    \
  Parent Child Grandchild
```

A component inside the Provider can use `useContext` to access the
value.

## Interview answer

> Props are explicit and localized data passing, while Context is useful
> when many components at different levels need access to the same
> value.

## Simple rule

``` text
Few components need the data
          |
          v
        Props

Many distant components need the same data
          |
          v
        Context
```

Context is not automatically better than props. If only one nearby child
needs a value, props are often simpler and clearer.

------------------------------------------------------------------------

# 11. Very important: Context can cause re-renders

Now let's move from beginner understanding to interview-level
understanding.

Suppose we have:

``` jsx
<UserContext.Provider value={user}>
  <Dashboard />
</UserContext.Provider>
```

Imagine the value changes:

``` text
"Manav"
   |
   v
"Rahul"
```

Components consuming this Context may re-render because the Context
value they receive has changed.

For example:

``` jsx
function Profile() {
  const user = useContext(UserContext);

  console.log("Profile rendered");

  return <h1>Hello {user}</h1>;
}
```

If the Provider supplies a different `user` value, `Profile` can render
again to show the updated value.

## Why can this become a performance issue?

Imagine one giant Context:

``` jsx
<AppContext.Provider
  value={{
    user,
    theme,
    cart,
    notifications,
    settings
  }}
>
  ...
</AppContext.Provider>
```

Many unrelated components may consume different parts of this Context.

When the Provider's value changes, consumers of that Context can be
notified and re-render, even if a particular consumer only uses one
field that did not change.

That is why we should not blindly put everything inside one giant
Context.

A common design improvement is to split unrelated values into separate
Contexts when that makes sense, so components subscribe only to the
values they need.

------------------------------------------------------------------------

# 12. Connection with `useMemo`

This connects directly to what you already learned about `useMemo`.

Look at this:

``` jsx
const value = {
  user,
  theme
};

return (
  <AppContext.Provider value={value}>
    ...
  </AppContext.Provider>
);
```

What happens each time this component renders?

A new object is created.

Conceptually:

``` text
Render 1 -> Object A
Render 2 -> Object B
Render 3 -> Object C
```

Even if the contents have not changed:

``` text
user = "Manav"
theme = "dark"
```

the object references are different.

JavaScript compares objects by reference, not by checking whether all
their properties contain the same values.

For example:

``` jsx
const first = { user: "Manav" };
const second = { user: "Manav" };

console.log(first === second); // false
```

So a new object passed as the Provider value can make React treat the
Context value as changed.

## Use `useMemo` to stabilize the object reference

``` jsx
const value = useMemo(() => {
  return {
    user,
    theme
  };
}, [user, theme]);

return (
  <AppContext.Provider value={value}>
    ...
  </AppContext.Provider>
);
```

Now React can reuse the same object reference while `user` and `theme`
remain unchanged and the memoized value is retained.

Conceptually:

``` text
user or theme changes?
        |
   +----+----+
   |         |
  Yes        No
   |         |
   v         v
New value   Reuse cached
object      object reference
```

**Important:** `useMemo` is a performance optimization. It does not make
Context correct or incorrect, and it does not prevent re-renders caused
by other reasons. Use it when stabilizing the Provider value is useful.

Also, if the Provider value contains functions, `useCallback` can
sometimes help keep those function references stable.

------------------------------------------------------------------------

# 13. Context vs Redux

Interviewers often ask about this.

## Context

Primarily:

> Context provides a way to share values through a component tree.

It helps avoid manually passing props through every intermediate
component.

## Redux

Redux provides a more structured state-management architecture.

A simplified view:

``` text
Store
  |
  v
State
  |
  v
Actions
  |
  v
Reducers
  |
  v
Updated State
```

-   **Store:** holds the application state.
-   **Action:** describes what happened or what change is requested.
-   **Reducer:** calculates the next state from the previous state and
    an action.
-   **Updated state:** the new state becomes available to the
    application.

Redux also has additional conventions and tooling for managing
application state.

## Do not say this in an interview

> "Context is basically Redux."

That is not accurate.

## Better interview answer

> Context and Redux solve related but different problems. Context
> provides value propagation through the component tree, while Redux
> provides a more structured architecture for managing complex
> application state.

Context can be enough for relatively simple shared values. Redux or
another state-management library can be useful when an application needs
more structure, predictable update patterns, tooling, or management of
complex shared state.

------------------------------------------------------------------------

# 14. One very important rule: Context is not automatically better than props

Suppose you have:

``` jsx
<App>
  <Navbar user={user} />
</App>
```

And only `Navbar` needs `user`.

Just use props.

There is no need to create a Context for every value.

Remember:

``` text
A few nearby components need data
              |
              v
            Props

Many components at different levels need shared data
              |
              v
            Context
```

Choose the simplest approach that makes the component structure easy to
understand.

------------------------------------------------------------------------

# 15. Interview Questions and Answers

After this topic, you should be comfortable answering these questions.

## Q1. What is Context API?

> Context provides a mechanism to share values with components
> throughout a component tree without explicitly passing props through
> every intermediate component.

## Q2. What problem does Context solve?

> Primarily prop drilling --- passing data through intermediate
> components that do not need it themselves.

## Q3. How do you create Context?

``` jsx
const UserContext = createContext();
```

## Q4. How do you provide a value?

``` jsx
<UserContext.Provider value={user}>
  <App />
</UserContext.Provider>
```

## Q5. How do you consume Context?

``` jsx
const user = useContext(UserContext);
```

## Q6. Does Context replace Redux?

> No. Context handles value propagation through the component tree,
> while Redux provides a more complete and structured state-management
> architecture.

## Q7. Can Context cause re-renders?

> Yes. Consumers can re-render when the Context value they receive
> changes.

## Q8. How can you optimize a Context value?

> You can stabilize object and function references when appropriate, for
> example with `useMemo` and `useCallback`. You can also split unrelated
> Contexts when that helps reduce unnecessary consumer updates.

## Q9. Can a component outside a Provider access its value?

> It cannot access that Provider's value. It receives the Context's
> default value, if one was provided to `createContext`; otherwise, the
> default is `undefined`.

## Q10. Should we use Context for every prop?

> No. Props are usually simpler when data is needed by only a few nearby
> components. Context is useful when many components at different levels
> need the same value.

------------------------------------------------------------------------

# 16. React Learning Chain --- Topics Covered So Far

You have now covered these topics:

``` text
React
|
+-- Components
|
+-- JSX
|
+-- Props
|   +-- Parent to Child data passing
|   +-- key
|
+-- State
|   +-- useState
|
+-- Events
|
+-- Fragments
|
+-- useEffect
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
|
+-- useContext  <-- Today's topic
```

------------------------------------------------------------------------

# 17. What should we learn next?

A recommended learning order after `useContext`:

``` text
useContext
   |
   v
Custom Hooks
   |
   v
React.memo
   |
   v
State Management
   |
   v
Redux / Redux Toolkit
   |
   v
React Rendering & Reconciliation
   |
   v
Fiber
   |
   v
Performance Optimization
   |
   v
Concurrent React
   |
   v
Suspense
   |
   v
Error Boundaries
   |
   v
Server Components
   |
   v
React Architecture / Machine Coding
```

This is a learning sequence, not a strict rule that every project must
follow.

**Most important:** Do not just memorize `useContext`. An interviewer
may describe a real application and ask:

> "Would you use props, Context, or Redux here, and why?"

You should be able to explain your choice based on: - How many
components need the data. - How far apart those components are in the
component tree. - How frequently the shared value changes. - How complex
the application's state updates are. - Whether a simple prop is enough.

That is the practical, interview-level understanding we are aiming for.

------------------------------------------------------------------------

# Final Quick Revision

  -----------------------------------------------------------------------
  Term                                Easy meaning
  ----------------------------------- -----------------------------------
  Prop drilling                       Passing data through intermediate
                                      components that do not need it

  Context                             A way to share a value with
                                      descendants in a component tree

  `createContext()`                   Creates the Context object

  Provider                            Supplies the Context value to its
                                      descendants

  `useContext()`                      Reads the nearest matching
                                      Provider's value

  Props                               Explicitly pass data from parent to
                                      child

  Redux                               A structured state-management
                                      library

  `useMemo`                           Can stabilize a calculated
                                      value/object reference

  `useCallback`                       Can stabilize a function reference
  -----------------------------------------------------------------------

## One-line memory trick

``` text
createContext()  -> Create the channel
Provider         -> Provide the value
useContext()     -> Read the value
```

**The main purpose of `useContext`:** Share values with deeply nested
components without passing the same props through every intermediate
component.
