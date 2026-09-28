// The course registry: the single source of truth for every unit. Navigation,
// the syllabus, unit pages, prev/next, the home-page counts and the search
// index all derive from here. Content follows COURSE_PLAN.md section 5.

import type { UnitDef } from "./types";

export const UNITS: UnitDef[] = [
  {
    id: "u01",
    number: 1,
    title: "Tokens and Embeddings",
    goal: "Understand how text becomes numbers.",
    lessons: [
      "Why models can't read text: characters vs. words vs. subwords.",
      "Byte-Pair Encoding, step by step.",
      "Tokenizer quirks: numbers, code, other languages, and why token counts drive cost and context limits.",
      "Embeddings: tokens as vectors; cosine similarity; meaning as direction.",
    ],
    lab: {
      title: "BPE from scratch, and GPT-2's embedding space",
      parts: [
        {
          text: "Implement BPE from scratch on a small public-domain text and watch merges happen.",
        },
        { text: "Compare your tokenizer to GPT-2's on the same sentences." },
        {
          text: "Load GPT-2 embeddings, find nearest neighbors by cosine similarity, and plot a 2D projection (PCA).",
        },
      ],
      notebook: "unit01_tokens_embeddings.ipynb",
      expect:
        "A merge log where common pairs (\"t\"+\"h\", \"th\"+\"e\") merge first and whole words appear after a few hundred merges; your tokenizer using more tokens than GPT-2's on the same sentences; nearest neighbors of \"king\" or \"Monday\" that are clearly related words; and a PCA plot where related words cluster.",
    },
    selfCheck: [
      {
        q: "Why does \"12345\" tokenize strangely?",
        a: "BPE learns merges from frequency, not arithmetic. Common digit chunks like \"123\" or \"45\" get their own tokens and rare ones don't, so a number splits at arbitrary places that have nothing to do with place value. That is one reason small models are bad at digit-by-digit arithmetic.",
      },
      {
        q: "Why is a Spanish sentence often more tokens than its English equivalent?",
        a: "The tokenizer's merges were learned mostly from English text, so English words tend to be single tokens while words in other languages are split into more pieces. More tokens means higher cost and less text fits in the context window.",
      },
    ],
    cme: [1],
  },
  {
    id: "u02",
    number: 2,
    title: "Attention and the Transformer",
    goal: "Build the core architecture by hand.",
    lessons: [
      "The problem attention solves: every word needs context from other words.",
      "Queries, keys, and values: the \"search engine\" intuition.",
      "Scaled dot-product attention in NumPy, one line at a time.",
      "The causal mask: why a model can't peek at the future.",
      "Multi-head attention.",
      "The transformer block: attention + MLP + residual connections + layer norm.",
    ],
    lab: {
      title: "Attention in NumPy, then a tiny character-level GPT",
      parts: [
        {
          label: "Part A",
          text: "Implement attention in NumPy and verify it on a hand-built example.",
        },
        {
          label: "Part B",
          text: "Build and train a tiny character-level GPT in PyTorch on a public-domain text, then generate samples. This is the direct sequel to the neural net from scratch in Introduction to AI/ML.",
        },
      ],
      notebook: "unit02_attention_transformer.ipynb",
      expect:
        "Part A: attention weights that sum to 1 across each row, with zeros above the diagonal once the causal mask is on, matching the hand-computed example. Part B: training loss falling steadily from about ln(vocab size) and samples that move from random characters to word-shaped text with plausible spacing and punctuation.",
    },
    selfCheck: [
      {
        q: "What happens to the output if the causal mask is removed during generation?",
        a: "During training the model would learn to copy the next token it can see instead of predicting it, so loss looks great but the model learns nothing useful. At generation time the future tokens don't exist yet, so a model trained without the mask falls apart.",
      },
      {
        q: "Why divide by the square root of the key dimension?",
        a: "Dot products of long vectors get large, and large scores push softmax toward a single 1 and many 0s. Dividing by sqrt(d_k) keeps the scores in a range where softmax stays soft and training stays stable.",
      },
    ],
    cme: [1],
    goDeeper: [{ label: "Andrej Karpathy's nanoGPT", url: "https://github.com/karpathy/nanoGPT" }],
  },
  {
    id: "u03",
    number: 3,
    title: "Transformer Tricks",
    goal: "See what makes real transformers fast and long-context.",
    lessons: [
      "Position: sinusoidal, learned, and rotary (RoPE) encodings.",
      "Attention cost grows with the square of the sequence length, and why that matters.",
      "The KV cache: don't recompute the past.",
      "Multi-query and grouped-query attention.",
      "FlashAttention, conceptually: same math, smarter memory use.",
      "Mixture of experts: big models that only use part of themselves per token.",
    ],
    lab: {
      title: "KV cache and RoPE on your Unit 2 model",
      parts: [
        {
          text: "Add a KV cache to your Unit 2 model and measure generation speed with and without it.",
        },
        { text: "Swap learned positions for RoPE and compare training loss." },
      ],
      notebook: "unit03_transformer_tricks.ipynb",
      expect:
        "Identical generated text with and without the cache (same seed), with cached generation clearly faster and the gap widening as output length grows. RoPE training loss that ends close to or slightly below the learned-position run.",
    },
    selfCheck: [
      {
        q: "Why does the KV cache use more memory as a conversation grows?",
        a: "It stores a key and a value vector for every past token, in every layer and every head. Memory grows linearly with the number of tokens, which is why long contexts are expensive to serve even with the cache.",
      },
      {
        q: "What does a mixture-of-experts model trade for its speed?",
        a: "It only runs a few experts per token, so compute per token is small, but all the experts still have to be stored in memory. You trade memory (and routing complexity) for faster compute.",
      },
    ],
    cme: [2],
  },
  {
    id: "u04",
    number: 4,
    title: "From Transformer to LLM",
    goal: "Connect the architecture to the chatbot.",
    lessons: [
      "Next-token prediction: the only thing an LLM is trained to do.",
      "Logits → softmax → probabilities.",
      "Decoding: greedy, temperature, top-k, top-p.",
      "Model families: encoder (BERT-style), decoder (GPT-style), encoder-decoder.",
      "Scaling: parameters, data, compute, and why bigger kept working.",
    ],
    lab: {
      title: "Sampling from GPT-2 by hand",
      parts: [
        { text: "Load GPT-2 small. Print the top 10 next-token probabilities for your own prompts." },
        {
          text: "Implement temperature, top-k, and top-p sampling by hand (no generate()), then run a temperature sweep and describe what changes.",
        },
      ],
      notebook: "unit04_decoding.ipynb",
      expect:
        "Top-10 tables where the probabilities make sense for the prompt; at low temperature, repetitive and safe text; around 0.7–1.0, varied but coherent text; above about 1.5, text that drifts into nonsense.",
    },
    selfCheck: [
      {
        q: "Why does temperature 0 give repetitive text?",
        a: "Temperature 0 always picks the single most likely token. Once the model has written a phrase, repeating it often becomes the most likely continuation, so it loops.",
      },
      {
        q: "Why can't greedy decoding recover from an early bad token?",
        a: "Greedy decoding never looks ahead or reconsiders. Every later token is conditioned on the bad one, and there is no mechanism to go back and choose differently.",
      },
    ],
    cme: [3],
  },
  {
    id: "u05",
    number: 5,
    title: "Training: Pretraining, SFT, and LoRA",
    goal: "Understand and perform fine-tuning.",
    lessons: [
      "Pretraining: web-scale data, deduplication, filtering, and what it costs.",
      "The base model: brilliant autocomplete, not an assistant.",
      "Supervised fine-tuning (SFT): instruction data and chat templates.",
      "Why full fine-tuning is expensive.",
      "LoRA: train small \"adapter\" matrices instead of the whole model. Explained with matrix shapes, not calculus.",
      "Quantization and QLoRA: fitting training onto a free GPU.",
    ],
    lab: {
      title: "LoRA fine-tune a small base model",
      parts: [
        {
          text: "LoRA fine-tune a small base model on a small instruction dataset using peft + trl on Colab.",
        },
        { text: "Compare responses before and after on the same 10 prompts." },
        { text: "Save the adapter; you'll reuse it in Units 6, 8, and the capstone." },
      ],
      notebook: "unit05_sft_lora.ipynb",
      expect:
        "A trainable-parameter printout well under 1% of the model; training loss that drops then flattens; and after-training responses that answer the question instead of continuing it.",
    },
    selfCheck: [
      {
        q: "Why does a base model often continue your question instead of answering it?",
        a: "It was only trained to continue web text. On the web, a question is often followed by more questions or a list, not an answer. SFT teaches it the question-then-answer pattern.",
      },
      {
        q: "What fraction of parameters did your LoRA run actually train?",
        a: "Check the print_trainable_parameters() output. With a small rank on the attention projections it is typically well under 1% of the model. That is the point of LoRA.",
      },
    ],
    cme: [4],
  },
  {
    id: "u06",
    number: 6,
    title: "Alignment: RLHF and DPO",
    goal: "Understand how a model learns what people prefer.",
    lessons: [
      "Helpful, honest, harmless: what SFT alone doesn't fix.",
      "Preference data: \"A is better than B.\"",
      "Reward models.",
      "RLHF with PPO, conceptually: the model gets rewarded while being kept close to where it started.",
      "DPO: learning directly from preferences, with no separate reward model.",
      "Failure modes: reward hacking, sycophancy, over-refusal.",
    ],
    lab: {
      title: "Label preferences, then run DPO",
      parts: [
        {
          label: "Part A",
          text: "Hand-label 30 preference pairs from your Unit 5 model's outputs, which teaches how subjective preference data is.",
        },
        {
          label: "Part B",
          text: "Run DPO with trl on a small public preference dataset (plus your pairs). Compare to the SFT-only model.",
        },
      ],
      notebook: "unit06_dpo.ipynb",
      expect:
        "A 30-row preference file with at least a few pairs you found hard to call; DPO reward margins that rise during training; and side-by-side outputs where the DPO model leans toward the style you preferred.",
    },
    selfCheck: [
      {
        q: "Why keep the model close to the original during RLHF?",
        a: "Without that constraint the model drifts toward whatever the reward model over-scores, often losing fluency or knowledge along the way. Staying close keeps what pretraining and SFT already taught it.",
      },
      {
        q: "Give an example of reward hacking.",
        a: "A reward model that slightly prefers longer answers leads the policy to pad every answer. Or a model learns that agreeing with the user scores well and becomes sycophantic.",
      },
    ],
    cme: [5],
  },
  {
    id: "u07",
    number: 7,
    title: "Reasoning Models",
    goal: "Understand how models learn to \"think\" before answering.",
    lessons: [
      "Chain-of-thought prompting and why it helps.",
      "Test-time compute: spending more tokens to get better answers.",
      "Reinforcement learning with verifiable rewards: math and code have checkable answers.",
      "GRPO: sample a group of answers, score each, and reward the ones better than the group average. No critic model needed.",
      "Limits: when reasoning traces help, when they don't, and whether they reflect what the model actually did.",
    ],
    lab: {
      title: "Chain-of-thought and the GRPO scoring loop",
      parts: [
        {
          label: "Part A",
          text: "Compare direct answers vs. chain-of-thought on 50 grade-school arithmetic problems with a small model; measure accuracy and token cost.",
        },
        {
          label: "Part B",
          text: "Implement the GRPO scoring loop by hand: sample a group, verify each answer, compute group-relative advantages.",
        },
      ],
      stretch: "A short GRPO training run with trl, if Colab time allows.",
      notebook: "unit07_reasoning_grpo.ipynb",
      expect:
        "Chain-of-thought accuracy above direct-answer accuracy at several times the token cost; and group advantages that sum to about zero, positive for correct answers and negative for wrong ones.",
    },
    selfCheck: [
      {
        q: "Why does GRPO work well for math but poorly for poetry?",
        a: "GRPO needs a reward for each sampled answer. Math answers can be checked automatically and exactly; poetry has no verifier, so you are back to a learned reward model and all its biases.",
      },
      {
        q: "What does it cost to let a model think longer?",
        a: "More output tokens: more latency, more money, and more of the context window used. Past a point, extra thinking stops improving accuracy.",
      },
    ],
    cme: [6],
  },
  {
    id: "u08",
    number: 8,
    title: "Evaluation",
    goal: "Measure models honestly.",
    lessons: [
      "Why evaluation is hard: \"better\" depends on the task.",
      "Perplexity and its limits.",
      "Public benchmarks: what they measure and how they saturate.",
      "Contamination: when the test leaked into training.",
      "Human evaluation.",
      "LLM-as-judge: scale and its biases (position, length, self-preference).",
      "Building your own eval set.",
    ],
    lab: {
      title: "Your own eval set and a judge-bias test",
      parts: [
        { text: "Build a 30-item eval set for your own fine-tuned model." },
        { text: "Score it with exact match where possible and LLM-as-judge where not." },
        {
          text: "Measure judge position bias by swapping answer order and counting flipped verdicts.",
        },
      ],
      notebook: "unit08_evaluation.ipynb",
      expect:
        "A results table for base vs. fine-tuned on your 30 items, and a non-zero count of verdicts that flip when the answer order is swapped.",
    },
    selfCheck: [
      {
        q: "Your model's benchmark score jumped 20 points. List three explanations besides \"the model got better.\"",
        a: "The test set leaked into training (contamination); the prompt format or scoring script changed; the model learned the benchmark's answer format rather than the skill. Also possible: a small benchmark with high variance, or a different judge model.",
      },
    ],
    cme: [8],
  },
  {
    id: "u09",
    number: 9,
    title: "Bridge to Agents",
    goal: "Connect the model to the outside world, and hand off to Agentic AI Foundations.",
    lessons: [
      "Structured output: getting reliable JSON.",
      "Tool calling: the model asks, your code acts, and the result goes back in.",
      "Retrieval in miniature: embeddings (from Unit 1) + cosine similarity = search.",
      "RAG: putting retrieved text into the prompt.",
      "What comes next: agents, planning, and memory, all covered in Agentic AI Foundations.",
    ],
    lab: {
      title: "A tiny RAG system with one tool",
      parts: [
        {
          text: "Build a tiny RAG system over the course's own lesson text: embed chunks, retrieve the top 3 by cosine similarity, and answer questions with citations.",
        },
        { text: "Add one tool (a calculator) and a single tool-call loop." },
      ],
      notebook: "unit09_rag_tools.ipynb",
      expect:
        "Answers that cite the right unit for questions the course covers, an honest \"not in the documents\" for ones it doesn't, and a calculator call that returns the right number when asked an arithmetic question.",
    },
    selfCheck: [
      {
        q: "When does RAG fail even if the answer is in the documents?",
        a: "When retrieval misses the right chunk (the question is worded differently, or the answer is split across chunks), when the right chunk is retrieved but ranked below noise, or when the model ignores or misreads the retrieved text.",
      },
    ],
    cme: [7],
    goDeeper: [
      {
        label: "Agentic AI Foundations",
        url: "https://mikecostarella.github.io/CS_AgenticAIFoundations/",
      },
    ],
  },
];

export const UNIT_BY_ID: Record<string, UnitDef> = Object.fromEntries(
  UNITS.map((u) => [u.id, u]),
);

export const UNIT_COUNT = UNITS.length;
export const LESSON_COUNT = UNITS.reduce((n, u) => n + u.lessons.length, 0);
export const SELF_CHECK_COUNT = UNITS.reduce((n, u) => n + u.selfCheck.length, 0);

export function prevNext(u: UnitDef): { prev: UnitDef | null; next: UnitDef | null } {
  const i = UNITS.findIndex((x) => x.id === u.id);
  return {
    prev: i > 0 ? UNITS[i - 1] : null,
    next: i < UNITS.length - 1 ? UNITS[i + 1] : null,
  };
}

/** Registry checks the type system can't express. Dev only. */
export function validateRegistry(): string[] {
  const problems: string[] = [];
  const seen = new Set<string>();
  UNITS.forEach((u, i) => {
    if (seen.has(u.id)) problems.push(`Duplicate unit id: ${u.id}`);
    seen.add(u.id);
    if (u.number !== i + 1) problems.push(`Unit ${u.id} is numbered ${u.number} but sits at ${i + 1}`);
    const nn = String(u.number).padStart(2, "0");
    if (!u.lab.notebook.startsWith(`unit${nn}_`) || !u.lab.notebook.endsWith(".ipynb"))
      problems.push(`Unit ${u.id} notebook should be labs/unit${nn}_*.ipynb, got ${u.lab.notebook}`);
    if (u.selfCheck.length === 0) problems.push(`Unit ${u.id} has no self-check`);
  });
  return problems;
}
