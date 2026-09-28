# LLM Foundations — Course Plan

**Repo:** `CS_LLMFoundations` (C:\projects\CS_LLMFoundations)
**Status:** Draft (self-directed, no term or institution attached)
**Course path:** Python Programming → Introduction to AI/ML → **LLM Foundations** → Agentic AI Foundations

## 1. Purpose

Introduction to AI/ML stops at *how an LLM is made*. Agentic AI Foundations starts from *using* LLMs to build agents. LLM Foundations fills the gap. It opens the model up and covers how transformers work, how LLMs are trained, aligned, and taught to reason, and how we measure whether any of it worked.

The scope roughly parallels Stanford's CME 295 (Transformers & Large Language Models). It keeps the same teaching style as Introduction to AI/ML: math through code, with no calculus.

## 2. Prerequisites

- Introduction to AI/ML, or equivalent. Students should know what training, a loss, a neural network, and train/test splits are.
- Comfortable Python, with basic NumPy.
- No calculus. Needed math (vectors, dot products, matrix multiply, softmax, logarithms) is taught in code as it comes up.

## 3. Learning outcomes

By the end, a student can:

1. Explain how text becomes tokens, then vectors, then next-token probabilities.
2. Implement attention and a tiny transformer from scratch.
3. Describe the stages that turn a base model into an assistant: pretraining, SFT, and preference tuning.
4. Fine-tune a small open model with LoRA and align it with DPO.
5. Explain how reasoning models are trained with reinforcement learning (GRPO) and what test-time compute buys.
6. Build an evaluation set and judge a model fairly, including LLM-as-judge and its biases.
7. Connect all of the above to tool calling and retrieval, ready for Agentic AI Foundations.

## 4. Tools and compute

- **Python, NumPy, PyTorch** for from-scratch work.
- **Hugging Face** `transformers`, `datasets`, `peft`, `trl` for real models.
- **Google Colab (free GPU tier)**: every lab must run there so nobody needs hardware.
- **Models:** GPT-2 small (124M) for inspection, and a small instruct-capable open model (around 0.5B parameters or less) for fine-tuning labs. Pin exact model IDs when the labs are built, and check for current versions.
- Labs ship as Jupyter notebooks in `/labs`, each with an "Open in Colab" link from the course site.

## 5. Units

Each unit has: goal, lessons, lab, a self-check, and a "Go deeper" pointer. Nine units, plus a capstone.

### Unit 1 — Tokens and Embeddings
**Goal:** Understand how text becomes numbers.

Lessons:
1. Why models can't read text: characters vs. words vs. subwords.
2. Byte-Pair Encoding, step by step.
3. Tokenizer quirks: numbers, code, other languages, and why token counts drive cost and context limits.
4. Embeddings: tokens as vectors; cosine similarity; meaning as direction.

**Lab 1:** Implement BPE from scratch on a small public-domain text and watch merges happen. Compare your tokenizer to GPT-2's on the same sentences. Load GPT-2 embeddings, find nearest neighbors by cosine similarity, and plot a 2D projection (PCA).

**Self-check:** Why does "12345" tokenize strangely? Why is a Spanish sentence often more tokens than its English equivalent?

**Go deeper:** CME 295 Lecture 1.

### Unit 2 — Attention and the Transformer
**Goal:** Build the core architecture by hand.

Lessons:
1. The problem attention solves: every word needs context from other words.
2. Queries, keys, and values: the "search engine" intuition.
3. Scaled dot-product attention in NumPy, one line at a time.
4. The causal mask: why a model can't peek at the future.
5. Multi-head attention.
6. The transformer block: attention + MLP + residual connections + layer norm.

**Lab 2:** Part A: implement attention in NumPy and verify it on a hand-built example. Part B: build and train a tiny character-level GPT in PyTorch on a public-domain text, then generate samples. This is the direct sequel to the neural net from scratch in Introduction to AI/ML.

**Self-check:** What happens to the output if the causal mask is removed during generation? Why divide by the square root of the key dimension?

**Go deeper:** CME 295 Lecture 1; Andrej Karpathy's nanoGPT.

### Unit 3 — Transformer Tricks
**Goal:** See what makes real transformers fast and long-context.

Lessons:
1. Position: sinusoidal, learned, and rotary (RoPE) encodings.
2. Attention cost grows with the square of the sequence length, and why that matters.
3. The KV cache: don't recompute the past.
4. Multi-query and grouped-query attention.
5. FlashAttention, conceptually: same math, smarter memory use.
6. Mixture of experts: big models that only use part of themselves per token.

**Lab 3:** Add a KV cache to your Unit 2 model and measure generation speed with and without it. Swap learned positions for RoPE and compare training loss.

**Self-check:** Why does the KV cache use more memory as a conversation grows? What does a mixture-of-experts model trade for its speed?

**Go deeper:** CME 295 Lecture 2.

### Unit 4 — From Transformer to LLM
**Goal:** Connect the architecture to the chatbot.

Lessons:
1. Next-token prediction: the only thing an LLM is trained to do.
2. Logits → softmax → probabilities.
3. Decoding: greedy, temperature, top-k, top-p.
4. Model families: encoder (BERT-style), decoder (GPT-style), encoder-decoder.
5. Scaling: parameters, data, compute, and why bigger kept working.

**Lab 4:** Load GPT-2 small. Print the top 10 next-token probabilities for your own prompts. Implement temperature, top-k, and top-p sampling by hand (no `generate()`), then run a temperature sweep and describe what changes.

**Self-check:** Why does temperature 0 give repetitive text? Why can't greedy decoding recover from an early bad token?

**Go deeper:** CME 295 Lecture 3.

### Unit 5 — Training: Pretraining, SFT, and LoRA
**Goal:** Understand and perform fine-tuning.

Lessons:
1. Pretraining: web-scale data, deduplication, filtering, and what it costs.
2. The base model: brilliant autocomplete, not an assistant.
3. Supervised fine-tuning (SFT): instruction data and chat templates.
4. Why full fine-tuning is expensive.
5. LoRA: train small "adapter" matrices instead of the whole model. Explained with matrix shapes, not calculus.
6. Quantization and QLoRA: fitting training onto a free GPU.

**Lab 5:** LoRA fine-tune a small base model on a small instruction dataset using `peft` + `trl` on Colab. Compare responses before and after on the same 10 prompts. Save the adapter; you'll reuse it in Units 6, 8, and the capstone.

**Self-check:** Why does a base model often continue your question instead of answering it? What fraction of parameters did your LoRA run actually train?

**Go deeper:** CME 295 Lecture 4.

### Unit 6 — Alignment: RLHF and DPO
**Goal:** Understand how a model learns what people prefer.

Lessons:
1. Helpful, honest, harmless: what SFT alone doesn't fix.
2. Preference data: "A is better than B."
3. Reward models.
4. RLHF with PPO, conceptually: the model gets rewarded while being kept close to where it started.
5. DPO: learning directly from preferences, with no separate reward model.
6. Failure modes: reward hacking, sycophancy, over-refusal.

**Lab 6:** Part A: students hand-label 30 preference pairs from their Unit 5 model's outputs, which teaches how subjective preference data is. Part B: run DPO with `trl` on a small public preference dataset (plus their pairs). Compare to the SFT-only model.

**Self-check:** Why keep the model close to the original during RLHF? Give an example of reward hacking.

**Go deeper:** CME 295 Lecture 5.

### Unit 7 — Reasoning Models
**Goal:** Understand how models learn to "think" before answering.

Lessons:
1. Chain-of-thought prompting and why it helps.
2. Test-time compute: spending more tokens to get better answers.
3. Reinforcement learning with verifiable rewards: math and code have checkable answers.
4. GRPO: sample a group of answers, score each, and reward the ones better than the group average. No critic model needed.
5. Limits: when reasoning traces help, when they don't, and whether they reflect what the model actually did.

**Lab 7:** Part A: compare direct answers vs. chain-of-thought on 50 grade-school arithmetic problems with a small model; measure accuracy and token cost. Part B: implement the GRPO scoring loop by hand: sample a group, verify each answer, compute group-relative advantages. Optional stretch: a short GRPO training run with `trl`, if Colab time allows.

**Self-check:** Why does GRPO work well for math but poorly for poetry? What does it cost to let a model think longer?

**Go deeper:** CME 295 Lecture 6.

### Unit 8 — Evaluation
**Goal:** Measure models honestly.

Lessons:
1. Why evaluation is hard: "better" depends on the task.
2. Perplexity and its limits.
3. Public benchmarks: what they measure and how they saturate.
4. Contamination: when the test leaked into training.
5. Human evaluation.
6. LLM-as-judge: scale and its biases (position, length, self-preference).
7. Building your own eval set.

**Lab 8:** Build a 30-item eval set for your own fine-tuned model. Score it with exact match where possible and LLM-as-judge where not. Then measure judge position bias by swapping answer order and counting flipped verdicts.

**Self-check:** Your model's benchmark score jumped 20 points. List three explanations besides "the model got better."

**Go deeper:** CME 295 Lecture 8.

### Unit 9 — Bridge to Agents
**Goal:** Connect the model to the outside world, and hand off to Agentic AI Foundations.

Lessons:
1. Structured output: getting reliable JSON.
2. Tool calling: the model asks, your code acts, and the result goes back in.
3. Retrieval in miniature: embeddings (from Unit 1) + cosine similarity = search.
4. RAG: putting retrieved text into the prompt.
5. What comes next: agents, planning, and memory, all covered in Agentic AI Foundations.

**Lab 9:** Build a tiny RAG system over the course's own lesson text: embed chunks, retrieve the top 3 by cosine similarity, and answer questions with citations. Add one tool (a calculator) and a single tool-call loop.

**Self-check:** When does RAG fail even if the answer is in the documents?

**Go deeper:** CME 295 Lecture 7; Agentic AI Foundations.

## 6. Capstone — Build Your Own Mini Assistant

Take a small base model through the full pipeline:

1. **SFT** with LoRA on an instruction dataset of the student's choosing (a narrow domain works best).
2. **DPO** with a preference set that includes at least 50 pairs the student labeled.
3. **Evaluation** with their own eval set, comparing base vs. SFT vs. SFT+DPO.
4. **Model card:** what it was trained on, what it's good at, what it fails at, and known biases.

Deliverables: notebook, adapter weights (or a link), eval results table, model card.

## 7. Assessment (self-directed)

- Self-check questions at the end of every unit, with answers revealed on demand.
- Lab checkpoints: each lab ends with a "you should see…" expected result so students can verify on their own.
- Capstone rubric: pipeline completeness, evaluation honesty, and model card quality.

## 8. CME 295 mapping

| CME 295 lecture | LLM Foundations |
|---|---|
| 1 Transformers | Units 1–2 |
| 2 Transformer tricks | Unit 3 |
| 3 Large Language Models | Unit 4 |
| 4 LLM training (pretraining, SFT, LoRA) | Unit 5 |
| 5 LLM tuning (RLHF, PPO, DPO) | Unit 6 |
| 6 LLM reasoning (GRPO) | Unit 7 |
| 7 Agentic LLMs (RAG, tools, agents) | Unit 9 (intro only) → Agentic AI Foundations |
| 8 LLM evaluation | Unit 8 |

## 9. Site build notes (fleet pattern)

- Same React + TypeScript (strict) + Vite PWA on GitHub Pages pattern as the other course sites (CS_IntroductionToAIML, CS_AgenticAIFoundations).
- Hamburger accordion main menu (View / … / Links sections) and a visible build timestamp.
- No "© Costarella Innovations, LLC" and no stack line in the footer.
- Pages: Home (overview, path, prerequisites), Syllabus (this plan), one page per unit (lessons, lab link, self-check, go deeper), Capstone, Resources (CME 295 playlist and other references).
- Unit content as typed data (e.g. `src/data/units.ts`) so pages render from one source.
- Labs as notebooks in `/labs/unitNN_*.ipynb`, each with an "Open in Colab" badge on its unit page.
- Keep the PWA precache under the 5MB ceiling. Exclude notebooks from precache.
- `tsc -b && vite build` must pass before commit.
- Label as **Draft** on the courses directory and MyWebSite.
- Link the new repo in all three places: the Statehouse fleet manifest, MyWebSite, and MikeCostarellaCourses.
- Update the course-path text on CS_IntroductionToAIML and CS_AgenticAIFoundations to include LLM Foundations between them.
