# React --- Lists & Keys

## Beginner-to-Advanced Notes (Interview Preparation)

> **Learning goal:** Understand how to render arrays in React, why keys
> are needed, what reconciliation means, why array indexes can be
> dangerous, and why the special `key` attribute is not available
> through component props.

These notes preserve the complete lesson material and the follow-up
beginner-friendly explanations, including the detailed explanation of
`key` versus `props`. Additional clarifications and examples are
included to make the topic easier to revise.

------------------------------------------------------------------------

# Table of Contents

1.  [First: What Is a List?](#1-first-what-is-a-list)
2.  [Remember `map()`](#2-remember-map)
3.  [Using `map()` in React](#3-using-map-in-react)
4.  [The Warning: Every Child Needs a Unique
    Key](#4-the-warning-every-child-needs-a-unique-key)
5.  [What Is a Key?](#5-what-is-a-key)
6.  [A Real Example with Users](#6-a-real-example-with-users)
7.  [Interview Question: Why Do We Need
    Keys?](#7-interview-question-why-do-we-need-keys)
8.  [Understand the Problem Without
    Keys](#8-understand-the-problem-without-keys)
9.  [Keys Are Not Just for Removing a
    Warning](#9-keys-are-not-just-for-removing-a-warning)
10. [Why Shouldn't We Use Array
    Index?](#10-why-shouldnt-we-use-array-index)
11. [A Real-World Index-Key Bug](#11-a-real-world-index-key-bug)
12. [What Makes a Good Key?](#12-what-makes-a-good-key)
13. [Keys Do Not Need to Be Globally
    Unique](#13-keys-do-not-need-to-be-globally-unique)
14. [The `key` Attribute Is Not Available in
    Props](#14-the-key-attribute-is-not-available-in-props)
15. [What Is Reconciliation?](#15-what-is-reconciliation)
16. [A Very Important Misconception](#16-a-very-important-misconception)
17. [Complete React Example](#17-complete-react-example)
18. [Reconciliation and Keys from
    Zero](#18-reconciliation-and-keys-from-zero)
19. [Understand Key with a College Roll-Number
    Analogy](#19-understand-key-with-a-college-roll-number-analogy)
20. [The `key` vs `id` Difference](#20-the-key-vs-id-difference)
21. [Mounting, Unmounting, and Changing
    Keys](#21-mounting-unmounting-and-changing-keys)
22. [Common Mistakes](#22-common-mistakes)
23. [Interview Traps](#23-interview-traps)
24. [Interview-Ready Answers](#24-interview-ready-answers)
25. [Final Mental Model](#25-final-mental-model)
26. [Mini Test and Practice](#26-mini-test-and-practice)
27. [Quick Revision Cheat Sheet](#27-quick-revision-cheat-sheet)

------------------------------------------------------------------------

## 1. First: What Is a List?

Normal JavaScript mein:

``` javascript
const fruits = ["Apple", "Mango", "Banana"];
```

Ye ek array hai.

Agar humein screen par teeno fruits dikhane hain:

``` text
Apple
Mango
Banana
```

toh hum manually ye nahi karna chahte:

``` jsx
<h1>Apple</h1>
<h1>Mango</h1>
<h1>Banana</h1>
```

Instead, React mein hum array ko `map()` karte hain.

**Simple idea:** Array mein jitne items hain, hum un sabke liye UI
generate karna chahte hain.

## 2. Remember `map()`

JavaScript:

``` javascript
const fruits = ["Apple", "Mango", "Banana"];

const result = fruits.map((fruit) => {
  return fruit;
});
```

`map()` ka simple meaning:

> Array ke har item par jao aur usse kuch naya banao.

Example:

``` text
Apple  → Apple
Mango  → Mango
Banana → Banana
```

`map()` original array ko change nahi karta. It creates and returns a
new array containing the results of calling the callback for each item.

For example:

``` javascript
const numbers = [1, 2, 3];

const doubled = numbers.map((number) => {
  return number * 2;
});

console.log(doubled); // [2, 4, 6]
```

Here:

``` text
1 → 2
2 → 4
3 → 6
```

This is the same idea we use to turn data into React elements.

## 3. Using `map()` in React

``` jsx
function App() {
  const fruits = ["Apple", "Mango", "Banana"];

  return (
    <div>
      {fruits.map((fruit) => (
        <p>{fruit}</p>
      ))}
    </div>
  );
}
```

React basically ye UI create karega:

``` text
Apple
Mango
Banana
```

Simple!

### Code ko step by step samjho

``` jsx
fruits.map((fruit) => (
  <p>{fruit}</p>
))
```

1.  `map()` array ke first item par jayega: `"Apple"`.
2.  Callback `<p>Apple</p>` return karega.
3.  Next item `"Mango"` ke liye `<p>Mango</p>` return hoga.
4.  Next item `"Banana"` ke liye `<p>Banana</p>` return hoga.
5.  `map()` in React elements ka ek new array return karega.
6.  React un elements ko render karega.

So the flow is:

``` text
fruits array
     |
     v
   map()
     |
     v
React elements
     |
     v
Apple
Mango
Banana
```

## 4. The Warning: Every Child Needs a Unique Key

Lekin warning aayegi:

``` text
Each child in a list should have a unique "key" prop.
```

Why?

Because React ko har list item ki identity pata honi chahiye.

So:

``` jsx
{fruits.map((fruit) => (
  <p key={fruit}>{fruit}</p>
))}
```

Now:

``` text
Apple  → key="Apple"
Mango  → key="Mango"
Banana → key="Banana"
```

React ko har sibling item ke liye ek key mil gayi.

**Important:** A key should be stable and unique among siblings. Using
the fruit name works only if those names are unique in that list and do
not change unexpectedly.

For a list where duplicate fruit names are possible, use a real unique
ID instead.

## 5. What Is a Key?

Super super easy:

> **Key = list ke har item ka unique ID/name.**

Imagine tumhare college mein 100 students hain.

Agar teacher bole:

> "Rahul ko bulao."

Maybe 5 Rahul hain.

Better:

``` text
Rahul → Roll No. 101
Rahul → Roll No. 205
Rahul → Roll No. 319
```

Roll number = unique identity.

React mein:

``` text
List item → key
Student   → Roll number
```

A key helps React identify which item in a list is which.

## 6. A Real Example with Users

Suppose:

``` javascript
const users = [
  { id: 101, name: "Rahul" },
  { id: 102, name: "Aman" },
  { id: 103, name: "Priya" }
];
```

Render:

``` jsx
{users.map((user) => (
  <p key={user.id}>
    {user.name}
  </p>
))}
```

Here:

``` text
Rahul → 101
Aman  → 102
Priya → 103
```

These IDs are their identities.

The `id` belongs to the user data. We give that value to React as the
element's `key`.

## 7. Interview Question: Why Do We Need Keys?

Question:

> "Why do we need keys in React?"

Don't say:

> ❌ "Keys remove the warning."

That's not the real reason.

Say:

> **"Keys help React identify which items in a list have changed, been
> added, removed, or reordered. They give list elements a stable
> identity during reconciliation."**

That's the interview answer.

But let's understand why.

## 8. Understand the Problem Without Keys

Imagine React doesn't have keys.

Old list:

``` text
A
B
C
```

Now new list:

``` text
A
C
```

React needs to figure out:

> "What changed?"

It knows:

``` text
A
B
C
```

became:

``` text
A
C
```

But it needs to efficiently update the UI.

Keys help:

``` text
A → key A
B → key B
C → key C
```

New:

``` text
A → key A
C → key C
```

React can understand:

``` text
A → same
B → removed
C → same
```

That's the important idea.

### A small but important clarification

React can still render lists without keys, and it may compare elements
using their positions and types. Keys are not what make rendering
possible. They give React stable identity information so it can match
the correct list items when the list changes.

## 9. Keys Are Not Just for Removing a Warning

This is very important.

Suppose:

``` jsx
{users.map((user) => (
  <UserCard key={user.id} user={user} />
))}
```

The key helps React understand:

> "This particular component represents this particular item."

So keys are about identity.

The warning is only a reminder that React needs this identity
information for a list of sibling elements.

## 10. Why Shouldn't We Use Array Index?

Suppose:

``` javascript
const users = ["A", "B", "C"];
```

You might write:

``` jsx
{users.map((user, index) => (
  <p key={index}>{user}</p>
))}
```

This works technically.

But index can be a bad key when the list can change order, have items
inserted, or have items removed.

### Why?

Initial:

``` text
Index 0 → A
Index 1 → B
Index 2 → C
```

Now remove A.

New list:

``` text
Index 0 → B
Index 1 → C
```

Look what happened:

Old:

``` text
0 → A
1 → B
2 → C
```

New:

``` text
0 → B
1 → C
```

React sees:

``` text
0 still exists
1 still exists
```

But the actual items changed.

The index is not a stable identity for the item.

### Important nuance

Using an index as a key is not always wrong. It can be acceptable for a
list that is static and will never be reordered, inserted into, or have
items removed. But when a list can change, stable IDs are usually the
safer choice.

## 11. A Real-World Index-Key Bug

Imagine a list of inputs:

``` text
Name: Rahul
Name: Aman
Name: Priya
```

Suppose each row has an input.

Then you remove Rahul.

If you're using indexes as keys, React can reuse DOM/component instances
in ways that don't correspond to the same logical person.

This can lead to confusing UI/state behavior.

For example, imagine each row is a component with its own input state:

``` jsx
function NameRow({ name }) {
  const [value, setValue] = useState(name);

  return (
    <input
      value={value}
      onChange={(event) => setValue(event.target.value)}
    />
  );
}
```

And the parent renders:

``` jsx
{users.map((user, index) => (
  <NameRow key={index} name={user.name} />
))}
```

If the first user is removed, the row that used to represent Rahul may
be reused for Aman because both occupy index `0` at different times. The
component's local state can then appear attached to the wrong person.

With stable IDs:

``` text
Rahul → 101
Aman  → 102
Priya → 103
```

After Rahul is removed:

``` text
Aman  → 102
Priya → 103
```

React can correctly understand:

``` text
Rahul disappeared; Aman and Priya are still the same items.
```

## 12. What Makes a Good Key?

Usually:

``` jsx
key={user.id}
```

Best when `user.id` is a stable unique identifier.

Or use some other stable, unique identifier belonging to the item.

### Bad key: random values

``` jsx
key={Math.random()}
```

Why?

Every render:

Previous:

``` text
A → random 123
B → random 456
```

Next:

``` text
A → random 789
B → random 111
```

Keys changed.

React thinks:

> "Oh! These are completely new items."

That's bad for preserving component state and can cause unnecessary
work.

### Another bad approach: `Date.now()`

``` jsx
key={Date.now()}
```

Same problem.

Every new render can produce different keys. If several items are
rendered in the same moment, the value may even be identical for them,
so it is not a reliable unique key either.

### Key should be:

``` text
Stable
+
Unique among siblings
```

**Stable**

Same item → same key across renders.

**Unique**

Two items shouldn't have the same key within the same sibling list.

### Quick examples

  Key choice        Good or bad?                Reason
  ----------------- --------------------------- -------------------------------------
  `user.id`         Good                        Usually stable and unique
  `product.sku`     Good if unique and stable   Identifies the product
  `index`           Sometimes                   Safe only for suitable static lists
  `Math.random()`   Bad                         Changes on each render
  `Date.now()`      Bad                         Changes over time and may collide
  `user.name`       Depends                     Names may be duplicated or edited

## 13. Keys Do Not Need to Be Globally Unique

Interesting interview point.

Suppose:

``` jsx
<ul>
  <li key="1">A</li>
  <li key="2">B</li>
</ul>

<ul>
  <li key="1">X</li>
  <li key="2">Y</li>
</ul>
```

That's okay.

Keys need to be unique among their siblings, not across the entire
application.

### Interview question

> "Do React keys need to be globally unique?"

Answer:

> "No. Keys only need to be unique among the elements in the same
> sibling list."

## 14. The `key` Attribute Is Not Available in Props

This is another interview trap.

Suppose:

``` jsx
<User key={user.id} />
```

Inside `User`:

``` jsx
function User(props) {
  console.log(props.key);
}
```

`props.key` is not available like a normal prop. It will be `undefined`.

### Why?

Because `key` is special to React.

React uses it internally to identify elements during reconciliation. It
is not passed to the component as an ordinary prop.

### If the component needs the ID, pass it separately

``` jsx
<User
  key={user.id}
  id={user.id}
/>
```

Then:

``` jsx
function User({ id }) {
  console.log(id);
}
```

Now the component can access the ID.

### Easy way to remember

``` text
key → React ke liye
id  → Component ke liye
```

## 15. What Is Reconciliation?

Now we are touching an important interview concept.

Super simple:

> **Reconciliation = React comparing the previous UI tree with the new
> UI tree to figure out what needs to change.**

Imagine:

Old:

``` text
Apple
Mango
Banana
```

New:

``` text
Apple
Banana
Orange
```

React needs to figure out:

``` text
Apple  → same
Mango  → removed
Banana → same
Orange → added
```

Keys help React identify list items during this process.

### Interview-level answer

Question:

> "What is reconciliation?"

Answer:

> "Reconciliation is React's process of comparing the previous rendered
> element tree with the new one to determine the updates needed for the
> UI. Keys help React maintain stable identity for elements in lists
> during this process."

### One extra clarification

Reconciliation is broader than keys. React uses element types, tree
positions, keys, and other information to determine whether it can
preserve an existing component or needs to replace it. Keys are
especially important when matching items among siblings in a list.

## 16. A Very Important Misconception

Don't say:

> ❌ "Keys tell React which DOM element to update."

That's too simplistic.

Better:

> ✅ **"Keys provide stable identity for elements in a list so React can
> correctly match items between renders during reconciliation."**

This is a more accurate interview explanation.

## 17. Complete React Example

``` jsx
function App() {
  const users = [
    { id: 1, name: "Rahul" },
    { id: 2, name: "Aman" },
    { id: 3, name: "Priya" }
  ];

  return (
    <div>
      {users.map((user) => (
        <p key={user.id}>
          {user.name}
        </p>
      ))}
    </div>
  );
}
```

Think:

``` text
users
  |
  v
map()
  |
  v
React elements

Rahul → key 1
Aman  → key 2
Priya → key 3
```

Later:

``` text
Rahul removed

Aman  → key 2
Priya → key 3
```

React can understand:

``` text
key 1 → gone
key 2 → same item
key 3 → same item
```

## 18. Reconciliation and Keys from Zero

This section explains the same core idea again, very slowly, without
starting with technical jargon.

### First, understand one problem

Maan lo screen par ye list hai:

``` text
Apple
Mango
Banana
```

React ko pata hai:

``` text
Screen par abhi:
Apple
Mango
Banana
```

Ab tumhari list change ho gayi:

``` text
Apple
Banana
```

React ko ab kya karna hai?

Obviously:

> **Mango ko screen se hatao.**

Bas. Yehi basic problem hai.

### But how will React know what changed?

React ke paas pehle wali list thi:

``` text
OLD

Apple
Mango
Banana
```

Aur ab new list hai:

``` text
NEW

Apple
Banana
```

React ko compare karna hai:

``` text
OLD → NEW
```

Aur decide karna hai:

``` text
Apple  → same
Mango  → removed
Banana → same
```

**Is comparing process ko reconciliation bolte hain.**

### Reconciliation ka super-simple meaning

> **Reconciliation = purani UI aur nayi UI ko compare karke pata lagana
> ki kya change hua.**

Bas.

Is word se darne ki zarurat nahi.

``` text
OLD UI
   |
   v
compare
   |
   v
NEW UI
   |
   v
kya change hua?
```

### Now the key problem appears

Maan lo list hai:

``` text
Apple
Mango
Banana
```

React ko identity kaise samajh aaye?

Hum React ko bol sakte hain:

``` text
Apple  → ID 101
Mango  → ID 102
Banana → ID 103
```

Ye ID hi **key** hai.

So:

``` text
Apple  → key 101
Mango  → key 102
Banana → key 103
```

### Key ka super-simple meaning

> **Key = "Ye particular item kaun sa hai?"**

Bas.

Jaise college mein:

``` text
Manavendra → Roll No. 42
Rahul      → Roll No. 73
Aman       → Roll No. 91
```

Roll number batata hai:

> "Ye student exactly kaun hai?"

React mein:

``` text
Apple → key 101
```

Key batata hai:

> "Ye list mein exactly kaunsa Apple item hai?"

### Actual example

Initial list:

``` text
Apple  → key 101
Mango  → key 102
Banana → key 103
```

Now Mango remove kar diya:

``` text
Apple  → key 101
Banana → key 103
```

React ke paas old aur new dono hain.

OLD:

``` text
101 → Apple
102 → Mango
103 → Banana
```

NEW:

``` text
101 → Apple
103 → Banana
```

React easily samajh gaya:

``` text
101 → still there
102 → gone
103 → still there
```

Therefore:

> **Mango ko remove karo.**

That's the whole key concept.

## 19. Understand Key with a College Roll-Number Analogy

Tum bol sakte ho:

> "Key ki jagah position/index use kar lenge."

Initial:

``` text
Index 0 → Apple
Index 1 → Mango
Index 2 → Banana
```

Ab Mango remove karo:

``` text
Index 0 → Apple
Index 1 → Banana
```

Dekho problem:

Pehle:

``` text
Index 1 → Mango
```

Ab:

``` text
Index 1 → Banana
```

**Index 1 same hai, but item change ho gaya.**

Index item ki permanent identity nahi hai.

### Real-life example

Imagine classroom mein 3 students:

``` text
Seat 1 → Rahul
Seat 2 → Aman
Seat 3 → Priya
```

Agar Aman chala gaya:

``` text
Seat 1 → Rahul
Seat 2 → Priya
```

Ab **seat number** same reh sakta hai, but student change ho gaya.

So:

``` text
Seat number ≠ Student identity
```

But roll number:

``` text
Rahul → 101
Aman  → 102
Priya → 103
```

Aman chala gaya:

``` text
101 → Rahul
103 → Priya
```

React ko exact identity mil gayi.

### Isi liye ID better hai

Index:

``` text
Apple  → 0
Mango  → 1
Banana → 2
```

Position change ho sakti hai.

Stable ID:

``` text
Apple  → 101
Mango  → 102
Banana → 103
```

Item ki ID same rehti hai.

## 20. The `key` vs `id` Difference

This point is genuinely confusing at first. Let's understand only this
idea.

### First, understand normal props

Suppose parent renders:

``` jsx
<User name="Manav" age={21} />
```

Here:

``` text
name = "Manav"
age  = 21
```

These are normal props.

Child:

``` jsx
function User(props) {
  console.log(props.name);
  console.log(props.age);
}
```

Output:

``` text
Manav
21
```

Because `name` and `age` are normal props.

### Now look at `key`

We write:

``` jsx
<User key={101} name="Manav" />
```

You might naturally think:

> "Toh `key` bhi prop hai. Main `props.key` se 101 nikal lunga."

But:

``` jsx
function User(props) {
  console.log(props.key);
}
```

This gives:

``` text
undefined
```

### Why?

Because `key` is a **special React attribute**.

React usko **khud ke internal kaam ke liye rakhta hai**.

Think:

``` jsx
<User
  key={101}
  name="Manav"
/>
```

React internally roughly thinks:

``` text
key = 101
     |
     v
React ke liye identity
```

While:

``` text
name = "Manav"
     |
     v
Component ke liye data
```

So React says:

> "`key` mujhe chahiye. `name` component ko de do."

### A super-easy analogy: Courier tracking

Imagine tum courier bhej rahe ho.

Package par:

``` text
Package

Receiver: Manav
Tracking ID: 12345
```

Courier company ko:

``` text
Tracking ID
```

chahiye.

Lekin receiver ko package ke andar jo actual information hai, woh
chahiye.

So:

``` text
Tracking ID → courier company ke liye
Name        → receiver/application ke liye
```

React mein:

``` text
key   → React ke liye
props → component ke liye
```

### What does `key` do?

This:

``` jsx
<User key={101} name="Manav" />
```

React ko bol raha hai:

> **"React, is User ki identity 101 hai."**

React internally is identity ko reconciliation ke time use karta hai.

But `User` component ko agar ID ki zarurat hai, tumhe explicitly ID pass
karni padegi:

``` jsx
<User
  key={101}
  id={101}
  name="Manav"
/>
```

Now:

``` jsx
function User(props) {
  console.log(props.id);
}
```

Output:

``` text
101
```

Because:

``` text
key → React ke liye
id  → User ke liye
```

### Same value, different purpose

Compare:

``` jsx
<User
  key={101}
  id={101}
/>
```

`key`:

``` text
React → "Ye item kaun sa hai?"
```

`id`:

``` text
User component → "Is user ki ID kya hai?"
```

Same value ho sakti hai:

``` text
key = 101
id  = 101
```

But purpose different hai.

### Full real example

``` jsx
const users = [
  { id: 101, name: "Rahul" },
  { id: 102, name: "Aman" }
];

function App() {
  return (
    <>
      {users.map((user) => (
        <User
          key={user.id}
          id={user.id}
          name={user.name}
        />
      ))}
    </>
  );
}
```

Child:

``` jsx
function User({ id, name }) {
  return (
    <div>
      {id} - {name}
    </div>
  );
}
```

Output:

``` text
101 - Rahul
102 - Aman
```

Here:

``` text
key={user.id}
```

React ke liye.

And:

``` text
id={user.id}
```

Component ke liye.

### Important wording

Avoid saying:

> "`key` is not a prop."

A more precise interview wording is:

> **"`key` is a special React attribute. It isn't available to the
> component through `props` like normal props are."**

Because `key` is used by React itself.

### Interview question

Interviewer:

> **"Why can't you access `key` through props?"**

Answer:

> **"`key` is a special React attribute used internally to identify
> elements during reconciliation. React doesn't pass it to the component
> as a normal prop. If the component needs the same value, I pass it
> separately as another prop."**

Example:

``` jsx
<User key={user.id} id={user.id} />
```

Then:

``` jsx
function User({ id }) {
  console.log(id);
}
```

### One line to remember

``` text
key → React ke liye
props → Component ke liye
```

Example:

``` jsx
<User key={101} id={101} />
```

``` text
key = React ko identity batata hai
id  = User component ko data deta hai
```

**Dono ki value same ho sakti hai, lekin dono ka purpose alag hai.**

## 21. Mounting, Unmounting, and Changing Keys

This is a useful connection to component state.

### When an item is removed

Suppose:

``` jsx
{show && <Counter />}
```

When `show` becomes false, `Counter` is removed from the rendered tree
and unmounts.

If it is added again later, React mounts it again. Its local state
starts from its initial state.

### When a key changes

Suppose:

``` jsx
<Profile key={userId} userId={userId} />
```

If `userId` changes, the key changes too. React treats this as a
different component identity at that position. The old component is
unmounted and a new one is mounted, so the new component's local state
is initialized again.

This behavior can be useful when you deliberately want to reset a
component's state, but don't change keys unnecessarily.

## 22. Common Mistakes

### Mistake 1: Forgetting a key

``` jsx
{fruits.map((fruit) => (
  <p>{fruit}</p>
))}
```

Better:

``` jsx
{fruits.map((fruit) => (
  <p key={fruit}>{fruit}</p>
))}
```

Use a stable unique key. If duplicate fruit names are possible, use a
real ID.

### Mistake 2: Using array index for a changing list

Potentially risky:

``` jsx
{users.map((user, index) => (
  <User key={index} user={user} />
))}
```

Better:

``` jsx
{users.map((user) => (
  <User key={user.id} user={user} />
))}
```

### Mistake 3: Using random keys

Bad:

``` jsx
{users.map((user) => (
  <User key={Math.random()} user={user} />
))}
```

The key changes on every render.

### Mistake 4: Expecting `props.key` to work

Incorrect expectation:

``` jsx
function User(props) {
  console.log(props.key);
}
```

Instead:

``` jsx
<User key={user.id} id={user.id} />
```

### Mistake 5: Thinking keys must be globally unique

They only need to be unique among siblings in the same list.

### Mistake 6: Thinking keys are the entire reconciliation algorithm

Keys are one important part of reconciliation, not the whole process.

## 23. Interview Traps

### Q1. Why are keys needed?

Stable identity during reconciliation.

### Q2. Can I use index as key?

Technically yes, but avoid it when the list can be reordered, inserted
into, or deleted from.

### Q3. Can I use random values as keys?

No. They aren't stable.

### Q4. Do keys need to be globally unique?

No. Only among siblings.

### Q5. Is key available through props?

No. It is a special React attribute and isn't available as a normal
prop.

### Q6. What happens when key changes?

React can treat it as a different element/component identity, which can
cause the previous component instance and its state to be discarded and
a new one to be created.

That's a very important concept we'll revisit when studying state
preservation.

## 24. Interview-Ready Answers

### Q1. Explain keys in React.

> "Keys are stable, unique identifiers for elements in a list. React
> uses them during reconciliation to match items between renders and
> determine which items were added, removed, or moved. A good key should
> be stable and unique among its siblings, so we generally use an item's
> ID rather than its array index when the list can change."

That's already a solid interview answer.

### Q2. What is reconciliation?

> "Reconciliation is React's process of comparing the previous rendered
> element tree with the new one to determine the updates needed for the
> UI. Keys help React maintain stable identity for elements in lists
> during this process."

### Q3. Why is an array index often a bad key?

> "An index represents an item's current position, not its stable
> identity. If items are inserted, removed, or reordered, the same index
> can refer to a different item. This can cause React to associate
> component state with the wrong list item."

### Q4. Do keys need to be globally unique?

> "No. Keys only need to be unique among sibling elements in the same
> list."

### Q5. Why can't you access `key` through props?

> "`key` is a special React attribute used internally to identify
> elements during reconciliation. React doesn't pass it to the component
> as a normal prop. If the component needs the same value, I pass it
> separately as another prop."

### Q6. What happens when a key changes?

> "Changing a key changes the element's identity from React's
> perspective. React can unmount the old component and mount a new one,
> which resets its local state."

## 25. Final Mental Model

Remember this one picture:

``` text
             ARRAY
               |
               v
             map()
               |
       ┌───────┼───────┐
       v       v       v
       A       B       C
       |       |       |
       v       v       v
    key=1    key=2    key=3
       \       |       /
        \      |      /
             REACT
               |
               v
        RECONCILIATION
               |
               v
           UI UPDATE
```

Golden rule:

> **Key = identity of a list item.**

Not:

> "Key = something React needs just to stop a warning."

That's the difference between a beginner answer and an interview-level
answer.

### The three core definitions

**Reconciliation:**

> Old UI aur new UI ko compare karke changes find karna.

**Key:**

> List item ki stable identity.

**Why key?**

> Taaki React samajh sake ki kaunsa item same hai, kaunsa
> remove/add/move hua hai.

### Another analogy: Boxes with ID stickers

Imagine tumhare paas 3 boxes hain:

``` text
📦 Apple
📦 Mango
📦 Banana
```

Har box par ID sticker:

``` text
📦 Apple   → #101
📦 Mango   → #102
📦 Banana  → #103
```

Next day:

``` text
📦 Apple   → #101
📦 Banana  → #103
```

Tum turant dekh sakte ho:

``` text
#101 → still there
#102 → gone
#103 → still there
```

**React bhi list items ko identify karne ke liye key ka use karta hai.**

## 26. Mini Test and Practice

### Mini test

Initial list:

``` text
A → key 1
B → key 2
C → key 3
```

New list:

``` text
A → key 1
C → key 3
D → key 4
```

What changes will React identify?

Answer:

``` text
A → same
B → removed
C → same
D → added
```

### Practice 1: Render a list

Given:

``` javascript
const fruits = ["Apple", "Mango", "Banana"];
```

Write JSX that renders each fruit in a paragraph and supplies a key.

**One possible answer:**

``` jsx
{fruits.map((fruit) => (
  <p key={fruit}>{fruit}</p>
))}
```

This assumes the fruit values are unique in the list.

### Practice 2: Use IDs

Given:

``` javascript
const users = [
  { id: 101, name: "Rahul" },
  { id: 102, name: "Aman" }
];
```

Render a `User` component for each user. Make sure the key is used for
React and the ID is also passed as ordinary data.

**One possible answer:**

``` jsx
{users.map((user) => (
  <User
    key={user.id}
    id={user.id}
    name={user.name}
  />
))}
```

### Practice 3: Spot the problem

What's risky here?

``` jsx
{users.map((user, index) => (
  <User key={index} user={user} />
))}
```

**Answer:** If the list can be reordered, inserted into, or have items
removed, an index can point to a different item on a later render.
Prefer a stable ID.

### Practice 4: Why is this wrong?

``` jsx
function User(props) {
  return <p>{props.key}</p>;
}
```

**Answer:** `key` is not passed as a normal prop. Pass the value
separately:

``` jsx
<User key={user.id} id={user.id} />
```

### Practice 5: Explain reconciliation in your own words

Try to explain it without using complicated words.

**Expected idea:** React compares the previous and next UI descriptions
to figure out what needs to change. Keys help it match the correct items
in a list.

## 27. Quick Revision Cheat Sheet

  -----------------------------------------------------------------------
  Concept                             Simple meaning
  ----------------------------------- -----------------------------------
  Array                               A collection of items

  `map()`                             Goes through an array and returns a
                                      new result for each item

  React list                          UI created by mapping over data

  Key                                 Stable identity for a list item

  Stable key                          Same logical item keeps the same
                                      key across renders

  Unique among siblings               No two sibling items should have
                                      the same key

  Index key                           Uses current array position; can be
                                      risky for changing lists

  Random key                          Bad because it changes between
                                      renders

  Reconciliation                      React figures out how the new
                                      element tree relates to the
                                      previous one

  `key` vs `id`                       `key` is for React; `id` can be
                                      passed to the component as data

  Changed key                         Can cause the old component to be
                                      replaced with a new one
  -----------------------------------------------------------------------

### Golden rules

1.  Use `map()` to turn array data into UI.
2.  Give each list item a stable key.
3.  Prefer a real ID from the data.
4.  Avoid array indexes when the list can change.
5.  Never generate random keys during rendering.
6.  Keys need to be unique among siblings, not globally.
7.  `key` is not available through `props`; pass the same value
    separately if the component needs it.
8.  Keys help reconciliation, but reconciliation is broader than keys.

------------------------------------------------------------------------

## Lesson Complete

You have covered **Lists & Keys** from beginner to interview level:

-   Arrays and `map()`
-   Rendering lists in React
-   Why React asks for keys
-   Keys as stable item identities
-   Why index keys can cause bugs
-   Stable IDs vs random keys
-   Keys being unique among siblings
-   Why `key` is not available through `props`
-   The difference between `key` and `id`
-   Reconciliation explained from zero
-   Component identity, mounting, and state
-   Interview traps, answers, and practice questions

**Core takeaway:**

> `map()` creates the list of React elements. Keys give those elements
> stable identities. Reconciliation uses that identity, along with other
> information, to work out how the UI should change.

You can now move on to the next React topic after you are comfortable
explaining these ideas in your own words.
