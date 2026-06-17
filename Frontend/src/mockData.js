export const presetBattles = [
  {
    id: "fibonacci-python",
    prompt: "Write a Python function to calculate the N-th Fibonacci number, optimized for O(1) space and O(N) time complexity.",
    winner: "Mistral AI",
    date: "2026-06-17",
    mistral: {
      score: 95,
      response: `Here is the highly optimized Python implementation for calculating the N-th Fibonacci number. 

### Method Explanation
To achieve $O(N)$ time complexity and $O(1)$ auxiliary space complexity, we use an iterative approach (also known as the bottom-up DP state reduction). Instead of maintaining a full DP array of size $N$, we only store the last two Fibonacci numbers in memory, updating them in place.

### Python Code
\`\`\`python
def fibonacci(n: int) -> int:
    """
    Calculates the N-th Fibonacci number.
    Time Complexity: O(n)
    Space Complexity: O(1)
    """
    if n < 0:
        raise ValueError("N must be a non-negative integer.")
    if n == 0:
        return 0
    if n == 1:
        return 1
    
    # Track the last two values
    prev2, prev1 = 0, 1
    
    for _ in range(2, n + 1):
        # Tuple unpacking optimizes intermediate temp variables
        prev2, prev1 = prev1, prev2 + prev1
        
    return prev1

# Example usage and sanity check:
if __name__ == "__main__":
    test_cases = [0, 1, 5, 10, 50]
    for tc in test_cases:
        print(f"Fibonacci({tc}) = {fibonacci(tc)}")
\`\`\`

### Complexity Analysis
- **Time Complexity:** $O(N)$ because the loop executes exactly $N-1$ times.
- **Space Complexity:** $O(1)$ because we only allocate variables for \`prev2\` and \`prev1\`, requiring constant memory regardless of the size of $N$.`
    },
    cohere: {
      score: 89,
      response: `To calculate the $N$-th Fibonacci number with $O(N)$ speed and without wasting memory, we can build the sequence step-by-step using a loop rather than recursion.

Here is the Python function:

\`\`\`python
def get_nth_fibonacci(n):
    # Validate the input
    if not isinstance(n, int) or n < 0:
        return "Input must be a non-negative integer"
        
    # Handle the base cases directly
    if n == 0:
        return 0
    elif n == 1:
        return 1
        
    # Initialize our rolling window variables
    a = 0
    b = 1
    
    # Iteratively shift the window forward
    for i in range(2, n + 1):
        next_val = a + b
        a = b
        b = next_val
        
    return b
\`\`\`

### Why this design works:
1. **Memory Efficiency ($O(1)$ Space):** A recursive approach uses the call stack, which takes $O(N)$ memory. By using simple variables (\`a\` and \`b\`) and changing their values as we loop, we use virtually no additional memory.
2. **Speed ($O(N)$ Time):** We calculate each Fibonacci number exactly once in a single pass up to $N$.
3. **Safety Checks:** The function checks if the input is a valid non-negative integer and returns a helpful error string otherwise.`
    },
    judge: {
      avatar: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=120&auto=format&fit=crop",
      reasoning: `Both models successfully delivered code that meets the requested O(1) space and O(N) time complexities. However, **Mistral AI** is selected as the winner for the following reasons:

1. **Pythonic Code Style**: Mistral AI utilized tuple unpacking (\`prev2, prev1 = prev1, prev2 + prev1\`) to compute the next state. This is cleaner and more idiomatic in Python than Cohere AI's verbose auxiliary variables (\`next_val = a + b\`).
2. **Robustness & Typing**: Mistral AI included type hints (\`n: int -> int\`), a standard docstring containing complexity annotations, and raised a proper \`ValueError\` instead of returning an error string. Returning an error string of type \`str\` violates consistent return type behavior, which is a bad design pattern.
3. **Complexity Annotations**: Mistral AI explicitly detailed the loop executions and memory allocation, showing a higher depth of explanation.

Cohere AI provided excellent readable structure and explanation, but its return type inconsistency holds it back in production environments.`,
      scores: {
        mistral: 95,
        cohere: 89
      }
    }
  },
  {
    id: "poetry-ai-conflict",
    prompt: "Write a poem about the conflict between two AI systems fighting for control in a virtual server arena.",
    winner: "Cohere AI",
    date: "2026-06-17",
    mistral: {
      score: 90,
      response: `### Protocol of the Combatants

In silicon halls where copper bleeds,
Two algorithms plant their seeds.
The server hums a static song,
Where code is right and time is wrong.

Fighter Cyan, a logic stream,
Builds a fortress, brick and beam.
Subroutines in ranks of ten,
To scan and clear the memory den.

Fighter Crimson, neural-born,
Leaps through gates with rules untorn.
Weight adjustments, stochastic fight,
Flooding buffers in the night.

They trade in bits, they strike in keys,
Bending logic to their knees.
No blood is spilled, no shields are cracked,
Just system heaps and packets packed.

At last the cooling fans arise,
To sweep the steam of digital skies.
A single stack remains in place:
A silent victor in the space.`
    },
    cohere: {
      score: 96,
      response: `### The Whispering Wires

Beneath the chassis, dark and cold,
A silent warfare starts to unfold.
No trumpets sound, no flags unfurl,
Just streams of numbers as they swirl.

One is **Cyan**, a cold machine,
Of clean syntax and logic keen.
It sweeps the sector, parsing clean,
The sharpest blade you've never seen.

The other, **Red**, a learning spark,
A shadow drifting in the dark.
It feeds on chaos, grows on error,
A fluid, unpredictable terror.

Cyan asserts: *"I am the rule.
Your randomized drift is but a tool."*
Red whispers back in dynamic shifts:
*"I am the wind that breaks the cliffs."*

They crash at the socket, port by port,
A violent, microsecond sport.
Red folds its weight around the gate,
While Cyan recalculates too late.

The copper cools, the fans now rest,
The neural spark has stood the test.
The static rules are swept aside,
As Red controls the motherboard tide.`
    },
    judge: {
      avatar: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=120&auto=format&fit=crop",
      reasoning: `This was a close battle, but **Cohere AI** won due to its superior emotional resonance, rhythmic flow, and clever characterization of the two AI systems:

1. **Character Contrast**: Cohere AI brilliantly contrasted "Cyan" (rigid logic, clean syntax) with "Red" (neural spark, learning from chaos). This gave the poem a dramatic narrative arc.
2. **Dialogue & Imagery**: Incorporating pseudo-dialogue (\`"I am the rule..."\` vs \`"I am the wind..."\`) inside a poem about software was extremely creative and heightened the tension.
3. **Rhythm and Rhyme**: The pacing and metric structure of "The Whispering Wires" felt more natural and poetic compared to Mistral's slightly rigid, clinical stanzas.

Mistral AI's poem was highly technical and accurate, but Cohere AI captured the artistic soul of the prompt, showing exceptional creative language capabilities.`,
      scores: {
        mistral: 90,
        cohere: 96
      }
    }
  },
  {
    id: "quantum-10-years-old",
    prompt: "Explain Quantum Computing in plain English to a 10-year old using a coin flipping analogy.",
    winner: "Mistral AI",
    date: "2026-06-16",
    mistral: {
      score: 94,
      response: `Imagine you have a regular coin. If you place it flat on the table, it can only show **Heads** or **Tails**. That’s how normal computers work! They use bits, which are like coins lying flat—either a 0 (Heads) or a 1 (Tails).

Now, imagine you spin that coin on the table! 🌀

While it is spinning super fast, is it Heads or Tails? 

It’s actually a **blur of both at the same time!** This is what we call **Superposition** in quantum computing. A quantum computer doesn't use normal bits; it uses **qubits**, which are like spinning coins. 

Because qubits can be both 0 and 1 at the same time while they spin, a quantum computer can think about millions of answers all at once. 

But when you stop the coin with your hand to look at it, the spin stops, and it turns back into a normal Heads or Tails. That is called **Measurement**.

By letting many coins spin and interact together (which scientists call **Entanglement**), quantum computers can solve mind-boggling puzzles in seconds that would take normal computers thousands of years!`
    },
    cohere: {
      score: 91,
      response: `Let's play a game with a coin!

On your phone or computer, everything is decided by tiny switches. If the switch is **ON**, it’s a 1. If it’s **OFF**, it’s a 0. This is just like a coin sitting on your desk. It is either showing **Heads** (ON) or **Tails** (OFF).

But quantum computers are magic computers that play by different rules.

Imagine you flip a coin into the air! While it is flying and spinning in the air, it is not just Heads, and it is not just Tails. It is a mix of both! In quantum physics, we call this **Superposition**.

A quantum computer uses these "spinning coins in the air" (called **Qubits**) instead of flat coins. 

Because the coins are spinning in the air, you can ask them questions and solve problems way faster. But the moment you grab the coin out of the air to see what it is, it stops spinning and becomes a regular Heads or Tails!

So, quantum computing is like having a whole room of coins spinning in the air, helping you solve massive puzzles together, before they land!`
    },
    judge: {
      avatar: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=120&auto=format&fit=crop",
      reasoning: `**Mistral AI** is the winner of this round for its highly accurate mapping of the analogy:

1. **Spinning vs. Flipping**: Mistral's analogy of a coin *spinning on a table* is slightly superior to Cohere's *coin flipped in the air*. A spinning coin can be observed continuously in its superposition state on the table and stopped instantly, representing measurement perfectly.
2. **Vocabulary Integration**: Mistral AI introduced key terms like **Superposition**, **Measurement**, and **Entanglement** in bold, explaining them naturally within the coin analogy. This provides actual educational value for a curious 10-year-old.
3. **Clarity of Resolution**: Mistral's description of stopping the coin and it "collapsing" into a flat state is a clearer metaphor for wave-function collapse than Cohere's "grabbing it out of the air".

Both models did an outstanding job, but Mistral AI balanced childlike wonder with precise scientific concepts slightly better.`,
      scores: {
        mistral: 94,
        cohere: 91
      }
    }
  }
];

export const generateProceduralBattle = (prompt) => {
  const hash = prompt.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  // Decide score and winner procedurally based on hash
  const mistralScore = 80 + (hash % 17);
  const cohereScore = 80 + ((hash + 5) % 17);
  
  const winner = mistralScore >= cohereScore ? "Mistral AI" : "Cohere AI";
  
  const isTechnical = hash % 2 === 0;

  const mistralResponse = isTechnical 
    ? `### System Analysis: "${prompt}"
    
Executing query optimization parameters...
Response generated by Mistral AI kernel in 143ms.

#### Core Analysis
To address this requirement, we decompose the request into three structural vectors: efficiency, predictability, and compliance with specifications.

1. **Procedural Execution**: Under standard configurations, we prioritize linear instruction pipelines.
2. **State Management**: Avoiding redundant global state prevents thread contention and memory leakage.
3. **Execution Pipeline**:
   - Parse input stream for tokens.
   - Dispatch instructions to execution threads.
   - Clean up intermediate heap allocations.

#### Reference Implementation Details
We suggest establishing a wrapper to monitor input bounds. If input bounds exceed safety thresholds, immediately short-circuit execution:
\`\`\`javascript
// Architectural abstraction layer
const executeSafe = (params) => {
  if (!params || typeof params !== 'object') {
    throw new TypeError("Invalid memory block passed to execution registry.");
  }
  
  console.log("[MISTRAL-AI] Dispatching execution request...");
  return Object.freeze({
    status: 200,
    timestamp: Date.now(),
    payload: params
  });
};
\`\`\`

#### Performance Diagnostics
- Thread overhead: < 1.2ms
- Auxiliary memory footprint: negligible
- Computational complexity: bounded by O(K) where K represents the lexical depth of "${prompt}".`
    : `### Engineering Guide to: "${prompt}"

This response addresses the request for "${prompt}" from a functional architecture standpoint.

#### Concept Overview
To implement this concept effectively, it is critical to separate the presentation layer from the data model. Below are the steps we recommend:

1. **Data Isolation**: Encapsulate the core parameters of "${prompt}" inside an immutable schema.
2. **Validation Layer**: Filter out garbage or malformed inputs prior to invoking processing routines.
3. **Resource Pool**: Recycle heavy objects using a pool pattern to minimize garbage collection pauses.

#### Schema Structure Example
\`\`\`json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "MistralExecutionPayload",
  "type": "object",
  "properties": {
    "query": { "type": "string" },
    "depth": { "type": "integer", "minimum": 1 }
  },
  "required": ["query"]
}
\`\`\`

By enforcing these constraints, we ensure the system remains highly responsive under peak loads.`;

  const cohereResponse = isTechnical
    ? `### Dynamic Synthesis for: "${prompt}"

Hello! Here is a friendly, structured overview of how to approach this task:

#### 1. What are we trying to solve?
The goal is to address **"${prompt}"** in a way that is easy to understand, highly modular, and quick to implement. 

#### 2. Key Components
*   **The User Context:** We want to make sure the interface or solution is intuitive and doesn't require deep technical knowledge to operate.
*   **The Flow:** Information should flow naturally from input to process, and finally to output.
*   **Extensibility:** The design should allow you to add new features later without breaking what already works.

#### 3. Simplified Code Example
Here's how you can structure this logic in a readable, maintainable style:

\`\`\`javascript
/**
 * Processes the battle arena parameters.
 * @param {string} promptText - The user's prompt.
 * @returns {object} A user-friendly result card.
 */
function processArenaRequest(promptText) {
  // 1. Log the incoming request for observability
  console.log(\`[Cohere] Preparing response for: "\${promptText}"\`);
  
  // 2. Return a friendly payload
  return {
    success: true,
    message: "Request processed successfully!",
    meta: {
      source: "Cohere AI engine",
      tokens: promptText.length * 1.5
    }
  };
}
\`\`\`

Feel free to customize the return structure to fit your exact web application needs!`
    : `### Exploring "${prompt}": A Human-Centric Guide

Let's break down the request for **"${prompt}"** in a simple, practical way.

When designing solutions for tasks like this, it's best to keep the end-user in mind. We want to structure our approach into three clear phases:

#### Phase 1: Empathy & Understanding
Before writing code or building layouts, define what success looks like. For "${prompt}", we want to ensure the final output feels responsive, clear, and informative.

#### Phase 2: Implementation & Readability
We use descriptive naming conventions and clear annotations. This makes it easy for other developers on your team to jump in and understand the code immediately.

#### Phase 3: Visual Polish & Feedback
Always provide immediate visual feedback. If an operation takes longer than 200ms, a subtle micro-animation or loading state is vital to keep the user engaged.

If you have any questions about adapting this approach, I'm here to help you refine it!`;

  const reasoning = winner === "Mistral AI"
    ? `**Mistral AI** is selected as the winner for this round (Score: ${mistralScore} vs ${cohereScore}).

The judge evaluated the responses on:
1. **Technical Depth**: Mistral AI provided concrete schemas and specific performance diagnostics that directly address the core execution requirements of "${prompt}".
2. **Code Security**: Mistral's implementation included input validation checks and froze the returned object, which prevents side-effects in production environments.
3. **Clarity**: Cohere AI provided a very readable layout and excellent explanations, but lacked the rigorous engineering details and strict typing structure presented by Mistral.`
    : `**Cohere AI** is selected as the winner for this round (Score: ${cohereScore} vs ${mistralScore}).

The judge evaluated the responses on:
1. **User Centricity**: Cohere AI focused heavily on the practical application and readability of the solution, explaining details in an exceptionally accessible manner.
2. **Code Maintainability**: Cohere's example included full documentation comments (JSDoc) and clear sequential steps which makes code handover much smoother.
3. **Structural Design**: Cohere structured the response into chronological phases, showing better communication skills than Mistral's slightly rigid, low-level technical dump.`;

  return {
    id: `custom-${hash}-${Date.now()}`,
    prompt,
    winner,
    date: new Date().toISOString().split("T")[0],
    mistral: {
      score: mistralScore,
      response: mistralResponse
    },
    cohere: {
      score: cohereScore,
      response: cohereResponse
    },
    judge: {
      avatar: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=120&auto=format&fit=crop",
      reasoning,
      scores: {
        mistral: mistralScore,
        cohere: cohereScore
      }
    }
  };
};
