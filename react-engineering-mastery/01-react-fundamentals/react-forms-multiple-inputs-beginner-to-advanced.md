# React Forms --- Multiple Inputs and Form Submission

## Beginner to Advanced \| Super Easy Hinglish Notes

> Is chapter mein hum React ka ek simple Login Form banayenge. Goal sirf
> code yaad karna nahi hai --- har line ka reason samajhna hai.

------------------------------------------------------------------------

## 1. Form kya hota hai?

Form ka use user se information lene ke liye hota hai.

Examples: - Login form: username/email aur password - Signup form: name,
email, password - Contact form: name, message - Search form: search text

Is chapter mein hum ye screen banayenge:

``` text
Username: [________________]

Password: [________________]

           [ Login ]
```

Hum do inputs rakhenge: 1. Username 2. Password

Aur Login button click karne par form ka data handle karenge.

## 2. Pehle complete code dekho

Abhi code thoda bada lag sakta hai. Koi tension nahi --- neeche hum isko
ek-ek part mein samjhenge.

``` jsx
import { useState } from "react";

function App() {
    const [form, setForm] = useState({
        username: "",
        password: ""
    });

    function handleChange(event) {
        const { name, value } = event.target;

        setForm({
            ...form,
            [name]: value
        });
    }

    function handleSubmit(event) {
        event.preventDefault();

        console.log(form);
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Username"
            />

            <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
            />

            <button type="submit">
                Login
            </button>
        </form>
    );
}

export default App;
```

## 3. `useState` se form ka data store karna

``` jsx
import { useState } from "react";
```

Hum React se `useState` import kar rahe hain, kyunki user jo type karega
us value ko React state mein rakhna hai.

Pehle simple counter yaad karo:

``` jsx
const [count, setCount] = useState(0);
```

-   `count` = current value
-   `setCount` = count ko update karne wala function

Form mein bhi same idea hai:

``` jsx
const [form, setForm] = useState({
    username: "",
    password: ""
});
```

-   `form` = current form data
-   `setForm` = form data update karne wala function
-   `useState(...)` ke andar initial form data diya hai

Initially state kuch aisi hai:

``` text
form
│
├── username → ""
└── password → ""
```

Dono fields empty strings se start ho rahi hain.

**Object state kyun?**

Kyunki humare paas multiple related values hain. Har input ke liye alag
state banana possible hai:

``` jsx
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
```

Lekin object state mein related form fields ek jagah mil jaati hain:

``` jsx
const [form, setForm] = useState({
    username: "",
    password: ""
});
```

Dono approaches valid hain. Is lesson mein hum object state use kar rahe
hain.

## 4. Component aur JSX form

``` jsx
function App() {
    // state and event handlers
}
```

`App` ek React component hai. Iske `return` ke andar hum batate hain ki
screen par kya render hona chahiye.

``` jsx
return (
    <form onSubmit={handleSubmit}>
        ...
    </form>
);
```

`<form>` HTML ka form element hai. Iske andar input fields aur submit
button rakhe jaate hain.

## 5. Pehla input --- username

``` jsx
<input
    name="username"
    value={form.username}
    onChange={handleChange}
    placeholder="Username"
/>
```

Is input ki har property ka apna kaam hai.

### `name="username"`

Ye input ko ek field-name deta hai.

Simple meaning:

> Ye username wala input hai.

Baad mein isi `name` ki help se hum identify karenge ki user ne kaunsa
field change kiya.

### `value={form.username}`

Iska matlab input ki displayed value React state ke `form.username` se
aayegi.

Initially:

``` text
form.username = ""
        ↓
input ki value = ""
```

Agar state mein:

``` js
form.username = "Manav"
```

toh input mein `Manav` show hoga.

Is tarah input aur React state connected rehte hain.

### `onChange={handleChange}`

Iska matlab:

> User input ki value change kare, toh `handleChange` function chalao.

Example:

``` text
User types "M"
       ↓
input changes
       ↓
onChange fires
       ↓
handleChange runs
```

Dhyaan do: hum function ko pass kar rahe hain:

``` jsx
onChange={handleChange}
```

Hum `handleChange()` nahi likh rahe. Parentheses laga kar function call
karne ka matlab hota hai usse turant execute karna, jabki yahan hume
function event hone par chalana hai.

### `placeholder="Username"`

Placeholder sirf ek hint hai. Empty input mein `Username` text dikhega.
User type karna shuru karega toh placeholder hat jaata hai.

## 6. Doosra input --- password

``` jsx
<input
    name="password"
    type="password"
    value={form.password}
    onChange={handleChange}
    placeholder="Password"
/>
```

Ye bhi pehle input jaisa hi hai. Main differences:

-   `name="password"` --- ye password field hai.
-   `value={form.password}` --- iski value state ke password field se
    aati hai.
-   `type="password"` --- browser typed characters ko hide/mask karta
    hai.
-   `onChange={handleChange}` --- same change handler use hota hai.

Dono inputs ka structure same hai, bas `name` aur `value` alag hain.

## 7. Controlled input ka connection

Jab input ki value React state se set hoti hai aur `onChange` ke through
state update hoti hai, toh use **controlled input** kehte hain.

``` jsx
<input
    value={form.username}
    onChange={handleChange}
/>
```

Iska simple flow:

``` text
React state
    ↓
input ki value
    ↓
user types
    ↓
onChange handler
    ↓
state update
    ↓
React re-render
    ↓
input updated state value show karta hai
```

Yaani React state input ki value ko control kar rahi hai.

## 8. `handleChange(event)` kya karta hai?

``` jsx
function handleChange(event) {
    // input change hone par yahan code chalega
}
```

Humne dono inputs par `onChange={handleChange}` lagaya hai. Isliye
username ya password --- kisi bhi input mein change hoga, toh same
function chalega.

React event handler ko event object deta hai. Humne parameter ka naam
`event` rakha hai; ise `e` bhi likh sakte hain:

``` jsx
function handleChange(e) {
    // e is the event object
}
```

`event` ek information packet ki tarah hai. Ismein event ke baare mein
details hoti hain.

## 9. `event.target` --- kis input mein change hua?

``` jsx
function handleChange(event) {
    console.log(event.target);
}
```

`event.target` us actual HTML element ko refer karta hai jis par event
hua.

Agar username input mein type kiya:

``` text
event.target
      ↓
username wala <input>
```

Agar password input mein type kiya:

``` text
event.target
      ↓
password wala <input>
```

Isliye same handler ko pata chal sakta hai ki change kis input mein hua.

## 10. `event.target.name` --- kaunsa field?

Humne inputs mein ye likha tha:

``` jsx
<input name="username" />
<input name="password" />
```

Toh:

-   Username input ke event mein `event.target.name` ki value
    `"username"` hogi.
-   Password input ke event mein `event.target.name` ki value
    `"password"` hogi.

Yaani `name` hume batata hai **kaunsa field change hua**.

## 11. `event.target.value` --- user ne kya type kiya?

`event.target.value` input ki current value deta hai.

Example: user username input mein `Manav` type karta hai.

``` text
event.target.name  → "username"
event.target.value → "Manav"
```

Password input mein user `1234` type kare:

``` text
event.target.name  → "password"
event.target.value → "1234"
```

Yaani: - `name` = kaunsa input/field? - `value` = us input mein abhi kya
value hai?

## 12. Destructuring --- ek shortcut

Hum ye likh sakte hain:

``` jsx
const name = event.target.name;
const value = event.target.value;
```

Lekin JavaScript object destructuring se same kaam short mein kar sakte
hain:

``` jsx
const { name, value } = event.target;
```

Iska matlab:

> `event.target` object se `name` aur `value` properties nikaal kar same
> naam ke variables bana do.

Dono versions ka result same hai.

Example:

``` js
// Suppose event.target has:
{
    name: "username",
    value: "Manav"
}

// Destructuring ke baad:
name  // "username"
value // "Manav"
```

## 13. Ab main line --- `setForm`

``` jsx
setForm({
    ...form,
    [name]: value
});
```

Ye line current form state update karti hai. Isko teen parts mein
samjho:

1.  `setForm(...)` --- state update karne ke liye.
2.  `...form` --- purane form ki properties copy karne ke liye.
3.  `[name]: value` --- jis field mein change hua, us field ko new value
    dene ke liye.

### 13.1 `...form` --- purana data copy karna

Suppose current state hai:

``` js
form = {
    username: "",
    password: ""
};
```

`...form` object ki existing enumerable properties ko naye object mein
copy karta hai. Is example mein result roughly ye hoga:

``` js
{
    username: "",
    password: ""
}
```

**Important:** React state objects ko directly mutate nahi karna
chahiye. Hum existing object ko change karne ke bajay ek naya object
bana kar setter ko dete hain.

### 13.2 `[name]: value` --- computed property name

Square brackets yahan JavaScript ka **computed property name** syntax
hain.

Suppose:

``` js
name = "username";
value = "Manav";
```

Then:

``` js
[name]: value
```

becomes:

``` js
username: "Manav"
```

Agar:

``` js
name = "password";
value = "1234";
```

Then:

``` js
[name]: value
```

becomes:

``` js
password: "1234"
```

Square brackets ka matlab hai property ka naam variable `name` ki
current value se decide hoga.

### 13.3 Dono ko combine karo

Full line:

``` jsx
setForm({
    ...form,
    [name]: value
});
```

Roughly iska meaning:

> Purane form ki saari fields copy karo, phir jis field ka naam `name`
> mein hai uski value `value` se replace kar do.

## 14. Dry run --- username update

Initial state:

``` js
form = {
    username: "",
    password: ""
};
```

User username input mein `Manav` type karta hai.

Handler ko milta hai:

``` js
name = "username";
value = "Manav";
```

Ab:

``` jsx
setForm({
    ...form,
    [name]: value
});
```

Conceptually becomes:

``` jsx
setForm({
    username: "",
    password: "",
    username: "Manav"
});
```

Object mein same property dobara likhi gayi hai, toh later value final
value hoti hai. Result:

``` js
form = {
    username: "Manav",
    password: ""
};
```

Password field safe rehti hai.

## 15. Dry run --- password update

Ab current state:

``` js
form = {
    username: "Manav",
    password: ""
};
```

User password input mein `1234` type karta hai.

Handler ko milta hai:

``` js
name = "password";
value = "1234";
```

Update ke baad:

``` js
form = {
    username: "Manav",
    password: "1234"
};
```

Username bhi preserve raha aur password update ho gaya.

**Isi wajah se ek hi `handleChange` function multiple inputs ke liye
kaam karta hai.** Har input ka `name` alag hai, isliye handler ko pata
chal jaata hai kis property ko update karna hai.

## 16. `...form` kyun zaroori hai?

Suppose hum sirf ye likhein:

``` jsx
setForm({
    username: "Manav"
});
```

Toh naya state object sirf username property rakhega. Password property
us naye object mein nahi hogi.

React `useState` object ko automatically merge nahi karta. Setter ko jo
naya object doge, wahi next state banega.

Isliye existing fields preserve karne ke liye spread use karte hain:

``` jsx
setForm({
    ...form,
    username: "Manav"
});
```

Result:

``` js
{
    username: "Manav",
    password: ""
}
```

### Important advanced clarification: functional state update

React state updates schedule kar sakta hai. Jab next state previous
state par depend karti ho, robust pattern functional updater hai:

``` jsx
setForm(previousForm => ({
    ...previousForm,
    [name]: value
}));
```

Yahan `previousForm` React ki latest previous state hoti hai. Isse stale
state read karne ka risk avoid hota hai, especially jab updates close
together schedule hon.

Beginner example mein tumhe ye version bhi samajhna chahiye:

``` jsx
setForm({
    ...form,
    [name]: value
});
```

Lekin production code mein previous state par dependent updates ke liye
functional updater achha habit hai.

## 17. Ab form submit kaise hota hai?

Form element:

``` jsx
<form onSubmit={handleSubmit}>
    ...
</form>
```

Iska matlab:

> Jab form submit hoga, `handleSubmit` function chalega.

Submit button:

``` jsx
<button type="submit">
    Login
</button>
```

`type="submit"` browser ko batata hai ki ye button apne form ko submit
karega.

Flow:

``` text
User clicks Login
        ↓
Form submit hota hai
        ↓
onSubmit event fires
        ↓
handleSubmit(event) runs
```

Button click ke alawa, form mein Enter press karne par bhi submit ho
sakta hai, depending on form structure and browser behavior.

## 18. `handleSubmit(event)` function

``` jsx
function handleSubmit(event) {
    event.preventDefault();

    console.log(form);
}
```

Is function ke andar hum form submit hone par kya karna hai, woh likhte
hain.

### 18.1 `event.preventDefault()` kya karta hai?

Simple meaning:

> Browser ka is event ke liye normal/default action hone se rok do.

HTML form ka normal submit behavior page navigation ya reload trigger
kar sakta hai, depending on form attributes and browser behavior.

Hum React mein submit ko khud handle karna chahte hain, isliye:

``` jsx
event.preventDefault();
```

likhte hain.

Without it, browser normal form submission perform kar sakta hai. With
it:

``` text
User clicks Submit
        ↓
submit event fires
        ↓
preventDefault()
        ↓
browser ka default form action cancel
        ↓
React handler ka remaining code runs
```

Example:

``` jsx
function handleSubmit(event) {
    event.preventDefault();

    console.log("Form submitted!");
}
```

**Yaad rakho:** `preventDefault()` event ka default browser action rokta
hai. Ye event bubbling ko nahi rokta. Bubbling rokne ke liye alag method
`stopPropagation()` hota hai.

### 18.2 `console.log(form)`

``` jsx
console.log(form);
```

Ab hum current form state console mein dekh rahe hain.

Agar user ne enter kiya:

``` text
Username: Manav
Password: 1234
```

Toh console mein form data kuch aisa dikhega:

``` js
{
    username: "Manav",
    password: "1234"
}
```

Yaani React state mein poora form data available hai. Real application
mein isi point par hum validation kar sakte hain ya API request bhej
sakte hain.

## 19. Complete journey --- ek story ki tarah

### Starting state

``` js
{
    username: "",
    password: ""
}
```

### User username mein `Manav` type karta hai

``` text
User types
    ↓
onChange
    ↓
handleChange(event)
    ↓
event.target
    ↓
name = "username"
value = "Manav"
    ↓
setForm(...)
    ↓
username update
```

State:

``` js
{
    username: "Manav",
    password: ""
}
```

### User password mein `1234` type karta hai

``` text
User types
    ↓
onChange
    ↓
handleChange(event)
    ↓
name = "password"
value = "1234"
    ↓
setForm(...)
    ↓
password update
```

State:

``` js
{
    username: "Manav",
    password: "1234"
}
```

### User Login click karta hai

``` text
Click Login
    ↓
form submit
    ↓
onSubmit
    ↓
handleSubmit(event)
    ↓
preventDefault()
    ↓
console.log(form)
```

Output:

``` js
{
    username: "Manav",
    password: "1234"
}
```

## 20. React re-render ka role

Jab `setForm` se state update hoti hai, React component ko dobara render
karta hai.

Example:

``` text
User types "M"
      ↓
handleChange runs
      ↓
setForm updates state
      ↓
React schedules/re-renders component
      ↓
value={form.username} gets updated value
      ↓
input displays "M"
```

State update karne ke liye input ko directly DOM mein change karne ki
zaroorat nahi hoti. Controlled input mein React state source of truth
hoti hai.

## 21. Golden pattern --- input ko dekhkar samjho

``` jsx
<input
    name="username"
    value={form.username}
    onChange={handleChange}
/>
```

Iska matlab:

  Code         Simple meaning
  ------------ -----------------------------------------------
  `name`       Kaunsa field hai?
  `value`      State mein is field ki current value kya hai?
  `onChange`   User change kare toh kaunsa handler chale?

Aur:

``` jsx
<form onSubmit={handleSubmit}>
```

Matlab:

> Form submit hoga toh `handleSubmit` chalega.

## 22. Common mistakes

### Mistake 1: Function ko turant call kar dena

Wrong for this use:

``` jsx
<input onChange={handleChange()} />
```

Usually correct:

``` jsx
<input onChange={handleChange} />
```

React ko handler function reference do, taaki event hone par woh call
kare.

### Mistake 2: `name` attribute bhool jaana

Agar common handler `event.target.name` read karta hai, toh har input
par correct `name` dena zaroori hai.

``` jsx
<input name="username" ... />
<input name="password" ... />
```

### Mistake 3: Spread bhool jaana

Potentially wrong:

``` jsx
setForm({
    [name]: value
});
```

Isse object mein sirf changed property rahegi; baaki fields drop ho
sakti hain.

Better:

``` jsx
setForm(previousForm => ({
    ...previousForm,
    [name]: value
}));
```

### Mistake 4: State ko directly mutate karna

Avoid:

``` jsx
form.username = "Manav";
```

State ko directly mutate mat karo. Setter ke through naya object do:

``` jsx
setForm(previousForm => ({
    ...previousForm,
    username: "Manav"
}));
```

### Mistake 5: Submit par `preventDefault()` bhool jaana

Agar tum browser ka normal form submission nahi chahte, toh submit
handler mein:

``` jsx
event.preventDefault();
```

use karo.

### Mistake 6: Password ko plain text input banana

Password field ke liye:

``` jsx
<input type="password" />
```

use karo, taaki characters screen par mask ho sakein. Note: masking sirf
display behavior hai; ye data ko secure/encrypt nahi karta.

## 23. Interview questions and answers

### Q1. How do you handle multiple inputs in React?

**Answer:**

"I can store multiple form values in a single object state. Each input
has a `name` attribute that identifies the field. A common change
handler reads `event.target.name` and `event.target.value`, then updates
the changed field while preserving the other fields."

Example:

``` jsx
function handleChange(event) {
    const { name, value } = event.target;

    setForm(previousForm => ({
        ...previousForm,
        [name]: value
    }));
}
```

### Q2. Why do we use `...form`?

**Answer:**

"Because a React state setter replaces the state value; it does not
automatically merge object properties. The spread operator copies the
existing fields into a new object, and then we overwrite only the field
that changed."

### Q3. What is a controlled input?

**Answer:**

"A controlled input is an input whose value is controlled by React
state. We pass the state value through the `value` prop and update that
state using an event handler such as `onChange`."

### Q4. What does `event.target` refer to?

**Answer:**

"It refers to the actual DOM element on which the event occurred. For an
input change event, it is the input element."

### Q5. What is the difference between `event.target.name` and `event.target.value`?

**Answer:**

"`name` identifies which form field changed, while `value` contains the
current value entered in that field."

### Q6. Why do we call `event.preventDefault()` in a form submit handler?

**Answer:**

"It prevents the browser's default form submission behavior, such as
navigating or reloading the page, so that we can handle submission in
our React code."

### Q7. Why use a functional state update?

**Answer:**

"When the next state depends on the previous state, a functional updater
receives the latest previous state and helps avoid relying on a
potentially stale render value."

## 24. Advanced notes --- practical form handling

The simple login form teaches the core pattern. Real forms often add
more features:

-   Validation: check whether required fields are filled.
-   Error messages: show what's wrong near the relevant input.
-   Loading state: disable the button while a request is in progress.
-   API submission: send form data to a backend.
-   Success/error state: show the result of the request.
-   Reset: clear the fields after successful submission.

Example of a basic required-field check:

``` jsx
function handleSubmit(event) {
    event.preventDefault();

    if (!form.username || !form.password) {
        console.log("Please fill both fields");
        return;
    }

    console.log("Ready to submit:", form);
}
```

This is only a simple client-side check. Real applications must also
validate data on the server. Never treat client-side validation as a
security boundary.

### A note about password handling

For learning, we log the form object to understand the flow. In a real
app, avoid logging passwords or exposing them unnecessarily. Send
credentials only to a trusted backend over HTTPS, and let the backend
handle authentication securely.

## 25. Quick revision cheat sheet

``` text
useState
  → form data store karta hai

name
  → field identify karta hai

value
  → input ki current value

onChange
  → input change hone par handler chalata hai

event.target
  → jis input par event hua

event.target.name
  → kaunsa field change hua

event.target.value
  → user ne kya value enter ki

const { name, value } = event.target
  → name aur value nikaalne ka shortcut

...form
  → existing form properties copy karta hai

[name]: value
  → dynamic field ko update karta hai

setForm(...)
  → state update karta hai

<form onSubmit={handleSubmit}>
  → form submit hone par handler chalata hai

event.preventDefault()
  → browser ka default submit action rokta hai

<button type="submit">
  → form submit karta hai
```

## 26. Practice questions

Try these yourself:

1.  Add an `email` field to the form.
2.  Add `name="email"` and connect it to `form.email`.
3.  Use the same `handleChange` function for all three inputs.
4.  Add a `console.log(form)` on submit.
5.  What would happen if you removed `...form` from the state update?
6.  If `name` is `"email"` and `value` is `"hello@example.com"`, what
    does `[name]: value` become?
7.  Why is `onChange={handleChange}` used instead of
    `onChange={handleChange()}`?
8.  What does `preventDefault()` stop in a form?

------------------------------------------------------------------------

## Final mental model

**Input side:**

``` text
User types
    ↓
onChange
    ↓
handleChange(event)
    ↓
event.target gives the input
    ↓
name tells which field
value tells the new text
    ↓
setForm copies old state + updates one field
    ↓
React re-renders
```

**Submit side:**

``` text
User clicks Login
    ↓
form submits
    ↓
onSubmit
    ↓
handleSubmit(event)
    ↓
preventDefault()
    ↓
React code handles the form data
```

### Poora concept ek line mein

> User input mein type karta hai → `onChange` handler ko event milta hai
> → `name` batata hai kaunsa field change hua aur `value` batata hai new
> value kya hai → `setForm` baaki fields preserve karke state update
> karta hai → Login par `onSubmit` chalta hai aur `preventDefault()`
> browser ka default form action rokta hai.

**Next topic:** `useRef` --- ye `useState` se kaise different hai, aur
React interviews mein dono ka comparison kyun important hai.
