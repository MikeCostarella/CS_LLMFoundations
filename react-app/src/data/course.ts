// Course-level metadata. Content follows COURSE_PLAN.md sections 1–4 and 6–8.

import type { Link } from "./types";

const GH_USER = "MikeCostarella";
const REPO = "CS_LLMFoundations";

export const COURSE = {
  repo: REPO,
  title: "LLM Foundations",
  siteTitle: "LLM Foundations",
  tagline: "How transformers work, how LLMs are trained, aligned and taught to reason, and how to measure it",
  status: "Draft",
  author: "Mike Costarella",
  contactEmail: "Mike.Costarella@gmail.com",
  repoUrl: `https://github.com/${GH_USER}/${REPO}`,
  coursesUrl: "https://mikecostarella.github.io/MikeCostarellaCourses/",

  purpose: [
    "Introduction to AI/ML stops at how an LLM is made. Agentic AI Foundations starts from using LLMs to build agents. LLM Foundations fills the gap. It opens the model up and covers how transformers work, how LLMs are trained, aligned, and taught to reason, and how we measure whether any of it worked.",
    "The scope roughly parallels Stanford's CME 295 (Transformers & Large Language Models). It keeps the same teaching style as Introduction to AI/ML: math through code, with no calculus.",
  ],

  prerequisites: [
    "Introduction to AI/ML, or equivalent. You should know what training, a loss, a neural network, and train/test splits are.",
    "Comfortable Python, with basic NumPy.",
    "No calculus. Needed math (vectors, dot products, matrix multiply, softmax, logarithms) is taught in code as it comes up.",
  ],

  outcomes: [
    "Explain how text becomes tokens, then vectors, then next-token probabilities.",
    "Implement attention and a tiny transformer from scratch.",
    "Describe the stages that turn a base model into an assistant: pretraining, SFT, and preference tuning.",
    "Fine-tune a small open model with LoRA and align it with DPO.",
    "Explain how reasoning models are trained with reinforcement learning (GRPO) and what test-time compute buys.",
    "Build an evaluation set and judge a model fairly, including LLM-as-judge and its biases.",
    "Connect all of the above to tool calling and retrieval, ready for Agentic AI Foundations.",
  ],

  tools: [
    "Python, NumPy, PyTorch for from-scratch work.",
    "Hugging Face transformers, datasets, peft, trl for real models.",
    "Google Colab (free GPU tier): every lab runs there, so nobody needs their own hardware.",
    "Models: GPT-2 small (124M) for inspection, and a small instruct-capable open model (around 0.5B parameters or less) for the fine-tuning labs. Exact model IDs are pinned when each lab is built.",
    "Labs ship as Jupyter notebooks in /labs, each with an \"Open in Colab\" link from its unit page.",
  ],

  path: [
    { title: "Python Programming", url: "https://mikecostarella.github.io/CS_PythonProgrammingCourse/" },
    { title: "Introduction to AI/ML", url: "https://mikecostarella.github.io/CS_IntroductionToAIML/" },
    { title: "LLM Foundations", url: null },
    { title: "Agentic AI Foundations", url: "https://mikecostarella.github.io/CS_AgenticAIFoundations/" },
  ] as { title: string; url: string | null }[],

  assessment: [
    "Self-check questions at the end of every unit, with answers revealed on demand.",
    "Lab checkpoints: each lab ends with a \"you should see…\" expected result so you can verify on your own.",
    "Capstone rubric: pipeline completeness, evaluation honesty, and model card quality.",
  ],
} as const;

export const CAPSTONE = {
  title: "Build Your Own Mini Assistant",
  intro: "Take a small base model through the full pipeline:",
  steps: [
    { label: "SFT", text: "with LoRA on an instruction dataset of your choosing (a narrow domain works best)." },
    { label: "DPO", text: "with a preference set that includes at least 50 pairs you labeled." },
    { label: "Evaluation", text: "with your own eval set, comparing base vs. SFT vs. SFT+DPO." },
    { label: "Model card", text: "what it was trained on, what it's good at, what it fails at, and known biases." },
  ],
  deliverables: ["Notebook", "Adapter weights (or a link)", "Eval results table", "Model card"],
  rubric: [
    { label: "Pipeline completeness", text: "All three stages ran, and each stage's model is saved and compared." },
    { label: "Evaluation honesty", text: "The eval set is your own, the comparison is fair, and failures are reported, not hidden." },
    { label: "Model card quality", text: "A reader can tell what the model is for, what it was trained on, and where it should not be trusted." },
  ],
  notebook: "capstone_mini_assistant.ipynb",
};

export const CME295 = {
  site: "https://cme295.stanford.edu/",
  playlist: "https://www.youtube.com/playlist?list=PLoROMvodv4rOCXd21gf0CF4xr35yINeOy",
  lectures: {
    1: "Transformers",
    2: "Transformer tricks",
    3: "Large Language Models",
    4: "LLM training (pretraining, SFT, LoRA)",
    5: "LLM tuning (RLHF, PPO, DPO)",
    6: "LLM reasoning (GRPO)",
    7: "Agentic LLMs (RAG, tools, agents)",
    8: "LLM evaluation",
  } as Record<number, string>,
  mapping: [
    { lecture: "1 Transformers", here: "Units 1–2" },
    { lecture: "2 Transformer tricks", here: "Unit 3" },
    { lecture: "3 Large Language Models", here: "Unit 4" },
    { lecture: "4 LLM training (pretraining, SFT, LoRA)", here: "Unit 5" },
    { lecture: "5 LLM tuning (RLHF, PPO, DPO)", here: "Unit 6" },
    { lecture: "6 LLM reasoning (GRPO)", here: "Unit 7" },
    { lecture: "7 Agentic LLMs (RAG, tools, agents)", here: "Unit 9 (intro only) → Agentic AI Foundations" },
    { lecture: "8 LLM evaluation", here: "Unit 8" },
  ],
};

/** "Go deeper" link for a CME 295 lecture: the lecture playlist, labeled by number. */
export function cmeLink(n: number): Link {
  return { label: `CME 295 Lecture ${n} — ${CME295.lectures[n] ?? ""}`, url: CME295.playlist };
}

/** Colab opens a notebook straight from the GitHub repo. */
export function colabUrl(notebook: string): string {
  return `https://colab.research.google.com/github/${GH_USER}/${REPO}/blob/main/labs/${notebook}`;
}

export function notebookUrl(notebook: string): string {
  return `https://github.com/${GH_USER}/${REPO}/blob/main/labs/${notebook}`;
}
