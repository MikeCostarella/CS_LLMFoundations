// The Resources page. Everything here is free.

export interface ResourceDef {
  id: string;
  category: (typeof RESOURCE_CATEGORIES)[number];
  label: string;
  url: string;
  why: string;
}

export const RESOURCE_CATEGORIES = [
  "Stanford CME 295",
  "Course path",
  "Libraries and docs",
  "Build it yourself",
] as const;

export const RESOURCES: ResourceDef[] = [
  {
    id: "cme295-playlist",
    category: "Stanford CME 295",
    label: "CME 295 lecture playlist (YouTube)",
    url: "https://www.youtube.com/playlist?list=PLoROMvodv4rOCXd21gf0CF4xr35yINeOy",
    why: "Stanford's Transformers & Large Language Models lectures. Every unit's \"Go deeper\" points at one of these.",
  },
  {
    id: "cme295-site",
    category: "Stanford CME 295",
    label: "CME 295 course site",
    url: "https://cme295.stanford.edu/",
    why: "Syllabus, slides, and the official lecture list.",
  },
  {
    id: "intro-aiml",
    category: "Course path",
    label: "Introduction to AI/ML — the course before this one",
    url: "https://mikecostarella.github.io/CS_IntroductionToAIML/",
    why: "Training, loss, a neural net from scratch, and how an LLM is made. Assumed from Unit 1.",
  },
  {
    id: "agentic",
    category: "Course path",
    label: "Agentic AI Foundations — the course after this one",
    url: "https://mikecostarella.github.io/CS_AgenticAIFoundations/",
    why: "Picks up where Unit 9 stops: agents, planning, memory, and evaluation of agent systems.",
  },
  {
    id: "python",
    category: "Course path",
    label: "Python Programming",
    url: "https://mikecostarella.github.io/CS_PythonProgrammingCourse/",
    why: "The start of the path, if Python itself is new.",
  },
  {
    id: "hf-transformers",
    category: "Libraries and docs",
    label: "Hugging Face Transformers",
    url: "https://huggingface.co/docs/transformers",
    why: "Loading GPT-2 and the fine-tuning models, tokenizers, and chat templates.",
  },
  {
    id: "hf-datasets",
    category: "Libraries and docs",
    label: "Hugging Face Datasets",
    url: "https://huggingface.co/docs/datasets",
    why: "The instruction and preference datasets used in Units 5–7.",
  },
  {
    id: "hf-peft",
    category: "Libraries and docs",
    label: "PEFT (LoRA)",
    url: "https://huggingface.co/docs/peft",
    why: "LoRA adapters in Unit 5 and the capstone.",
  },
  {
    id: "hf-trl",
    category: "Libraries and docs",
    label: "TRL",
    url: "https://huggingface.co/docs/trl",
    why: "SFT, DPO, and GRPO trainers for Units 5–7.",
  },
  {
    id: "pytorch",
    category: "Libraries and docs",
    label: "PyTorch tutorials",
    url: "https://pytorch.org/tutorials/",
    why: "Enough PyTorch for the Unit 2 character-level GPT.",
  },
  {
    id: "colab",
    category: "Libraries and docs",
    label: "Google Colab",
    url: "https://colab.research.google.com/",
    why: "Every lab runs here on the free GPU tier.",
  },
  {
    id: "nanogpt",
    category: "Build it yourself",
    label: "Andrej Karpathy — nanoGPT",
    url: "https://github.com/karpathy/nanoGPT",
    why: "The reference for Unit 2's tiny GPT, small enough to read in one sitting.",
  },
];
