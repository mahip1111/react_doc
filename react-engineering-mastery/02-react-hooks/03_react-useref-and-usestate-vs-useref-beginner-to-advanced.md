# React `useRef` and `useState` vs `useRef`

## Beginner to Advanced \| Super Super Easy Hinglish Notes

> Is chapter ka goal hai `useRef` ko bilkul zero se samajhna: ref object
> kya hota hai, `.current` kya hai, DOM element ko kaise access karte
> hain, aur `useState` se iska difference kya hai.

------------------------------------------------------------------------

# Part 1 --- `useRef` ko zero se samjho

## 1. Sabse pehle `useState` yaad karo

Humne pehle ye padha tha:

``` jsx
const [count, setCount] = useState(0);
```

Iska matlab:

-   `count` = current value
-   `setCount` = value update karne ka function
-   `0` = initial value

Agar hum likhein:

``` jsx
setCount(1);
```

Toh React ko state update ka signal milta hai. React component ko dobara
render karta hai, taaki UI latest state ke according update ho sake.

``` text
setCount(1)
    ↓
state update
    ↓
React re-render
    ↓
UI latest value show karti hai
```

Simple rule:

> `useState` tab use karo jab value change hone par UI ko update karna
> ho.

## 2. Ab ek different situation socho

Maan lo hume bas koi value yaad rakhni hai.

Example:

``` text
10
```

Hum chahte hain:

> React, ye number yaad rakhna. Lekin jab main is number ko change
> karun, toh sirf is wajah se component ko dobara render mat karna.

Yahan `useRef` kaam aata hai.

``` jsx
const numberRef = useRef(10);
```

`useRef` ek ref object deta hai. Us object mein value `.current`
property ke andar hoti hai.

Conceptually:

``` js
numberRef = {
    current: 10
};
```

Ye sirf samajhne ke liye simplified picture hai. React ref object
provide karta hai.

## 3. `.current` kya hai?

`useRef` ki value read ya update karne ke liye `.current` use karte
hain.

``` jsx
const numberRef = useRef(10);

console.log(numberRef.current); // 10
```

Simple rule:

> Ref ke andar jo value rakhi hai, use access karna ho toh `.current`
> likho.

## 4. Ref ki value kaise change karte hain?

``` jsx
numberRef.current = 20;
```

Ab:

``` jsx
console.log(numberRef.current); // 20
```

Value change ho gayi.

Lekin important baat:

> `ref.current` change karne se React automatically re-render nahi
> karta.

``` text
numberRef.current = 20
        ↓
ref ki value change
        ↓
automatic re-render nahi
```

Isi wajah se ref aur state alag purposes ke liye use hote hain.

## 5. `useRef` ka easy analogy

Socho tumhare paas ek notebook hai.

-   Notebook mein `10` likha.
-   Baad mein use mita kar `20` likh diya.
-   Notebook ki value change ho gayi.
-   Lekin TV screen apne aap change nahi hui.

`useRef` kuch aisa hi hai:

``` text
useRef
  ↓
value yaad rakho
  ↓
value change kar sakte ho
  ↓
change se automatic UI update nahi hota
```

Analogy ka main point bas itna hai: value store/change ho sakti hai,
bina React ko re-render karne ka signal diye.

------------------------------------------------------------------------

# Part 2 --- `useRef` ka pehla example: value remember karna

## 6. Counter jaisa example, lekin ref ke saath

``` jsx
import { useRef } from "react";

function App() {
    const countRef = useRef(0);

    function handleClick() {
        countRef.current++;

        console.log(countRef.current);
    }

    return (
        <button onClick={handleClick}>
            Click
        </button>
    );
}

export default App;
```

Ab samjho:

### Step 1

``` jsx
const countRef = useRef(0);
```

Ref create hua aur initial value `0` hai.

``` text
countRef.current → 0
```

### Step 2

``` jsx
countRef.current++;
```

Har click par current value mein 1 add ho raha hai.

### Step 3

``` jsx
console.log(countRef.current);
```

Console mein updated value print hoti hai.

Clicks:

``` text
First click  → 1
Second click → 2
Third click  → 3
```

Console:

``` text
1
2
3
```

**Lekin screen automatically update nahi hoti.** Is example mein button
ka text same rahega, kyunki ref update React ko re-render karne ke liye
nahi kehta.

### Ek important clarification

Agar tum JSX mein ye likho:

``` jsx
<h1>{countRef.current}</h1>
```

toh ref ki value render ke waqt read hogi. Lekin baad mein
`countRef.current` change karne se React dobara render nahi karega.
Isliye heading automatically latest value show nahi karegi.

Ref ko UI display karne ke liye state ka replacement mat samjho.

------------------------------------------------------------------------

# Part 3 --- `useRef` ka famous use: DOM element access

## 7. DOM element kya hai?

Jab browser HTML render karta hai, toh woh page ke elements ka DOM
(Document Object Model) banata hai.

Example HTML:

``` html
<input />
<button>Focus</button>
```

Browser in elements ko DOM nodes/elements ke form mein represent karta
hai.

React app mein hume kabhi-kabhi kisi particular DOM element ko directly
access karna hota hai.

Example:

> Button click karte hi input par cursor le aana hai.

Is action ko **focus** karna kehte hain.

## 8. Hume kya banana hai?

Screen par:

``` text
[________________________]

       [ Focus Input ]
```

User button click kare aur cursor input ke andar aa jaye:

``` text
[|_______________________]
  ↑
cursor
```

React mein `useRef` se input element ka reference le sakte hain.

## 9. Step 1 --- Ref create karo

``` jsx
const inputRef = useRef(null);
```

Yahan:

-   `inputRef` = ref object
-   `null` = initial value
-   `.current` = initially `null`

``` text
inputRef.current
       ↓
      null
```

`null` ka simple meaning: abhi ref ke andar koi input element assign
nahi hua.

## 10. Step 2 --- Ref ko input se connect karo

``` jsx
<input ref={inputRef} />
```

Iska simple meaning:

> React, is input element ka reference `inputRef` ke saath connect kar
> do.

Jab React DOM mein input element create karke attach karta hai, toh us
ref ka `.current` us DOM element ko point karta hai.

``` text
inputRef
   ↓
.current
   ↓
<input> DOM element
```

React ref ko set karta hai. Hume manually input ko `inputRef.current`
mein assign nahi karna padta.

## 11. Step 3 --- Input ko access karo

``` jsx
console.log(inputRef.current);
```

Ab `.current` mein input ka DOM element milega.

Yaani:

``` text
inputRef.current
       ↓
   actual input
```

## 12. Step 4 --- `.focus()` call karo

``` jsx
inputRef.current.focus();
```

`.focus()` browser DOM input element ka method hai.

Iska matlab:

> Input ko focus karo, taaki user usmein type kar sake.

Example flow:

``` text
User clicks button
       ↓
handleClick()
       ↓
inputRef.current
       ↓
actual input element
       ↓
.focus()
       ↓
input gets focus
```

## 13. Complete focus example

``` jsx
import { useRef } from "react";

function App() {
    const inputRef = useRef(null);

    function handleClick() {
        inputRef.current.focus();
    }

    return (
        <div>
            <input ref={inputRef} />

            <button onClick={handleClick}>
                Focus Input
            </button>
        </div>
    );
}

export default App;
```

### Is code ki story

**1. Ref create hota hai:**

``` jsx
const inputRef = useRef(null);
```

Initially:

``` text
inputRef.current → null
```

**2. Input ko ref milta hai:**

``` jsx
<input ref={inputRef} />
```

React DOM element attach hone par ref ko input element se connect karta
hai.

**3. User button click karta hai:**

``` jsx
<button onClick={handleClick}>
    Focus Input
</button>
```

Click hone par `handleClick` chalta hai.

**4. Input ko focus karte hain:**

``` jsx
inputRef.current.focus();
```

-   `inputRef.current` = actual input element
-   `.focus()` = input ko focus karne ka method

Cursor input ke andar aa jaata hai.

## 14. `ref={inputRef}` ka matlab kya hai?

Ye:

``` jsx
<input ref={inputRef} />
```

React ko batata hai:

> Is DOM input element ka reference is ref object mein maintain karo.

Important difference:

-   `inputRef` = ref object
-   `inputRef.current` = actual DOM element (jab React ne attach kar
    diya ho)

## 15. Laptop wali analogy

Socho tumhare room mein 100 objects hain. Tumhe specifically laptop
chahiye.

Tum laptop tak pahunchne ka reference/address rakhte ho:

``` text
reference
   ↓
 laptop
```

React mein:

``` text
inputRef
   ↓
inputRef.current
   ↓
<input>
```

Ref object hume us specific DOM element tak pahunchne deta hai.

------------------------------------------------------------------------

# Part 4 --- `useRef` ka doosra use: timer ID yaad rakhna

## 16. Timer ID kya hoti hai?

JavaScript mein `setInterval()` repeated time interval par function
chalata hai.

``` jsx
const timerId = setInterval(() => {
    console.log("Hello");
}, 1000);
```

Yahan:

-   `setInterval` har 1000 milliseconds (1 second) baad callback chalata
    hai.
-   `setInterval` ek ID/handle return karta hai.
-   Us ID ko `clearInterval()` mein pass karke interval stop kar sakte
    hain.

``` jsx
clearInterval(timerId);
```

Kabhi hume timer ID ko renders ke beech remember karna hota hai, lekin
timer ID change hone par UI re-render nahi chahiye.

Tab ref useful hai:

``` jsx
const timerRef = useRef(null);
```

Start:

``` jsx
timerRef.current = setInterval(() => {
    console.log("Hello");
}, 1000);
```

Stop:

``` jsx
clearInterval(timerRef.current);
timerRef.current = null;
```

Yahan ref timer ID ko store kar raha hai. Ref change hone se automatic
re-render nahi hota.

**Note:** Timer start/stop ka UI status screen par dikhana ho, toh us
status ke liye state use kar sakte ho. Timer ID khud ref mein rakh sakte
ho.

------------------------------------------------------------------------

# Part 5 --- `useState` vs `useRef`

## 17. Sabse important question

Dono mein value rakh sakte hain:

``` jsx
const [count, setCount] = useState(0);
```

Aur:

``` jsx
const countRef = useRef(0);
```

Toh difference kya hai?

### `useState`

``` jsx
setCount(5);
```

Flow:

``` text
state update
    ↓
React re-render
    ↓
UI latest state show karti hai
```

### `useRef`

``` jsx
countRef.current = 5;
```

Flow:

``` text
ref value update
    ↓
automatic re-render nahi
    ↓
UI automatically update nahi hoti
```

**Golden rule:**

> UI mein value dikhani hai aur value change hone par UI update honi
> chahiye → `useState`.

> Value remember karni hai, lekin us value ke change par re-render nahi
> chahiye → `useRef`.

## 18. Example --- screen par counter dikhana

Suppose screen:

``` text
Count: 0

[ Increase ]
```

User button click kare toh screen par `0` se `1`, phir `2` hona chahiye.

Isliye state use karenge:

``` jsx
import { useState } from "react";

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <h1>Count: {count}</h1>

            <button onClick={() => setCount(count + 1)}>
                Increase
            </button>
        </>
    );
}
```

Kyun `useState`?

Kyunki count change hone par UI bhi change honi chahiye.

``` text
count = 0
   ↓ click
count = 1
   ↓
React re-render
   ↓
Count: 1
```

## 19. Example --- value remember karni hai, UI update nahi karni

``` jsx
import { useRef } from "react";

function App() {
    const countRef = useRef(0);

    function handleClick() {
        countRef.current++;
        console.log(countRef.current);
    }

    return (
        <button onClick={handleClick}>
            Increase
        </button>
    );
}
```

Clicks par console:

``` text
1
2
3
```

Lekin component sirf ref update hone ki wajah se re-render nahi hoga.

Agar JSX mein:

``` jsx
<h1>{countRef.current}</h1>
```

likh bhi do, toh ref update se heading automatically refresh nahi hogi.

## 20. Side-by-side comparison

  Question                                       `useState`                `useRef`
  ---------------------------------------------- ------------------------- --------------------
  Value store kar sakta hai?                     Yes                       Yes
  Value update kar sakte hain?                   Yes, setter se            Yes, `.current` se
  Update se automatic re-render?                 Yes, state update par     No
  UI ko update karne ke liye?                    Yes                       Usually no
  DOM element access?                            Is purpose ke liye nahi   Yes, common use
  Value re-renders ke beech persist karti hai?   Yes                       Yes
  Access kaise karte hain?                       State variable            `ref.current`

## 21. `useRef` ko har jagah `useState` ki jagah kyun nahi use karte?

Interviewer pooch sakta hai:

> Why don't we use `useRef` for everything instead of `useState`?

Easy answer:

Kyunki `ref.current` change hone par React re-render nahi karta. Agar
kisi value ko screen par latest form mein dikhana hai, toh React ko
state update ke through re-render ka signal chahiye.

Example:

-   Counter screen par dikhana hai → `useState`
-   Input ko focus karna hai → `useRef`
-   Timer ID yaad rakhni hai → `useRef`

------------------------------------------------------------------------

# Part 6 --- Re-render ke beech ref ka survive karna

## 22. Kya ref re-render ke baad bhi value yaad rakhta hai?

**Haan.** Component ke re-renders ke beech same ref object persist karta
hai.

Example:

``` jsx
const valueRef = useRef(0);
```

Agar:

``` jsx
valueRef.current = 10;
```

aur baad mein component kisi aur reason se re-render hota hai, toh ref
ki value `10` hi rahegi.

``` text
First render:
valueRef.current = 0

Change:
valueRef.current = 10

Some other state update causes re-render:
valueRef.current is still 10
```

Ye `useRef` ka important feature hai:

> Ref object renders ke beech same rehta hai, aur uska `.current` value
> preserve karta hai.

**Important:** Ref component ke re-renders ke beech persist karta hai,
lekin component unmount ho jaaye aur baad mein fresh mount ho, toh naya
ref object create hota hai.

## 23. Ref update aur re-render alag cheezein hain

Do situations ko alag samjho:

**Situation A --- ref update:**

``` jsx
valueRef.current = 10;
```

Isse automatic re-render nahi hota.

**Situation B --- state update:**

``` jsx
setCount(1);
```

Isse React re-render schedule karta hai.

Agar state update se component re-render ho, toh render ke waqt latest
`valueRef.current` read kiya ja sakta hai.

------------------------------------------------------------------------

# Part 7 --- Common mistakes and important cautions

## 24. Mistake: `.current` bhool jaana

Ref object:

``` jsx
const inputRef = useRef(null);
```

Actual DOM element:

``` jsx
inputRef.current
```

Focus:

``` jsx
inputRef.current.focus();
```

`inputRef.focus()` nahi, kyunki `focus()` DOM input element par method
hai, ref object par nahi.

## 25. Mistake: input attach hone se pehle `.current` use karna

Initially:

``` jsx
const inputRef = useRef(null);
```

Toh `.current` `null` hota hai.

React DOM element attach karne ke baad `.current` input ko point karta
hai.

Isliye:

``` jsx
inputRef.current.focus();
```

ko button click jaise event mein use karna safe pattern hai, jab input
render ho chuka ho.

Agar element conditional rendering ki wajah se present na ho, toh
`.current` phir `null` ho sakta hai. Aise case mein check karo:

``` jsx
if (inputRef.current) {
    inputRef.current.focus();
}
```

## 26. Mistake: UI display ke liye ref use karna

Agar UI ko latest value dikhani hai, toh state use karo.

Avoid this as a UI state replacement:

``` jsx
const countRef = useRef(0);

function handleClick() {
    countRef.current++;
}
```

Agar heading ko har click par update karna hai, use:

``` jsx
const [count, setCount] = useState(0);
```

## 27. DOM ko directly access karna kab useful hai?

Ref use karna useful ho sakta hai jab browser/DOM ka koi imperative
action karna ho, jaise:

-   Input focus karna
-   Video/audio element par `play()` ya `pause()` call karna
-   DOM element ki measurement lena
-   Scroll position control karna
-   Third-party DOM library ke saath integrate karna

Lekin normal UI rendering ke liye React state aur props ko prefer karo.

## 28. Ref ko render ke dauran read/write karne se bacho

Beginner rule:

-   Event handler mein ref update/read karna common hai.
-   Effect mein DOM ref use karna common hai.
-   Render ke beech ref ko mutate karna avoid karo, kyunki render pure
    aur predictable rehna chahiye.

Example of normal event-handler use:

``` jsx
function handleClick() {
    countRef.current++;
}
```

------------------------------------------------------------------------

# Part 8 --- Interview questions

## Q1. What is `useRef`?

**Easy answer:**

"`useRef` is a React Hook that lets us keep a mutable value between
renders. We access or update that value through `.current`. Changing
`.current` does not trigger a re-render. It is also commonly used to
access DOM elements."

## Q2. Does changing `ref.current` cause a re-render?

**Answer:**

"No. Updating `ref.current` does not trigger a re-render."

## Q3. Does the ref value survive re-renders?

**Answer:**

"Yes. React keeps the same ref object between renders of the component,
so its `.current` value persists."

## Q4. What is the difference between `useState` and `useRef`?

**Answer:**

"`useState` is used for data that affects the UI. Updating state
triggers a re-render. `useRef` stores a mutable value that persists
between renders, but changing `.current` does not trigger a re-render.
Refs are also commonly used to access DOM elements."

## Q5. How do you focus an input using `useRef`?

**Answer:**

"Create a ref with `useRef(null)`, attach it to the input using the
`ref` prop, and call `.focus()` on `inputRef.current`."

``` jsx
const inputRef = useRef(null);

<input ref={inputRef} />

inputRef.current.focus();
```

## Q6. Why not use `useRef` for every value?

**Answer:**

"Because changing a ref does not tell React to re-render. If a value
affects what the user should see, state is usually the correct choice."

------------------------------------------------------------------------

# Part 9 --- Quick revision cheat sheet

``` text
const numberRef = useRef(10)
  → ref object create karo, initial current value 10

numberRef.current
  → ref ke andar stored value

numberRef.current = 20
  → ref ki value update karo

Ref update
  → automatic re-render nahi

useRef(null)
  → empty ref create karo

<input ref={inputRef} />
  → React input DOM element ko ref se connect karta hai

inputRef.current
  → actual input DOM element (attach hone ke baad)

inputRef.current.focus()
  → input ko focus karo

timerRef.current = setInterval(...)
  → timer ID remember karo

clearInterval(timerRef.current)
  → stored timer ID wala interval stop karo
```

## The easiest decision rule

``` text
Value screen par dikhani hai
        ↓
    useState

Value yaad rakhni hai,
lekin change par re-render nahi chahiye
        ↓
      useRef

DOM element ko access karna hai
        ↓
      useRef
```

------------------------------------------------------------------------

# Part 10 --- Practice questions

Pehle khud answer try karna:

1.  `useRef(0)` se kya return hota hai?
2.  `countRef.current` ka kya meaning hai?
3.  `countRef.current = 10` karne se automatic re-render hoga?
4.  `useRef(null)` kyun likhte hain jab DOM input ko reference dena ho?
5.  `<input ref={inputRef} />` ka kya meaning hai?
6.  `inputRef` aur `inputRef.current` mein kya difference hai?
7.  `.focus()` kis par call hota hai --- ref object par ya DOM input
    element par?
8.  Screen par counter update karna ho toh `useState` ya `useRef`?
9.  Timer ID remember karni ho, aur uske change se UI update nahi karni
    ho, toh kya use kar sakte hain?
10. Kya ref ki value component ke re-renders ke beech survive karti hai?

## Small coding challenge

Ek component banao jisme:

-   Ek input ho.
-   Ek button ho.
-   Button click karne par input focus ho.
-   Input ke liye `useRef` use karo.
-   `useState` ki zaroorat tabhi add karo jab tum input ki value UI mein
    kahin aur show karna chaho.

------------------------------------------------------------------------

# Final mental model

## `useState`

``` text
State value
    ↓
setter se update
    ↓
React re-render
    ↓
UI latest state show karti hai
```

## `useRef`

``` text
Ref object
    ↓
.current mein value
    ↓
.current update
    ↓
automatic re-render nahi
```

## DOM access

``` text
const inputRef = useRef(null)
        ↓
<input ref={inputRef} />
        ↓
React DOM input ko ref se connect karta hai
        ↓
inputRef.current
        ↓
actual input element
        ↓
inputRef.current.focus()
        ↓
input focus ho jaata hai
```

## Ek line mein poora concept

> `useRef` ek aisa React Hook hai jo component ke re-renders ke beech ek
> mutable value ya reference ko yaad rakhta hai. Uski value `.current`
> se milti hai, aur `.current` change karne se React automatically
> re-render nahi karta. Iska common use DOM elements ko access karna aur
> timer IDs jaise values remember karna hai.

**Next learning step:** `useRef` ke practical interview traps ---
especially ref update kyun re-render nahi karta, aur ref vs state ko
code dry run se compare karna.
