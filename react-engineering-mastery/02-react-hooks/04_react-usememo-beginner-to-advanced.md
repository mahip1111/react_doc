# React `useMemo`

## Beginner to Advanced \| Super Easy Hinglish Notes

> Is chapter mein hum sirf ek main question se start karenge:
> **`useMemo` ki zarurat kyun padti hai?** Phir dheere-dheere syntax,
> dependency array, dry runs, practical example aur interview questions
> samjhenge.

------------------------------------------------------------------------

## 1. Pehle normal calculation dekho

Ek simple React component:

``` jsx
import { useState } from "react";

function App() {
    const [count, setCount] = useState(0);

    const result = 10 * 20;

    return (
        <div>
            <h1>{result}</h1>

            <button onClick={() => setCount(count + 1)}>
                {count}
            </button>
        </div>
    );
}
```

Yahan:

``` js
const result = 10 * 20;
```

Har baar component render hoga, ye calculation dobara execute hogi.

``` text
First render
    ↓
10 * 20
    ↓
result = 200

Button click → state update → re-render
    ↓
10 * 20 dobara execute

Another re-render
    ↓
10 * 20 phir execute
```

Kya ye problem hai?

**Nahi.** `10 * 20` bahut chhoti calculation hai. Isko dobara calculate
karne mein practically koi meaningful problem nahi hai.

Normal calculations ko normal hi rehne do.

------------------------------------------------------------------------

## 2. Ab imagine karo calculation bahut heavy hai

Suppose component mein ek expensive calculation hai:

``` jsx
const result = veryHeavyCalculation();
```

Maan lo is calculation ko complete hone mein kaafi time lagta hai.

Ab user ek unrelated button click karta hai:

``` text
User clicks button
       ↓
count state changes
       ↓
React component re-renders
       ↓
veryHeavyCalculation() runs again
```

Lekin socho:

-   Calculation `count` par depend hi nahi karti.
-   User ne sirf `count` change kiya.
-   Heavy calculation ka result abhi bhi same hona chahiye.

Toh us calculation ko har unrelated render par dobara chalana
unnecessary work ho sakta hai.

**Yahin `useMemo` useful ho sakta hai.**

------------------------------------------------------------------------

## 3. `useMemo` kya karta hai?

``` jsx
const result = useMemo(() => {
    return veryHeavyCalculation();
}, []);
```

Simple meaning:

> React, is calculation ka result yaad rakhna. Jab tak iski dependencies
> change nahi hoti, cached result reuse karna.

`memoize` ka simple meaning hai **result ko remember/cache karna**.

``` text
Calculation run
      ↓
Result = 200
      ↓
React result cache karta hai
      ↓
Component re-render
      ↓
Dependencies same?
      ↓
Cached result reuse ho sakta hai
```

Yaani `useMemo` calculation ke result ko cache karta hai, function ko
nahi.

------------------------------------------------------------------------

## 4. `useMemo` ka basic syntax

``` jsx
const result = useMemo(() => {
    return 10 * 20;
}, []);
```

Isko parts mein samjho:

  Part               Meaning
  ------------------ ----------------------------------------
  `useMemo`          React Hook
  `() => { ... }`    Calculation karne wala function
  `return 10 * 20`   Calculation ka result
  `[]`               Dependency array
  `result`           `useMemo` se milne wali memoized value

`useMemo` ke andar hum ek function dete hain. React us function ko
render ke waqt call karta hai jab value calculate/recalculate karni hoti
hai.

**Important:** `useMemo` ke callback ke andar side effects mat karo. Ye
calculation pure honi chahiye --- same inputs par same result de aur
bahar ki cheezon ko change na kare.

------------------------------------------------------------------------

## 5. Empty dependency array `[]` ka meaning

Example:

``` jsx
const result = useMemo(() => {
    return 10 * 20;
}, []);
```

`[]` dependency array hai.

Iska matlab:

> Is memoized calculation ki koi reactive dependency nahi hai. Component
> ke mount hone par calculation hoti hai aur normal re-renders par
> cached result reuse hota hai.

Conceptual flow:

``` text
Initial render
      ↓
10 * 20 calculate
      ↓
Result = 200
      ↓
Cached result

Next render
      ↓
Dependencies changed?
      ↓
No dependencies
      ↓
Cached result reuse
```

**Small clarification:** React development Strict Mode mein kuch
functions ko extra baar call kar sakta hai, taaki impure code detect ho
sake. Isliye `useMemo` ko exactly ek baar execute hone ki guarantee mat
samjho. Iska purpose performance optimization hai, exact execution count
guarantee karna nahi.

------------------------------------------------------------------------

## 6. Dependency array kya hoti hai?

Ab ek important example:

``` jsx
const [number, setNumber] = useState(1);

const square = useMemo(() => {
    return number * number;
}, [number]);
```

Yahan:

-   `number` = state value
-   `square` = memoized calculation ka result
-   `[number]` = calculation `number` par depend karti hai

Initially:

``` text
number = 1
    ↓
1 * 1
    ↓
square = 1
```

Agar `number` change hokar `2` ho jaata hai:

``` text
number: 1 → 2
       ↓
React dependency check karta hai
       ↓
number changed
       ↓
Calculation runs again
       ↓
2 * 2
       ↓
square = 4
```

Simple rule:

> Dependency array mein jo reactive values di hain, unmein se koi change
> hoti hai toh React calculation dobara run karta hai.

------------------------------------------------------------------------

## 7. Agar dependency change nahi hui toh?

Ab maan lo component mein ek aur state hai:

``` jsx
const [number, setNumber] = useState(1);
const [name, setName] = useState("");
```

Memoized calculation:

``` jsx
const square = useMemo(() => {
    console.log("Calculation running");
    return number * number;
}, [number]);
```

Ab do alag situations dekho.

### Situation A --- `name` change hua

User input mein `"A"` type karta hai:

``` text
name changes
    ↓
Component re-renders
    ↓
useMemo checks [number]
    ↓
number same hai
    ↓
Cached square reuse
```

Calculation dobara chalane ki zarurat nahi, kyunki `number` change nahi
hua.

### Situation B --- `number` change hua

User Increase Number button click karta hai:

``` text
number changes
    ↓
Component re-renders
    ↓
useMemo checks [number]
    ↓
number changed
    ↓
Calculation runs again
```

Yahi `useMemo` ka central idea hai.

------------------------------------------------------------------------

## 8. Complete practical example

``` jsx
import { useMemo, useState } from "react";

function App() {
    const [number, setNumber] = useState(1);
    const [name, setName] = useState("");

    const square = useMemo(() => {
        console.log("Calculation running");

        return number * number;
    }, [number]);

    return (
        <div>
            <h1>Square: {square}</h1>

            <button onClick={() => setNumber(number + 1)}>
                Increase Number
            </button>

            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name"
            />
        </div>
    );
}

export default App;
```

### Step-by-step dry run

#### Initial render

``` js
number = 1;
name = "";
```

`useMemo` callback runs:

``` js
return number * number;
```

Calculation:

``` text
1 * 1 = 1
```

Screen:

``` text
Square: 1
```

Console:

``` text
Calculation running
```

#### User name input mein `A` type karta hai

Ab:

``` js
number = 1;
name = "A";
```

Name update hone se component re-render hota hai.

React `useMemo` ki dependency check karta hai:

``` jsx
[number]
```

`number` abhi bhi `1` hai. Isliye cached square `1` reuse hota hai.
Calculation callback ko dobara chalane ki zarurat nahi hoti.

#### User Increase Number click karta hai

Ab:

``` js
number = 2;
name = "A";
```

Component re-render hota hai.

React dependency check karta hai:

``` text
Old number = 1
New number = 2
       ↓
Dependency changed
       ↓
Calculation runs again
       ↓
2 * 2 = 4
```

Screen:

``` text
Square: 4
```

Console mein calculation message phir dikhega.

------------------------------------------------------------------------

## 9. Bahut important: `useMemo` ka matlab calculation kabhi dobara nahi chalegi --- nahi!

Wrong understanding:

> `useMemo` calculation ko sirf ek baar chalata hai.

Correct understanding:

> `useMemo` cached result reuse karta hai jab dependencies same hoti
> hain. Dependency change hone par calculation dobara chal sakti hai.

Example:

``` jsx
const square = useMemo(() => {
    return number * number;
}, [number]);
```

Agar `number`:

``` text
1 → 2
```

change hota hai, toh calculation dobara hogi.

------------------------------------------------------------------------

## 10. Dependency array mein kya rakhna chahiye?

Dependency array mein calculation ke andar use ki gayi reactive values
ko include karna chahiye --- jaise props, state, aur component ke andar
declare kiye gaye variables/functions jo calculation mein use ho rahe
hain.

Example:

``` jsx
const total = useMemo(() => {
    return price * quantity;
}, [price, quantity]);
```

Kyun?

Kyunki result dono values par depend karta hai:

``` text
price change?
    ↓
total recalculate

quantity change?
    ↓
total recalculate
```

Agar dono same hain, toh cached result reuse ho sakta hai.

**Rule:** Dependency array ko manually guess karke koi required
dependency miss mat karo. React Hooks lint rule ki guidance follow karo.

------------------------------------------------------------------------

## 11. Kya har calculation mein `useMemo` use karna chahiye?

**Nahi.** `useMemo` performance optimization hai, har calculation ke
liye requirement nahi.

### Cheap calculation

``` jsx
const sum = a + b;
```

Iske liye usually ye enough hai:

``` jsx
const sum = a + b;
```

Unnecessarily:

``` jsx
const sum = useMemo(() => a + b, [a, b]);
```

likhne ki zarurat nahi hoti.

### Expensive calculation

Agar calculation genuinely heavy hai aur re-renders mein same inputs ke
saath repeat ho rahi hai, toh `useMemo` consider kar sakte ho:

``` jsx
const filteredItems = useMemo(() => {
    return veryHeavyFiltering(items, searchTerm);
}, [items, searchTerm]);
```

Yahan result `items` aur `searchTerm` par depend karta hai.

**Golden rule:**

``` text
Calculation cheap hai?
        ↓
Normal calculation rakho

Calculation expensive hai
aur repeated renders mein same inputs hain?
        ↓
useMemo consider karo
```

Pehle performance problem identify karo; phir optimization add karo.

------------------------------------------------------------------------

## 12. `useMemo` performance optimization hai, correctness requirement nahi

Ye advanced but important clarification hai.

`useMemo` ko aise mat samjho ki tumhara code correct chalne ke liye
cache par depend karega. React cached value ko kuch specific situations
mein discard kar sakta hai, for example development edits ya initial
mount ke dauran suspension.

Isliye:

-   Calculation ka result dependencies ke basis par correct hona
    chahiye.
-   `useMemo` sirf unnecessary work reduce karne ke liye use karo.
-   Agar cache remove ho jaaye toh bhi application ka behavior correct
    rehna chahiye.

------------------------------------------------------------------------

## 13. Common mistakes

### Mistake 1 --- Har chhoti calculation memoize karna

Unnecessary:

``` jsx
const sum = useMemo(() => a + b, [a, b]);
```

Usually simple calculation directly likho:

``` jsx
const sum = a + b;
```

### Mistake 2 --- Dependency miss kar dena

Agar calculation `price` aur `quantity` dono use karti hai, toh dono
dependencies honi chahiye:

``` jsx
const total = useMemo(() => {
    return price * quantity;
}, [price, quantity]);
```

### Mistake 3 --- Sochna ki empty array ka matlab app ke lifetime mein guaranteed one execution hai

`[]` ka matlab component ke normal re-renders mein dependencies change
nahi hongi. Lekin development Strict Mode aur React ke cache behavior ki
wajah se exact one-time execution guarantee nahi hai.

### Mistake 4 --- `useMemo` ke andar side effect karna

Avoid:

``` jsx
const result = useMemo(() => {
    document.title = "Hello";
    return calculateSomething();
}, []);
```

`useMemo` callback calculation ke liye hai. Side effects ke liye
appropriate event handler ya `useEffect` use karo.

------------------------------------------------------------------------

## 14. Interview questions and answers

### Q1. What is `useMemo`?

**Answer:**

"`useMemo` is a React Hook that memoizes the result of a calculation.
React can reuse the cached value on subsequent renders while its
dependencies remain unchanged."

Simple version:

"`useMemo` helps avoid unnecessary repeated calculations by remembering
a previous result."

### Q2. Why do we use `useMemo`?

**Answer:**

"We use it as a performance optimization when a calculation is expensive
and would otherwise run again during renders even though its inputs have
not changed."

### Q3. What does the dependency array do?

**Answer:**

"The dependency array tells React which reactive values the calculation
depends on. If one of those dependencies changes, React recalculates the
value."

### Q4. What does an empty dependency array mean?

**Answer:**

"It means the calculation has no reactive dependencies. React can reuse
the memoized value across normal re-renders of that mounted component.
It does not guarantee that the callback will execute exactly once in
every development or lifecycle situation."

### Q5. Does `useMemo` prevent all re-renders?

**Answer:**

"No. `useMemo` does not prevent the component from re-rendering. It can
help skip recalculating a memoized value when its dependencies have not
changed."

### Q6. Should we use `useMemo` everywhere?

**Answer:**

"No. It adds some overhead and complexity. It should be used when it
provides a meaningful performance benefit, not for every simple
calculation."

### Q7. Is `useMemo` used to store a function?

**Answer:**

"`useMemo` stores the result returned by its calculation function. A
related Hook, `useCallback`, is used to memoize a function itself."

------------------------------------------------------------------------

## 15. Quick revision cheat sheet

``` text
useMemo
  → calculation ka result memoize/cache karta hai

Memoize
  → result yaad rakhna

useMemo(() => calculation, [])
  → no reactive dependencies

useMemo(() => calculation, [number])
  → number change hone par calculation dobara

Dependencies same
  → cached result reuse ho sakta hai

Dependencies changed
  → calculation dobara run hoti hai

Cheap calculation
  → normal calculation usually enough

Expensive repeated calculation
  → useMemo consider karo

useMemo
  → component re-render ko stop nahi karta
  → performance optimization hai
```

------------------------------------------------------------------------

## 16. Practice questions

Pehle khud answer try karna:

1.  Normal component render par `const result = 10 * 20` dobara execute
    hota hai?
2.  Kya har calculation ke liye `useMemo` zaroori hai?
3.  `useMemo` kya remember karta hai --- function ya calculation ka
    returned result?
4.  `[]` dependency array ka kya meaning hai?
5.  `[number]` mein `number` change ho toh kya hoga?
6.  Agar `name` state change ho aur `number` same rahe, toh square
    calculation dobara kyun nahi chalni chahiye?
7.  Kya `useMemo` component ke re-render ko rokta hai?
8.  `price * quantity` calculate kar rahe ho toh dependencies kya hongi?
9.  `useMemo` ke callback ke andar side effects kyun avoid karne
    chahiye?
10. Kya `useMemo` cache par application ki correctness depend karni
    chahiye?

### Small coding challenge

Ek component banao jisme:

-   `number` naam ki state ho, initial value `1`.
-   `name` naam ki state ho, initial value empty string.
-   `useMemo` se `number` ka square calculate karo.
-   Number increase karne ka button ho.
-   Name type karne ke liye input ho.
-   Calculation callback mein `console.log("Calculation running")` add
    karo.
-   Observe karo: name type karne par component re-render hota hai,
    lekin `number` same hone ki wajah se memoized calculation normally
    reuse hoti hai.

------------------------------------------------------------------------

## 17. Final mental model

``` text
Component render
       ↓
useMemo calculation
       ↓
Result calculate + cache
       ↓
Another render
       ↓
Dependencies changed?
      / \
    NO   YES
    ↓     ↓
Reuse   Calculate
cached  again
result
```

### Ek line mein poora concept

> **`useMemo` expensive calculation ke result ko cache karta hai, taaki
> dependencies same rehne par React unnecessary recalculation se bach
> sake.**

**Next topic: `useCallback`** --- ismein hum samjhenge ki `useMemo`
calculation ka result remember karta hai, jabki `useCallback` function
ko remember karta hai, aur dono ka actual difference kya hai.
