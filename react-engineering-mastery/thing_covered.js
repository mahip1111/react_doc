import { useState, useEffect } from "react";


// ======================================================
// 1. COMPONENT
// ======================================================

function Greeting() {
    return <h1>Hello React!</h1>;
}


// ======================================================
// 2. JSX
// ======================================================

function JSXExample() {
    const name = "Manav";
    const age = 21;

    return (
        <div>
            <h1>Hello {name}</h1>
            <p>Age: {age}</p>
        </div>
    );
}


// ======================================================
// 3. PROPS
// ======================================================

function User({ name, age }) {
    return (
        <div>
            <h2>{name}</h2>
            <p>{age}</p>
        </div>
    );
}

function PropsExample() {
    return (
        <User
            name="Manav"
            age={21}
        />
    );
}


// ======================================================
// 4. useState
// ======================================================

function Counter() {

    const [count, setCount] = useState(0);

    function handleClick() {
        setCount(count + 1);
    }

    return (
        <div>
            <h2>Count: {count}</h2>

            <button onClick={handleClick}>
                Increase
            </button>
        </div>
    );
}


// ======================================================
// 5. STATE + FUNCTIONAL UPDATER
// ======================================================

function MultipleUpdates() {

    const [count, setCount] = useState(0);

    function handleClick() {

        setCount(prev => prev + 1);
        setCount(prev => prev + 1);
        setCount(prev => prev + 1);

    }

    return (
        <div>

            <h2>{count}</h2>

            <button onClick={handleClick}>
                +3
            </button>

        </div>
    );
}


// ======================================================
// 6. FRAGMENT
// ======================================================

function FragmentExample() {

    return (
        <>
            <h1>Hello</h1>
            <p>No extra div is created.</p>
        </>
    );
}


// ======================================================
// 7. useEffect — NO DEPENDENCY ARRAY
// ======================================================

function EffectEveryRender() {

    const [count, setCount] = useState(0);

    useEffect(() => {

        console.log("Effect runs after every render");

    });

    return (
        <button onClick={() => setCount(count + 1)}>
            {count}
        </button>
    );
}


// ======================================================
// 8. useEffect — EMPTY DEPENDENCY ARRAY
// ======================================================

function EffectOnce() {

    useEffect(() => {

        console.log("Effect runs after initial mount");

    }, []);

    return <h1>Hello</h1>;
}


// ======================================================
// 9. useEffect — DEPENDENCY
// ======================================================

function EffectWithDependency() {

    const [count, setCount] = useState(0);

    useEffect(() => {

        console.log("Count changed:", count);

    }, [count]);

    return (
        <button onClick={() => setCount(count + 1)}>
            {count}
        </button>
    );
}


// ======================================================
// 10. useEffect — BROWSER TITLE
// ======================================================

function TitleExample() {

    const [count, setCount] = useState(0);

    useEffect(() => {

        document.title = `Count: ${count}`;

    }, [count]);

    return (
        <button onClick={() => setCount(count + 1)}>
            {count}
        </button>
    );
}


// ======================================================
// 11. CLEANUP — TIMER
// ======================================================

function TimerExample() {

    useEffect(() => {

        const timer = setInterval(() => {

            console.log("Hello");

        }, 1000);


        // CLEANUP

        return () => {

            clearInterval(timer);

        };

    }, []);

    return <h1>Timer Running</h1>;
}


// ======================================================
// 12. CLEANUP — EVENT LISTENER
// ======================================================

function ResizeExample() {

    function handleResize() {

        console.log("Window resized");

    }


    useEffect(() => {

        window.addEventListener(
            "resize",
            handleResize
        );


        // CLEANUP

        return () => {

            window.removeEventListener(
                "resize",
                handleResize
            );

        };

    }, []);


    return <h1>Resize the window</h1>;
}


// ======================================================
// 13. INFINITE LOOP EXAMPLE — DON'T DO THIS
// ======================================================

function InfiniteLoopExample() {

    const [count, setCount] = useState(0);

    /*
        DON'T DO THIS:

        useEffect(() => {
            setCount(count + 1);
        }, [count]);

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
        infinite loop
    */

    return <h1>{count}</h1>;
}


// ======================================================
// 14. CONDITIONAL RENDERING — if
// ======================================================

function IfExample({ isLoggedIn }) {

    if (!isLoggedIn) {

        return <h1>Please Login</h1>;

    }

    return <h1>Welcome!</h1>;
}


// ======================================================
// 15. CONDITIONAL RENDERING — TERNARY
// ======================================================

function TernaryExample({ isLoggedIn }) {

    return (
        <h1>
            {isLoggedIn
                ? "Welcome"
                : "Please Login"
            }
        </h1>
    );
}


// ======================================================
// 16. CONDITIONAL RENDERING — &&
// ======================================================

function AndExample({ isLoggedIn }) {

    return (
        <div>

            {isLoggedIn && (
                <button>
                    Logout
                </button>
            )}

        </div>
    );
}


// ======================================================
// 17. `0 &&` TRAP
// ======================================================

function ZeroTrap() {

    const count = 0;

    return (
        <div>

            {/* This can render 0 */}

            {count && (
                <h1>
                    You have items
                </h1>
            )}


            {/* Better */}

            {count > 0 && (
                <h1>
                    You have items
                </h1>
            )}

        </div>
    );
}


// ======================================================
// 18. RETURN NULL
// ======================================================

function NullExample({ show }) {

    if (!show) {

        return null;

    }

    return <h1>Hello</h1>;
}


// ======================================================
// 19. EARLY RETURN
// ======================================================

function Dashboard({ user }) {

    if (!user) {

        return <h1>Loading...</h1>;

    }

    return (
        <div>

            <h1>
                Welcome {user.name}
            </h1>

            <p>
                {user.email}
            </p>

        </div>
    );
}


// ======================================================
// 20. LISTS — map()
// ======================================================

function FruitList() {

    const fruits = [
        "Apple",
        "Mango",
        "Banana"
    ];

    return (
        <div>

            {fruits.map((fruit) => (

                <p key={fruit}>
                    {fruit}
                </p>

            ))}

        </div>
    );
}


// ======================================================
// 21. LISTS + OBJECTS
// ======================================================

function UserList() {

    const users = [
        {
            id: 101,
            name: "Rahul"
        },
        {
            id: 102,
            name: "Aman"
        },
        {
            id: 103,
            name: "Priya"
        }
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


// ======================================================
// 22. KEY + PROP DIFFERENCE
// ======================================================

function UserCard({ id, name }) {

    return (
        <div>

            <h2>{name}</h2>

            <p>
                ID: {id}
            </p>

        </div>
    );
}


function KeyExample() {

    const users = [
        {
            id: 101,
            name: "Rahul"
        },
        {
            id: 102,
            name: "Aman"
        }
    ];

    return (
        <div>

            {users.map((user) => (

                <UserCard
                    key={user.id}
                    id={user.id}
                    name={user.name}
                />

            ))}

        </div>
    );
}


// ======================================================
// 23. BAD KEY — INDEX
// ======================================================

function IndexKeyExample() {

    const users = [
        "Rahul",
        "Aman",
        "Priya"
    ];

    return (
        <div>

            {users.map((user, index) => (

                /*
                    Index works in some static cases,
                    but can cause problems when
                    the list changes/reorders.
                */

                <p key={index}>
                    {user}
                </p>

            ))}

        </div>
    );
}


// ======================================================
// 24. DON'T USE RANDOM KEY
// ======================================================

function BadRandomKey() {

    const users = [
        "Rahul",
        "Aman",
        "Priya"
    ];

    return (
        <div>

            {users.map((user) => (

                /*
                    DON'T DO THIS

                    key={Math.random()}
                */

                <p key={user}>
                    {user}
                </p>

            ))}

        </div>
    );
}


// ======================================================
// 25. MAIN APP
// ======================================================

export default function App() {

    const user = {
        name: "Manav",
        email: "manav@example.com"
    };

    return (

        <div>

            <h1>React Revision</h1>


            {/* COMPONENT */}

            <Greeting />


            {/* JSX */}

            <JSXExample />


            {/* PROPS */}

            <User
                name="Manav"
                age={21}
            />


            {/* STATE */}

            <Counter />


            {/* FUNCTIONAL UPDATER */}

            <MultipleUpdates />


            {/* FRAGMENT */}

            <FragmentExample />


            {/* EFFECT */}

            <EffectWithDependency />


            {/* CONDITIONAL RENDERING */}

            <TernaryExample
                isLoggedIn={true}
            />


            {/* LIST */}

            <FruitList />


            {/* LIST + KEY */}

            <UserList />


            {/* KEY + PROP */}

            <KeyExample />

        </div>
    );
}




// 🧠 Ab isko ratta mat maarna — ye cheat sheet dekho
// Tumhare abhi tak ke topics ka one-line revision:
// Topic	Main idea
// Component	UI ka reusable piece
// JSX	JavaScript ke andar UI likhne ka syntax
// Props	Parent → Child data
// State	Component ka changing data
// setState	State update karna
// Functional updater	Previous state ke basis par update
// Fragment	Extra DOM element ke bina multiple elements
// useEffect	Render ke baad side effect/synchronization
// Dependency array	Effect ko dobara kab synchronize karna hai
// Cleanup	Effect ne jo external kaam start kiya, use stop/remove karna
// Conditional rendering	Condition ke according UI
// if	Complex conditions
// ? :	Two possible UI outcomes
// &&	Condition true ho toh UI
// null	Kuch render nahi karna
// map()	Array ke items se UI banana
// key	List item ki stable identity
// Reconciliation	Previous aur new UI ko compare karke changes determine karna
// key vs prop	key React ke liye; normal props component ke liye