# 🚀 React Lesson 4: Props & The Architecture of Props vs. State

> *"Props make your components reusable; State makes your components alive."*

---

## 📌 Table of Contents
1. [What are Props? (The Zero-Level Foundation)](#1-what-are-props-the-zero-level-foundation)
2. [Why Do We Need Props?](#2-why-do-we-need-props)
3. [How Props Work Under the Hood](#3-how-props-work-under-the-hood)
4. [Supported Data Types & The `{}` Rule](#4-supported-data-types--the--rule)
5. [Destructuring Props (Clean Code Standard)](#5-destructuring-props-clean-code-standard)
6. [The Golden Rule: Props are Strictly Read-Only](#6-the-golden-rule-props-are-strictly-read-only)
7. [Inverting Control: Passing Functions as Props](#7-inverting-control-passing-functions-as-props)
8. [The Special `children` Prop & Component Composition](#8-the-special-children-prop--component-composition)
9. [🔥 Masterclass: Props vs. State (FAANG Interview Level)](#9--masterclass-props-vs-state-faang-interview-level)
10. [The Full React Lifecycle Loop](#10-the-full-react-lifecycle-loop)
11. [🏆 Interview Question & Answer Bank](#11--interview-question--answer-bank)

---

## 1. What are Props? (The Zero-Level Foundation)

**Props** stands for **Properties**.

At the simplest level:
> **Props are inputs passed from a Parent component down to a Child component.**

### The Mental Model
```
     Parent Component (App)
               │
               │  props (e.g., name="Manav")
               ▼
      Child Component (User)
```

In plain JavaScript terms:
* Think of a **Component** as a regular function.
* Think of **Props** as the **arguments/parameters** passed into that function.

```javascript
// Plain JavaScript
function greet(name) {
  return "Hello " + name;
}
greet("Manav"); // argument

// React JSX
function Greet(props) {
  return <h1>Hello {props.name}</h1>;
}
<Greet name="Manav" /> // prop
```

---

## 2. Why Do We Need Props?

Suppose you need to render greetings for three users:
* Manav
* Rahul
* Aman

### ❌ The Anti-Pattern (Creating multiple static components)
```javascript
function UserManav() { return <h1>Hello Manav</h1>; }
function UserRahul() { return <h1>Hello Rahul</h1>; }
function UserAman()  { return <h1>Hello Aman</h1>; }
```
This violates **DRY (Don't Repeat Yourself)** principles.

### ✅ The React Solution (One dynamic component)
```javascript
function User(props) {
  return <h1>Hello {props.name}</h1>;
}

// Reused with different data:
<User name="Manav" />
<User name="Rahul" />
<User name="Aman" />
```
* **One template**, infinite variations.

---

## 3. How Props Work Under the Hood

When React sees an element with attributes:
```jsx
<User name="Manav" age={21} isMember={true} />
```

React bundles all those attributes into a **single plain JavaScript object**:
```javascript
{
  name: "Manav",
  age: 21,
  isMember: true
}
```

This object is automatically supplied as the first parameter of your child component:

```jsx
function User(props) {
  console.log(props); // { name: "Manav", age: 21, isMember: true }

  return (
    <div>
      <h2>{props.name}</h2>
      <p>Age: {props.age}</p>
    </div>
  );
}
```

---

## 4. Supported Data Types & The `{}` Rule

Props can carry **any valid JavaScript value**, not just text.

| Data Type | Syntax Example | Notes |
| :--- | :--- | :--- |
| **String** | `<User name="Manav" />` | Double or single quotes |
| **Number** | `<User age={21} />` | Wrapped in curly braces `{}` |
| **Boolean** | `<User isActive={true} />` | Wrapped in `{}` |
| **Array** | `<User skills={["React", "Node"]} />` | JS array inside `{}` |
| **Object** | `<User config={{ theme: "dark" }} />` | Outer `{}` is JSX, inner `{}` is Object literal |
| **Function** | `<Button onClick={handleClick} />` | Pass function reference without `()` |
| **React Element** | `<Layout header={<CustomHeader />} />` | JSX passed as data |

### 💡 The Golden Rule of `{}` in JSX:
* Use `""` quotes **strictly for raw strings**.
* Use `{}` for **any JavaScript expression** (numbers, variables, booleans, objects, functions).

---

## 5. Destructuring Props (Clean Code Standard)

Instead of typing `props.` repeatedly:

```jsx
// ❌ Cluttered
function UserProfile(props) {
  return (
    <div>
      <h1>{props.name}</h1>
      <p>{props.age}</p>
      <p>{props.city}</p>
    </div>
  );
}
```

Modern React uses ES6 **Object Destructuring** right in the parameter list:

```jsx
// ✅ Professional Standard
function UserProfile({ name, age, city }) {
  return (
    <div>
      <h1>{name}</h1>
      <p>{age}</p>
      <p>{city}</p>
    </div>
  );
}
```

You can also assign default values directly:
```jsx
function UserProfile({ name, age = 18, city = "Remote" }) {
  // If 'age' is not passed, it defaults to 18
  return <h1>{name} - {age} ({city})</h1>;
}
```

---

## 6. The Golden Rule: Props are Strictly Read-Only

> **Rule:** A component must never mutate its own props.

### ❌ Fatal Mistake:
```jsx
function User(props) {
  props.name = "New Name"; // ❌ STRICT ERROR / ANTI-PATTERN
  return <h1>{props.name}</h1>;
}
```

### Why? Pure Functions & Predictable Data Flow
React is designed around the concept of **Pure Functions**:
1. A pure function **never mutates its arguments**.
2. Same inputs must always yield the same output.

If child components could modify incoming props secretly:
* Parent components would lose control over their own data.
* The state would become desynchronized.
* Debugging would become near impossible because you wouldn't know which child mutated what.

---

## 7. Inverting Control: Passing Functions as Props

If props are read-only, **how does a child communicate with a parent?**

> **Solution: The parent passes down a callback function via props.**

```
Parent Component (Holds Data & Logic)
     │
     │ 1. Passes callback function as prop
     ▼
Child Component (Button)
     │
     │ 2. User clicks -> Child triggers the callback
     ▼
Parent Component updates itself!
```

### Code Example:
```jsx
// Parent
function App() {
  function handleNotification(message) {
    alert("Parent received: " + message);
  }

  return <ActionButton onTrigger={handleNotification} />;
}

// Child
function ActionButton({ onTrigger }) {
  return (
    <button onClick={() => onTrigger("Task Completed!")}>
      Notify Parent
    </button>
  );
}
```
* The child **never changes the prop**. It simply invokes the function given to it by the parent.

---

## 8. The Special `children` Prop & Component Composition

React has a reserved prop called `children`.

### Self-Closing Tag vs. Opening/Closing Tags

When you write:
```jsx
<Card>
  <h2>Product Name</h2>
  <p>Price: $99</p>
</Card>
```

Whatever is nested **inside** `<Card> ... </Card>` is automatically collected and passed as `props.children`.

### Building a Reusable Card Wrapper:
```jsx
function Card({ children }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "16px", borderRadius: "8px" }}>
      {children}
    </div>
  );
}
```

### Now Reuse it anywhere:
```jsx
// Card 1: User Profile
<Card>
  <h2>Manav</h2>
  <p>Software Engineer</p>
</Card>

// Card 2: Shopping Item
<Card>
  <img src="laptop.jpg" alt="Laptop" />
  <button>Add to Cart</button>
</Card>
```

This pattern is called **Component Composition** (combining simpler components to create complex ones).

---

## 9. 🔥 Masterclass: Props vs. State (FAANG Interview Level)

This is one of the most tested React concepts in software engineering interviews.

### The Big Picture

| Dimension | Props | State |
| :--- | :--- | :--- |
| **Origin** | Passed from **outside** (Parent component). | Managed **internally** by the component itself. |
| **Mutability** | **Immutable** (Read-only for the receiver). | **Mutable** (Updated via setter function like `setState`). |
| **Purpose** | Configure child components & pass dynamic inputs. | Track dynamic data that changes over time (User interactions, timers, inputs). |
| **Trigger** | Changing props triggers a re-render in the child. | Calling the updater function triggers a re-render. |
| **Mental Model** | Function arguments / parameters. | Local function variables that persist across renders. |

### Architectural Side-by-Side

```
                PARENT (App)
                     │
             [ Has its own STATE ]
             (e.g., count = 5)
                     │
                     │ passes as PROP: <CounterDisplay value={count} />
                     ▼
                CHILD (CounterDisplay)
                     │
             [ Receives as PROP ]
             (Cannot change `value` directly!)
```

### Interview Example: When to use which?

#### Case 1: An Accordion Component
* **Props:** The title and content text passed into the accordion item.
* **State:** A boolean `isOpen` tracking whether this specific accordion item is expanded or collapsed.

#### Case 2: A Search Input
* **State:** The text currently typed into the input field (`const [query, setQuery] = useState("")`).
* **Props:** When the user hits "Search", the query is passed as a prop to a `<SearchResults query={query} />` component.

---

## 10. The Full React Lifecycle Loop

Never simply memorize definitions. Understand the end-to-end data cycle:

```
1. Parent initializes state:
   const [user, setUser] = useState("Manav");

2. Parent renders Child with props:
   <Greeting name={user} />

3. Child receives props and returns UI:
   <h1>Hello, Manav</h1>

4. User performs an action (e.g., clicks "Switch User"):
   Parent runs setUser("Rahul");

5. Parent re-renders:
   New render pass generates <Greeting name="Rahul" />

6. Child receives NEW props:
   Child automatically re-renders with "Hello, Rahul".
```

---

## 11. 🏆 Interview Question & Answer Bank

### Q1: What are props in React?
> **Answer:** *"Props (properties) are read-only inputs passed from a parent component to a child component. They allow data and callbacks to flow down the component hierarchy, enabling components to be dynamic, pure, and reusable."*

### Q2: Are props mutable? Can a child component modify them?
> **Answer:** *"No. Props must be treated as strictly immutable by the child component. React adheres to a one-way data flow model. If a prop needs to change, the component holding that data must update its state, which triggers a re-render and passes down new props."*

### Q3: How do child components pass data back to parent components?
> **Answer:** *"Through callback functions. The parent defines a function and passes it down to the child as a prop. The child component can then call this function, passing data or event parameters back up to the parent."*

### Q4: What is the difference between `props` and `state`?
> **Answer:** *"Props are external data passed into a component from its parent (similar to function parameters) and cannot be mutated by the receiving component. State is internal data created, owned, and managed by the component itself (similar to local variables) that can change over time and trigger re-renders."*

### Q5: What is the `children` prop and why is it used?
> **Answer:** *"The `children` prop is a special built-in prop that contains any content placed between the opening and closing tags of a custom component. It is the foundation for component composition, enabling flexible container components like Cards, Modals, and Layouts."*

---

## ⏭️ Next Step: `useState` & React State Architecture
* Why local variables don't trigger re-renders.
* The mechanics of `useState`.
* Asynchronous state updates and batching.
* Functional updater syntax (`setCount(prev => prev + 1)`).